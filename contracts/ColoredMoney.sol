//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/******************************
COLORED MONEY IMPLEMENTATION PROPOSAL
BY: JAVIER NIETO CENTENO
*/

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



contract ColoredMoney is ERC1155Supply, AccessControlEnumerable, Ownable {

    //Boolean to suspend and resume the Smart Contract
    bool private suspended=false;

    //Roles present in the Smart Contract
    bytes32 public constant ENTITY_MANAGER = keccak256("ENTITY_MANAGER");
    bytes32 public constant REGULATOR = keccak256("REGULATOR");

    //Entities that can issue tokens
    struct Entity {
        string entityName;
        address entityAddress;
    }
    
    //Array with all entities onboarded    
    Entity[] Entities;


    //Set definition for reverse mapping
    struct TokenSet {
        //_values contains the elements of the set
        //_indexes contains the position in the array of the set element (o for not existant)
        uint256[] _values;
        // 1-indexed to allow 0 to signify nonexistence
        mapping(uint256 => uint256) _indexes;
    }

    //Quick way to get all tokens for a given address
    mapping(address => TokenSet) tokensByAccount;    


    //Checks that the entity exists and caller is the owner of that entity
    modifier onlyEntity(uint16 entityId) {
        require(entityId<Entities.length, "Entity does not exists");
        require(Entities[entityId].entityAddress == _msgSender() || hasRole(REGULATOR, _msgSender()), "Caller is not the owner of the entity");
        _;
    }

    constructor() ERC1155("https://test.coloredmoney.com/entities/{id}.json") {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        //Assign to the creator the role of entity manager, just for convinience
        _setupRole(ENTITY_MANAGER, _msgSender());

        //Assign to the creator the role of regulator, just for convinience
        _setupRole(REGULATOR, _msgSender());
        
    }


    function mint (address _to, uint16 entityId, uint256 amount) public onlyEntity(entityId) {
        require(!suspended, "Contract is suspended");
        _mint(_to, entityId, amount, "");
    }

    function burn(address from, uint16 entityId, uint256 amount) public onlyEntity(entityId) {
        require(!suspended, "Contract is suspended");
        require(balanceOf(from, entityId)>=amount, "Not enough items!");
        _burn(from, entityId, amount);
    }

    //Function that returns the consolidated balance of a wallet
    //Adds all balances of diferent tokens in that wallet
    function consolidatedBalanceOf(address _owner) public view returns (uint256) {
        (uint256[] memory tokens, uint256[] memory balances) = getTokensByOwner(_owner);
        
        uint256 balance=0;
        for(uint i=0; i<tokens.length; i++)
            balance+=balances[i];
        return balance;
    }

    //Transfer tokens of diferent colors until get the desired amount
    function consolidatedTransfer(address _to, uint256 _value, bytes calldata _data) public {
        require(consolidatedBalanceOf(_msgSender())>=_value, "Not enough funds!");

        uint256 total=0;
        uint16 index=0;
        
        //First we retierve all balances
        (uint256[] memory tokens, uint256[] memory balances) = getTokensByOwner(_msgSender());
        
        //Then we need to calculate the required lenght
        while(total < _value) {
            total+=balances[index];
            index++;
        }
        
        //Allocate memory for the arrays
        uint256[] memory ids= new uint256[](index);
        uint256[] memory amounts= new uint256[](index);

        //Reset counters to zero
        total=0;
        index=0;

        while(total < _value) {
            ids[index]=tokens[index];
            if(_value-total < balances[index]) {
                amounts[index]=_value-total;
                total+=_value-total;
            }
            else {
                amounts[index]=balances[index];
                total+=amounts[index];
            }
            index++;
        }

        //Make the appropriate transfer
        safeBatchTransferFrom(_msgSender(), _to, ids, amounts, _data);
        
    }

    //Adds a new entity to the collection
    //Requires teh NTITY_MANAGER role
    //
    //Simple management of entities, for the testing we do not include delete or modify entities.
    function addEntity(string memory name, address wallet) public onlyRole(ENTITY_MANAGER) {      
        Entity memory newEntity;
        newEntity.entityName=name;
        newEntity.entityAddress=wallet;
        Entities.push(newEntity);
    }

    //Returns all entities
    function getEntities() public view returns(Entity[] memory) {
        return Entities;
    }


    //Needed in an ERC1155. We may use this to provide entity information
    //So far it points to non-existatnt web
    function uri(uint256 entityId) public view virtual override returns (string memory) {
        return string(abi.encodePacked("https://test.coloredmoney.com/entities/",Strings.toString(entityId)));
    }

    //Needed to properly implemet abn ERC1155
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControlEnumerable) returns (bool) {        
        return super.supportsInterface(interfaceId);
    }

    //Returns two arrays 
    // first:  Entity id 
    // seconf: Balance of this tokens
    function getTokensByOwner(address _from) public view returns(uint256[] memory tokens, uint256[] memory balances) {
        uint256[] memory ftokens = tokensByAccount[_from]._values;        
        uint256[] memory fbalances = new uint256[](ftokens.length);
        for (uint256 i; i < ftokens.length; i++)
            fbalances[i] = balanceOf(_from, ftokens[i]);

        return (ftokens, fbalances);
}
    
    //We need this to maintain the tokensByAccount set
    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) internal virtual override {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);

        if (from != to) {
            
            TokenSet storage fromTokens = tokensByAccount[from];
            TokenSet storage toTokens = tokensByAccount[to];

            for (uint256 i; i < ids.length; i++) {
                uint256 amount = amounts[i];

                if (amount > 0) {
                    uint256 id = ids[i];

                    //If we are moving from a real address (no minting) all the tokens owned
                    if (from != address(0) && balanceOf(from, id) == amount) 
                        removeFromSet(fromTokens, id);

                    //If we are moving to a rea account (no burning) that has no items
                    if (to != address(0)  && balanceOf(to, id) == 0) 
                        addToSet(toTokens, id);
                }
            }
        }
    }

    //Set functions
    function _contains(TokenSet storage set, uint256 value) private view returns (bool)
    {
        return set._indexes[value] != 0;
    }

    function addToSet(TokenSet storage set, uint256 value) private returns (bool) {
        if (!_contains(set, value)) {
            set._values.push(value);
            set._indexes[value] = set._values.length;
            return true;
        } else {
            return false;
        }
    }

    function removeFromSet(TokenSet storage set, uint256 value) private returns (bool) {
        uint256 valueIndex = set._indexes[value];

        if (valueIndex != 0) {
            uint256 index = valueIndex - 1;
            uint256 last = set._values[set._values.length - 1];

            // move last value to now-vacant index

            set._values[index] = last;
            set._indexes[last] = index + 1;

            // clear last index

            set._values.pop();
            delete set._indexes[value];

            return true;
        } else {
            return false;
        }
    }
}

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./rarible/royalties/contracts/impl/RoyaltiesV2Impl.sol";
import "./rarible/royalties/contracts/LibPart.sol";
import "./rarible/royalties/contracts/LibRoyaltiesV2.sol";

contract Satoshi is ERC721, AccessControlEnumerable, Ownable, RoyaltiesV2Impl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;

    //Adds support for OpenSea
    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;

    //Roles of monter and burner
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    //Mapping from NFT to struct
    mapping(address => bool) private isMinted;

    //Mapping from NFT to struct
    mapping(uint => address) private _dna;

    // Mapping from owner address to token ID. It is used to quickly get all NFTs on an address
    mapping(address => uint256[]) private _tokensByOwner;

    //Royaties address and amntou
    address payable private _royaltiesAddress;
    uint96 private _royaltiesBasicPoints;

    //Used by _beforeTokenTransfer to catch the after minting
    address private DNAToMint;

    uint private ownAddressPrice=       5000000000000000000; //5 matic
    uint private otherAddressPrice=    25000000000000000000; //25 matic

    uint private specialAddressTop= 65535; //Below this addr all NFTs are special (only owner alowed)

    constructor() ERC721("My Own Satoshi", "MOS") {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        _setupRole(MINTER_ROLE, _msgSender());

        //Royaties address and amntou
        _royaltiesAddress=payable(address(this)); //Contract creator by default
        _royaltiesBasicPoints=500; //5% default
    }

    receive() external payable {}

    // Cannot buy special addresses
    function purchaseSatoshi(address toBuy) external payable {
        require(!isMinted[toBuy], "This Satoshi has been already minted!");
        require(uint256(uint160(toBuy))>specialAddressTop, "Special collection address is not for sale!");
        require(toBuy==msg.sender? msg.value>=ownAddressPrice: msg.value>=otherAddressPrice , "Not enough funds sent!");

        //MINT EL BICHO!!!
        mint(msg.sender, toBuy);
    }

    function mintCollection(address toBuy)  public onlyOwner {
        require(!isMinted[toBuy], "This Satoshi has been already minted!");
        require(uint256(uint160(toBuy))<=specialAddressTop, "Special collection address are below FFFF");

        //MINT EL BICHO!!!
        mint(msg.sender, toBuy);
    }


    //Ojo, tenemos que meter aquí el escrow!!
    function withdraw(uint amount) external {
        payable(msg.sender).transfer(amount);
    }

    function alreadyMinted(address addr) public view returns (bool) {
        return isMinted[addr];
    }

    function tokensByOwner(address addr) public view returns (uint[] memory) {
        return _tokensByOwner[addr];
    }

    function dnaOfId(uint id) public view returns (address) {
        return _dna[id];
    }

    function mint(address _to, address data) public {
        require(hasRole(MINTER_ROLE, _msgSender()), "Exception: must have minter role to mint");
        require(!isMinted[data], "This Satoshi has been already minted!");
        
        //Stores the struct to assign when mint os ok
        DNAToMint=data;

        super._mint(_to, _tokenIdTracker.current());        
    }

    function bulkMint(address _to, address[] memory data) public {
        require(hasRole(MINTER_ROLE, _msgSender()), "Exception: must have minter role to mint");
        
        for (uint i=0; i<data.length; i++) {        
            mint(_to, data[i]);
        }
    }

    //Set prices    

    function setOwnAddressPrice(uint value) public onlyOwner {
        ownAddressPrice=value;
    }

    function setOtherAddressPrice(uint value) public onlyOwner {
        otherAddressPrice=value;
    }    

    function setSpecialAddressTop(uint value) public onlyOwner {
        specialAddressTop=value;
    }

    //Royalties Address
    function setRoyaltiesAddress(address payable rAddress) public onlyOwner {
        _royaltiesAddress=rAddress;
    }

    //Royalties basics points (100 => 1%)
    function setRoyaltiesBasicPoints(uint96 rBasicPoints) public onlyOwner {
        _royaltiesBasicPoints=rBasicPoints;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override(ERC721) {
        if(from==address(0)) {

            //Stores the DNA for this token id
            _dna[tokenId]=DNAToMint;
            //Set the address as already minted
            isMinted[DNAToMint]=true;

            //Minting ok, creates struct of stats                        
            _tokenIdTracker.increment();

            //When mint a new NFT sets the royalties address
            setRoyalties(tokenId, _royaltiesAddress, _royaltiesBasicPoints);

            //Updates the _tokensByOwner mapping            
            _tokensByOwner[to].push(tokenId);
        } else if(to==address(0)) {
            //Burning

            //Updates the _tokensByOwner mapping
            deleteTokenId(from, tokenId);
        } else {
            //Normal transfer

            //Updates the _tokensByOwner mapping
            _tokensByOwner[to].push(tokenId);
            deleteTokenId(from, tokenId);
        }
        
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "http://nft.myownsatoshi.com/";
    }

    function setRoyalties(uint256 _tokenId, address payable _royaltiesReceipientAddress, uint96 _percentageBasisPoints) public onlyOwner {
        LibPart.Part[] memory _royalties = new LibPart.Part[](1);
        _royalties[0].value = _percentageBasisPoints;
        _royalties[0].account = _royaltiesReceipientAddress;
        _saveRoyalties(_tokenId, _royalties);
    }

    function royaltyInfo(uint256 _tokenId, uint256 _salePrice ) external view returns ( address receiver, uint256 royaltyAmount) {
        LibPart.Part[] memory _royalties = royalties[_tokenId];
        if(_royalties.length > 0) {
            return(_royalties[0].account, (_salePrice * _royalties[0].value)/10000);
        }
        return (address(0), 0);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControlEnumerable) returns (bool) {
        if (interfaceId == LibRoyaltiesV2._INTERFACE_ID_ROYALTIES) {
            return true;
        }

        if(interfaceId == _INTERFACE_ID_ERC2981) {
            return true;
        }

        return super.supportsInterface(interfaceId);
    }

    //************************************************************
    // ARRAY functions 
    //************************************************************
    function positionOf(address powner, uint256 tokenId) internal view returns (uint) {
        for(uint i=0; i<_tokensByOwner[powner].length; i++) {
            if(_tokensByOwner[powner][i]==tokenId)
                return i;
        }
        return _tokensByOwner[powner].length+100;
    }

    function deleteTokenId(address powner, uint256 tokenId) internal {
        //Updates the _tokensByOwner mapping
        uint pos=positionOf(powner, tokenId);
        if(pos<_tokensByOwner[powner].length) {
            _tokensByOwner[powner][pos]= _tokensByOwner[powner][ _tokensByOwner[powner].length-1];
            _tokensByOwner[powner].pop();
        }
    }

}
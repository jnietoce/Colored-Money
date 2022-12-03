import { Loader, Modal } from "@components/ui/common"
import { useEffect, useState } from "react"
import { Button } from "@components/ui/common"
import { DynaLoader } from "@components/ui/common"

const RARITY = {
    1: "Common",
    2: "Uncommon",
    3: "Rare",
    4: "Epic",
    5: "Legendary",
    6: "Mythic",
    7: "Utopic"
}

const EFFECTS = {
    0: "None",
    1: "Flies",
    2: "Leaves",
    3: "Snowflakes",
    4: "Petals"
}

const ANIMATION = {
    0: "Idle",
    1: "Walk",
    2: "Run"
}

const PETS = {
    0: "None", 1: "Kha", 2: "Ava", 3: "Dai", 4: "Mia",
    5: "Roy", 6: "Noe", 7: "Jad", 8: "Eli", 9: "Leo",
    10: "Axl", 11: "Lia", 12: "Aya", 13: "Emi", 14: "Zoe", 
    15: "Ivy", 16: "Ari", 17: "Rex", 18: "Max", 19: "Noa", 
    20: "Gus", 21: "Elm"    
}

const GLASSES = {
    0: "None",
    1: "Red",
    2: "Green",
    3: "Blue",
    4: "Purple"
}

const HORNS = {
    0: "None", 1: "Gold", 2: "Hole", 3: "Blood", 4: "Light",
    5: "Sky", 6: "Grass", 7: "Fire", 8: "King", 9: "Rose",
    10: "Worm", 11: "Sea", 12: "Wasp", 13: "Saint", 14: "Egg", 
    15: "Emerald", 16: "Rain", 17: "Vein"
}


export default function OrderModal({purchase}) {

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if(!!purchase) {
            setIsOpen(true)
        }
        else {
            setIsOpen(false)
        }
        
    }, [purchase])

    const closeModel = () => {
        setIsOpen(false)
    }

    return (
        <Modal isOpen={isOpen}>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                    
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Purchase NFT
                        </h3>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            { !purchase.result &&
                                <span>Please, sign the transaction on the Metamask popup window.<br /> <br /> You are purchasing this NFT <br /></span>
                            }
                                <strong>Addr:</strong> {purchase.NFT} <br />
                               
                                <strong>Name:</strong> {purchase.validAddress.name} <br />
                                <strong>Description:</strong><span className="text-sm font-light"> {purchase.validAddress.description} </span> <br />   
                                <strong>DNA:</strong> 
                                <span className="text-base font-light"> [
                                    {("0"+purchase.validAddress.body.toString(16)).slice (-2).toUpperCase()}: 
                                    {("0"+purchase.validAddress.hair.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+purchase.validAddress.pet.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+purchase.validAddress.beard.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+purchase.validAddress.face.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+purchase.validAddress.anim.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+purchase.validAddress.back.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+purchase.validAddress.ear.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+purchase.validAddress.head.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+purchase.validAddress.effect.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+purchase.validAddress.left.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+purchase.validAddress.horns.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+purchase.validAddress.right.toString(16)).slice (-2).toUpperCase()}:                                    
                                    {("0"+purchase.validAddress.glasses.toString(16)).slice (-2).toUpperCase()}                                                                
                                ]</span>
                                <br />
                                <strong>Level:</strong> {RARITY[purchase.validAddress.level]} <strong>Rarity score:</strong> {purchase.validAddress.rarity} <br />                                
                                <strong>Genotypes:</strong> 
                                <span className="text-base font-light"> [Horns: {HORNS[purchase.validAddress.horns]}] [Glasses: {GLASSES[purchase.validAddress.glasses]}] <br />
                                [Pet: {PETS[purchase.validAddress.pet]}] [Effect: {EFFECTS[purchase.validAddress.effect]}] [Animation: {ANIMATION[purchase.validAddress.anim]}]
                                </span> <br />
                                <strong>Price:</strong> {purchase.price} MATIC
                        </p>
                        </div>
                        { !purchase.result ?
                            <div>
                                <DynaLoader size="lg" />
                                <p className="text-lg text-gray-500 text-center">
                                    <strong>Awaiting for transaction to be confirmed...</strong>
                                </p>
                            </div>
                         :
                            <>
                                <p className="text-lg text-gray-500 text-center">
                                    <br />
                                    <strong>Transaction finished!</strong><br />
                                    <a target="_blank" href={`https://mumbai.polygonscan.com/tx/${purchase.result.transactionHash}`}>View transaction on block explorer</a>
                                </p>
                            </> 
                        }
                    </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <Button 
                        onClick={closeModel}
                        variant = "red">
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
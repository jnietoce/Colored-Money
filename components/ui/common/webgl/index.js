import { Button, ErrorModal } from "@components/ui/common"
import { useState } from "react"
import { useWalletInfo } from "@components/hooks/web3"
import { useWeb3 } from "@components/providers"
import { OrderModal } from "@components/ui/order"


const RARITY = {
    1: "Common",
    2: "Uncommon",
    3: "Rare",
    4: "Epic",
    5: "Legendary",
    6: "Mythic",
    7: "Utopic",
    8: "Invaluable"
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


export default function WebGL({address, unityContext, validAddress}) {
    
    const [doPurchase, setDoPurchase] = useState(null)
    
    const {account, network, canPurchase} = useWalletInfo()
    
    const { web3, contract } = useWeb3();

    const[addrValue, setaddrValue] = useState()

    const[addrChanged, setaddrChanged] = useState(false)

    const[isError, setIsError] = useState(null)

    const[alreadySold, setAlreadySold] = useState({
        isLoading: false,
        isSold: false
    })

    function updateInput(evt){
        setaddrValue(evt.target.value)
        setaddrChanged(true)
    }

    const SetAddress = async () => {
        if(!web3.utils.isAddress(addrValue)) {
            setIsError({
                address: addrValue,
                title: "Bad Address",
                errorMessage: "The address entered is not well formated. Please review it and enter again."
            })
            return
        }

        //5000 first addresses are privates
        if(addrValue.toUpperCase().localeCompare("0x0000000000000000000000000000000000010000")<0)
        {
            setIsError({
                address: addrValue,
                title: "Special collection address",
                errorMessage: "All addresses equal or below FFFF (65535) are not for sale. You can see this Satoshis in the 'Special Collection' section of the menu."
            })
            return
        }

        setAlreadySold({
            isLoading: true,
            isSold: false
        });
        unityContext.send("NFTDatabase", "IsSold", 0)
        unityContext.send("NFTDatabase", "SetAddress", addrValue)

        const result = false;
        if(network.isSupported  && account.data)
            result = await contract.contract.methods.alreadyMinted(addrValue ).call()
        
        setAlreadySold({
            isLoading: false,
            isSold: result
        });

        unityContext.send("NFTDatabase", "IsSold", result?1:0)

        //console.log(result)
        setaddrChanged(false)
    }

    const SetOwnAddress = async () => {
        
        if(!web3.utils.isAddress(address)){
            setIsError({
                address: address,
                title: "Bad Address",
                errorMessage: "The address entered is not well formated. Please review it and enter again."
            })
            return
        }

        //5000 first addresses are privates
        if(address.toUpperCase().localeCompare("0x0000000000000000000000000000000000010000")<0)
        {
            setIsError({
                address: addrValue,
                title: "Special collection address",
                errorMessage: "All addresses equal or below FFFF (65535) are not for sale. You can see this Satoshis in the 'Special Collection' section of the menu."
            })
            return
        }

        setAlreadySold({
            isLoading: true,
            isSold: false
        });
        setaddrValue(address)
        unityContext.send("NFTDatabase", "IsSold", 0)
        unityContext.send("NFTDatabase", "SetAddress", address)
        
        const result = false;
        if(network.isSupported  && account.data) {
            result = await contract.contract.methods.alreadyMinted(address ).call()
            //console.log(`result: ${result}`)
        }
        
        setAlreadySold({
            isLoading: false,
            isSold: result
        });
        
        unityContext.send("NFTDatabase", "IsSold", result?1:0)
        setaddrChanged(false)
    }

    const PurchaseOwn = async () => { 
        const value = web3.utils.toWei("5")
        setDoPurchase({
            from: account.data,
            NFT: addrValue,
            price: 0.05,
            validAddress: validAddress,
            result:null
        })
        try {
            const result = await contract.contract.methods.purchaseSatoshi(
                address).send({from: account.data, value: value})
            //console.log(result)
            setDoPurchase({
                from: account.data,
                NFT: addrValue,
                price: 0.05,
                validAddress: validAddress,
                result:result
            })
        }
        catch {
            console.log("Something went worng")
            setDoPurchase(null)
        }
    }

    const PurchaseAddress = async () => { 
        const value = web3.utils.toWei("25")
        setDoPurchase({
            from: account.data,
            NFT: addrValue,
            price: 0.05,
            validAddress: validAddress,
            result:null
        })
        try {
            const result = await contract.contract.methods.purchaseSatoshi(
                addrValue
                ).send({from: account.data, value: value})
            //console.log(result)
            setDoPurchase({
                from: account.data,
                NFT: addrValue,
                price: 0.05,
                validAddress: validAddress,
                result:result
            })
        }
        catch {
            console.log("Something went worng")
            setDoPurchase(null)
        }
    }

    return   (
        <>
            <section>
                <div className="relative pt-4 px-4 sm:px-6 lg:px-6">
                    <nav className="relative" aria-label="Global">
                        { address ?
                            <div className="text-xl font-light text-true-gray-500 antialiased pb-3">
                                <Button
                                    onClick={SetOwnAddress}
                                    className="text-white bg-teal-600 hover:bg-teal-700">
                                    Preview your own address. Is on SALE!
                                </Button>
                                
                            </div>  
                            :
                            <div className="text-xl font-bold text-true-gray-500 antialiased p-6">
                                Connect your wallet to buy NFTs
                            </div>                      
                        }
                        <div className="">
                            <div className="font-light text-true-gray-500 antialiased">
                                Type any address to preview: <span>&nbsp;&nbsp;</span>
                            </div>
                            <div className="text-xl font-light text-true-gray-500 antialiased">
                            <input className="placeholder:italic placeholder:text-gray-400 block w-full border 
                                border-gray-300 rounded-md py-2 pl-1 pr-3 shadow-sm focus:outline-none
                                focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                                    placeholder="Enter an address..." type="text" size="48" name="addrValue"
                                    onChange={updateInput}
                                    value={addrValue || ""}/>
                            </div>
                            <div className="flex justify-between">
                                <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
                                    <Button
                                        onClick={SetAddress}
                                        className="text-white bg-indigo-600 hover:bg-indigo-700">
                                        {'\u00A0\u00A0\u00A0\u00A0\u00A0'}Preview{'\u00A0\u00A0\u00A0\u00A0\u00A0'}
                                    </Button>
                                </div>
                                <span>&nbsp;&nbsp;</span>
                                <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
                                    {
                                        network.isSupported  && account.data && //connected to wallet in right network
                                        !alreadySold.isLoading && alreadySold.isSold && 
                                        <Button
                                            disabled={true}                               
                                            className="text-white bg-yellow-800 hover:bg-yellow-800">
                                            Already Sold!
                                        </Button>
                                    }
                                    { validAddress.address  && network.isSupported  && !alreadySold.isLoading
                                        && !alreadySold.isSold && account.data && !addrChanged && addrValue != address &&
                                        <Button
                                            onClick={PurchaseAddress}                                
                                            className="text-white bg-green-600 hover:bg-green-700">
                                            Buy NFT (25 Matic)
                                        </Button>
                                    } 
                                    { validAddress.address  && network.isSupported  && !alreadySold.isLoading
                                        && !alreadySold.isSold && account.data && !addrChanged && addrValue == address &&
                                        <Button
                                            onClick={PurchaseOwn}                                
                                            className="text-white bg-green-600 hover:bg-green-700">
                                            Buy NFT (5 Matic)
                                        </Button>
                                    }   
                                </div>
                            </div>
                            
                        </div>
                        
                        { validAddress.address &&
                            <div className="mt-1 text-lg font-light text-true-gray-500 antialiased pb-3">
                                <strong>Name:</strong> {validAddress.name} <br />
                                <strong>Description:</strong><span className="text-base font-light"> {validAddress.description} </span> <br />                                
                                <strong>DNA:</strong> 
                                <span className="text-base font-light"> [
                                    {("0"+validAddress.body.toString(16)).slice (-2).toUpperCase()}: 
                                    {("0"+validAddress.hair.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+validAddress.pet.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+validAddress.beard.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+validAddress.face.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+validAddress.anim.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+validAddress.back.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+validAddress.ear.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+validAddress.head.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+validAddress.effect.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+validAddress.left.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+validAddress.horns.toString(16)).slice (-2).toUpperCase()}:
                                    {("0"+validAddress.right.toString(16)).slice (-2).toUpperCase()}:                                    
                                    {("0"+validAddress.glasses.toString(16)).slice (-2).toUpperCase()}                                                                
                                ]</span>
                                  <br />
                                  <strong>Level:</strong> {RARITY[validAddress.level]} <strong>Rarity score:</strong> {validAddress.rarity} <br />
                                <strong>Genotypes:</strong> 
                                <span className="text-base font-light"> [Horns: {HORNS[validAddress.horns]}] [Glasses: {GLASSES[validAddress.glasses]}] <br />
                                [Pet: {PETS[validAddress.pet]}] [Effect: {EFFECTS[validAddress.effect]}] [Animation: {ANIMATION[validAddress.anim]}]
                                </span> 
                            </div>
                        }
                    </nav>
                </div>
            </section>
            {
                doPurchase &&
                <OrderModal
                    purchase={doPurchase}
                />
            }
            {
                isError &&
                <ErrorModal
                    isError={isError}
                />
            }
        </>
    )

}
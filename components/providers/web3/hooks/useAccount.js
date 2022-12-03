
import { useEffect } from "react"
import useSWR from "swr"

const adminAddress = {
    "0x1a9b7bc475dd836af52f3dac44925c502ae17d5bfc27f8f392051a9329fead3c": true
}

export const handler = (web3, provider) => () => {

    const { data, mutate, ...rest } = useSWR(() => 
        web3?  "web3/accounts" : null , 
        async () => {
            const accounts = await web3.eth.getAccounts()
            return accounts[0]
        }
    )
    

    useEffect (() => { 
        provider &&
        provider.on("accountsChanged", 
            accounts => mutate(accounts[0] ?? null)
        )
    }, [provider])

    return { 
            data,
            isAdmin: (data && adminAddress[web3.utils.keccak256(data)]) ?? false,
            mutate, 
            ...rest 
    }
}
import { handler as createAccountHook } from "./useAccount"
import { handler as createNetworkHook } from "./useNetwork"
import { handler as createOwnedNFTsHook } from "./useOwnedNFTs"

export const setupHooks = ({web3, provider, contract}) => {
    
    return {
        useAccount: createAccountHook(web3, provider),
        useNetwork: createNetworkHook(web3, provider),
        useOwnedNFTs: createOwnedNFTsHook(web3, contract)
    }
}
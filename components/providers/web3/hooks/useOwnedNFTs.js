import useSWR from "swr"


export const handler = (web3, contract) => (account) => {
    const swrRes = useSWR(() =>
        (web3 && contract && account) ? "web3/ownedNFTs" : null,
        async () => {
            const ownedNFTs = await contract.contract.methods.tokensByOwner(account).call()
            console.log(ownedNFTs)
            return ownedNFTs
        }
    )
    return swrRes
}
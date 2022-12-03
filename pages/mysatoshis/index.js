
import { getAllCourses } from "@content/courses/fetcher"

import { NFTCard, NFTList } from "@components/ui/NFT"

import { BaseLayout } from "@components/ui/layout"
import { WalletBar } from "@components/ui/web3"
import { MySatoshisHeader } from "@components/ui/common"
import { useOwnedNFTs, useWalletInfo } from "@components/hooks/web3"
import { useWeb3 } from "@components/providers"
import { useState } from "react"

export default function MySatoshis({courses}) {
  
  
  const {account, network, canPurchase} = useWalletInfo()
  const { web3, contract } = useWeb3();

  const [NFTListValues, setNFTListValues] = useState(null);

  const {ownedNFTs} = useOwnedNFTs(account.data)

    return (
    
      <>
          {ownedNFTs.data}
            {account.data &&
            <div className="py-2">
                <WalletBar 
                    address={account.data}
                    network={ {
                      data: network.data,
                      targetNetwork: network.target,
                      isSupported : network.isSupported,
                      hasInitialResponse: network.hasInitialResponse
                    }}                    
                />
            </div>
          }
          <MySatoshisHeader />

          <NFTList 
            NFTListValues = {ownedNFTs.data}>
            { (NFTv) => 
                <NFTCard 
                    key={NFTv} 
                    NFT = {NFTv}
                /> }
            </NFTList>
      </>
  )
}

MySatoshis.Layout = BaseLayout
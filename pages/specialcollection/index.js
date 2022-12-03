

import { CourseCard, CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"
import { WalletBar } from "@components/ui/web3"
import { useAccount, useNetwork } from "@components/hooks/web3"

export default function SpecialCollection({courses}) {
    const {account} = useAccount()
    const {network} = useNetwork()

    return (
    
      <>
            <div className="py-4">
                <WalletBar 
                    address={account.data}
                    network={ {
                      data: network.data,
                      targetNetwork: network.target,
                      isSupported : network.isSupported
                    }}
                    
                />
            </div>
           Hello Special Collection
      </>
  )
}


SpecialCollection.Layout = BaseLayout
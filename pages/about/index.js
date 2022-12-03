

import { CourseCard, CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"
import { WalletBar } from "@components/ui/web3"
import { useAccount, useNetwork } from "@components/hooks/web3"

export default function About({courses}) {
    const {account} = useAccount()
    const {network} = useNetwork()

    return (
    
      <>
            
           About
      </>
  )
}


About.Layout = BaseLayout
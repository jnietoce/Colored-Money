
import { useWeb3 } from "@components/providers"
import Link from "next/link"
import { Button, ErrorModal } from "@components/ui/common"
import { useAccount } from "@components/hooks/web3"
import { useRouter } from "next/router"
import { useState } from "react"

export default function Navbar() {
    const { connect, isLoading, requireInstall} = useWeb3()
    const { account } = useAccount()
    const { pathname } = useRouter()

    const[isError, setIsError] = useState(null)

    function SpecialCollectionClick(){
      setIsError({
        address: "",
        title: "Special Collection",
        errorMessage: "The Special Collection is not available yet. Please come later."
      })
    }

    return (
      <>
        <section>
            <div className="relative pt-2 px-4 sm:px-6 lg:px-8">
              <nav className="relative" aria-label="Global">
                <div className="flex justify-between items-center">
                  <div>
                    <Link href="/">
                      <a 
                        className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                        Home
                      </a>
                    </Link>
                    { account.data &&
                    <Link href={"https://opensea.io/"+account.data+"?search[sortBy]=LISTING_DATE&search[query]=My Own Satoshi"}>
                      <a target="_blank"
                        className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                        My Satoshis
                      </a>
                    </Link>
                    }
                    {/*
                    <Link href="/specialcollection">
                      <a 
                        className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                        Special Collection 
                      </a>
                    </Link>
                    */}
                    <Link href="#About">
                      <a 
                        className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                        About
                      </a>
                    </Link>
                    <Link href="#FAQ">
                      <a 
                        className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                        FAQ
                      </a>
                    </Link>
                  </div>
                  <div>
                    <Link href="https://opensea.io/assets/my-own-satoshi?search[numericTraits][0][name]=level&search[numericTraits][0][ranges][0][min]=8&search[numericTraits][0][ranges][0][max]=8">
                      <a target="_blank"
                        className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                        Special Collection
                      </a>
                    </Link>
                                        
                    {
                      isLoading ?
                        <Button
                          disabled={true}
                          onClick={connect}
                          className="text-white bg-indigo-600 hover:bg-indigo-700">
                            Loading...
                        </Button> : 

                       account.data ?
                       <Button 
                          hoverable={false}
                          className="cursor-default">
                            Connected
                        </Button>
                       :
                       requireInstall ? 
                       <Button 
                        onClick={() => window.open("https://metamask.io/download.html", "_blank")}
                        className="px-8 py-3 border rounded-md text-base font-medium text-white bg-yellow-600 hover:bg-yellow-700">
                          Install Metamask
                        </Button>
                      :
                        <Button
                        onClick={connect}
                        className="text-white bg-indigo-600 hover:bg-indigo-700">
                          Connect Wallet
                      </Button>
                      
                    }
                  </div>
                </div>
              </nav>
            </div>
            {
              // account.data && 
              // !pathname.includes("/marketplace") &&
              // <div className="flex justify-end pt-1 sm:px-6 lg:px-8">
              //   <div className="text-white bg-indigo-600 rounded-md p-2">
              //     {account.data}
              //   </div>
              // </div>
            }
          </section>
          {
            isError &&
            <ErrorModal
                isError={isError}
            />
          }
      </>
    )
}
import { useWeb3 } from "@components/providers"


export default function Address({address, network}) {
    const { requireInstall } = useWeb3()
    return (
        <section className="text-white bg-indigo-600 rounded-lg ">
            <div className="p-3">            
            <div className="flex justify-between items-center">
                <h1 className="text-2">Hello, {address}</h1>                
                <div>
                { network.hasInitialResponse && !network.isSupported && 
                    <div className="bg-red-400 p-4 rounded-lg">
                        <div>Connected to the wrong network</div>
                        <div>
                            Connect to: {` `}
                            <strong className="text-2xl">
                                {network.targetNetwork}
                            </strong>
                        </div>
                    </div>
                }
                {
                    requireInstall &&
                    <div className="bg-yellow-500 p-4 rounded-lg">
                       Cannot connect to network. Please install Metamas.
                    </div>
                }
                { network.data &&
                    <div>
                        <span>Currently on </span>
                        <strong className="text-2xl">{network.data}</strong>
                    </div>
                }
                </div>
            </div>
            </div>
        </section>
    )
}
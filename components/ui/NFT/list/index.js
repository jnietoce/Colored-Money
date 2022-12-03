
import { Children } from "react/cjs/react.production.min"
import { NFTCard } from "@components/ui/NFT"


export default function NFTList({NFTListValues, children}) {
    
    return (
        <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
            { NFTListValues && NFTListValues.map(NFT => children(NFT) )}
        </section>
    )
}
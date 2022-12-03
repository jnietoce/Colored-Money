import Image from "next/image"
import Link from "next/link"

export default function NFTCard({NFT}) {

    return (

        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-2xl">
            <div className="flex h-full">
            <div className="flex h-full">
                
            </div>
            <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {NFT}
                </div>
                <Link href={`/courses/${NFT}`}>
                    <a 
                        className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                        {NFT}
                    </a>
                </Link>
                <p className="mt-2 text-gray-500">
                    {NFT}
                    </p>
            </div>
            </div>
        </div>

    )
}
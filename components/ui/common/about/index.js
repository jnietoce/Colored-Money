





export default function About() {

    return (
        <section className="lg:2/6 text-left mt-8">
            <a id="About"></a>
            <div className="text-3xl font-bold text-gray-900 leading-none">What is My Own Satoshi?</div>
            <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
            The collection of NFTs my own satoshi creates a unique representation of Satoshi 
            for each 'Wallet Address'. As a collector, you can purchase any Satoshi at the price of 25 
            MATIC, <span className="text-indigo-600 "><strong>but the Satoshi associated with your Wallet only costs 
                5 MATIC! Enjoy the offer!!</strong></span>
            </div>
            <section className="border-emerald-600 bg-emerald-100 border-4 rounded-lg p-4 mt-4 shadow-md">
            <div className="text-base text-center font-light text-true-gray-500 antialiased">
            <strong>Each satoshi is created by combining thousands of different elements generating an infinity of unique characters.
            These combinations make up the Satoshi's DNA, which determines its level, rarity, and genotypes.</strong>
            </div>
            </section>

            <div className="mt-4 text-2xl font-bold text-gray-900 leading-none">What is the DNA?</div>
            <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
            DNA is the 14 elements that represent the unique combination that make up your Satoshi. 
            The DNA also determines the level of the Satoshi, its rarity and the 5 genotypes it can have. 
            </div>

            <div className="mt-4 text-xl font-bold text-gray-900 leading-none">Level types</div>
            <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
            Some elements that can make up your Satoshi can generate a specific genotype. 
            Some genotypes are rarer than others. Depending on them, your Satoshi may belong to 
            one of the eight levels that exist. 
                <div className="grid grid-cols-1 divide-y mt-4">
                    <div></div>
                    <div className="flex flex-row items-center">
                        <div className="basis-1/4 my-2"><img src="/images/1common.png" /></div>
                        <div className="basis-3/4 ml-3">It has no genotypes at all. The most common Satoshi in the metaverse</div>                
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="basis-1/4 my-2"><img src="/images/2uncommon.png" /></div>
                        <div className="basis-3/4 ml-3">At least the Sathoshi has 1 genotype. One in 10 Satoshis is Uncommon</div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="basis-1/4 my-2"><img src="/images/3rare.png" /></div>
                        <div className="basis-3/4 ml-3">At least the Sathoshi has 2 genotypes. One in 80 Satoshis is Rare</div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="basis-1/4 my-2"><img src="/images/4epic.png" /></div>
                        <div className="basis-3/4 ml-3">At least the Sathoshi has 3 genotypes. One in 2000 Satoshis is Epic</div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="basis-1/4 my-2"><img src="/images/5legendary.png" /></div>
                        <div className="basis-3/4 ml-3">At least the Sathoshi has 4 genotypes. One in 75000 Satoshis is Legendary</div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="basis-1/4 my-2"><img src="/images/6mythic.png" /></div>
                        <div className="basis-3/4 ml-3">The Sathoshi has the 5 genotypes with the 'walk' anim. Only 1 in 4 millions Satoshis is Mythic</div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="basis-1/4 my-2"><img src="/images/7utopic.png" /></div>
                        <div className="basis-3/4 ml-3">The Sathoshi has the 5 genotypes with the 'run' anim. Only 1 in 40 millions Satoshis is Utopic</div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="basis-1/4 my-2"><img src="/images/8invaluable.png" /></div>
                        <div className="basis-3/4 ml-3">All Invaluable Satoshis are part of the Special Collection. They are carefully created by the 'architect' and sold apart.</div>
                    </div>
                    <div></div>
                </div>
            </div>

            <div className="mt-4 text-xl font-bold text-gray-900 leading-none">Rarity Score</div>
            <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
            The rarity Score is a measure of how rare how rare your Soatoshi is. 
            It is calculated using the rarity of the genotypes and components of the Satoshi DNA. 
            Generally speaking, the higher the score, the rarer it is. 
            </div>

            <div className="mt-4 text-xl font-bold text-gray-900 leading-none">About Genotypes</div>
            <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
            Some special combinations of DNA can generate differential genotypes in your Satoshi. 
            Specifically, there are five types of genotypes. 
            <div className="grid grid-cols-1 divide-y mt-4">
                    <div></div>
                    <div className="flex flex-row items-center">
                        <div className="basis-1/4 text-right text-cyan-700 my-2 font-bold text-2xl">HORNS</div>
                        <div className="basis-3/4 ml-3">It is one of the most common genotypes. There are 17 types of horns and 1 in 13 Satoshis has it</div>                
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="basis-1/4 text-right text-cyan-700 my-2 font-bold text-2xl">GLASSES</div>
                        <div className="basis-3/4 ml-3">It is a less common genotype, only 1 in 23 Satoshis wear glasses. 
                        There are 4 different types of of glasses</div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="basis-1/4 text-right text-cyan-700 my-2 font-bold text-2xl">PET</div>
                        <div className="basis-3/4 ml-3">Some Satoshis are lucky enough to come with a pet. 
                        There are 21 different pets</div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="basis-1/4 text-right text-cyan-700 my-2 font-bold text-2xl">EFFECT</div>
                        <div className="basis-3/4 ml-3">Sometimes a hypnotic effect envelops our Satoshi. 
                        There are four kinds of effects, snowflakes, leaves, petals and flies</div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="basis-1/4 text-right text-cyan-700 my-2 font-bold text-2xl">ANIMATION</div>
                        <div className="basis-3/4 ml-3">The animations contain both the most common and the rarest genotypes. 
                        Most of Satoshis are idle, 1 in 7 Satoshis walks but only 1 in 70 runs</div>
                    </div>
                    <div></div>
                </div>
            </div>
            <a id="FAQ"></a>
            <div className="text-3xl font-bold text-gray-900 leading-none mt-8">Frequently Answered Questions</div>
            <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
            Here we answer some of the most frequently asked questions. If you cannot find your 
            answer, please write to us at <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="mailto:jjnieto@gmail.com">jjnieto@gmail.com</a> and we will answer as soon as possible.
            </div>
            <div className="mt-4 text-2xl font-bold text-gray-900 leading-none">In what network do Satoshis live?</div>
            <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
            All Satoshis have been created on the <strong>Polygon/Matic</strong> network. Transaction fees are 
            dramatically cheaper and transfer speeds much faster. </div>

            <div className="mt-4 text-2xl font-bold text-gray-900 leading-none">How do I get MATIC?</div>
            <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
            <strong>IMPORTANT:</strong> To purchases Satoshis you will need to own Matic in the Polygon network. 
            You can buy Matic, directly on the Polygon network using 
            various exchanges, for example <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" target="_blank" href="https://transak.com/">Transak.com</a>
            </div>

            <div className="mt-4 text-2xl font-bold text-gray-900 leading-none">How do I connect Metalmask to Polygon?</div>
            <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
            To connect your Metamask to the Polygon network you can 
            follow this tutorial: <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" target="_blank" href="https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask">Connect Metamask to Polygon</a>
            </div>

            <div className="mt-4 text-2xl font-bold text-gray-900 leading-none">How to buy Satoshis?</div>
            <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
            The easiest and most direct way is through this website. In it you can make a preview 
            of the Satoshi by entering different addresses. Remember that the address of your 
            wallet has an incredible offer !! Once chosen you can proceed to buy it by pressing the 
            buy button and signing the transaction in metamask.
            Another option is to enter a market like OpenSea, Rarible or 
            another and see how many Satoshis are for sale, choose the one you like the most and buy it. 
            </div>

            <div className="mt-4 text-2xl font-bold text-gray-900 leading-none">I have gone to buy my address but it appears as 'Sold' </div>
            <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
            As we have explained before, anyone can buy any address. There is a great offer if you buy the 
            address from which you make the payment, but nothing prevents you from buying any other address... by the way, have 
            you tried to buy the <a target="_blank" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="https://etherscan.io/accounts">addresses with the most ethers on the blockchain</a > ;)?             
            </div>

            <div className="mt-4 text-2xl font-bold text-gray-900 leading-none">I have bought my Satoshi but I do not see the image or video in OpenSea</div>
            <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
            Relax, the Satoshi is yours for life! What happens is that for each purchase we 
            have to generate the associated image and video and that takes a few 
            hours. We are currently generating all images and videos twice a day. In any case,
             you can always view your complete NFT on our website by typing the address.
            </div>

            <div className="mt-4 text-2xl font-bold text-gray-900 leading-none">I want to sell my Satoshi. Is there a royalty associated with it?</div>
            <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
            Each Satoshi has a 5% royalty that is given to the creators to finance the project.
            </div>

            <div className="mt-4 text-2xl font-bold text-gray-900 leading-none">What is the 'Special Collection'?</div>
            <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
            The 'Special Collection' are Satoshis carefully created by the 'architect' and sold apart. They present very special 
            characteristics and cannot be minted by traditional ways.
            </div>
            <div className="mt-4 text-2xl font-bold text-gray-900 leading-none">Where can I see and buy 'Special Collection' Satoshis?</div>
            <div className="mt-1 text-xl font-light text-true-gray-500 antialiased">
            You cann't by the moment. They will come soon.
            </div>

            <div className="mt-2 flex lg:justify-start"> </div>
        </section>
    )
}
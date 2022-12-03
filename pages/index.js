
import { Hero, WebGL, About } from "@components/ui/common"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"
import { WalletBar } from "@components/ui/web3"

import { useAccount, useNetwork } from "@components/hooks/web3"

import {React, useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";


const unityContext = new UnityContext({
  loaderUrl: "Build/deploy.loader.js",
  dataUrl: "Build/deploy.data",
  frameworkUrl: "Build/deploy.framework.js",
  codeUrl: "Build/deploy.wasm",
});

export default function Home({courses}) {
  const {account} = useAccount()
  const {network} = useNetwork()

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(function () {
    console.log('Unity load start');
    unityContext.on("loaded", function () {
      setIsLoaded(true);
    });
    unityContext.on("debug", function (message) {
      console.log(message);
    });
  }, []);


  const [validAddress, setValidAddress] = useState({
    address:false,
    rarity:0,
    horns:0,
    pet: 0,
    effect: 0,
    grasses:0,
    anim: 0,
    body: 0,
    hair: 0, 
    beard: 0, 
    face: 0, 
    back: 0, 
    ear: 0, 
    head: 0, 
    left: 0, 
    right: 0,
    name: "",
    description: ""
  });

  useEffect(function () {
    unityContext.on("ValidAddress", function (isValid, level, rarity, horns, pet, effect, glasses, anim,
                          body, hair, beard, face, back, ear, head, left, right, name, description) {
      setValidAddress({
        address:isValid!=0,
        level: level,
        rarity:rarity,
        horns:horns,
        pet: pet,
        effect: effect,
        glasses: glasses,
        anim: anim,
        body: body,
        hair: hair, 
        beard: beard, 
        face: face, 
        back: back, 
        ear: ear, 
        head: head, 
        left: left, 
        right: right,
        name: name,
        description: description
      });
    });
  }, []);


  const [progression, setProgression] = useState(0);

  useEffect(function () {
    unityContext.on("progress", function (progression) {
      setProgression(progression*100);
    });
  }, []);

  const isMobile=false;

  if (typeof window !== "undefined") {
    isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
  }

  if(isMobile){
    return <div className="text-3xl font-bold text-gray-900 leading-none"><br /><br /><br /><br />Sorry, this website is only available on desktop devices.</div>
  }
  else 
  {
    return (
      
        <>
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
              <Hero />
              
              
              <div className="h-96">
                { progression<100 && 

                    <div className="absolute z-10 w-[48rem] overflow-y-auto pt-44 pl-20">
                    
                        <div className="w-full bg-indigo-200 rounded-full align-middle">
                          <div className="bg-indigo-600 text-xs font-medium text-indigo-100 text-center p-0.5 leading-none rounded-l-full" style={{width: progression+"%"}}> Loading ...</div>
                        </div>
                    
                    </div>


                
                }
                <div className="flex justify-between">

                  <Unity unityContext={unityContext} style={{ width: "400px", height: "400px" }}/>
                  
                  {isLoaded && 
                    <WebGL 
                      address={account.data}
                      unityContext={unityContext}
                      validAddress={validAddress}
                    />              
                  }
                </div>
              </div>
              <About />
              <div className="py-2"></div>
        </>
    )
  }
}

export function getStaticProps() {
  const {data} = getAllCourses()
  return {
    props: {
      courses: data
    } 
  }
}

Home.Layout = BaseLayout
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{78581:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(53678)}])},53678:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return c},default:function(){return f}});var s=n(85893),a=n(44833),d=n(64180),r=n(58070),o=n(62445),i=n(67294),l=n(38914),u=new l.LI({loaderUrl:"Build/deploy.loader.js",dataUrl:"Build/deploy.data",frameworkUrl:"Build/deploy.framework.js",codeUrl:"Build/deploy.wasm"}),c=!0;function f(e){e.courses;var t=(0,o.mA)().account,n=(0,o.LN)().network,d=(0,i.useState)(!1),c=d[0],f=d[1];(0,i.useEffect)((function(){console.log("Unity load start"),u.on("loaded",(function(){f(!0)})),u.on("debug",(function(e){console.log(e)}))}),[]);var p=(0,i.useState)({address:!1,rarity:0,horns:0,pet:0,effect:0,grasses:0}),h=p[0],x=p[1];(0,i.useEffect)((function(){u.on("ValidAddress",(function(e,t,n,s,a,d,r,o,i,l,u,c,f,p,h,g,w){x({address:0!=e,level:t,rarity:n,horns:s,pet:a,effect:d,glasses:r,anim:o,body:i,hair:l,beard:u,face:c,back:f,ear:p,head:h,left:g,right:w})}))}),[]);var g=(0,i.useState)(0),w=g[0],y=g[1];return(0,i.useEffect)((function(){u.on("progress",(function(e){y(100*e)}))}),[]),(0,s.jsxs)(s.Fragment,{children:[t.data&&(0,s.jsx)("div",{className:"py-2",children:(0,s.jsx)(r.Y,{address:t.data,network:{data:n.data,targetNetwork:n.target,isSupported:n.isSupported,hasInitialResponse:n.hasInitialResponse}})}),(0,s.jsx)(a.VM,{}),w<100&&(0,s.jsx)("div",{className:"w-full bg-indigo-200 rounded-full",children:(0,s.jsx)("div",{className:"bg-indigo-600 text-xs font-medium text-indigo-100 text-center p-0.5 leading-none rounded-l-full",style:{width:w+"%"},children:" Loading ..."})}),(0,s.jsxs)("div",{className:"flex justify-between",children:[(0,s.jsx)(l.ZP,{unityContext:u,style:{width:"400px",height:"400px"}}),c&&(0,s.jsx)(a.XY,{address:t.data,unityContext:u,validAddress:h})]}),(0,s.jsx)("div",{className:"py-2"})]})}f.Layout=d.I}},function(e){e.O(0,[482,729,914,55,774,888,179],(function(){return t=78581,e(e.s=t);var t}));var t=e.O();_N_E=t}]);
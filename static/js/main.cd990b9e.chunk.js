(this.webpackJsonpcosmverse=this.webpackJsonpcosmverse||[]).push([[0],{259:function(e,t){},406:function(e,t){},410:function(e,t){},412:function(e,t){},422:function(e,t){},424:function(e,t){},470:function(e,t){},475:function(e,t){},477:function(e,t){},484:function(e,t){},503:function(e,t){},686:function(e,t,n){},687:function(e,t,n){"use strict";n.r(t);var c=n(1);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var r=n(43),i=n(37),a=n(746),o=n(6),s=n.n(o),u=n(19),l=n(5),h=n(710),f=(n(748),n(712)),d=(n(721),n(720),n(745),n(729),n(730),n(35)),b=n(156),j=n(110);function g(e,t){return p.apply(this,arguments)}function p(){return(p=Object(u.a)(s.a.mark((function e(t,n){var c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=Object(d.a)(Object(d.a)({},j.defaultGasLimits),{},{upload:15e5,init:6e5,exec:4e5,migrate:6e5,send:8e4,changeAdmin:8e4}),e.abrupt("return",b.SigningCosmWasmClient.connectWithSigner(t.rpcUrl,n,{prefix:t.addressPrefix,gasPrice:j.GasPrice.fromString("".concat(t.gasPrice).concat(t.token.coinMinimalDenom)),gasLimits:c}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(e){return b.CosmWasmClient.connect(e.rpcUrl)}var x=n(2);function O(){throw new Error("Not yet initialized")}var v={initialized:!1,init:O,clear:O,config:{},client:void 0,changeConfig:O,address:"",balance:[],refreshBalance:O,getSigner:function(){},changeSigner:O,getSignClient:function(){}},w=c.createContext(v);function k(e){var t=e.config,n=e.children,r=Object(c.useState)(t),i=Object(l.a)(r,2),a=i[0],o=i[1],h=Object(c.useState)(),f=Object(l.a)(h,2),b=f[0],j=f[1],p=Object(c.useState)(),O=Object(l.a)(p,2),k=O[0],C=O[1],S=Object(c.useState)(),y=Object(l.a)(S,2),D=y[0],E=y[1],P=Object(c.useMemo)((function(){return Object(d.a)(Object(d.a)({},v),{},{init:j})}),[]),T=Object(c.useState)(P),I=Object(l.a)(T,2),_=I[0],z=I[1],U=Object(c.useCallback)((function(){z(Object(d.a)({},P)),C(void 0),j(void 0),o(t)}),[P,t]);function W(e){o((function(t){return Object(d.a)(Object(d.a)({},t),e)}))}var A=Object(c.useCallback)(function(){var e=Object(u.a)(s.a.mark((function e(t,n){var c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(k){e.next=2;break}return e.abrupt("return");case 2:return n.length=0,e.next=5,k.getBalance(t,a.token.coinMinimalDenom);case 5:(c=e.sent)&&n.push(c);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),[k,a]);return Object(c.useEffect)((function(){!function(){var e=Object(u.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m(a);case 2:t=e.sent,C(t),z(Object(d.a)(Object(d.a)({},P),{},{client:t}));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[P,a]),Object(c.useEffect)((function(){b&&function(){var e=Object(u.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g(a,b);case 2:t=e.sent,E(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[b,a]),Object(c.useEffect)((function(){if(b&&k&&D){var e=[];!function(){var t=Object(u.a)(s.a.mark((function t(){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.getAccounts();case 2:return n=t.sent[0].address,t.next=5,A(n,e);case 5:z({initialized:!0,init:function(){},clear:U,config:a,client:k,changeConfig:W,address:n,balance:e,refreshBalance:A.bind(null,n,e),getSigner:function(){return b},changeSigner:j,getSignClient:function(){return D}});case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()()}}),[D,b,U,k,a,A]),Object(x.jsx)(w.Provider,{value:_,children:n})}n(150);n.p,n.p;var C=function(e){var t=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_NETWORK;if(!t)return e.testnet;var n=e[t];if(!n)throw new Error("No configuration found for network ".concat(t));return n}({local:{chainId:"testing",chainName:"Testing",addressPrefix:"juno",rpcUrl:"http://localhost:26657",httpUrl:"http://localhost:1317",token:{coinDenom:"STAKE",coinDecimals:6,coinMinimalDenom:"ustake"},gasPrice:.025,codeId:4,contract:"",marketContract:""},testnet:{chainId:"lucina",chainName:"Juno Tesnet",addressPrefix:"juno",rpcUrl:"https://rpc.juno.giansalex.dev",httpUrl:"https://lcd.juno.giansalex.dev",token:{coinDenom:"JUNO",coinDecimals:6,coinMinimalDenom:"ujuno"},gasPrice:.025,codeId:4,contract:"juno1gnc0533drmdq2u9d70z0fyr9jg74dd2av9gtxw",marketContract:"juno16te3h0x8gnwhlunhh383j2jqsv4q556x22gtj0"}});n(707),n(689),n(378);var S=n(381),y=(n(711),n(370),n(713),n(23));n(741),n(719),n(368),n.p;n(224);var D=n(690);n(379);n(722);var E=n(52),P=function(e){var t=e.children,n=e.label,c=e.href,r=e.width,i=e.height,a=e.backgroundColor;return Object(x.jsxs)(y.a.button,{bg:Object(S.d)(a,"whiteAlpha.100"),rounded:"full",w:r,h:i,cursor:"pointer",as:"a",href:c,display:"inline-flex",alignItems:"center",justifyContent:"center",transition:"background 0.3s ease",_hover:{bg:Object(S.d)("cyan.900","cyan.900")},children:[Object(x.jsx)(D.a,{children:n}),t]})};n(723),n(709);n(724),n(727),n(725),n(726);var T=n.p+"static/media/cosmverse_logo.ea450a56.svg";n(728),n.p;n(731);n(732);n(733);n(743),n(742),n(734),n(129),n(744),n(735),n(736),n(737),n(738),n(20);n(686);var I=n.p+"static/media/background-home2.b42b0cf7.jpg",_=function(){return Object(x.jsx)(c.Fragment,{children:Object(x.jsxs)(f.a,{flexDirection:"column",alignItems:["flex-end","center"],children:[Object(x.jsx)(h.a,{w:"100vw",h:"100vh",backgroundImage:I,zIndex:"-1",position:"relative",backgroundSize:"cover"}),Object(x.jsx)(h.a,{w:"150px",h:"150px",backgroundImage:T,zIndex:"1",position:"absolute",top:"0vh",alignSelf:["center","center","flex-end","flex-end"],backgroundSize:"cover"}),Object(x.jsxs)(f.a,{flexDirection:["column","row"],zIndex:"1",position:"absolute",bottom:["25vh","10vh"],children:[Object(x.jsx)(P,{label:"Twitter",href:"https://twitter.com/Cosmverse",width:"40px",height:"40px",backgroundColor:"white",children:Object(x.jsx)(E.g,{})}),Object(x.jsx)(P,{label:"Medium",href:"https://medium.com/@Cosmverse",width:"40px",height:"40px",backgroundColor:"white",children:Object(x.jsx)(E.c,{})}),Object(x.jsx)(P,{label:"Telegram",href:"https://t.me/cosmverse_official",width:"40px",height:"40px",backgroundColor:"white",children:Object(x.jsx)(E.f,{})}),Object(x.jsx)(P,{label:"Github",href:"https://github.com/CosmosContracts/cosmverse",width:"40px",height:"40px",backgroundColor:"white",children:Object(x.jsx)(E.b,{})}),Object(x.jsx)(P,{label:"Discord",href:"https://discord.com/invite/b9wgpfzGx4",width:"40px",height:"40px",backgroundColor:"white",children:Object(x.jsx)(E.a,{})})]})]})})},z=n(739),U=n(168),W=Object(z.a)({breakpoins:{sm:"30em",md:"48em",lg:"62em",xl:"80em","2xl":"96em"},colors:{pink:{500:"#93ffe9"}},styles:{global:function(e){return{body:{overflow:"hidden",fontFamily:"body",bg:Object(U.a)("white.200","cyan.900")(e)}}}}}),A=function(){return Object(x.jsx)(a.a,{theme:W,children:Object(x.jsx)(k,{config:C,children:Object(x.jsxs)(r.a,{children:[Object(x.jsx)(i.b,{component:function(){return Object(x.jsx)(i.a,{to:"/"})}}),Object(x.jsx)(i.b,{exact:!0,path:"/",component:_})]})})})},F=n(740),N=n(82),B=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,749)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),i(e),a(e)}))};n.n(N).a.render(Object(x.jsxs)(c.StrictMode,{children:[Object(x.jsx)(F.a,{}),Object(x.jsx)(A,{})]}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)})),B()}},[[687,1,2]]]);
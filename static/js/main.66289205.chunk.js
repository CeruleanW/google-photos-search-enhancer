(this["webpackJsonpsearch-chinese-in-google-photos"]=this["webpackJsonpsearch-chinese-in-google-photos"]||[]).push([[0],{60:function(e){e.exports=JSON.parse('{"a":{"client_id":"1021859068960-64oa03fggpfb22tau6tatqir94ft44vt.apps.googleusercontent.com","project_id":"search-chinese-1595873063241","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs"}}')},66:function(e,t,n){e.exports=n.p+"static/media/icons8-search-500.b831ad50.png"},79:function(e,t,n){e.exports=n(91)},84:function(e,t,n){},91:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(12),c=n.n(o),i=(n(84),n(8)),l=r.a.createContext(),s=r.a.createContext();function u(){return Object(a.useContext)(l)}function d(){return Object(a.useContext)(s)}function m(e){var t=e.children,n=Object(a.useState)(""),o=Object(i.a)(n,2),c=o[0],u=o[1],d=Object(a.useState)(!1),m=Object(i.a)(d,2),p=m[0],g=m[1];return r.a.createElement(l.Provider,{value:{accessToken:c,isLogined:p}},r.a.createElement(s.Provider,{value:{handleAccessToken:function(e){u(e)},handleIsLogined:function(e){g(e)}}},t))}var p=n(136),g=r.a.createContext(),h=r.a.createContext();function f(){return Object(a.useContext)(g)}function b(){return Object(a.useContext)(h)}function v(e){var t=e.children,n=Object(a.useState)(!1),o=Object(i.a)(n,2),c=o[0],l=o[1],s=Object(a.useState)(""),u=Object(i.a)(s,2),d=u[0],m=u[1],p=Object(a.useState)(!1),f=Object(i.a)(p,2),b=f[0],v=f[1];return r.a.createElement(g.Provider,{value:{isBackdropOpened:c,textMessage:d,isSearching:b}},r.a.createElement(h.Provider,{value:{handleBackdrop:function(e){l(e)},handleTextMessage:function(e){m(e)},handleIsSearching:function(e){v(e)}}},t))}var E=n(58),y=n(127),x=n(39),j=n(126),O=Object(j.a)({footerLayout:{left:0,bottom:0,position:"absolute"},footerLink:{"&:visited":{color:"blueviolet"}}});function k(){var e=O();return r.a.createElement(E.a,{bottomThreshold:50,normalStyles:{backgroundColor:"#1b2024",padding:"1rem",color:"rgb(192 192 192)",font:"300 0.9rem 'Lora', serif"},stickyStyles:{backgroundColor:"rgba(255,255,255,.8)",padding:"1rem",font:"300 1rem 'Lora', serif"}},r.a.createElement(y.a,null,r.a.createElement(x.a,{align:"center"}," ","Copyright \xa9 2020 Developed with \u2764\ufe0f by",r.a.createElement("a",{className:e.footerLink,href:"https://github.com/CeruleanW"}," ","Yi Yang"))))}var w=r.a.createContext(),S=r.a.createContext();function C(){return Object(a.useContext)(w)}function I(){return Object(a.useContext)(S)}function T(e){var t=e.children,n=Object(a.useState)([]),o=Object(i.a)(n,2),c=o[0],l=o[1],s=Object(a.useState)([]),u=Object(i.a)(s,2),d=u[0],m=u[1];return r.a.createElement(w.Provider,{value:{photoUrls:c,searchedIds:d}},r.a.createElement(S.Provider,{value:{handlePhotoUrls:function(e){l(e)},handleSearchedIds:function(e){m(e)}}},t))}var P,L=n(6),N=n(17),U=n(29),B=n(137),D=n(63),F=n.n(D),G=n(64),_=n.n(G),M=n(130),A=n(149),W=n(48),z=n(60),H=n(13),R=n.n(H),q=n(18),J=n(67);function Y(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];e?localStorage.setItem("updateTime",new Date):localStorage.setItem("updateTime","")}function V(){return localStorage.getItem("updateTime")}function K(e){return $.apply(this,arguments)}function $(){return($=Object(q.a)(R.a.mark((function e(t){var n,a;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P;case 2:n=e.sent,a=n.transaction("localMediaItems","readwrite"),t.forEach((function(e){return new Promise((function(t,n){t(a.store.put(e))})).catch((function(e){console.log("Error: failed to store data in IndexedDB"+e)}))}));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Q(){return(Q=Object(q.a)(R.a.mark((function e(){var t;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P;case 2:return t=e.sent,e.abrupt("return",t.clear("localMediaItems"));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function X(){return(X=Object(q.a)(R.a.mark((function e(t){var n,a,r,o,c,i;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Keyword:"+t),e.next=3,P;case 3:return n=e.sent,a=n.transaction("localMediaItems").store,e.next=7,a.openCursor();case 7:r=e.sent,o=[];case 9:if(!r){e.next=18;break}return c=r.value.description,((i=r.value.filename)&&i.includes(t)||c&&c.includes(t))&&o.push(r.key),e.next=15,r.continue();case 15:r=e.sent,e.next=9;break;case 18:return e.abrupt("return",o);case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}P=Object(J.a)("db",1,{upgrade:function(e){e.createObjectStore("localMediaItems",{keyPath:"id",autoIncrement:!0})}}),Y();var Z=(new AbortController).signal,ee=function(e){var t={};return Object.assign(t,{"Content-Type":"application/json"}),Object.assign(t,{Authorization:"Bearer ".concat(e)}),{headers:t,mode:"no-cors",signal:Z}},te=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"POST",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{includeArchivedMedia:!0},r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:100,o=ee(e),c={filters:a,pageSize:r};return t&&Object.assign(c,{pageToken:t}),c=JSON.stringify(c),Object.assign(o,{method:n,mode:"cors",body:c}),o},ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"https://photoslibrary.googleapis.com/v1/mediaItems",t=arguments.length>1?arguments[1]:void 0,n=e;return t&&(n+="?"+re(t)),n},ae=function(e,t){return"".concat(e,"?access_token=").concat(t)},re=function(e){return Object.keys(e).map((function(t){return t+"="+e[t]})).join("&")};function oe(e){return ce.apply(this,arguments)}function ce(){return(ce=Object(q.a)(R.a.mark((function e(t){var n,a,r,o,c=arguments;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=c.length>1&&void 0!==c[1]?c[1]:"https://photoslibrary.googleapis.com/v1/mediaItems:search",a=c.length>2&&void 0!==c[2]?c[2]:"POST",e.next=4,ie(t,!1,n,a);case 4:o=e.sent,r=o.nextPageToken;case 6:return K(de(o)),r=o.nextPageToken,e.next=11,ie(t,r,n,a);case 11:o=e.sent;case 12:if(r){e.next=6;break}case 13:return Y(new Date),e.abrupt("return",V());case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ie(e){return le.apply(this,arguments)}function le(){return(le=Object(q.a)(R.a.mark((function e(t){var n,a,r,o,c,i=arguments;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=i.length>1&&void 0!==i[1]?i[1]:"",a=i.length>2&&void 0!==i[2]?i[2]:"https://photoslibrary.googleapis.com/v1/mediaItems:search",r=i.length>3&&void 0!==i[3]?i[3]:"GET",o=ne(a,{access_token:t}),c=te(t,n,r),e.abrupt("return",fetch(o,c).then((function(e){var t=e.json();return console.log("Fetching: "+t),t})).catch((function(e){console.log("Error: "+e)})));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function se(){return(se=Object(q.a)(R.a.mark((function e(t){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Y(new Date),e.abrupt("return",V());case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ue(){return(ue=Object(q.a)(R.a.mark((function e(t,n){var a,r,o;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.map((function(e){return"https://photoslibrary.googleapis.com/v1/mediaItems/".concat(e)})),r=a.map((function(e){return ae(e,n)})),o=r.map((function(e){return fetch(e).then((function(e){return e.json()}))})),e.next=5,Promise.all(o).then((function(e){return e.map((function(e){return{baseUrl:e.baseUrl,productUrl:e.productUrl}}))}));case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function de(e){return e.mediaItems.map((function(e){return{id:e.id,productUrl:e.productUrl,filename:e.filename,description:e.description}}))}var me=n(128),pe={clientID:z.a.client_id,projectId:"search-chinese-1595873063241",authUri:"https://accounts.google.com/o/oauth2/auth",tokenUri:"https://oauth2.googleapis.com/token",scopes:["https://www.googleapis.com/auth/photoslibrary","https://www.googleapis.com/auth/photoslibrary.readonly"]};function ge(e){var t=d().handleAccessToken,n=b().handleBackdrop,a=b().handleTextMessage,o=d().handleIsLogined,c=u().isLogined,i=function(t){console.log("handleRequest is called");window.gapi.auth2.getAuthInstance();V()?function(e){return se.apply(this,arguments)}(t).then((function(t){e.onLastUpdateTime()})).finally((function(){n(!1),a("")})):(a("Initializing Local Data Storage. This may take long time depends the quantity of media items in your library"),n(!0),oe(t).then((function(t){e.onLastUpdateTime()})).finally((function(){n(!1),a("")})))};return r.a.createElement(r.a.Fragment,null,c?r.a.createElement(W.GoogleLogout,{clientId:pe.clientID,onLogoutSuccess:function(){o(!1),t("")},buttonText:"Logout",onFailure:function(e){alert("Failed to log out")},render:function(e){return r.a.createElement(me.a,{variant:"contained",onClick:e.onClick,disabled:e.disabled},"Logout")},cookiePolicy:"single_host_origin"}):r.a.createElement(W.GoogleLogin,{clientId:pe.clientID,onSuccess:function(e){e.accessToken&&(o(!0),t(e.accessToken),i(e.accessToken))},onFailure:function(e){alert("Failed to log in")},cookiePolicy:"single_host_origin",responseType:"code,token",scope:pe.scopes[1],isSignedIn:!0,render:function(e){return r.a.createElement(me.a,{variant:"contained",onClick:e.onClick,disabled:e.disabled},"Login")}}))}var he=n(140),fe=n(150),be=n(141),ve=n(62),Ee=n.n(ve),ye=n(61),xe=n.n(ye),je=n(147),Oe=n(11),ke=n(129),we=Object(j.a)((function(e){return{search:Object(L.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(Oe.c)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(Oe.c)(e.palette.common.white,.25)},marginRight:e.spacing(2),marginLeft:0},e.breakpoints.up("md"),{marginBottom:e.spacing(0),width:"auto"}),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit",marginRight:e.spacing(2)},inputInput:Object(L.a)({padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),transition:e.transitions.create("width")},e.breakpoints.up("md"),{width:"20ch"})}}));function Se(){var e=we(),t=u().accessToken,n=u().isLogined,o=I().handlePhotoUrls,c=b().handleIsSearching,l=I().handleSearchedIds,s=Object(a.useState)(""),d=Object(i.a)(s,2),m=d[0],p=d[1],g=function(){if(!m)return!1;c(!0),l([]),function(e){return X.apply(this,arguments)}(m).then((function(e){var n=e;if(l(n),!n.length)return"No result";c(!1),function(e,t){return ue.apply(this,arguments)}(n,t).then((function(e){console.log(e),o(e)}))})).catch((function(e){return console.log("Error: "+e)})).finally((function(){return c(!1)}))};return r.a.createElement(r.a.Fragment,null,r.a.createElement(ke.a,{className:e.search,item:!0,xs:9},r.a.createElement("div",{className:e.searchIcon},r.a.createElement(xe.a,null)),r.a.createElement(je.a,{placeholder:"Search\u2026",classes:{root:e.inputRoot,input:e.inputInput},inputProps:{"aria-label":"search"},onChange:function(e){p(e.target.value)},onKeyUp:function(e){13===e.keyCode&&(e.preventDefault(),g())},autoFocus:!0})),r.a.createElement(ke.a,{item:!0},r.a.createElement(me.a,{variant:"contained",onClick:g,disabled:!n},"Search")))}var Ce=n(138),Ie=n(3),Te=n(135),Pe=n(139),Le=n(145),Ne=n(148),Ue=n(20),Be=n(146),De=n(96),Fe=Object(j.a)((function(e){return{root:Object(L.a)({margin:"auto",marginTop:e.spacing(15),padding:e.spacing(2),maxWidth:"90%",backgroundColor:"white"},e.breakpoints.up("lg"),{maxWidth:"70%"}),title:{padding:e.spacing(1)},firstPara:{marginTop:e.spacing(2),padding:e.spacing(1)},body:{padding:e.spacing(1)},footNote:{marginTop:e.spacing(1)}}}));function Ge(e){var t=Fe(),n=function(e){return r.a.createElement(x.a,{color:"textSecondary",className:t.body+" "+e.className,align:e.align},e.children)};return r.a.createElement(De.a,{open:e.open,onClose:e.onClose},r.a.createElement(y.a,{className:t.root},r.a.createElement(Le.a,null,r.a.createElement(x.a,{color:"textPrimary",variant:"h4",className:t.title},"Google Photos Search Enhancer"),r.a.createElement(M.a,null),r.a.createElement(Le.a,null,r.a.createElement(x.a,{color:"textSecondary",className:t.firstPara},"This app will help you search through the descriptions and filenames in your Google Photos Library."),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(n,null,r.a.createElement("strong",null,"Data:")," All data in this application are stored locally. None of them would be uploaded to any server.")),r.a.createElement("li",null,r.a.createElement(n,null,r.a.createElement("strong",null,"Update:")," Please click the 'Update' button to get the latest change in your Google Photos Library.")),r.a.createElement("li",null,r.a.createElement(n,null,r.a.createElement("strong",null,"Edit:")," Click the photo in the search result, then you can edit it in your Google Photos")))),r.a.createElement(M.a,null),r.a.createElement(n,{align:"right",className:t.footNote},"For further help, please send email to yangyi621#outlook.com (replace # by @)"))))}var _e=n(131),Me=n(132),Ae=n(133),We=n(134);function ze(e){var t=function(t){return function(){e.onAgreed(t),e.onClose()}};return r.a.createElement(_e.a,{open:e.open,onClose:t(!1),"aria-describedby":"alert-dialog-description"},r.a.createElement(Me.a,null,r.a.createElement(Ae.a,{id:"alert-dialog-description"},e.children)),r.a.createElement(We.a,null,r.a.createElement(me.a,{onClick:t(!1),color:"primary"},"Cancel"),r.a.createElement(me.a,{onClick:t(!0),color:"primary",autoFocus:!0},"Confirm")))}function He(){var e,t=Object(j.a)((function(e){var t;return{appBar:{transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{width:"calc(100% - ".concat(240,"px)"),marginLeft:240,transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:e.spacing(2)},hide:{display:"none"},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},drawerHeader:Object(U.a)(Object(U.a)({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar),{},{justifyContent:"flex-end"}),content:{flexGrow:1,padding:e.spacing(2)},contentShift:{transition:e.transitions.create("margin",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginLeft:0},title:(t={},Object(L.a)(t,e.breakpoints.down("xs"),{fontSize:"1rem"}),Object(L.a)(t,e.breakpoints.up("lg"),{fontSize:"1.2rem"}),t),offset:e.mixins.toolbar}}))(),n=Object(Ue.a)();e=Object(Te.a)(n.breakpoints.up("md"))?"flex-end":"center";var o=u().accessToken,c=u().isLogined,l=b(),s=Object(a.useState)(!1),d=Object(i.a)(s,2),m=d[0],g=d[1],h=Object(a.useState)(""),f=Object(i.a)(h,2),v=f[0],E=f[1],y=Object(a.useState)(!1),O=Object(i.a)(y,2),k=O[0],w=O[1],S=Object(a.useState)([]),C=Object(i.a)(S,2),I=C[0],T=C[1],P=Object(a.useState)(""),D=Object(i.a)(P,2),G=D[0],W=D[1],z=Object(a.useState)(void 0),H=Object(i.a)(z,2),R=H[0],q=H[1],J=Object(a.useState)(!1),K=Object(i.a)(J,2),$=K[0],X=K[1],Z=Object(a.useState)(!1),ee=Object(i.a)(Z,2),te=ee[0],ne=ee[1],ae=Object(a.useState)(void 0),re=Object(i.a)(ae,2),ce=re[0],ie=re[1];r.a.useEffect((function(){I.length?(W(I[0].message),q(I[0].severity),T((function(e){return e.slice(1)})),w(!0)):I.length&&G&&k&&w(!1)}),[I,G,k]),r.a.useEffect((function(){!0===ce&&(l.handleBackdrop(!0),l.handleTextMessage("Updating local data... Please wait for a while"),oe(o).then((function(e){console.log("Update completed!"),se("success","Update completed!"),E(V())})).finally((function(){l.handleBackdrop(!1),l.handleTextMessage("")})),ie(void 0))}),[ce,o,l]),r.a.useEffect((function(){(localStorage.noFirstVisit?localStorage.noFirstVisit:(console.log("first time"),localStorage.noFirstVisit="1",0))||X(!0)}),[]);var le=function(){w(!1)},se=function(e,t){var n=e||"info",a=t||"Don't panic";T((function(e){return[].concat(Object(N.a)(e),[{severity:n,message:a,key:(new Date).getTime()}])}))};return r.a.createElement("div",null,r.a.createElement(p.a,null),r.a.createElement(B.a,{position:"sticky",className:Object(Ie.a)(t.appBar,Object(L.a)({},t.appBarShift,m))},r.a.createElement(Ce.a,null,r.a.createElement(ke.a,{container:!0,alignItems:"center",justify:"flex-start",spacing:1},r.a.createElement(ke.a,{container:!0,item:!0,justify:"flex-start",alignItems:"center",lg:4,md:5,xs:12},r.a.createElement(Pe.a,{color:"inherit","aria-label":"open drawer",onClick:function(){return g(!0)},edge:"start",className:Object(Ie.a)(t.menuButton,m&&t.hide)},r.a.createElement(Ee.a,null)),r.a.createElement(x.a,{variant:"h6",className:t.title},"Google Photos Search Enhancer")),r.a.createElement(ke.a,{container:!0,item:!0,alignItems:"center",justify:"flex-start",lg:5,md:6,xs:12},r.a.createElement(Se,null)),r.a.createElement(ke.a,{container:!0,item:!0,alignItems:"center",justify:e,xs:12,md:1,lg:3},r.a.createElement(ge,{onLastUpdateTime:function(){return E(V())},lastUpdateTime:v}))))),r.a.createElement(A.a,{className:t.drawer,variant:"persistent",anchor:"left",open:m,classes:{paper:t.drawerPaper}},r.a.createElement("div",{className:t.drawerHeader},r.a.createElement(Pe.a,{onClick:function(){return g(!1)}},"ltr"===n.direction?r.a.createElement(F.a,null):r.a.createElement(_.a,null))),r.a.createElement(M.a,null),r.a.createElement(he.a,null,r.a.createElement(fe.a,{button:!0,onClick:function(){return ne(!0)},disabled:!c},r.a.createElement(be.a,{primary:"Update data"})),r.a.createElement(fe.a,{button:!0,onClick:function(){(function(){return Q.apply(this,arguments)})().then((function(){return se("success","Clear completed!")})),Y(""),E(V())},disabled:!v},r.a.createElement(be.a,{primary:"Clear data"})),r.a.createElement(fe.a,{button:!0,onClick:function(){return X(!0)},disabled:$},r.a.createElement(be.a,{primary:"Help"}))),r.a.createElement(M.a,null),r.a.createElement(x.a,{variant:"subtitle1",display:"block",gutterBottom:!0,className:t.content,color:"textSecondary"},r.a.createElement(Le.a,null,"Last Update:"),v?function(e){var t=new Date(e),n=function(e){e.length<2&&(e="0"+e)},a=""+(t.getMonth()+1),r=""+t.getDate(),o=t.getFullYear(),c=""+t.getHours(),i=""+t.getMinutes(),l=""+t.getSeconds();return n(a),n(r),n(c),n(i),n(l),"".concat(o,"-").concat(a,"-").concat(r," ").concat(c,":").concat(i,":").concat(l)}(v):"No data")),r.a.createElement(Ne.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:k,onClose:le,autoHideDuration:3e3},r.a.createElement(Be.a,{onClose:le,severity:R,elevation:6,variant:"filled"},G)),r.a.createElement(Ge,{open:$,onClose:function(){X(!1)}}),r.a.createElement(ze,{open:te,onClose:function(){return ne(!1)},onAgreed:function(e){return ie(e)}},r.a.createElement(x.a,{color:"textPrimary"},"Depending on the quantity of items in your Google Photos Library, the updating time could be up to a few minutes. Are you sure to update?")))}var Re=n(65),qe=n.n(Re),Je=n(142),Ye=Object(j.a)((function(e){return{root:{display:"flex",flexWrap:"wrap",overflow:"hidden",marginTop:"10px",marginLeft:"10px"},gridListTile:{maxWidth:480,maxHeight:360},image:{maxWidth:"100%","&:hover":{opacity:.5}},masonryGrid:{display:"flex",marginLeft:"-30px",width:"100%"},masonryGridColumn:{paddingLeft:"20px",backgroundClip:"padding-box","& > div":{marginBottom:"30px"}}}}));function Ve(e){var t=Ye(),n=Object(a.useState)(!0),o=Object(i.a)(n,2),c=o[0],l=o[1],s=C().photoUrls;Object(a.useEffect)((function(){l(!0);var e=setTimeout((function(){l(!1)}),1200);return function(){return clearTimeout(e)}}),[]);return r.a.createElement("div",{className:t.root},c?r.a.createElement(ke.a,{container:!0,spacing:1},e.ids.map((function(e){return r.a.createElement(ke.a,{item:!0,xs:12,sm:6,md:4,lg:3,xl:2,key:e},r.a.createElement(Je.a,{variant:"rect",height:300}))}))):r.a.createElement(qe.a,{breakpointCols:{default:6,1920:4,1280:3,960:2,600:1},className:t.masonryGrid,columnClassName:t.masonryGridColumn},e.ids.map((function(e,n){return r.a.createElement("img",{key:e,src:"".concat(s[n].baseUrl,"=w640-h640"),alt:"Google Photos",className:t.image,onClick:function(){return e=s[n].productUrl,void window.open(e);var e}})}))))}var Ke=n(94),$e=n(143),Qe=Object(j.a)((function(e){return{backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"},leftPadding:{paddingLeft:"15px"}}}));function Xe(){var e=Qe(),t=f().isBackdropOpened,n=f().textMessage;return r.a.createElement(Ke.a,{className:e.backdrop,open:t},r.a.createElement($e.a,{color:"inherit"}),r.a.createElement(x.a,{className:e.leftPadding},n))}var Ze=n(144),et=n(66),tt=n.n(et),nt=Object(j.a)((function(e){return{main:{minHeight:"93.5vh"},linearProgress:{},centerText:{color:"#2d72bc",textDecoration:"none",fontWeight:"800",fontFamily:"Nunito, Helvetica, Arial, sans-serif",fontSize:"2em"},centerLayout:{position:"absolute",top:"50%",transform:"translateY(-50%)",width:"100%",display:"flex",alignItems:"center",justifyContent:"space-around"},image:Object(L.a)({maxWidth:"500px",maxHeight:"500px",width:"40%"},e.breakpoints.up("md"),{width:"20%"})}})),at=function(e){var t=nt();return r.a.createElement("div",{className:t.centerText+" "+t.centerLayout},r.a.createElement("img",{src:tt.a,alt:"search-icon",className:t.image}))};function rt(){var e=nt(),t=f().isSearching,n=C().searchedIds;return r.a.createElement(Le.a,{className:e.main},r.a.createElement(He,null),n&&n.length?r.a.createElement(Ve,{ids:n}):r.a.createElement(at,null),r.a.createElement(Xe,null),t?r.a.createElement(Ze.a,{className:e.linearProgress}):null)}function ot(){return r.a.createElement("div",null,r.a.createElement(m,null,r.a.createElement(T,null,r.a.createElement(v,null,r.a.createElement(p.a,null),r.a.createElement(rt,null),r.a.createElement(k,null)))))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ot,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[79,1,2]]]);
//# sourceMappingURL=main.66289205.chunk.js.map
(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{170:function(e,t,a){e.exports=a(346)},297:function(e,t,a){},327:function(e,t,a){},328:function(e,t,a){},329:function(e,t,a){},330:function(e,t,a){},331:function(e,t,a){},332:function(e,t,a){},333:function(e,t,a){},334:function(e,t,a){},335:function(e,t,a){},336:function(e,t,a){},338:function(e,t,a){},342:function(e,t,a){},343:function(e,t,a){},344:function(e,t,a){},345:function(e,t,a){},346:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(25),o=a.n(c),s=a(15),l=a(14),m=a(165),i=a(353),u=a(5),d=function(e,t){console.log("%c[".concat(e,"]:"),"color: lightblue",t)},p=function(e){return console.group("%c[IO_em]: ","color: coral",e)},f=function(e){console.info("%c[IO_ack]: ".concat(e),"color: lightsalmon","color: white","color: yellow","color: white"),console.groupEnd()},h={isLoggedIn:!1,_id:null,token:null,currentChatroom:"Buddies",data:{},socket:null},_=a(118),b=a(44),E=a(50),v=a.n(E),g=[],y=Object(l.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHECK_AUTH":case"LOG_IN":return d(t.type,t.payload),Object(u.a)(Object(u.a)({},e),t.payload);case"LOG_OUT":return d(t.type,t.payload),Object(u.a)(Object(u.a)({},e),h);case"UPDATE_USER":return d(t.type,t.payload),Object(u.a)(Object(u.a)({},e),{},{data:Object(u.a)(Object(u.a)({},e.data),t.payload)});case"SET_CHATROOM":return d(t.type,t.payload),Object(u.a)(Object(u.a)({},e),t.payload);case"SET_SOCKET":return d(t.type,t.payload),Object(u.a)(Object(u.a)({},e),{},{socket:t.payload});default:return e}},chatrooms:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_CHATROOM":return d(t.type,t.payload),Object(u.a)(Object(u.a)({},e),{},Object(b.a)({},t.payload.name,Object(u.a)({},t.payload)));case"DISPLAY_CHATROOMS":return d(t.type,t.payload),Object(u.a)({},v.a.mapKeys(t.payload,"name"));case"RENDER_NEW_MESSAGE":return d(t.type,t.payload),Object(u.a)(Object(u.a)({},e),{},Object(b.a)({},t.payload.chatroomName,Object(u.a)(Object(u.a)({},e[t.payload.chatroomName]),{},{messages:[].concat(Object(_.a)(e[t.payload.chatroomName].messages),[t.payload.message])})));case"RENDER_MESSAGES":return d(t.type,t.payload),Object(u.a)(Object(u.a)({},e),{},Object(b.a)({},t.payload.chatroomName,Object(u.a)(Object(u.a)({},e[t.payload.chatroomName]),{},{messages:Object(_.a)(t.payload.messages)})));case"LOG_OUT":return d(t.type,t.payload),Object(u.a)(Object(u.a)({},e),g);default:return e}},form:i.a}),w=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||l.d,N=Object(l.e)(y,w(Object(l.a)(m.a))),O=a(13),j=a(21),k=Object(j.a)(),C=a(6),x=a.n(C),S=a(12),I=a(167),A=a.n(I);console.log("PROCESS.ENV","production");var D=A.a.create({baseURL:"https://dsc-whatschat.herokuapp.com/",headers:{"Access-Control-Allow-Origin":"http://localhost:5500/*","Content-Security-Policy":"default-src *"}}),M=function(e){return function(){var t=Object(S.a)(x.a.mark((function t(a){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a({type:"SET_CHATROOM",payload:{currentChatroom:e}});case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},R=function(e){return function(t){t({type:"SET_SOCKET",payload:e})}},T=a(26),L=a(7),H=a.n(L),U=a(352),z=a(351),F=Object(z.a)({form:"userForm"})((function(e){return r.a.createElement("form",{onSubmit:e.handleSubmit((function(t){var a=e.initialValues;if(!a)return e.handleForm(t);Object.keys(t).some((function(e){return""===t[e]}))&&e.reset();var n={};Object.keys(a).forEach((function(e){a[e]!==t[e]&&(n=Object(u.a)(Object(u.a)({},n),{},Object(b.a)({},e,t[e])))})),e.handleForm(n)})),className:"form-signin mt-2"},e.children)})),B=function(e){var t=function(e){var t=e.input,a=e.label,n=e.type;return r.a.createElement("div",null,r.a.createElement("label",{className:"text-white text-left my-2"},a),r.a.createElement("input",Object.assign({className:"form-control",placeholder:a},t,{type:n,required:!0})))};return r.a.createElement(F,{handleForm:function(t){e.handleForm(t)}},r.a.createElement("div",{className:"ui stacked element"},r.a.createElement(U.a,{name:"username",component:t,label:"Username",type:"text"}),r.a.createElement(U.a,{name:"password",component:t,label:"Password",type:"password"}),r.a.createElement("button",{className:"btn btn-md btn-secondary btn-block my-4 mx-auto w-25"},"Submit")),r.a.createElement("div",{className:"d-flex w-100 justify-content-center text-white"},r.a.createElement("div",{className:"col"},r.a.createElement("p",{className:"m-0 p-0"},"Sample User Credentials"),r.a.createElement("p",{className:"m-0 p-0"},"Username: sampleuser"),r.a.createElement("p",{className:"m-0 p-0"},"Password: examplepass000"))))},P=function(e){var t=function(e){var t=e.input,a=e.label,n=e.type;return r.a.createElement("div",null,r.a.createElement("label",{className:"text-white text-left my-2"},a),r.a.createElement("input",Object.assign({className:"form-control",type:n,placeholder:a},t,{required:!0})))};return r.a.createElement(F,{handleForm:function(t){e.handleForm(t)}},r.a.createElement(U.a,{name:"name",component:t,label:"Name",type:"text"}),r.a.createElement(U.a,{name:"username",component:t,label:"Username",type:"text"}),r.a.createElement(U.a,{name:"email",component:t,label:"Email",type:"email"}),r.a.createElement(U.a,{name:"password",component:t,label:"Password",type:"password"}),r.a.createElement(U.a,{name:"passwordConf",component:t,label:"Confirm Password",type:"password"}),r.a.createElement("button",{className:"btn btn-md btn-secondary btn-block mt-4 mx-auto w-50"},"Submit"))},V=(a(297),a(84)),G=Object(s.b)(null,{signup:function(e){return function(){var t=Object(S.a)(x.a.mark((function t(a){var n,r,c;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n="5f52268b6d59e14df8174254",t.next=3,D.post("/create-user",Object(u.a)({},e));case 3:if(r=t.sent,console.log(r),!r.data.error){t.next=9;break}return 11e3===(c=r.data.error).code&&alert('The username "'.concat(c.keyValue.username,'" has already been taken.')),t.abrupt("return");case 9:localStorage.setItem("jwt-token",r.data.token),a({type:"CHECK_AUTH",payload:{_id:r.data.user._id,token:r.data.token,isLoggedIn:!0,data:r.data.user}}),k.push("/chats/".concat(n));case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},login:function(e){return function(){var t=Object(S.a)(x.a.mark((function t(a){var n,r,c;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("login ran"),n="Buddies",t.next=4,D.post("/login-user",Object(u.a)({},e));case 4:if(!(r=t.sent).data.error){t.next=9;break}return c=r.data.error,alert("".concat(c.message)),t.abrupt("return");case 9:localStorage.setItem("jwt-token",r.data.token),a({type:"LOG_IN",payload:{_id:r.data.user._id,token:r.data.token,isLoggedIn:!0,data:r.data.user}}),k.push("/chats/".concat(n));case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},setSocket:R})((function(e){var t=Object(n.useState)("signup"),a=Object(T.a)(t,2),c=a[0],o=a[1],s=function(t){e.signup(t)},l=function(){var t=Object(S.a)(x.a.mark((function t(a){var n;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.login(a),n=Object(V.io)(),t.next=4,R(n);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),m=function(){"signup"===c&&o("login"),"login"===c&&o("signup")};return r.a.createElement("div",{className:"landing__area col"},r.a.createElement("div",{className:"landing__container container pb-3 px-3 bg-dark"},r.a.createElement("div",{className:"row mb-2"},r.a.createElement("div",{className:"col p-0"},r.a.createElement("button",{onClick:function(){return m()},className:H()({"btn btn-large text-white w-100 p-3":!0,"btn-outline-dark":"signup"===c,"btn-secondary":"login"===c}),disabled:"signup"===c},"Sign Up Here!")),r.a.createElement("div",{className:"col h-100 p-0"},r.a.createElement("button",{onClick:function(){return m()},className:H()({"btn btn-large text-white w-100 p-3":!0,"btn-outline-dark disabled":"login"===c,"btn-secondary":"signup"===c}),disabled:"login"===c},"Log In Here!"))),"signup"===c?r.a.createElement(P,{handleForm:s}):r.a.createElement(B,{handleForm:l})))})),K=function(){return r.a.createElement(G,null)},q=a(85),Y=a.n(q),W=r.a.createElement("svg",{width:"1.2em",height:"1em",viewBox:"0 0 16 16",className:"bi bi-person",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"})),J=r.a.createElement("svg",{width:"1.2em",height:"1em",viewBox:"0 0 16 16",className:"bi bi-chat-right-text",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M2 1h12a1 1 0 0 1 1 1v11.586l-2-2A2 2 0 0 0 11.586 11H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"}),r.a.createElement("path",{fillRule:"evenodd",d:"M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"})),X=r.a.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 16 16",className:"bi bi-plus-square",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"}),r.a.createElement("path",{fillRule:"evenodd",d:"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"})),Q=r.a.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 16 16",className:"bi bi-pencil",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"})),Z=r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"currentColor",className:"bi bi-three-dots-vertical",viewBox:"0 0 16 16"},r.a.createElement("path",{d:"M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"})),$=(a(327),function(e){return r.a.createElement("button",{className:H()("nav__icon",{"icon__button-active":e.icon===e.activeIcon,"":e.icon!==e.activeIcon}),disabled:e.icon===e.activeIcon},"profile"===e.icon?W:"chats"===e.icon?J:void 0)}),ee=(a(328),function(e){var t=e.type,a=e.messageKey,n=e.timestamp,c=e.author,o=e.message;return r.a.createElement("li",{key:a,className:"message message__".concat(t)},r.a.createElement("div",{className:"message__container message__container-".concat(t)},r.a.createElement("div",{className:"message__content"},r.a.createElement("div",{className:"message__row message__row-body"},r.a.createElement("p",{className:"message__text message__text-author"},"system"!==c?c:null),r.a.createElement("p",{className:"message__text ".concat("system"!==c?"message__text-message":"message__text-system")},o)),r.a.createElement("div",{className:"message__row message__row-footer"},r.a.createElement("div",{className:"message__timestamp"},n)))))}),te=(a(329),Object(s.b)((function(e){return{auth:e.auth}}))((function(e){var t=e.messages,a=e.auth,c=Object(n.useRef)(null);Object(n.useEffect)((function(){return function(e){var t=e.current.lastElementChild;if(t){var a=getComputedStyle(t.lastElementChild),n=parseInt(a.marginBottom),r=e.current.offsetHeight+n,c=e.current.offsetHeight;e.current.scrollHeight-r<=e.current.scrollTop+c&&(e.current.scrollTop=e.current.scrollHeight)}}(c)}),[t.length]);return r.a.createElement("div",{className:"chatroom__content"},r.a.createElement("ul",{className:"message__display message__display-scroll ",ref:c},t?Object.keys(t).map((function(e){if("system"===t[e].author)return r.a.createElement(ee,{key:e,type:"system",author:t[e].author,message:t[e].message});var n,c=(n=t[e].createdAt,Y()(n).format("h:mm A"));return r.a.createElement(ee,{key:e,type:t[e].userId!==a._id?"rec":"sent",timestamp:c,author:t[e].author,message:t[e].message})})):r.a.createElement("div",{className:"text-white"},"Send a message!!")))}))),ae=(a(330),function(e){var t=e.message,a=e.onSubmit,n=e.onChange;return r.a.createElement("div",{className:"chatroom__message"},r.a.createElement("form",{className:"new-message__form",onSubmit:a},r.a.createElement("div",{className:"message-form__row"},r.a.createElement("div",{className:"message-form__col message-form__col-input"},r.a.createElement("input",{className:"message-form__input form-control",placeholder:"Message...",type:"text",value:t,onChange:n})),r.a.createElement("div",{className:"message-form__col message-form__col-cta"},r.a.createElement("button",{className:"message-form__cta button"},"Send")))))}),ne=function(e,t,a,n){p("joining chatroom..."),n.emit("join-chatroom",e,t,a,(function(e){return f(e)}))},re=function(e,t,a,n){p("rejoining chatroom..."),n.emit("rejoin-chatroom",e,t,a,(function(e){return f(e)}))},ce=(a(331),function(e){var t=e.chatroomName;return r.a.createElement("div",{className:"chatroom__heading"},r.a.createElement("h2",{className:"chatroom__title"},t))}),oe=(a(332),Object(s.b)((function(e){return{auth:e.auth,chatrooms:e.chatrooms}}),{})((function(e){var t=e.chatrooms,a=e.auth,c=Object(n.useState)(""),o=Object(T.a)(c,2),s=o[0],l=o[1];return r.a.createElement("div",{className:"chatroom__display"},r.a.createElement("div",{className:"chatroom__container"},r.a.createElement(ce,{chatroomName:a.currentChatroom}),r.a.createElement(te,{messages:t[a.currentChatroom].messages}),r.a.createElement(ae,{message:s,onSubmit:function(e){var t,n;e.preventDefault(),t={message:s,chatroomName:a.currentChatroom,userId:a._id,author:a.data.username},n=a.socket,p("sending new message..."),n.emit("new-message",Object(u.a)({},t),(function(e){return f(e)})),l("")},onChange:function(e){l(e.target.value)}})))}))),se=function(){return function(){var e=Object(S.a)(x.a.mark((function e(t,a){var n,r,c;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D.get("/MessagesDisplay");case 3:n=e.sent,r=n.data,c=r.chats.map((function(e){return Object(u.a)(Object(u.a)({},e),{},{messages:[]})})),t({type:"DISPLAY_CHATROOMS",payload:Object(u.a)({},c)}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t,a){return e.apply(this,arguments)}}()},le=function(e){return function(t,a){var n=v.a.omit(a().chatrooms,[e]);t({type:"DISPLAY_CHATROOMS",payload:Object(u.a)({},n)})}},me=Object(s.b)((function(e){return{auth:e.auth}}),{createChatroom:function(e){return function(){var t=Object(S.a)(x.a.mark((function t(a){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:console.log(e);try{a({type:"ADD_CHATROOM",payload:Object(u.a)(Object(u.a)({},e),{},{messages:[]})}),k.push("/chats/".concat(e._id))}catch(n){a({type:"ERROR",error:"Invalid Name"})}case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},renderNewMessage:function(e,t){return function(){var a=Object(S.a)(x.a.mark((function a(n){return x.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n({type:"RENDER_NEW_MESSAGE",payload:{chatroomName:e,message:t}});case 2:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},renderMessages:function(e,t){return function(){var a=Object(S.a)(x.a.mark((function a(n){return x.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n({type:"RENDER_MESSAGES",payload:{chatroomName:e,messages:t}});case 2:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},closeChatroom:le,setChatroom:M,setSocket:R})((function(e){var t=e.auth,a=e.createChatroom,c=e.renderNewMessage,o=e.renderMessages,s=e.closeChatroom,l=e.setChatroom,m=e.setSocket;return Object(n.useEffect)((function(){if(t.socket)t.socket.on("connect",Object(S.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ne(t.currentChatroom,null,t.data.name,t.socket);case 2:case"end":return e.stop()}}),e)})))),t.socket.on("chatroom-created",function(){var e=Object(S.a)(x.a.mark((function e(n){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a(n,t.socket);case 2:return e.next=4,l(n.name);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),t.socket.on("fetch-messages",(function(e){!function(e,t){p("fetching messages..."),t.emit("fetching-messages",e,(function(e){return f(e)}))}(e,t.socket)})),t.socket.on("chatroom-left",function(){var e=Object(S.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),t.socket.on("chatroom-deleted",function(){var e=Object(S.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),t.socket.on("fetched-messages",function(){var e=Object(S.a)(x.a.mark((function e(t,a){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o(t,a);case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),t.socket.on("return-message",function(){var e=Object(S.a)(x.a.mark((function e(t,a){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c(t,a);case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}());else{var e=Object(V.io)();m(e)}}),[t.socket,a,m,o,c,s]),r.a.createElement(oe,null)})),ie=a(69),ue=a(19),de=(a(333),function(e){var t=e.auth,a=e.updateUser,c=e.logout,o=e.setModalDisplay,s=Object(n.useState)(""),l=Object(T.a)(s,2),m=l[0],i=l[1],u=function(e){var t=e.input,a=e.label,n=e.meta,c="field ".concat(n.error&&n.touched?"error":"");return r.a.createElement("div",{className:"row__content ".concat(c)},r.a.createElement("div",{className:"content__col content__col-label"},r.a.createElement("label",{className:"profile__label"},a)),r.a.createElement("div",{className:"content__col content__col-input"},m===a?r.a.createElement("input",Object.assign({className:"profile__input form-control"},t)):r.a.createElement("input",Object.assign({className:"profile__input-placeholder form-control-plaintext"},t))),r.a.createElement("div",{className:"content__col content__col-cta"},r.a.createElement("div",{onClick:function(){return i(a)},className:"profile__cta-edit"},Q)),function(e){var t=e.error;if(e.touched&&t)return r.a.createElement("div",{className:"ui error message"},r.a.createElement("div",{className:"header"},t))}(n))};return r.a.createElement(ie.a,{className:"profile__card"},r.a.createElement(ie.a.Img,{className:"profile__avatar",variant:"top",src:"data:image/png;base64,".concat(t.data.avatar)}),r.a.createElement(ie.a.Body,{className:"profile__body"},r.a.createElement(F,{handleForm:function(e){a(e),i("")},initialValues:v.a.pick(t.data,"name","username","email","password")},r.a.createElement(ue.a,{className:"profile__content",variant:"flush"},r.a.createElement(ue.a.Item,{className:"profile__row"},r.a.createElement(U.a,{name:"name",component:u,label:"Name:"})),r.a.createElement(ue.a.Item,{className:"profile__row"},r.a.createElement(U.a,{name:"username",component:u,label:"Username:"})),r.a.createElement(ue.a.Item,{className:"profile__row"},r.a.createElement(U.a,{name:"email",component:u,label:"Email:"})),r.a.createElement(ue.a.Item,{className:"profile__row"},r.a.createElement(U.a,{name:"password",component:u,label:"Password:"})),r.a.createElement("input",{type:"submit",className:"profile__submit",tabIndex:"-1"})))),r.a.createElement(ie.a.Footer,{className:"profile__footer"},r.a.createElement(ue.a,{className:"profile__row",variant:"flush"},r.a.createElement(ue.a.Item,{className:"profile__row"},r.a.createElement("div",{className:"row justify-content-around"},r.a.createElement("div",{className:"col text-center"},"User Since: ",Y()(t.data.createdAt).format("MMM 'YY")))),r.a.createElement(ue.a.Item,{className:"profile__row"},r.a.createElement("button",{onClick:function(){return c()},className:"profile__cta profile__cta-logout button"},"Log Out")),r.a.createElement(ue.a.Item,{className:"profile__row"},r.a.createElement("button",{onClick:function(){return o(!0)},className:"profile__cta profile__cta-delete button",disabled:"5f637fdd0a41ae691c828e50"===t.data._id},"Delete Account")))))}),pe=a(169),fe=a(93),he=a(91),_e=a(92),be=a(94),Ee=function(e){var t=e.modalConfig,a=e.setModalDisplay,n=e.modalDisplay,c=e.handleDelete;return n?r.a.createElement(pe.a,{show:n,onHide:function(){return a(!1)}},r.a.createElement(be.a,{closeButton:!0},r.a.createElement(_e.a,null,t.title)),r.a.createElement(he.a,null,r.a.createElement("p",null,t.message)),r.a.createElement(fe.a,null,r.a.createElement("button",{onClick:function(){return a(!1)},type:"button",className:"btn btn-secondary"},"Cancel"),r.a.createElement("button",{onClick:function(){return a(!1),void c()},className:"btn btn-".concat(t.btnStyle)},t.btnText))):r.a.createElement(r.a.Fragment,null)},ve=(a(334),Object(s.b)((function(e){return{auth:e.auth}}),{logout:function(){return function(){var e=Object(S.a)(x.a.mark((function e(t,a){var n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a().auth.token,e.next=3,D.post("/logout",{},{headers:{Authorization:"Bearer ".concat(n)}});case 3:return e.next=5,localStorage.removeItem("jwt-token");case 5:t({type:"LOG_OUT"}),k.push("/");case 7:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},updateUser:function(e){return function(){var t=Object(S.a)(x.a.mark((function t(a,n){var r,c,o;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n().auth.token,t.next=3,D.patch("./user-update",Object(u.a)({},e),{headers:{Authorization:"Bearer ".concat(r)}});case 3:if(!(c=t.sent).data.error){t.next=8;break}return 11e3===(o=c.data.error).code&&alert('The username "'.concat(o.keyValue.username,'" has already been taken.')),t.abrupt("return");case 8:a({type:"UPDATE_USER",payload:c.data.user});case 9:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},deleteUser:function(){return function(){var e=Object(S.a)(x.a.mark((function e(t,a){var n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a().auth.token,e.next=3,D.post("/user-delete",{},{headers:{Authorization:"Bearer ".concat(n)}});case 3:if(!e.sent.data.userDeleted){e.next=10;break}return e.next=7,localStorage.removeItem("jwt-token");case 7:return e.next=9,t({type:"LOG_OUT"});case 9:k.push("/");case 10:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()}})((function(e){var t=e.auth,a=e.logout,c=e.updateUser,o=e.deleteUser,s=Object(n.useState)(!1),l=Object(T.a)(s,2),m=l[0],i=l[1],u=t.isLoggedIn?r.a.createElement(de,{auth:t,updateUser:c,logout:a,setModalDisplay:i}):r.a.createElement("div",{className:"text-white"},"Log in to see your profile");return r.a.createElement("div",{className:"sidebar__profile"},u,r.a.createElement(Ee,{modalConfig:{title:"Delete Account",message:"Are you sure you want to delete your account?",btnText:"Delete",btnStyle:"danger"},setModalDisplay:i,modalDisplay:m,handleDelete:function(){o()}}))}))),ge=(a(335),function(e){var t=e.newRoomName.length<5&&0!==e.newRoomName.length?"is-invalid":null;return r.a.createElement("form",{className:"sidebar__form",onSubmit:function(t){e.handleForm(t)}},r.a.createElement("div",{className:"sidebar__form_col sidebar__form_col-start"},r.a.createElement("input",{value:e.newRoomName,onChange:function(t){e.onChange(t)},className:"sidebar__form_input form-control ".concat(t),type:"text",placeholder:"Start new chat",name:"chatForm",required:!0})),r.a.createElement("div",{className:"sidebar__form_col sidebar__form_col-end"},r.a.createElement("button",{type:"submit",className:"sidebar__cta-new"},X)))}),ye=a(113),we=a(39),Ne=(a(336),function(e){var t=e.handleClose,a=e.handleLeave,n=e.handleDelete,c=e.chatroomId,o=r.a.forwardRef((function(e,t){var a=e.children,n=e.onClick;return r.a.createElement("a",{className:"item__cta",href:"",ref:t,onClick:function(e){e.preventDefault(),n(e)}},a,Z)}));return r.a.createElement(we.a,null,r.a.createElement(we.a.Toggle,{as:o,id:"dropdown-custom-components"}),r.a.createElement(we.a.Menu,{className:"dropdown__content",variant:"dark"},r.a.createElement(we.a.Item,{className:"dropdown__item",onClick:function(){return t(c)}},"Close Chatroom"),r.a.createElement(we.a.Divider,{className:"dropdown__divider"}),r.a.createElement(we.a.Item,{className:"dropdown__item",onClick:function(){return a(c)}},"Leave Chatroom"),r.a.createElement(we.a.Divider,{className:"dropdown__divider"}),r.a.createElement(we.a.Item,{className:"dropdown__item",onClick:function(){return n(c)}},"Delete Chatroom")))}),Oe=(a(338),function(e){var t=e.chatroom,a=e.setChatroom,n=e.joinChatroomEmitter,c=e.rejoinChatroomEmitter,o=e.auth,s=e.handleClose,l=e.handleLeave,m=e.handleDelete,i=function(){var e=Object(S.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a(t.name),0!==t.messages.length?c(t.name,o.currentChatroom,o.data.name,o.socket):n(t.name,o.currentChatroom,o.data.name,o.socket);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(ue.a.Item,{className:"list__item"},r.a.createElement("div",{className:"item__col"},r.a.createElement(ye.a,{onClick:function(){return i()},className:"item__link",to:{pathname:"/chats/".concat(t._id)},disabled:t.name===o.currentChatroom},r.a.createElement("div",{className:"link__icon"},W),r.a.createElement("div",{className:"link__name"},r.a.createElement("div",{className:"link__text"},t.name)))),r.a.createElement("div",{className:"item__col item__col-cta"},r.a.createElement(Ne,{chatroomId:t._id,handleClose:s,handleLeave:l,handleDelete:m})))}),je=(a(342),Object(s.b)((function(e){return{auth:e.auth,chatrooms:e.chatrooms}}),{displayChatrooms:se,closeChatroom:le,setChatroom:M})((function(e){var t=e.auth,a=e.chatrooms,c=e.displayChatrooms,o=e.closeChatroom,s=e.setChatroom,l=Object(n.useState)(""),m=Object(T.a)(l,2),i=m[0],u=m[1],d=Object.keys(a).length;Object(n.useEffect)((function(){t.token&&c()}),[d,t.token,c,o]);var h=function(e){u(e.target.value)},_=function(e){o(e)},b=function(e){!function(e,t,a){p("leaving chatroom..."),a.emit("leave-chatroom",e,t,(function(e){return f(e)}))}(e,t.data.name,t.socket)},E=function(e){!function(e,t,a){p("deleting chatroom..."),a.emit("delete-chatroom",e,t,(function(e){return f(e)}))}(e,t.data.name,t.socket)},v=function(){var e=Object(S.a)(x.a.mark((function e(a){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),!(i.length>=5)){e.next=4;break}return e.next=4,n=i,r=t._id,c=t.socket,p("creating chatroom..."),void c.emit("create-chatroom",n,r,(function(e){return f(e)}));case 4:return e.next=6,u("");case 6:case"end":return e.stop()}var n,r,c}),e)})));return function(t){return e.apply(this,arguments)}}(),g=t.isLoggedIn?r.a.createElement(ue.a,{className:"chatroom__list"},r.a.createElement(ue.a.Item,{className:"list__item list__item-new"},r.a.createElement(ge,{handleForm:v,onChange:h,newRoomName:i})),function(){if(a!=={})return Object.keys(a).map((function(e){return r.a.createElement(Oe,{key:a[e]._id,auth:t,chatroom:a[e],setChatroom:s,joinChatroomEmitter:ne,rejoinChatroomEmitter:re,handleClose:_,handleLeave:b,handleDelete:E})}))}()):r.a.createElement("div",{className:"text-white"},"Log in to see chatrooms");return r.a.createElement("div",{className:"chatroom__list"},g)}))),ke=(a(343),function(e){var t=e.auth,a=Object(n.useState)("chats"),c=Object(T.a)(a,2),o=c[0],s=c[1];Object(n.useEffect)((function(){return function(){s("chats")}}),[t]);var l="chats"===o?r.a.createElement(je,null):r.a.createElement(ve,null);return r.a.createElement("div",{className:"sidebar"},r.a.createElement("nav",{className:"sidebar__nav"},r.a.createElement("ul",{className:"nav__list list-unstyled components"},function(e){var t=e.icons,a=e.setCurrentIcon,n=e.activeIcon;return t.map((function(e){return r.a.createElement("li",{id:"".concat(e,"-cta"),key:e,className:"nav__item ".concat(n===e?"nav__item-active":""," nav-item"),onClick:function(e){return a(e)}},r.a.createElement($,{icon:e,activeIcon:n}))}))}({icons:["profile","chats"],setCurrentIcon:function(e){return"profile-cta"===e.currentTarget.id?s("profile"):s("chats")},activeIcon:o}))),r.a.createElement("div",{className:"sidebar__content"},r.a.createElement("div",{className:"sidebar__row py-4"},r.a.createElement("h2",{className:"sidebar__title"},"WhatsChat")),r.a.createElement("div",{className:"sidebar__row"},l)))}),Ce=(a(344),a(345),Object(s.b)((function(e){return{auth:e.auth}}),{checkAuth:function(){return function(){var e=Object(S.a)(x.a.mark((function e(t){var a,n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=localStorage.getItem("jwt-token")){e.next=3;break}return e.abrupt("return",t({type:"CHECK_AUTH",payload:{isLoggedIn:!1,token:null}}));case 3:return e.next=5,D.get("/user-id",{headers:{Authorization:"Bearer ".concat(a)}});case 5:n=e.sent,t({type:"CHECK_AUTH",payload:{_id:n.data._id,token:a,isLoggedIn:!0,data:n.data}});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},displayChatrooms:se})((function(e){var t=e.auth,a=e.checkAuth,c=e.displayChatrooms;return Object(n.useEffect)((function(){t.token||(a(),c())}),[t.token,a,c]),r.a.createElement("div",{className:"display wrapper"},r.a.createElement(O.c,{history:k},r.a.createElement(r.a.Fragment,null,r.a.createElement(ke,{auth:t.isLoggedIn}),r.a.createElement(O.d,null,r.a.createElement(O.b,{path:"/",exact:!0},t.isLoggedIn?r.a.createElement(O.a,{to:"/chats/".concat(t.currentChatroom)}):r.a.createElement(K,null)),r.a.createElement(O.b,{path:"/chats"},t.isLoggedIn?r.a.createElement(me,null):r.a.createElement(O.a,{to:"/"}))))))})));o.a.render(r.a.createElement(s.a,{store:N},r.a.createElement(Ce,null)),document.querySelector("#root"))}},[[170,1,2]]]);
//# sourceMappingURL=main.a73c801e.chunk.js.map
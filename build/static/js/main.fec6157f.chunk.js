(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{21:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(1),a=t.n(c),r=t(16),u=t.n(r),o=(t(21),t(7)),i=t(3),s=t(0),l=function(e){var n=e.value,t=e.eventHandler;return Object(s.jsxs)("div",{children:["Filter shown with:",Object(s.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.addPerson,t=e.nameValue,c=e.personEventHandler,a=e.numberValue,r=e.numberEventHandler;return Object(s.jsxs)("form",{onSubmit:n,children:[Object(s.jsxs)("div",{children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{value:t,onChange:c})]}),Object(s.jsxs)("div",{children:["number: ",Object(s.jsx)("input",{value:a,onChange:r})]})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},j=function(e){var n=e.person,t=e.handleDeletePerson;return Object(s.jsxs)("li",{children:[n.name," ",n.number," ",Object(s.jsx)("button",{value:n.id,onClick:t,children:"Delete"})," "]},n.name)},b=function(e){var n=e.persons,t=e.eventHandler;return n.map((function(e){return Object(s.jsx)(j,{person:e,handleDeletePerson:t},e.id)}))},f=t(4),h=t.n(f),m="api/persons",v=function(){return h.a.get(m).then((function(e){return e.data}))},O=function(e){return h.a.post(m,e).then((function(e){return e.data}))},p=function(e,n){return h.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},x=function(e){return h.a.delete("".concat(m,"/").concat(e)).then()},g=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1],r=Object(c.useState)(""),u=Object(i.a)(r,2),j=u[0],f=u[1],h=Object(c.useState)(""),m=Object(i.a)(h,2),g=m[0],w=m[1],H=Object(c.useState)(""),S=Object(i.a)(H,2),k=S[0],C=S[1],y=Object(c.useState)(null),D=Object(i.a)(y,2),E=D[0],P=D[1],V=Object(c.useState)(""),T=Object(i.a)(V,2),A=T[0],J=T[1];Object(c.useEffect)((function(){v().then((function(e){a(e)}))}),[]);var L=function(e,n){return e.some((function(e){return n===e.name}))},N=function(e){var n=e.message,t=e.type;return null===n?null:Object(s.jsx)("div",{className:t,children:n})};return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(N,{message:E,type:A}),Object(s.jsx)(l,{value:k,eventHandler:function(e){C(e.target.value)}}),Object(s.jsx)("h3",{children:"Add new contact"}),Object(s.jsx)(d,{addPerson:function(e){if(e.preventDefault(),L(t,j)){var n=t.find((function(e){return e.name==j}));if(window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?"))){var c=Object(o.a)(Object(o.a)({},n),{},{number:g});p(c.id,c).then((function(e){P("Replaced ".concat(n.name," number successfully.")),J("message-info"),setTimeout((function(){P(null)}),5e3),t.map((function(n){return n.id!==c.id?n:e.data}))})).catch((function(e){P("Contact ".concat(n.name," not found, please create it again.")),J("message-error"),setTimeout((function(){P(null)}),5e3),a(t.filter((function(e){return e.id!==n.id})))}))}}else{var r={name:j,number:g,id:t[t.length-1].id+1};O(r).then((function(e){a(t.concat(e)),f(""),w(""),P("Added ".concat(e.name,".")),J("message-info"),setTimeout((function(){P(null)}),5e3)}))}},nameValue:j,personEventHandler:function(e){f(e.target.value)},numberValue:g,numberEventHandler:function(e){w(e.target.value)}}),Object(s.jsx)("h3",{children:"Numbers"}),Object(s.jsx)("ul",{children:Object(s.jsx)(b,{eventHandler:function(e){e.preventDefault(),window.confirm("Delete ".concat(t.find((function(n){return n.id==e.target.value})).name,"?"))&&x(e.target.value).then(a(t.filter((function(n){return n.id!=e.target.value}))))},persons:t.filter((function(e){return e.name.toLowerCase().match(k.toLowerCase())}))})})]})};u.a.render(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(g,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.fec6157f.chunk.js.map
import{S as z,i as A,s as C,k as g,q as k,a as F,l as d,m as v,r as B,h as _,c as M,n as h,b as E,D as p,u as w,B as D,f as m,t as b,d as j,o as J,p as H,g as G,F as K,w as L,x as N,y as O,z as Q}from"../../../chunks/index-d8dd06c7.js";function R(r){var q,P;let t,n,l=((q=r[0].meta)==null?void 0:q.title)+"",s,i,e,o=((P=r[0].meta)==null?void 0:P.date)+"",a,c;return{c(){t=g("a"),n=g("h1"),s=k(l),i=F(),e=g("p"),a=k(o),this.h()},l(u){t=d(u,"A",{class:!0,style:!0,href:!0});var f=v(t);n=d(f,"H1",{class:!0});var y=v(n);s=B(y,l),y.forEach(_),i=M(f),e=d(f,"P",{class:!0});var $=v(e);a=B($,o),$.forEach(_),f.forEach(_),this.h()},h(){h(n,"class","svelte-19om0yk"),h(e,"class","svelte-19om0yk"),h(t,"class","post svelte-19om0yk"),h(t,"style",`--bg: url("${r[1]?r[1]:""}");`),h(t,"href",c=`blog/${r[0].path}`)},m(u,f){E(u,t,f),p(t,n),p(n,s),p(t,i),p(t,e),p(e,a)},p(u,[f]){var y,$;f&1&&l!==(l=((y=u[0].meta)==null?void 0:y.title)+"")&&w(s,l),f&1&&o!==(o=(($=u[0].meta)==null?void 0:$.date)+"")&&w(a,o),f&1&&c!==(c=`blog/${u[0].path}`)&&h(t,"href",c)},i:D,o:D,d(u){u&&_(t)}}}function T(r,t,n){var i;let{post:l}=t,s=(i=l.meta)==null?void 0:i.landing_image;return r.$$set=e=>{"post"in e&&n(0,l=e.post)},[l,s]}class U extends z{constructor(t){super(),A(this,t,T,R,C,{post:0})}}function I(r,t,n){const l=r.slice();return l[1]=t[n],l}function S(r){let t,n,l=r[0].posts,s=[];for(let e=0;e<l.length;e+=1)s[e]=V(I(r,l,e));const i=e=>b(s[e],1,1,()=>{s[e]=null});return{c(){t=g("div");for(let e=0;e<s.length;e+=1)s[e].c();this.h()},l(e){t=d(e,"DIV",{class:!0,style:!0});var o=v(t);for(let a=0;a<s.length;a+=1)s[a].l(o);o.forEach(_),this.h()},h(){h(t,"class","blogs-grid svelte-11aaq1y"),H(t,"--items",r[0].posts.length)},m(e,o){E(e,t,o);for(let a=0;a<s.length;a+=1)s[a].m(t,null);n=!0},p(e,o){if(o&1){l=e[0].posts;let a;for(a=0;a<l.length;a+=1){const c=I(e,l,a);s[a]?(s[a].p(c,o),m(s[a],1)):(s[a]=V(c),s[a].c(),m(s[a],1),s[a].m(t,null))}for(G(),a=l.length;a<s.length;a+=1)i(a);j()}(!n||o&1)&&H(t,"--items",e[0].posts.length)},i(e){if(!n){for(let o=0;o<l.length;o+=1)m(s[o]);n=!0}},o(e){s=s.filter(Boolean);for(let o=0;o<s.length;o+=1)b(s[o]);n=!1},d(e){e&&_(t),K(s,e)}}}function V(r){let t,n;return t=new U({props:{post:r[1]}}),{c(){L(t.$$.fragment)},l(l){N(t.$$.fragment,l)},m(l,s){O(t,l,s),n=!0},p(l,s){const i={};s&1&&(i.post=l[1]),t.$set(i)},i(l){n||(m(t.$$.fragment,l),n=!0)},o(l){b(t.$$.fragment,l),n=!1},d(l){Q(t,l)}}}function W(r){let t,n,l,s,i,e=r[0].posts&&S(r);return{c(){t=g("div"),n=g("h1"),l=k("Blogs"),s=F(),e&&e.c(),this.h()},l(o){t=d(o,"DIV",{class:!0});var a=v(t);n=d(a,"H1",{class:!0});var c=v(n);l=B(c,"Blogs"),c.forEach(_),s=M(a),e&&e.l(a),a.forEach(_),this.h()},h(){h(n,"class","svelte-11aaq1y"),h(t,"class","blogs svelte-11aaq1y")},m(o,a){E(o,t,a),p(t,n),p(n,l),p(t,s),e&&e.m(t,null),i=!0},p(o,[a]){o[0].posts?e?(e.p(o,a),a&1&&m(e,1)):(e=S(o),e.c(),m(e,1),e.m(t,null)):e&&(G(),b(e,1,1,()=>{e=null}),j())},i(o){i||(m(e),i=!0)},o(o){b(e),i=!1},d(o){o&&_(t),e&&e.d()}}}function X(r,t,n){let{data:l}=t;return J(async()=>{await document.fonts.ready}),r.$$set=s=>{"data"in s&&n(0,l=s.data)},[l]}class Z extends z{constructor(t){super(),A(this,t,X,W,C,{data:0})}}export{Z as default};

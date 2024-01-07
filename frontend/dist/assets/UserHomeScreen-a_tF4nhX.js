import{r as o,u as c,j as e,c as n,h as k,i as C,a as S,B as A,C as u,R as F,e as p,M as L}from"./index-pyFllL6d.js";import{I as O}from"./index.esm-LBj0RG9V.js";const j=o.forwardRef(({className:d,bsPrefix:a,as:r="div",...s},t)=>(a=c(a,"card-body"),e.jsx(r,{ref:t,className:n(d,a),...s})));j.displayName="CardBody";const x=j,N=o.forwardRef(({className:d,bsPrefix:a,as:r="div",...s},t)=>(a=c(a,"card-footer"),e.jsx(r,{ref:t,className:n(d,a),...s})));N.displayName="CardFooter";const M=N,y=o.forwardRef(({bsPrefix:d,className:a,as:r="div",...s},t)=>{const l=c(d,"card-header"),i=o.useMemo(()=>({cardHeaderBsPrefix:l}),[l]);return e.jsx(k.Provider,{value:i,children:e.jsx(r,{ref:t,...s,className:n(a,l)})})});y.displayName="CardHeader";const D=y,f=o.forwardRef(({bsPrefix:d,className:a,variant:r,as:s="img",...t},l)=>{const i=c(d,"card-img");return e.jsx(s,{ref:l,className:n(r?`${i}-${r}`:i,a),...t})});f.displayName="CardImg";const E=f,h=o.forwardRef(({className:d,bsPrefix:a,as:r="div",...s},t)=>(a=c(a,"card-img-overlay"),e.jsx(r,{ref:t,className:n(d,a),...s})));h.displayName="CardImgOverlay";const q=h,v=o.forwardRef(({className:d,bsPrefix:a,as:r="a",...s},t)=>(a=c(a,"card-link"),e.jsx(r,{ref:t,className:n(d,a),...s})));v.displayName="CardLink";const U=v,V=C("h6"),g=o.forwardRef(({className:d,bsPrefix:a,as:r=V,...s},t)=>(a=c(a,"card-subtitle"),e.jsx(r,{ref:t,className:n(d,a),...s})));g.displayName="CardSubtitle";const W=g,w=o.forwardRef(({className:d,bsPrefix:a,as:r="p",...s},t)=>(a=c(a,"card-text"),e.jsx(r,{ref:t,className:n(d,a),...s})));w.displayName="CardText";const z=w,G=C("h5"),$=o.forwardRef(({className:d,bsPrefix:a,as:r=G,...s},t)=>(a=c(a,"card-title"),e.jsx(r,{ref:t,className:n(d,a),...s})));$.displayName="CardTitle";const J=$,R=o.forwardRef(({bsPrefix:d,className:a,bg:r,text:s,border:t,body:l=!1,children:i,as:I="div",...H},T)=>{const B=c(d,"card");return e.jsx(I,{ref:T,...H,className:n(a,B,r&&`bg-${r}`,s&&`text-${s}`,t&&`border-${t}`),children:l?e.jsx(x,{children:i}):i})});R.displayName="Card";const m=Object.assign(R,{Img:E,Title:J,Subtitle:W,Body:x,Link:U,Text:z,Header:D,Footer:M,ImgOverlay:q}),K=({appName:d,link:a,appIcon:r,appDesc:s})=>{const t=S(),l=()=>{t(a.toLowerCase())};return e.jsxs(m,{className:"appentry-container",children:[e.jsx(m.Header,{children:r}),e.jsxs(m.Body,{children:[e.jsx(m.Title,{children:d}),e.jsx(m.Text,{children:s}),e.jsx(A,{onClick:l,children:e.jsx(O,{})})]})]})},Q=()=>e.jsx("div",{className:"appsection-container",children:e.jsxs(u,{children:[e.jsx("h2",{children:"Applications"}),e.jsx(u,{className:"appentries-container",children:e.jsxs(F,{children:[e.jsx(p,{className:"my-2",md:!0,children:e.jsx(K,{appName:"Forums",link:"/forums",appIcon:e.jsx(L,{}),appDesc:"A platform where users can create forum groups to communicate, ask questions or share any concerns."})}),e.jsx(p,{className:"my-2",md:!0}),e.jsx(p,{className:"my-2",md:!0})]})})]})}),Z=()=>e.jsx("div",{className:"userhomescreen-container",children:e.jsx("div",{className:"primary-container",children:e.jsx(Q,{})})});export{Z as default};
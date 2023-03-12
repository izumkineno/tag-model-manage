(function(){"use strict";var t={9690:function(t,e,n){var i=n(9963),o=n(4717),l=(n(3241),n(1613),n(4408)),r=(n(9290),n(4545)),a=(n(1448),n(5064)),c=(n(7891),n(3176)),s=(n(463),n(7583)),d=(n(444),n(6252)),u=n(2262),p=n(3577),g=n(32),h=(n(1154),n(7720));const f=(0,h.Q_)("main",{persist:!0,state:()=>({sym:[["(",")"],["[","]"]],prompt:[{id:"0",name:"这里创建提示词",state:{active:!1,editing:!1,weightEditing:!1},weight:0,longText:!1,children:[]}],promptNeg:[{id:"1",name:"这里创建负面提示词",state:{active:!1,editing:!1,weightEditing:!1},weight:0,longText:!1,children:[]}]}),actions:{clickHandle(t,e,n){const i=t.ctrlKey,o=t.altKey,l=["click","contextmenu"],r=(i?o?3:1:o?2:0)+4*l.indexOf(t.type),a={0:()=>this.switch(t,e,n),1:()=>this.inputFocus(t,e,"editing",n),2:()=>this.inputFocus(t,e,"weightEditing",n),3:()=>this.delete(t,e,n),4:()=>this.contextmenu(),5:()=>this.add(t,e,n),6:()=>this.add(t,e,n),7:()=>this.longTextMode()},c=a[r];c()},pos(t,e,n,i,o){const l=t.parentElement.__draggable_component__||t.__draggable_component__,r=t.__draggable_context,a=e||Array.from(l.itemKey);let c="undefined"===typeof r?a:a.concat(r.index);i&&(c=c.slice(0,c.length-1));let s=this[n];for(let d=0;d<c.length;d++){const t=c[d],e=s[t].children;"undefined"!==typeof e&&(s=e)}return i&&o&&r?s[r.index]:s},tagModel(){const t=""+Math.random().toString(36).slice(-8);return{id:t,longText:!1,name:t,state:{active:!0,editing:!0,weightEditing:!1},weight:0}},input(t,e,n,i){const o=this.pos(t.target,e,i,!0,!0);return!(!("state"in o)||!o.state)&&(o.state[n]=!o.state[n],!0)},inputFocus(t,e,n,i){this.input(t,e,n,i)&&(0,d.Y3)((()=>{t.target&&t.target.children[0].focus()}))},switch(t,e,n){const i=this.pos(t.target,e,n,!0,!0);"state"in i&&i.state&&(i.state.active=!i.state.active)},editingInput(t){t.name=t.name.trim(),t.state.editing=!1},editingInputMulti(t,e,n,i){if(this.editingInput(e),-1!==e.name.search(",")){const o=e.name.split(","),l=t.target.__vueParentComponent.vnode.el,r=this.pos(l,n,i),a=r;a.pop();for(const t of o)if(t.length>0){const e=this.tagModel();e.name=t,e.state.editing=!1,a.push(e)}}},delete(t,e,n){const i=t.target.__draggable_context;if(i){const{index:o}=i,l=this.pos(t.target,e,n,!0);Array.isArray(l)?l.splice(o,1):l.children&&l.children.splice(o,1)}},weightInput(t){t.state.weightEditing=!1;const e=t.weight.toString();"string"===typeof t.weight&&(t.weight=0),t.weight>0&&t.weight<2&&e.length>1?t.weightNu=t.weight:(t.weightNu=void 0,t.weight=Number(t.weight.toFixed(0)))},add(t,e,n){const i=this.tagModel();t.altKey&&(i.children=[]);const o=this.pos(t.target,e,n),l=o,r=o;"undefined"!==typeof l.children?l.children.push(i):r.push(i),(0,d.Y3)((()=>{const e="undefined"!==typeof t.target.__draggable_component__,n="undefined"!==typeof t.target.__draggable_context;if(e||n){const n=t.target.lastChild.children;if(e)n[0].focus(),n[0].select();else{const e=t.target.parentElement.children,i=e[e.length-1];i.children[0].focus(),"undefined"!==typeof n&&(n[n.length-1].firstChild.focus(),n[n.length-1].firstChild.select())}}}))},output(){const t=(t,e)=>{const n=this.sym;let i;if("undefined"!==typeof t.weightNu){const o=t.weightNu;i=`${n[0][0]}${e}:${o}${n[0][1]}`}else{let o=t.weight;if(0===o)i=e;else{const t=o>0?n[0]:n[1];o=Math.abs(o);const l=e.length;i=e.padStart(l+o,t[0]).padEnd(l+2*o,t[1])}}return i},e=n=>{const i=[];return n.forEach((n=>{if(n.state.active){let o;o="undefined"===typeof n.children?t(n,n.name):t(n,e(n.children)),o.length>0&&i.push(o)}})),i.join(",")},n=e(this.prompt),i=e(this.promptNeg);console.log(n),console.log(i);try{const t=gradio_config.components;if(t){const e=[];t.forEach(((n,i)=>{if("textbox"===n.type){const o=n.props;"txt2img_prompt"===o.elem_id&&"Prompt"===o.label&&e.push(t[i]),"txt2img_neg_prompt"===o.elem_id&&"Negative prompt"===o.label&&e.push(t[i])}})),console.log(e),e[0].props.value=n,e[0].props.value=i,document.querySelector("body > gradio-app").shadowRoot.querySelector("#txt2img_generate").click()}}catch(o){console.log(o)}},contextmenu(){console.log("菜单")},longTextMode(){console.log("长文本模式")}}});var m=n(9980),y=n.n(m);const w=["onUpdate:modelValue","onBlur","onKeyup"],_=["onUpdate:modelValue","onBlur","onKeyup"],v={key:2,style:{display:"inline-block",visibility:"hidden"}},b={key:3};var x=(0,d.aZ)({__name:"nested-item",props:{children:null,type:null,index:null},setup(t){const e=t,n=f(),o={animation:200,group:"description",disabled:!1,ghostClass:"ghost"},l=(0,d.Fl)((()=>"undefined"===typeof e.index?[]:e.index)),r=t=>{const e=t.state.editing?"editing ":"",n=t.state.weightEditing?"weight ":"",i=t.state.active?"":"off ",o="undefined"!==typeof t.children?"group ":"";return o+i+e+n},a=t=>{const e=t=>.7*t+.3,n={};let i;if("undefined"!==typeof t.weightNu){const n=t.weightNu;i=n>1?`rgba(0, 200, 0, ${e(n-1)}`:`rgba(200, 0, 0, ${e(1-n)})`}else{const n=t.weight;i=0===n?"":n>0?`rgba(0, 200, 0, ${e(1.1**n-1)})`:`rgba(200, 0, 0, ${e(1-1/1.1**-n)})`}return i.length>0&&(n.background=i),n};return(c,s)=>{const g=(0,d.up)("NestedItem",!0);return(0,d.wg)(),(0,d.j4)((0,u.SU)(y()),(0,d.dG)({"item-key":"undefined"===typeof e.index?"":(0,u.SU)(l).toString(),list:t.children,class:"dragArea",tag:"ul"},o,{onClick:[s[1]||(s[1]=(0,i.iM)((e=>(0,u.SU)(n).clickHandle(e,(0,u.SU)(l),t.type)),["stop","exact"])),s[2]||(s[2]=(0,i.iM)((e=>(0,u.SU)(n).clickHandle(e,(0,u.SU)(l),t.type)),["stop","exact","ctrl"])),s[3]||(s[3]=(0,i.iM)((e=>(0,u.SU)(n).clickHandle(e,(0,u.SU)(l),t.type)),["stop","exact","alt"])),s[4]||(s[4]=(0,i.iM)((e=>(0,u.SU)(n).clickHandle(e,(0,u.SU)(l),t.type)),["stop","exact","ctrl","alt"]))],onContextmenu:[s[5]||(s[5]=(0,i.iM)((e=>(0,u.SU)(n).clickHandle(e,(0,u.SU)(l),t.type)),["prevent","stop","exact"])),s[6]||(s[6]=(0,i.iM)((e=>(0,u.SU)(n).clickHandle(e,(0,u.SU)(l),t.type)),["prevent","stop","exact","ctrl"])),s[7]||(s[7]=(0,i.iM)((e=>(0,u.SU)(n).clickHandle(e,(0,u.SU)(l),t.type)),["prevent","stop","exact","alt"])),s[8]||(s[8]=(0,i.iM)((e=>(0,u.SU)(n).clickHandle(e,(0,u.SU)(l),t.type)),["prevent","stop","exact","ctrl","alt"]))]}),{item:(0,d.w5)((({element:o})=>[(0,d._)("li",{class:(0,p.C_)([r(o),"tag-frame"]),style:(0,p.j5)(a(o))},[o.state.editing?(0,d.wy)(((0,d.wg)(),(0,d.iD)("input",{key:0,"onUpdate:modelValue":t=>o.name=t,class:"tag-input",onBlur:t=>(0,u.SU)(n).editingInput(o),onKeyup:(0,i.D2)((t=>(0,u.SU)(n).editingInputMulti(t,o,(0,u.SU)(l))),["enter"]),onClick:s[0]||(s[0]=(0,i.iM)((()=>{}),["stop"]))},null,40,w)),[[i.nr,o.name]]):(0,d.kq)("",!0),o.state.weightEditing?(0,d.wy)(((0,d.wg)(),(0,d.iD)("input",{key:1,"onUpdate:modelValue":t=>o.weight=t,class:"tag-input",max:"7",min:"-7",type:"number",onBlur:t=>(0,u.SU)(n).weightInput(o),onKeyup:(0,i.D2)((t=>(0,u.SU)(n).weightInput(o)),["enter"])},null,40,_)),[[i.nr,o.weight]]):(0,d.kq)("",!0),o.state.editing?((0,d.wg)(),(0,d.iD)("div",v,(0,p.zw)(o.name+"1"),1)):((0,d.wg)(),(0,d.iD)("span",b,(0,p.zw)(o.name),1)),o.children?((0,d.wg)(),(0,d.j4)(g,{key:4,children:o.children,index:(0,u.SU)(l).concat([e.children.indexOf(o)]),type:t.type},null,8,["children","index","type"])):(0,d.kq)("",!0)],6)])),_:1},16,["item-key","list"])}}});const k=x;var S=k;const U=(0,d._)("div",null,"提示词",-1),M=(0,d._)("div",null,"反向提示词",-1);var C=(0,d.aZ)({__name:"nested-frame",setup(t){const e=f();return(t,n)=>{const i=g.Kf;return(0,d.wg)(),(0,d.iD)(d.HY,null,[(0,d.Wm)(i,null,{header:(0,d.w5)((()=>[U])),default:(0,d.w5)((()=>[(0,d.Wm)(S,{children:(0,u.SU)(e).prompt,type:"prompt"},null,8,["children"])])),_:1}),(0,d.Wm)(i,null,{header:(0,d.w5)((()=>[M])),default:(0,d.w5)((()=>[(0,d.Wm)(S,{children:(0,u.SU)(e).promptNeg,type:"promptNeg"},null,8,["children"])])),_:1})],64)}}});const H=C;var O=H,E=n(5781),j=n(4922),N={__name:"App",setup(t){const e=f(),n=(0,u.iH)(!1),i="AI画图标签管理器",g=(0,u.iH)(),h=(0,u.iH)(),m=()=>{(0,u.SU)(h).popperRef?.delayHide?.()},y=["左键","click       启用/禁用","+ Ctr       编辑","+ Alt       权重","+ Ctr + Alt 删除","右键","click       菜单","+ Ctr       添加","+ Alt       添加组","+ Ctr + Alt 切换tag模式","点击下面空白处生成tag"];return(t,f)=>{const w=s.mi,_=c.zi,v=a.Q2,b=r.$t,x=l.Mr,k=o.zd;return(0,d.wg)(),(0,d.iD)(d.HY,null,[(0,d.Wm)(_,{offset:120},{default:(0,d.w5)((()=>[(0,d.Wm)(w,{type:"primary",icon:(0,u.SU)(E.I8b),circle:"",onClick:f[0]||(f[0]=t=>n.value=!0)},null,8,["icon"])])),_:1}),(0,d.Wm)(k,{modelValue:n.value,"onUpdate:modelValue":f[1]||(f[1]=t=>n.value=t),direction:"ltr",title:i,size:"90%"},{header:(0,d.w5)((()=>[(0,d.Wm)(v,{wrap:""},{default:(0,d.w5)((()=>[(0,d.Wm)(w,{type:"primary",onClick:(0,u.SU)(e).output},{default:(0,d.w5)((()=>[(0,d.Uk)("输出到webUI")])),_:1},8,["onClick"]),(0,d.wy)(((0,d.wg)(),(0,d.j4)(w,{ref_key:"buttonRef",ref:g},{default:(0,d.w5)((()=>[(0,d.Uk)("帮助")])),_:1})),[[(0,u.SU)(j.Z),m]])])),_:1}),(0,d.Wm)(b,{ref_key:"popoverRef",ref:h,"virtual-ref":g.value,width:200,title:"快捷键",trigger:"click","virtual-triggering":""},{default:(0,d.w5)((()=>[((0,d.wg)(),(0,d.iD)(d.HY,null,(0,d.Ko)(y,(t=>(0,d._)("div",{key:t},(0,p.zw)(t),1))),64))])),_:1},8,["virtual-ref"])])),default:(0,d.w5)((()=>[(0,d.Wm)(x,null,{default:(0,d.w5)((()=>[(0,d.Wm)(O)])),_:1})])),_:1},8,["modelValue"])],64)}}};const W=N;var I=W,A=n(3151),K=(n(4415),n(7605));const D=document.createElement("div");D.id="container",document.body.appendChild(D);const T=(0,h.WB)();T.use(K.Z),(0,i.ri)(I).use(A.Z).use(T).mount("#container")}},e={};function n(i){var o=e[i];if(void 0!==o)return o.exports;var l=e[i]={exports:{}};return t[i].call(l.exports,l,l.exports,n),l.exports}n.m=t,function(){var t=[];n.O=function(e,i,o,l){if(!i){var r=1/0;for(d=0;d<t.length;d++){i=t[d][0],o=t[d][1],l=t[d][2];for(var a=!0,c=0;c<i.length;c++)(!1&l||r>=l)&&Object.keys(n.O).every((function(t){return n.O[t](i[c])}))?i.splice(c--,1):(a=!1,l<r&&(r=l));if(a){t.splice(d--,1);var s=o();void 0!==s&&(e=s)}}return e}l=l||0;for(var d=t.length;d>0&&t[d-1][2]>l;d--)t[d]=t[d-1];t[d]=[i,o,l]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,i){var o,l,r=i[0],a=i[1],c=i[2],s=0;if(r.some((function(e){return 0!==t[e]}))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(c)var d=c(n)}for(e&&e(i);s<r.length;s++)l=r[s],n.o(t,l)&&t[l]&&t[l][0](),t[l]=0;return n.O(d)},i=self["webpackChunknoval_tag_model_manage"]=self["webpackChunknoval_tag_model_manage"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(9690)}));i=n.O(i)})();
(function(){"use strict";var e={1851:function(e,t,n){var i=n(9963),o=n(4717),a=(n(4984),n(8285),n(4408)),l=(n(5768),n(4545)),r=(n(3798),n(5064)),c=(n(4157),n(3378)),d=(n(7951),n(5381)),s=(n(3567),n(3176)),u=(n(1433),n(7583)),p=(n(8288),n(6252)),g=n(2262),f=n(3577),m=n(7720);const h=(0,m.Q_)("main",{persist:!0,state:()=>({info:{prompt:{name:"提示词",expansion:!0,type:"prompt"},promptNeg:{name:"反向提示词",expansion:!0,type:"promptNeg"},todo:{name:"待选/草稿栏",expansion:!1,type:"todo"}},config:{sym:[["(",")"],["[","]"]],switch:{autoStart:{name:"自动开始",active:!1}}},cate:[],tableData:[],prompt:[{id:"0",name:"这里创建提示词",state:{active:!1,editing:!1,weightEditing:!1},weight:0,longText:!1,children:[]}],promptNeg:[{id:"1",name:"这里创建负面提示词",state:{active:!1,editing:!1,weightEditing:!1},weight:0,longText:!1,children:[]}],todo:[]}),actions:{cerfaiSearch(e,t,n){const i="https://api.cerfai.com",o="/open/get_full_categories",a="/search_tags";if(e)return document.monkeyRequest("Get",i+o);{const e={keyword:t||"",category_id:n||""};return document.monkeyRequest("Post",i+a,e)}},clickHandle(e,t,n){const i=e.ctrlKey,o=e.altKey,a=["click","contextmenu"],l=(i?o?3:1:o?2:0)+4*a.indexOf(e.type),r={0:()=>this.switch(e,t,n),1:()=>this.inputFocus(e,t,"editing",n),2:()=>this.inputFocus(e,t,"weightEditing",n),3:()=>this.delete(e,t,n),4:()=>this.contextmenu(),5:()=>this.add(e,t,n),6:()=>this.add(e,t,n),7:()=>this.longTextMode()},c=r[l];c()},pos(e,t,n,i,o){const a=e.parentElement.__draggable_component__||e.__draggable_component__,l=e.__draggable_context,r=t||Array.from(a.itemKey);let c="undefined"===typeof l?r:r.concat(l.index);i&&(c=c.slice(0,c.length-1));let d=this[n];for(let s=0;s<c.length;s++){const e=c[s],t=d[e].children;"undefined"!==typeof t&&(d=t)}return i&&o&&l?d[l.index]:d},tagModel(e){const t=""+Math.random().toString(36).slice(-8);return{id:t,longText:!1,name:e||t,state:{active:!0,editing:!0,weightEditing:!1},weight:0}},input(e,t,n,i){const o=this.pos(e.target,t,i,!0,!0);return!(!("state"in o)||!o.state)&&(o.state[n]=!o.state[n],!0)},inputFocus(e,t,n,i){this.input(e,t,n,i)&&(0,p.Y3)((()=>{e.target&&e.target.children[0].focus()}))},switch(e,t,n){const i=this.pos(e.target,t,n,!0,!0);"state"in i&&i.state&&(i.state.active=!i.state.active)},editingInput(e){e.name=e.name.trim(),e.state.editing=!1},editingInputMulti(e,t,n){if(e.name=e.name.trim(),-1!==e.name.search(",")){const i=e.name.split(",");let o=this[n];for(const e of t)o&&(o=o[e].children);if(console.log(o,t),o){const t=o.indexOf(e);console.log(o,e,t),o.splice(t,1);for(const e of i)if(e.length>0){const t=this.tagModel();t.name=e,t.state.editing=!1,o.push(t)}}}this.editingInput(e)},delete(e,t,n){const i=e.target.__draggable_context;if(i){const{index:o}=i,a=this.pos(e.target,t,n,!0);Array.isArray(a)?a.splice(o,1):a.children&&a.children.splice(o,1)}},weightInput(e){e.state.weightEditing=!1;const t=e.weight.toString();"string"===typeof e.weight&&(e.weight=0),e.weight>0&&e.weight<2&&t.length>1?e.weightNu=e.weight:(e.weightNu=void 0,e.weight=Number(e.weight.toFixed(0)))},add(e,t,n){const i=this.tagModel();e.altKey&&(i.children=[]);const o=this.pos(e.target,t,n),a=o,l=o;"undefined"!==typeof a.children?a.children.push(i):l.push(i),(0,p.Y3)((()=>{const t="undefined"!==typeof e.target.__draggable_component__,n="undefined"!==typeof e.target.__draggable_context;if(t||n){const n=e.target.lastChild.children;if(t)n[0].focus(),n[0].select();else{const t=e.target.parentElement.children,i=t[t.length-1];i.children[0].focus(),"undefined"!==typeof n&&(n[n.length-1].firstChild.focus(),n[n.length-1].firstChild.select())}}}))},output(){const e=(e,t)=>{const n=this.config.sym;let i;if("undefined"!==typeof e.weightNu){const o=e.weightNu;i=`${n[0][0]}${t}:${o}${n[0][1]}`}else{let o=e.weight;if(0===o)i=t;else{const e=o>0?n[0]:n[1];o=Math.abs(o);const a=t.length;i=t.padStart(a+o,e[0]).padEnd(a+2*o,e[1])}}return i},t=n=>{const i=[];return n.forEach((n=>{if(n.state.active){let o;o="undefined"===typeof n.children?e(n,n.name):e(n,t(n.children)),o.length>0&&i.push(o)}})),i.join(",")},n=t(this.prompt),i=t(this.promptNeg);console.log(n),console.log(i);try{const e=gradio_config.components;if(e){const t=[];e.forEach(((n,i)=>{if("textbox"===n.type){const o=n.props;"txt2img_prompt"===o.elem_id&&"Prompt"===o.label&&t.push(e[i]),"txt2img_neg_prompt"===o.elem_id&&"Negative prompt"===o.label&&t.push(e[i])}})),console.log(t),t[0].props.value=n,t[1].props.value=i,this.config.switch.autoStart.active&&document.querySelector("body > gradio-app").shadowRoot.querySelector("#txt2img_generate").click()}}catch(o){console.log(o)}},contextmenu(){console.log("菜单")},longTextMode(){console.log("长文本模式")}}});var y=n(32),w=(n(8137),n(3632)),_=(n(4534),n(9980)),v=n.n(_);const x=["onUpdate:modelValue","onBlur","onKeyup"],b=["onUpdate:modelValue","onBlur","onKeyup"],S={key:2,style:{display:"inline-block",visibility:"hidden"}},k={key:3};var U=(0,p.aZ)({__name:"nested-item",props:{children:null,type:null,index:null},setup(e){const t=e,n=h(),o={animation:200,group:"description",disabled:!1,ghostClass:"ghost"},a=(0,p.Fl)((()=>"undefined"===typeof t.index?[]:t.index)),l=e=>{const t=e.state.editing?"editing ":"",n=e.state.weightEditing?"weight ":"",i=e.state.active?"":"off ",o="undefined"!==typeof e.children?"group ":"";return o+i+t+n},r=e=>{const t=e=>.7*e+.3,n={};let i;if("undefined"!==typeof e.weightNu){const n=e.weightNu;i=n>1?`rgba(0, 200, 0, ${t(n-1)}`:`rgba(200, 0, 0, ${t(1-n)})`}else{const n=e.weight;i=0===n?"":n>0?`rgba(0, 200, 0, ${t(1.1**n-1)})`:`rgba(200, 0, 0, ${t(1-1/1.1**-n)})`}return i.length>0&&(n.background=i),n};return(c,d)=>{const s=(0,p.up)("NestedItem",!0);return(0,p.wg)(),(0,p.j4)((0,g.SU)(v()),(0,p.dG)({"item-key":"undefined"===typeof t.index?"":(0,g.SU)(a).toString(),list:e.children,class:"dragArea",tag:"ul"},o,{onClick:[d[1]||(d[1]=(0,i.iM)((t=>(0,g.SU)(n).clickHandle(t,(0,g.SU)(a),e.type)),["stop","exact"])),d[2]||(d[2]=(0,i.iM)((t=>(0,g.SU)(n).clickHandle(t,(0,g.SU)(a),e.type)),["stop","exact","ctrl"])),d[3]||(d[3]=(0,i.iM)((t=>(0,g.SU)(n).clickHandle(t,(0,g.SU)(a),e.type)),["stop","exact","alt"])),d[4]||(d[4]=(0,i.iM)((t=>(0,g.SU)(n).clickHandle(t,(0,g.SU)(a),e.type)),["stop","exact","ctrl","alt"]))],onContextmenu:[d[5]||(d[5]=(0,i.iM)((t=>(0,g.SU)(n).clickHandle(t,(0,g.SU)(a),e.type)),["prevent","stop","exact"])),d[6]||(d[6]=(0,i.iM)((t=>(0,g.SU)(n).clickHandle(t,(0,g.SU)(a),e.type)),["prevent","stop","exact","ctrl"])),d[7]||(d[7]=(0,i.iM)((t=>(0,g.SU)(n).clickHandle(t,(0,g.SU)(a),e.type)),["prevent","stop","exact","alt"])),d[8]||(d[8]=(0,i.iM)((t=>(0,g.SU)(n).clickHandle(t,(0,g.SU)(a),e.type)),["prevent","stop","exact","ctrl","alt"]))]}),{item:(0,p.w5)((({element:o})=>[(0,p._)("li",{class:(0,f.C_)([l(o),"tag-frame"]),style:(0,f.j5)(r(o))},[o.state.editing?(0,p.wy)(((0,p.wg)(),(0,p.iD)("input",{key:0,"onUpdate:modelValue":e=>o.name=e,class:"tag-input",onBlur:e=>(0,g.SU)(n).editingInput(o),onKeyup:(0,i.D2)((t=>(0,g.SU)(n).editingInputMulti(o,(0,g.SU)(a),e.type)),["enter"]),onClick:d[0]||(d[0]=(0,i.iM)((()=>{}),["stop"]))},null,40,x)),[[i.nr,o.name]]):(0,p.kq)("",!0),o.state.weightEditing?(0,p.wy)(((0,p.wg)(),(0,p.iD)("input",{key:1,"onUpdate:modelValue":e=>o.weight=e,class:"tag-input",max:"7",min:"-7",type:"number",onBlur:e=>(0,g.SU)(n).weightInput(o),onKeyup:(0,i.D2)((e=>(0,g.SU)(n).weightInput(o)),["enter"])},null,40,b)),[[i.nr,o.weight]]):(0,p.kq)("",!0),o.state.editing?((0,p.wg)(),(0,p.iD)("div",S,(0,f.zw)(o.name+"1"),1)):((0,p.wg)(),(0,p.iD)("span",k,(0,f.zw)(o.name),1)),o.children?((0,p.wg)(),(0,p.j4)(s,{key:4,children:o.children,index:(0,g.SU)(a).concat([t.children.indexOf(o)]),type:e.type},null,8,["children","index","type"])):(0,p.kq)("",!0)],6)])),_:1},16,["item-key","list"])}}});const C=U;var W=C,M=(0,p.aZ)({__name:"nested-tags",props:{data:null,dataInfo:null},setup(e){return(t,n)=>{const i=d.OX,o=w.dq,a=y.Kf;return(0,p.wg)(),(0,p.j4)(a,{"body-style":e.dataInfo.expansion?"":{display:"none"}},{header:(0,p.w5)((()=>[(0,p.Wm)(o,{class:"row-bg",justify:"space-between"},{default:(0,p.w5)((()=>[(0,p._)("div",null,(0,f.zw)(e.dataInfo.name),1),(0,p.Wm)(i,{"v-model":e.dataInfo.expansion,"inline-prompt":""},null,8,["v-model"])])),_:1})])),default:(0,p.w5)((()=>[(0,p.Wm)(W,{children:e.data,type:e.dataInfo.type},null,8,["children","type"])])),_:1},8,["body-style"])}}});const H=M;var j=H,I=(0,p.aZ)({__name:"nested-frame",setup(e){const t=h();return(e,n)=>((0,p.wg)(),(0,p.iD)(p.HY,null,[(0,p.Wm)(j,{data:(0,g.SU)(t).todo,"data-info":(0,g.SU)(t).info.todo},null,8,["data","data-info"]),(0,p.Wm)(j,{data:(0,g.SU)(t).prompt,"data-info":(0,g.SU)(t).info.prompt},null,8,["data","data-info"]),(0,p.Wm)(j,{data:(0,g.SU)(t).promptNeg,"data-info":(0,g.SU)(t).info.promptNeg},null,8,["data","data-info"])],64))}});const O=I;var D=O,E=n(5781),N=n(4922),K=n(5531),z=(n(6199),n(6240),n(984)),V=(n(2034),n(502),n(627),(0,p.aZ)({__name:"tags-cerfai",setup(e){const t=h(),n={code:200,data:[],msg:"获取完整分类成功"},i={code:200,data:[]},o=e=>{console.log(e)},l=e=>{const n=t.tagModel(e.name);n.state.editing=!1,t.todo.push(n),t.info.todo.expansion=!0};return(e,r)=>{const c=z.E_,d=z.F8,s=z.Q8,u=a.Mr,m=K.$Y,h=K.eI,w=y.Kf;return(0,p.wg)(),(0,p.iD)(p.HY,null,[(0,g.SU)(t).cate?((0,p.wg)(),(0,p.j4)(u,{key:0,class:"menu"},{default:(0,p.w5)((()=>[(0,p.Wm)(s,{ellipsis:!1,"unique-opened":!0,"menu-trigger":"click",mode:"horizontal",onSelect:o},{default:(0,p.w5)((()=>[((0,p.wg)(!0),(0,p.iD)(p.HY,null,(0,p.Ko)(n.data.filter((e=>1===e.level)),(e=>((0,p.wg)(),(0,p.j4)(d,{key:e.id,index:e.id.toString()},{title:(0,p.w5)((()=>[(0,p.Uk)((0,f.zw)(e.name),1)])),default:(0,p.w5)((()=>[((0,p.wg)(!0),(0,p.iD)(p.HY,null,(0,p.Ko)(n.data.filter((t=>2===t.level&&(t.id/100).toFixed(0)===(e.id/100).toFixed(0))),(e=>((0,p.wg)(),(0,p.j4)(c,{key:e.id,index:e.id.toString()},{default:(0,p.w5)((()=>[(0,p.Uk)((0,f.zw)(e.name),1)])),_:2},1032,["index"])))),128))])),_:2},1032,["index"])))),128))])),_:1})])),_:1})):(0,p.kq)("",!0),(0,g.SU)(t).tableData?((0,p.wg)(),(0,p.j4)(w,{key:1},{default:(0,p.w5)((()=>[(0,p.Wm)(h,{data:i.data,size:"small",style:{width:"100%",height:"50vh"},onRowClick:l},{default:(0,p.w5)((()=>[(0,p.Wm)(m,{fixed:"",label:"词条",prop:"name"}),(0,p.Wm)(m,{fixed:"",label:"中文名",prop:"t_name"}),(0,p.Wm)(m,{label:"NFSW",prop:"is_nsfw"}),(0,p.Wm)(m,{label:"描述",prop:"desc"}),(0,p.Wm)(m,{label:"备注",prop:"remarks"}),(0,p.Wm)(m,{label:"更新时间",prop:"update_time"}),(0,p.Wm)(m,{label:"贡献者",prop:"contributor"})])),_:1},8,["data"])])),_:1})):(0,p.kq)("",!0)],64)}}})),Z=n(3744);const q=(0,Z.Z)(V,[["__scopeId","data-v-8f28d11e"]]);var A=q;const F={href:"https://github.com/izumkineno/tag-model-manage",target:"_blank",title:"项目地址"},$={"aria-hidden":"true",height:"50",style:{color:"#fff","z-index":"999",position:"fixed",top:"0",border:"0",left:"0",transform:"scale(-1, 1)"},viewBox:"0 0 250 250",width:"50"},T=(0,p._)("path",{d:"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z",style:{fill:"var(--el-color-primary)"}},null,-1),Y=(0,p._)("path",{class:"octo-arm",d:"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",fill:"currentColor",style:{"transform-origin":"130px 106px"}},null,-1),L=(0,p._)("path",{class:"octo-body",d:"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",fill:"currentColor"},null,-1),R=[T,Y,L];var B=(0,p.aZ)({__name:"App",setup(e){const t=h(),n="AI画图标签管理器",m=["左键","click       启用/禁用","+ Ctr       编辑","+ Alt       权重","+ Ctr + Alt 删除","右键","click       菜单","+ Ctr       添加","+ Alt       添加组","+ Ctr + Alt 切换tag模式","点击下面空白处生成tag"],y=(0,g.iH)(!1),w=(0,g.iH)(""),_=(0,g.iH)(),v=(0,g.iH)(),x=()=>{(0,g.SU)(v).popperRef?.delayHide?.()},b=()=>{const e=t.cerfaiSearch(!1,w.value);200===e.code&&(t.tableData=e.data)};return(e,h)=>{const S=u.mi,k=s.zi,U=d.OX,C=c.EZ,W=r.Q2,M=l.$t,H=a.Mr,j=o.zd;return(0,p.wg)(),(0,p.iD)(p.HY,null,[(0,p.Wm)(k,{offset:120},{default:(0,p.w5)((()=>[(0,p.Wm)(S,{icon:(0,g.SU)(E.I8b),circle:"",type:"primary",onClick:h[0]||(h[0]=e=>y.value=!0)},null,8,["icon"])])),_:1}),(0,p.Wm)(j,{"modal-class":"black",modelValue:y.value,"onUpdate:modelValue":h[3]||(h[3]=e=>y.value=e),title:n,direction:"ltr",size:"75%"},{header:(0,p.w5)((()=>[(0,p.Wm)(W,{wrap:""},{default:(0,p.w5)((()=>[(0,p._)("a",F,[((0,p.wg)(),(0,p.iD)("svg",$,R))]),(0,p.Wm)(S,{style:{"margin-left":"0.7rem"},type:"primary",onClick:(0,g.SU)(t).output},{default:(0,p.w5)((()=>[(0,p.Uk)("输出到webUI")])),_:1},8,["onClick"]),(0,p.Wm)(U,{modelValue:(0,g.SU)(t).config.switch.autoStart.active,"onUpdate:modelValue":h[1]||(h[1]=e=>(0,g.SU)(t).config.switch.autoStart.active=e),"active-text":(0,g.SU)(t).config.switch.autoStart.name,"inactive-text":(0,g.SU)(t).config.switch.autoStart.name,class:"ml-2","inline-prompt":""},null,8,["modelValue","active-text","inactive-text"]),(0,p.wy)(((0,p.wg)(),(0,p.j4)(S,{ref_key:"buttonRef",ref:_},{default:(0,p.w5)((()=>[(0,p.Uk)("帮助")])),_:1})),[[(0,g.SU)(N.Z),x]]),(0,p.Wm)(C,{modelValue:w.value,"onUpdate:modelValue":h[2]||(h[2]=e=>w.value=e),clearable:"",placeholder:"词条搜索（cerfai提供）",onKeyup:(0,i.D2)(b,["enter"])},null,8,["modelValue","onKeyup"]),(0,p.Wm)(S,{icon:(0,g.SU)(E.olm),circle:"",size:"small",type:"primary",onClick:b},null,8,["icon"])])),_:1}),(0,p.Wm)(M,{ref_key:"popoverRef",ref:v,"virtual-ref":_.value,width:200,title:"快捷键",trigger:"click","virtual-triggering":""},{default:(0,p.w5)((()=>[((0,p.wg)(),(0,p.iD)(p.HY,null,(0,p.Ko)(m,(e=>(0,p._)("div",{key:e},(0,f.zw)(e),1))),64))])),_:1},8,["virtual-ref"])])),default:(0,p.w5)((()=>[(0,p.Wm)(H,null,{default:(0,p.w5)((()=>[(0,p.Wm)(A),(0,p.Wm)(D)])),_:1})])),_:1},8,["modelValue"])],64)}}});const P=B;var Q=P,G=n(5098),X=(n(9673),n(7605));const J=document.createElement("div");J.id="container",document.body.appendChild(J);const ee=(0,m.WB)();ee.use(X.Z),(0,i.ri)(Q).use(G.Z).use(ee).mount("#container")}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,i,o,a){if(!i){var l=1/0;for(s=0;s<e.length;s++){i=e[s][0],o=e[s][1],a=e[s][2];for(var r=!0,c=0;c<i.length;c++)(!1&a||l>=a)&&Object.keys(n.O).every((function(e){return n.O[e](i[c])}))?i.splice(c--,1):(r=!1,a<l&&(l=a));if(r){e.splice(s--,1);var d=o();void 0!==d&&(t=d)}}return t}a=a||0;for(var s=e.length;s>0&&e[s-1][2]>a;s--)e[s]=e[s-1];e[s]=[i,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,i){var o,a,l=i[0],r=i[1],c=i[2],d=0;if(l.some((function(t){return 0!==e[t]}))){for(o in r)n.o(r,o)&&(n.m[o]=r[o]);if(c)var s=c(n)}for(t&&t(i);d<l.length;d++)a=l[d],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(s)},i=self["webpackChunknoval_tag_model_manage"]=self["webpackChunknoval_tag_model_manage"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(1851)}));i=n.O(i)})();
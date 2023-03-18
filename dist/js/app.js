(function(){"use strict";var t={9575:function(t,e,n){var i=n(9963),a=n(4717),o=(n(4984),n(8285),n(4408)),l=(n(5768),n(4545)),r=(n(3798),n(5064)),c=(n(4157),n(3378)),s=(n(7951),n(5381)),d=(n(3567),n(3176)),u=(n(1433),n(7583)),p=(n(8288),n(6252)),g=n(2262),f=n(3577),m=n(7720),h=n(1348);const y=(0,m.Q_)("main",{persist:!0,state:()=>({info:{prompt:{name:"提示词",expansion:!0,type:"prompt"},promptNeg:{name:"反向提示词",expansion:!0,type:"promptNeg"},todo:{name:"待选/草稿栏",expansion:!1,type:"todo"}},config:{sym:[["(",")"],["[","]"]],switch:{autoStart:{name:"自动开始",active:!1}}},cate:[],tableData:[],prompt:[{id:"0",name:"这里创建提示词",state:{active:!1,editing:!1,weightEditing:!1},weight:0,longText:!1,children:[]}],promptNeg:[{id:"1",name:"这里创建负面提示词",state:{active:!1,editing:!1,weightEditing:!1},weight:0,longText:!1,children:[]}],todo:[]}),actions:{cerfaiSearch(t,e,n,i){const a="https://api.cerfai.com",o="/open/get_full_categories",l="/search_tags",r={keyword:n||""};i&&(r.category_id=i);const c={method:"Post",url:t?a+o:a+l,headers:{"Content-Type":"application/json"},data:JSON.stringify(t?"":r),onload:e};document.Request(c)},tagSearch(t,e){this.cerfaiSearch(!1,(t=>{const e=JSON.parse(t.responseText);200===e.code?(this.tableData=e.data,h.z8.success(e.msg||"获取数据成功")):h.z8.error(e.msg)}),t,e)},cataGet(){this.cerfaiSearch(!0,(t=>{const e=JSON.parse(t.responseText);200===e.code?(this.cate=e.data,h.z8.success(e.msg||"获取子类成功")):h.z8.error(e.msg)}))},clickHandle(t,e,n){const i=t.ctrlKey,a=t.altKey,o=["click","contextmenu"],l=(i?a?3:1:a?2:0)+4*o.indexOf(t.type),r={0:()=>this.switch(t,e,n),1:()=>this.inputFocus(t,e,"editing",n),2:()=>this.inputFocus(t,e,"weightEditing",n),3:()=>this.delete(t,e,n),4:()=>this.contextmenu(),5:()=>this.add(t,e,n),6:()=>this.add(t,e,n),7:()=>this.longTextMode()},c=r[l];c()},pos(t,e,n,i,a){const o=t.parentElement.__draggable_component__||t.__draggable_component__,l=t.__draggable_context,r=e||Array.from(o.itemKey);let c="undefined"===typeof l?r:r.concat(l.index);i&&(c=c.slice(0,c.length-1));let s=this[n];for(let d=0;d<c.length;d++){const t=c[d],e=s[t].children;"undefined"!==typeof e&&(s=e)}return i&&a&&l?s[l.index]:s},tagModel(t){const e=""+Math.random().toString(36).slice(-8);return{id:e,longText:!1,name:t||e,state:{active:!0,editing:!0,weightEditing:!1},weight:0}},input(t,e,n,i){const a=this.pos(t.target,e,i,!0,!0);return!(!("state"in a)||!a.state)&&(a.state[n]=!a.state[n],!0)},inputFocus(t,e,n,i){this.input(t,e,n,i)&&(0,p.Y3)((()=>{t.target&&t.target.children[0].focus()}))},switch(t,e,n){const i=this.pos(t.target,e,n,!0,!0);"state"in i&&i.state&&(i.state.active=!i.state.active)},editingInput(t){t.name=t.name.trim(),t.state.editing=!1},editingInputMulti(t,e,n){if(t.name=t.name.trim(),-1!==t.name.tagSearch(",")){const i=t.name.split(",");let a=this[n];for(const t of e)a&&(a=a[t].children);if(a){const e=a.indexOf(t);a.splice(e,1);for(const t of i)if(t.length>0){const e=this.tagModel();e.name=t,e.state.editing=!1,a.push(e)}}}this.editingInput(t)},delete(t,e,n){const i=t.target.__draggable_context;if(i){const{index:a}=i,o=this.pos(t.target,e,n,!0);Array.isArray(o)?o.splice(a,1):o.children&&o.children.splice(a,1)}},weightInput(t){t.state.weightEditing=!1;const e=t.weight.toString();"string"===typeof t.weight&&(t.weight=0),t.weight>0&&t.weight<2&&e.length>1?t.weightNu=t.weight:(t.weightNu=void 0,t.weight=Number(t.weight.toFixed(0)))},add(t,e,n){const i=this.tagModel();t.altKey&&(i.children=[]);const a=this.pos(t.target,e,n),o=a,l=a;"undefined"!==typeof o.children?o.children.push(i):l.push(i),(0,p.Y3)((()=>{const e="undefined"!==typeof t.target.__draggable_component__,n="undefined"!==typeof t.target.__draggable_context;if(e||n){const n=t.target.lastChild.children;if(e)n[0].focus(),n[0].select();else{const e=t.target.parentElement.children,i=e[e.length-1];i.children[0].focus(),"undefined"!==typeof n&&(n[n.length-1].firstChild.focus(),n[n.length-1].firstChild.select())}}}))},output(){const t=(t,e)=>{const n=this.config.sym;let i;if("undefined"!==typeof t.weightNu){const a=t.weightNu;i=`${n[0][0]}${e}:${a}${n[0][1]}`}else{let a=t.weight;if(0===a)i=e;else{const t=a>0?n[0]:n[1];a=Math.abs(a);const o=e.length;i=e.padStart(o+a,t[0]).padEnd(o+2*a,t[1])}}return i},e=n=>{const i=[];return n.forEach((n=>{if(n.state.active){let a;a="undefined"===typeof n.children?t(n,n.name):t(n,e(n.children)),a.length>0&&i.push(a)}})),i.join(",")},n=e(this.prompt),i=e(this.promptNeg);try{const t=gradio_config.components;if(t){const e=[];t.forEach(((n,i)=>{if("textbox"===n.type){const a=n.props;"txt2img_prompt"===a.elem_id&&"Prompt"===a.label&&e.push(t[i]),"txt2img_neg_prompt"===a.elem_id&&"Negative prompt"===a.label&&e.push(t[i])}})),e[0].props.value=n,e[1].props.value=i,this.config.switch.autoStart.active&&document.querySelector("body > gradio-app").shadowRoot.querySelector("#txt2img_generate").click()}}catch(a){}},contextmenu(){console.log("菜单")},longTextMode(){console.log("长文本模式")}}});var w=n(32),_=(n(8137),n(3632)),v=(n(4534),n(9980)),S=n.n(v);const x=["onUpdate:modelValue","onBlur","onKeyup"],b=["onUpdate:modelValue","onBlur","onKeyup"],U={key:2,style:{display:"inline-block",visibility:"hidden"}},k={key:3};var C=(0,p.aZ)({__name:"nested-item",props:{children:null,type:null,index:null},setup(t){const e=t,n=y(),a={animation:200,group:"description",disabled:!1,ghostClass:"ghost"},o=(0,p.Fl)((()=>"undefined"===typeof e.index?[]:e.index)),l=t=>{const e=t.state.editing?"editing ":"",n=t.state.weightEditing?"weight ":"",i=t.state.active?"":"off ",a="undefined"!==typeof t.children?"group ":"";return a+i+e+n},r=t=>{const e=t=>.7*t+.3,n={};let i;if("undefined"!==typeof t.weightNu){const n=t.weightNu;i=n>1?`rgba(0, 200, 0, ${e(n-1)}`:`rgba(200, 0, 0, ${e(1-n)})`}else{const n=t.weight;i=0===n?"":n>0?`rgba(0, 200, 0, ${e(1.1**n-1)})`:`rgba(200, 0, 0, ${e(1-1/1.1**-n)})`}return i.length>0&&(n.background=i),n};return(c,s)=>{const d=(0,p.up)("NestedItem",!0);return(0,p.wg)(),(0,p.j4)((0,g.SU)(S()),(0,p.dG)({"item-key":"undefined"===typeof e.index?"":(0,g.SU)(o).toString(),list:t.children,class:"dragArea",tag:"ul"},a,{onClick:[s[1]||(s[1]=(0,i.iM)((e=>(0,g.SU)(n).clickHandle(e,(0,g.SU)(o),t.type)),["stop","exact"])),s[2]||(s[2]=(0,i.iM)((e=>(0,g.SU)(n).clickHandle(e,(0,g.SU)(o),t.type)),["stop","exact","ctrl"])),s[3]||(s[3]=(0,i.iM)((e=>(0,g.SU)(n).clickHandle(e,(0,g.SU)(o),t.type)),["stop","exact","alt"])),s[4]||(s[4]=(0,i.iM)((e=>(0,g.SU)(n).clickHandle(e,(0,g.SU)(o),t.type)),["stop","exact","ctrl","alt"]))],onContextmenu:[s[5]||(s[5]=(0,i.iM)((e=>(0,g.SU)(n).clickHandle(e,(0,g.SU)(o),t.type)),["prevent","stop","exact"])),s[6]||(s[6]=(0,i.iM)((e=>(0,g.SU)(n).clickHandle(e,(0,g.SU)(o),t.type)),["prevent","stop","exact","ctrl"])),s[7]||(s[7]=(0,i.iM)((e=>(0,g.SU)(n).clickHandle(e,(0,g.SU)(o),t.type)),["prevent","stop","exact","alt"])),s[8]||(s[8]=(0,i.iM)((e=>(0,g.SU)(n).clickHandle(e,(0,g.SU)(o),t.type)),["prevent","stop","exact","ctrl","alt"]))]}),{item:(0,p.w5)((({element:a})=>[(0,p._)("li",{class:(0,f.C_)([l(a),"tag-frame"]),style:(0,f.j5)(r(a))},[a.state.editing?(0,p.wy)(((0,p.wg)(),(0,p.iD)("input",{key:0,"onUpdate:modelValue":t=>a.name=t,class:"tag-input",onBlur:t=>(0,g.SU)(n).editingInput(a),onKeyup:(0,i.D2)((e=>(0,g.SU)(n).editingInputMulti(a,(0,g.SU)(o),t.type)),["enter"]),onClick:s[0]||(s[0]=(0,i.iM)((()=>{}),["stop"]))},null,40,x)),[[i.nr,a.name]]):(0,p.kq)("",!0),a.state.weightEditing?(0,p.wy)(((0,p.wg)(),(0,p.iD)("input",{key:1,"onUpdate:modelValue":t=>a.weight=t,class:"tag-input",max:"7",min:"-7",type:"number",onBlur:t=>(0,g.SU)(n).weightInput(a),onKeyup:(0,i.D2)((t=>(0,g.SU)(n).weightInput(a)),["enter"])},null,40,b)),[[i.nr,a.weight]]):(0,p.kq)("",!0),a.state.editing?((0,p.wg)(),(0,p.iD)("div",U,(0,f.zw)(a.name+"1"),1)):((0,p.wg)(),(0,p.iD)("span",k,(0,f.zw)(a.name),1)),a.children?((0,p.wg)(),(0,p.j4)(d,{key:4,children:a.children,index:(0,g.SU)(o).concat([e.children.indexOf(a)]),type:t.type},null,8,["children","index","type"])):(0,p.kq)("",!0)],6)])),_:1},16,["item-key","list"])}}});const W=C;var M=W,O=(0,p.aZ)({__name:"nested-tags",props:{data:null,dataInfo:null},setup(t){return(e,n)=>{const i=s.OX,a=_.dq,o=w.Kf;return(0,p.wg)(),(0,p.j4)(o,{"body-style":t.dataInfo.expansion?"":{display:"none"}},{header:(0,p.w5)((()=>[(0,p.Wm)(a,{class:"row-bg",justify:"space-between"},{default:(0,p.w5)((()=>[(0,p._)("div",null,(0,f.zw)(t.dataInfo.name),1),(0,p.Wm)(i,{modelValue:t.dataInfo.expansion,"onUpdate:modelValue":n[0]||(n[0]=e=>t.dataInfo.expansion=e),"inline-prompt":""},null,8,["modelValue"])])),_:1})])),default:(0,p.w5)((()=>[(0,p.Wm)(M,{children:t.data,type:t.dataInfo.type},null,8,["children","type"])])),_:1},8,["body-style"])}}});const H=O;var I=H,z=(0,p.aZ)({__name:"nested-frame",setup(t){const e=y();return(t,n)=>((0,p.wg)(),(0,p.iD)(p.HY,null,[(0,p.Wm)(I,{data:(0,g.SU)(e).todo,"data-info":(0,g.SU)(e).info.todo},null,8,["data","data-info"]),(0,p.Wm)(I,{data:(0,g.SU)(e).prompt,"data-info":(0,g.SU)(e).info.prompt},null,8,["data","data-info"]),(0,p.Wm)(I,{data:(0,g.SU)(e).promptNeg,"data-info":(0,g.SU)(e).info.promptNeg},null,8,["data","data-info"])],64))}});const N=z;var j=N,D=n(5781),E=n(4922),V=n(5531),K=(n(6199),n(6240),n(984)),T=(n(2034),n(502),n(627),n(6431),(0,p.aZ)({__name:"tags-cerfai",setup(t){const e=y();(0,p.bv)((()=>{try{e.cataGet()}catch(t){h.z8.error("获取分类失败："+t)}}));const n=t=>{e.tagSearch("",t.toString())},i=t=>{const n=e.tagModel(t.name);n.state.editing=!1,e.todo.push(n),e.info.todo.expansion=!0};return(t,a)=>{const l=K.E_,r=K.F8,c=K.Q8,s=o.Mr,d=V.$Y,u=V.eI,m=w.Kf;return(0,p.wg)(),(0,p.iD)(p.HY,null,[(0,p.Wm)(s,{class:"menu"},{default:(0,p.w5)((()=>[(0,p.Wm)(c,{ellipsis:!1,"unique-opened":!0,"menu-trigger":"click",mode:"horizontal",onSelect:n},{default:(0,p.w5)((()=>[((0,p.wg)(!0),(0,p.iD)(p.HY,null,(0,p.Ko)((0,g.SU)(e).cate.filter((t=>1===t.level)),(t=>((0,p.wg)(),(0,p.j4)(r,{key:t.id,index:t.id.toString()},{title:(0,p.w5)((()=>[(0,p.Uk)((0,f.zw)(t.name),1)])),default:(0,p.w5)((()=>[((0,p.wg)(!0),(0,p.iD)(p.HY,null,(0,p.Ko)((0,g.SU)(e).cate.filter((e=>2===e.level&&(e.id/100).toFixed(0)===(t.id/100).toFixed(0))),(t=>((0,p.wg)(),(0,p.j4)(l,{key:t.id,index:t.id.toString()},{default:(0,p.w5)((()=>[(0,p.Uk)((0,f.zw)(t.name),1)])),_:2},1032,["index"])))),128))])),_:2},1032,["index"])))),128))])),_:1})])),_:1}),(0,p.Wm)(m,null,{default:(0,p.w5)((()=>[(0,p.Wm)(u,{data:(0,g.SU)(e).tableData,size:"small",style:{width:"100%",height:"50vh"},onRowClick:i},{default:(0,p.w5)((()=>[(0,p.Wm)(d,{label:"词条",prop:"name"}),(0,p.Wm)(d,{label:"中文名",prop:"t_name"}),(0,p.Wm)(d,{label:"NFSW",prop:"is_nsfw"}),(0,p.Wm)(d,{label:"描述",prop:"desc"}),(0,p.Wm)(d,{label:"备注",prop:"remarks"}),(0,p.Wm)(d,{label:"更新时间",prop:"update_time"}),(0,p.Wm)(d,{label:"贡献者",prop:"contributor"})])),_:1},8,["data"])])),_:1})],64)}}})),Z=n(3744);const A=(0,Z.Z)(T,[["__scopeId","data-v-264a286a"]]);var F=A;const $={href:"https://github.com/izumkineno/tag-model-manage",target:"_blank",title:"项目地址"},Y={"aria-hidden":"true",height:"50",style:{color:"#fff","z-index":"999",position:"fixed",top:"0",border:"0",left:"0",transform:"scale(-1, 1)"},viewBox:"0 0 250 250",width:"50"},q=(0,p._)("path",{d:"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z",style:{fill:"var(--el-color-primary)"}},null,-1),L=(0,p._)("path",{class:"octo-arm",d:"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",fill:"currentColor",style:{"transform-origin":"130px 106px"}},null,-1),B=(0,p._)("path",{class:"octo-body",d:"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",fill:"currentColor"},null,-1),P=[q,L,B];var R=(0,p.aZ)({__name:"App",setup(t){const e=y(),n="AI画图标签管理器",m=["左键","click       启用/禁用","+ Ctr       编辑","+ Alt       权重","+ Ctr + Alt 删除","右键","click       菜单","+ Ctr       添加","+ Alt       添加组","+ Ctr + Alt 切换tag模式","点击下面空白处生成tag"],h=(0,g.iH)(!1),w=(0,g.iH)(""),_=(0,g.iH)(),v=(0,g.iH)(),S=()=>{(0,g.SU)(v).popperRef?.delayHide?.()},x=()=>{w.value.length>0?e.tagSearch(w.value):e.tableData=[]};return(t,y)=>{const b=u.mi,U=d.zi,k=s.OX,C=c.EZ,W=r.Q2,M=l.$t,O=o.Mr,H=a.zd;return(0,p.wg)(),(0,p.iD)(p.HY,null,[(0,p.Wm)(U,{offset:120},{default:(0,p.w5)((()=>[(0,p.Wm)(b,{icon:(0,g.SU)(D.I8b),circle:"",type:"primary",onClick:y[0]||(y[0]=t=>h.value=!0)},null,8,["icon"])])),_:1}),(0,p.Wm)(H,{"modal-class":"black",modelValue:h.value,"onUpdate:modelValue":y[3]||(y[3]=t=>h.value=t),title:n,direction:"ltr",size:"75%"},{header:(0,p.w5)((()=>[(0,p.Wm)(W,{wrap:""},{default:(0,p.w5)((()=>[(0,p._)("a",$,[((0,p.wg)(),(0,p.iD)("svg",Y,P))]),(0,p.Wm)(b,{style:{"margin-left":"0.7rem"},type:"primary",onClick:(0,g.SU)(e).output},{default:(0,p.w5)((()=>[(0,p.Uk)("输出到webUI")])),_:1},8,["onClick"]),(0,p.Wm)(k,{modelValue:(0,g.SU)(e).config.switch.autoStart.active,"onUpdate:modelValue":y[1]||(y[1]=t=>(0,g.SU)(e).config.switch.autoStart.active=t),"active-text":(0,g.SU)(e).config.switch.autoStart.name,"inactive-text":(0,g.SU)(e).config.switch.autoStart.name,class:"ml-2","inline-prompt":""},null,8,["modelValue","active-text","inactive-text"]),(0,p.wy)(((0,p.wg)(),(0,p.j4)(b,{ref_key:"buttonRef",ref:_},{default:(0,p.w5)((()=>[(0,p.Uk)("帮助")])),_:1})),[[(0,g.SU)(E.Z),S]]),(0,p.Wm)(C,{modelValue:w.value,"onUpdate:modelValue":y[2]||(y[2]=t=>w.value=t),clearable:"",placeholder:"词条搜索（cerfai提供）",onKeyup:(0,i.D2)(x,["enter"])},null,8,["modelValue","onKeyup"]),(0,p.Wm)(b,{icon:(0,g.SU)(D.olm),circle:"",size:"small",type:"primary",onClick:x},null,8,["icon"])])),_:1}),(0,p.Wm)(M,{ref_key:"popoverRef",ref:v,"virtual-ref":_.value,width:200,title:"快捷键",trigger:"click","virtual-triggering":""},{default:(0,p.w5)((()=>[((0,p.wg)(),(0,p.iD)(p.HY,null,(0,p.Ko)(m,(t=>(0,p._)("div",{key:t},(0,f.zw)(t),1))),64))])),_:1},8,["virtual-ref"])])),default:(0,p.w5)((()=>[(0,p.Wm)(O,null,{default:(0,p.w5)((()=>[(0,p.Wm)(F),(0,p.Wm)(j)])),_:1})])),_:1},8,["modelValue"])],64)}}});const G=R;var J=G,Q=n(1042),X=(n(9673),n(7605));const tt=document.createElement("div");tt.id="container",document.body.appendChild(tt);const et=(0,m.WB)();et.use(X.Z),(0,i.ri)(J).use(Q.Z).use(et).mount("#container")}},e={};function n(i){var a=e[i];if(void 0!==a)return a.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,n),o.exports}n.m=t,function(){var t=[];n.O=function(e,i,a,o){if(!i){var l=1/0;for(d=0;d<t.length;d++){i=t[d][0],a=t[d][1],o=t[d][2];for(var r=!0,c=0;c<i.length;c++)(!1&o||l>=o)&&Object.keys(n.O).every((function(t){return n.O[t](i[c])}))?i.splice(c--,1):(r=!1,o<l&&(l=o));if(r){t.splice(d--,1);var s=a();void 0!==s&&(e=s)}}return e}o=o||0;for(var d=t.length;d>0&&t[d-1][2]>o;d--)t[d]=t[d-1];t[d]=[i,a,o]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,i){var a,o,l=i[0],r=i[1],c=i[2],s=0;if(l.some((function(e){return 0!==t[e]}))){for(a in r)n.o(r,a)&&(n.m[a]=r[a]);if(c)var d=c(n)}for(e&&e(i);s<l.length;s++)o=l[s],n.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return n.O(d)},i=self["webpackChunknoval_tag_model_manage"]=self["webpackChunknoval_tag_model_manage"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(9575)}));i=n.O(i)})();
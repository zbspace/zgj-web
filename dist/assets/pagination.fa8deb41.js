import{_ as A,r as S,R as x,k as V,a as g,o as r,c as u,b as v,d as y,F as D,e as w,h as z,S as O,f as p,t as h,g as B,T as N,U as P,O as $,x as F}from"./main.962a6924.js";const R="/assets/sangedian.0883ae18.svg";const T={class:"components-table"},U={class:"switch"},I={props:{refs:{type:String,default:""},type:{type:String,default:"0"},header:{type:Array,default:[]},data:{type:Array,default:[]},isSelection:{type:Boolean,default:!1},defaultAttribute:{type:Object,default:{}}},emits:["select","select-all","selection-change","cell-click","row-click","custom-click"],setup(f,{emit:a}){const e=f;S({});function m(t,o){a("select",t,o)}function b(t){a("select-all",t)}function k(t){a("selection-change",t)}function n(t,o,s,C){a("cell-click",t,o,s,C)}function l(t,o,s){a("row-click",t,o,s)}function _(t,o,s){a("custom-click",t,o,s)}return x(()=>{}),V(()=>{}),(t,o)=>{const s=g("el-switch"),C=g("el-table-column"),j=g("el-table");return r(),u("div",T,[v(j,$(e.defaultAttribute,{refs:f.refs,data:e.data,style:{width:"100%"},onSelect:m,onSelectAll:b,onSelectionChange:k,onCellClick:n,onRowClick:l,class:"ap-table"}),{default:y(()=>[(r(!0),u(D,null,w(e.header,(i,G)=>(r(),z(C,N(P(i)),O({_:2},[i.customDisplayType=="switch"?{name:"default",fn:y(c=>[p("div",U,[v(s,{modelValue:c.row.switchValue,"onUpdate:modelValue":d=>c.row.switchValue=d},null,8,["modelValue","onUpdate:modelValue"])])])}:i.rankDisplayData&&i.rankDisplayData.length>0?{name:"default",fn:y(c=>[p("div",{class:"rankDisplayData"},[(r(!0),u(D,null,w(i.rankDisplayData.slice(0,3),(d,H)=>(r(),u("div",{class:"rankDisplayData-node",onClick:J=>_(c.$index,c.row,d)},[p("span",null,h(d.name),1)],8,["onClick"]))),256)),i.rankDisplayData.length>3?(r(),u("img",{key:0,class:"rankDisplayData-node",src:R,alt:"",onClick:d=>_(c.$index,c.row,{type:"more"})},null,8,["onClick"])):B("",!0)])])}:void 0]),1040))),256))]),_:1},16,["refs","data"])])}}},Q=A(I,[["__scopeId","data-v-e750660f"]]);const M={class:"components-pagination"},E={class:"ap-desc"},L={class:"ap-box"},q={props:{refs:{type:String,default:""},type:{type:String,default:"0"},data:{type:Object,default:{}},defaultAttribute:{type:Object,default:{}}},emits:["size-change","current-change"],setup(f,{emit:a}){const e=f;S({});function m(){let n=["page-size","default-page-size","total","page-count","pager-count","current-page","default-current-page"];for(const l in e.defaultAttribute)Object.prototype.toString.call(e.defaultAttribute[l])==="[object String]"?n.indexOf(l)>-1&&(e.defaultAttribute[l]=parseFloat(e.defaultAttribute[l])):Object.prototype.toString.call(e.defaultAttribute[l])}function b(n){a("size-change",n)}function k(n){a("current-change",n)}return x(()=>{m()}),V(()=>{}),(n,l)=>{const _=g("el-pagination");return r(),u("div",M,[p("div",E," \u5171 "+h(e.data.amount)+" \u6761\u8BB0\u5F55 \u7B2C "+h(e.data.index)+" / "+h(e.data.pageNumber)+" \u9875 ",1),p("div",L,[v(_,$(e.defaultAttribute,{onSizeChange:b,onCurrentChange:k}),{default:y(()=>[F(n.$slots,"default",{},void 0,!0)]),_:3},16)])])}}},W=A(q,[["__scopeId","data-v-f40e85ec"]]);export{W as a,Q as c};
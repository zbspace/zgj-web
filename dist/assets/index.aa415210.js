import{c as n,a as d}from"./pagination.fa8deb41.js";import{c as i}from"./searchForm.978c9621.js";import{c as s}from"./Layout.aee589ac.js";import{r as p,a as c,o as u,c as m,b as o,d as a,f as l,u as e,l as b,i as h}from"./main.962a6924.js";const y=l("div",{class:"title"},"\u9080\u8BF7\u5BA1\u6838",-1),f={class:"batch"},_=h("\u9080\u8BF7\u6CE8\u518C"),x={setup(T){const t=p({componentsSearchForm:{style:{lineStyle:{width:"30%"},labelStyle:{width:"100px"}},data:[{id:"name",label:"\u5173\u952E\u8BCD",type:"input",inCommonUse:!0,defaultAttribute:{placeholder:"\u8BF7\u8F93\u5165"}},{id:"picker",label:"\u9009\u62E9\u65F6\u95F4",type:"picker",inCommonUse:!0,defaultAttribute:{type:"daterange","start-placeholder":"Start date","end-placeholder":"End date"},style:{}},{id:"name",label:"\u8D26\u53F7",type:"select",inCommonUse:!0,defaultAttribute:{placeholder:"\u8BF7\u8F93\u5165"}}],butData:[{id:"inquire",name:"\u67E5\u8BE2",type:"click",defaultAttribute:{type:"primary"},style:{}},{id:"reset",name:"\u91CD\u7F6E",type:"click",defaultAttribute:{},style:{}}]},componentsTable:{header:[{width:50,type:"selection"},{prop:"0",label:"\u5E8F\u53F7",width:100,sortable:!0},{prop:"1",label:"\u59D3\u540D"},{prop:"2",label:"\u8D26\u53F7"},{prop:"3",label:"\u90E8\u95E8"},{prop:"4",label:"\u9080\u8BF7\u4EBA"},{prop:"5",label:"\u5BA1\u6838\u72B6\u6001"},{prop:"6",label:"\u64CD\u4F5C",rankDisplayData:[{name:"\u4FEE\u6539"}]}],data:[{1:"TradeCode21",2:"",3:"\u5F80\u5F80",4:"",5:"2022/10/30",6:""},{1:"TradeCode21",2:"",3:"\u5F80\u5F80",4:"",5:"2022/10/30",6:""},{1:"TradeCode21",2:"",3:"\u5F80\u5F80",4:"",5:"2022/10/30",6:""},{1:"TradeCode21",2:"",3:"\u5F80\u5F80",4:"",5:"2022/10/30",6:""},{1:"TradeCode21",2:"",3:"\u5F80\u5F80",4:"",5:"2022/10/30",6:""},{1:"TradeCode21",2:"",3:"\u5F80\u5F80",4:"",5:"2022/10/30",6:""},{1:"TradeCode21",2:"",3:"\u5F80\u5F80",4:"",5:"2022/10/30",6:""},{1:"TradeCode21",2:"",3:"\u5F80\u5F80",4:"",5:"2022/10/30",6:""}],defaultAttribute:{stripe:!0,"header-cell-style":{background:"var(--color-fill--1)"}}},componentsPagination:{data:{amount:400,index:1,pageNumber:80},defaultAttribute:{layout:"sizes, prev, pager, next, jumper",total:500,"page-sizes":[10,100,200,300,400],background:!0}}});return(A,C)=>{const r=c("el-button");return u(),m("div",null,[o(s,{Layout:"title,searchForm,table,pagination,batch"},{title:a(()=>[y]),searchForm:a(()=>[l("div",null,[o(e(i),{data:e(t).componentsSearchForm.data,butData:e(t).componentsSearchForm.butData,style:b(e(t).componentsSearchForm.style)},null,8,["data","butData","style"])])]),batch:a(()=>[l("div",f,[o(r,{type:"primary"},{default:a(()=>[_]),_:1})])]),table:a(()=>[l("div",null,[o(e(n),{defaultAttribute:e(t).componentsTable.defaultAttribute,data:e(t).componentsTable.data,header:e(t).componentsTable.header,isSelection:!0},null,8,["defaultAttribute","data","header"])])]),pagination:a(()=>[o(d,{data:e(t).componentsPagination.data,defaultAttribute:e(t).componentsPagination.defaultAttribute},null,8,["data","defaultAttribute"])]),_:1})])}}};export{x as default};
webpackJsonp([15],{"8tWy":function(t,e,a){"use strict";function l(t){if(""==t)return null;var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()+":"+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()}Object.defineProperty(e,"__esModule",{value:!0});var i={components:{ElForm:ElForm},data:function(){return{totalCount:0,list:[],listLoading:!1,listQuery:{pageNum:1,pageRow:50,userId:1},dialogStatus:"create",dialogFormVisible:!1,textMap:{update:"编辑",create:"编辑考勤"},tempArticle:{userName:"",startDate:"",endDate:"",remark:"",value4:1},value:"",revise:!1,add:!1,addWidth:"120px",startDate:"",endDate:"",options:[{value:1,label:"请假"},{value:2,label:"加班"},{value:3,label:"出差"}],value4:""}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.hasPerm("attendance:myList")&&(console.log(this.listQuery),this.listLoading=!0,this.api({url:"/attendance/listMyAttendance",method:"post",params:this.listQuery}).then(function(e){t.listLoading=!1;for(var a=e.list,i=0;i<a.length;i++)a[i].startDate=l(a[i].startDate),a[i].createTime=l(a[i].createTime),a[i].endDate=l(a[i].endDate),1==a[i].checkState?a[i].checkState="已处理":a[i].checkState="未处理",1==a[i].applyType?a[i].applyType="请假":2==a[i].applyType?a[i].applyType="出差":a[i].applyType="加班";t.list=e.list,t.totalCount=e.totalCount}))},handleSizeChange:function(t){this.listQuery.pageRow=t,this.handleFilter()},handleCurrentChange:function(t){this.listQuery.pageNum=t,this.getList()},getIndex:function(t){return(this.listQuery.pageNum-1)*this.listQuery.pageRow+t+1},showCreate:function(){this.tempArticle.userName="",this.tempArticle.remark="",this.dialogStatus="create",this.dialogFormVisible=!0},showUpdate:function(t){this.tempArticle.id=this.list[t].id,this.tempArticle.userName=this.list[t].userName,this.dialogStatus="update",this.dialogFormVisible=!0},createArticle:function(){var t=this,e={userName:this.tempArticle.userName,startDate:l(this.tempArticle.startDate),endDate:l(this.tempArticle.endDate),remark:this.tempArticle.remark,value:this.tempArticle.value4};console.log(e),this.api({url:"/attendance/addAttendance",method:"post",data:e}).then(function(){t.getList(),t.dialogFormVisible=!1})},updateArticle:function(){var t=this;this.api({url:"/attendance/updateAttendance",method:"post",data:this.tempArticle}).then(function(){t.getList(),t.dialogFormVisible=!1})}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-form",[a("el-form-item",[t.hasPerm("attendance:add")?a("el-button",{attrs:{type:"primary",icon:"plus"},on:{click:t.showCreate}},[t._v("添加\n        ")]):t._e()],1)],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:t.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{data:t.list,"element-loading-text":"拼命加载中",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"序号",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{domProps:{textContent:t._s(t.getIndex(e.$index))}})]}}])}),t._v(" "),a("el-table-column",{staticStyle:{width:"60px"},attrs:{align:"center",prop:"userName",label:"用户名"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"开始时间",width:"170"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.startDate))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"结束时间",width:"170"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.endDate))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"创建时间",width:"170"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.createTime))])]}}])}),t._v(" "),a("el-table-column",{staticStyle:{width:"60px"},attrs:{align:"center",prop:"applyType",label:"申请类型"}}),t._v(" "),a("el-table-column",{staticStyle:{width:"60px"},attrs:{align:"center",prop:"checkState",label:"状态"}}),t._v(" "),a("el-table-column",{staticStyle:{width:"60px"},attrs:{align:"center",prop:"remark",label:"备注"}}),t._v(" "),t.hasPerm("attendance:update")?a("el-table-column",{attrs:{align:"center",label:"管理",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",icon:"edit"},on:{click:function(a){t.showUpdate(e.$index)}}},[t._v("修改")])]}}])}):t._e()],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.listQuery.pageNum,"page-size":t.listQuery.pageRow,total:t.totalCount,"page-sizes":[10,20,50,100],layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),t._v(" "),a("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible,width:"65%"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{staticClass:"small-space",attrs:{model:t.tempArticle}},[a("el-form-item",{attrs:{label:"申请人：","label-width":t.addWidth}},[a("el-input",{model:{value:t.tempArticle.userName,callback:function(e){t.$set(t.tempArticle,"userName",e)},expression:"tempArticle.userName"}})],1),t._v(" "),a("el-row",{attrs:{type:"flex"}},[a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"开始时间：","label-width":t.addWidth}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:""},model:{value:t.tempArticle.startDate,callback:function(e){t.$set(t.tempArticle,"startDate",e)},expression:"tempArticle.startDate"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"结束时间：","label-width":t.addWidth}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:""},model:{value:t.tempArticle.endDate,callback:function(e){t.$set(t.tempArticle,"endDate",e)},expression:"tempArticle.endDate"}})],1)],1)],1),t._v(" "),a("el-row",{attrs:{type:"flex"}},[a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"理由：","label-width":t.addWidth}},[a("el-input",{model:{value:t.tempArticle.remark,callback:function(e){t.$set(t.tempArticle,"remark",e)},expression:"tempArticle.remark"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:10}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.tempArticle.value4,callback:function(e){t.$set(t.tempArticle,"value4",e)},expression:"tempArticle.value4"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),"create"==t.dialogStatus?a("el-button",{attrs:{type:"success"},on:{click:t.createArticle}},[t._v("创 建")]):a("el-button",{attrs:{type:"primary"},on:{click:t.updateArticle}},[t._v("修 改")])],1)],1)],1)},staticRenderFns:[]},s=a("VU/8")(i,r,!1,null,null,null);e.default=s.exports}});
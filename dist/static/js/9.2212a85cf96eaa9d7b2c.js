webpackJsonp([9],{U8oF:function(e,t,a){"use strict";function r(e){if(""==e)return null;var t=new Date(e);return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()}Object.defineProperty(t,"__esModule",{value:!0});var l={components:{ElForm:ElForm},data:function(){return{dialogName:"aa",checkList:[""],tableData:[],page:1,total:0,formline:{startDate:"",endDate:"",page:1,total:0},value:"",revise:!1,add:!1,addWidth:"120px",value1:"",value2:""}},methods:{handleCurrentChange:function(e){this.page=e,this.search()},search:function(){var e={startDate:r(this.formline.startDate),endDate:r(this.formline.endDate),pageIndex:this.page},t=a("1nuA"),l=this;this.$ajax.post("/cms-attendance-web/selectRetroactive",t.stringify(e)).then(function(e){var t=e.data.list;l.total=10*e.data.page.record;for(var a=0;a<t.length;a++)t[a].signInTime=r(t[a].signInTime),t[a].operatingTime=r(t[a].operatingTime),1==t[a].checkStateId?t[a].checkStateId="已处理":t[a].checkStateId="未处理";l.tableData=e.data.list})},deal:function(e){var t=this;if(0!=confirm("是否进行处理?")){var r={userRetroactiveId:e.userRetroactiveId},l=this,n=a("1nuA");this.$ajax.post("/cms-attendance-web/dealRetroactive",n.stringify(r)).then(function(e){l.revise=!1,1===e.data.num?t.$message.success("提交成功！"):t.$message.success("提交失败！"),l.search()})}},cancel:function(e){var t=this;if(0!=confirm("是否确认注销?")){var r={userRetroactiveId:e.userRetroactiveId},l=this,n=a("1nuA");this.$ajax.post("/cms-attendance-web/deleteRetroactive",n.stringify(r)).then(function(e){l.revise=!1,1===e.data.num?t.$message.success("提交成功！"):t.$message.success("提交失败！"),l.search()})}}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{margin:"25px"}},[a("el-card",{staticStyle:{height:"800px"}},[a("el-breadcrumb",{staticStyle:{height:"40px"},attrs:{"separator-class":"el-icon-arrow-right"}},[e._v(">\n      "),a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("人事管理")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("个人考勤")]),e._v(" "),a("el-breadcrumb-item",[e._v("补签处理")])],1),e._v(" "),a("el-form",{attrs:{inline:!0,size:"small",model:e.formline,"label-width":"90px"}},[a("el-form-item",{attrs:{label:"查询日期"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"开始日期"},model:{value:e.formline.startDate,callback:function(t){e.$set(e.formline,"startDate",t)},expression:"formline.startDate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"至","label-width":"25px"}},[a("el-date-picker",{attrs:{type:"date",format:"yyyy-MM-dd",placeholder:"结束日期"},model:{value:e.formline.endDate,callback:function(t){e.$set(e.formline,"endDate",t)},expression:"formline.endDate"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.search()}}},[e._v("查询")])],1)],1),e._v(" "),a("div",{staticStyle:{height:"30px"}}),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{prop:"userRetroactiveId",label:"补签编号",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"用户名",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"userClassesChildRecordId",label:"班次",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"signInTime",label:"签到时间",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"operatingTime",label:"操作时间",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"checkmanId",label:"审批人",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"checkStateId",label:"审批状态",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"applyForReason",label:"理由",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"备注"}}),e._v(" "),a("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.cancel(t.row)}}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.deal(t.row)}}},[e._v("处理")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:e.total},on:{"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var i=a("VU/8")(l,n,!1,function(e){a("vfJ7")},null,null);t.default=i.exports},qmC9:function(e,t,a){(e.exports=a("FZ+f")(!0)).push([e.i,"\n.el-checkbox+.el-checkbox {\n  margin-right: 20px;\n  margin-left: 0px;\n}\n","",{version:3,sources:["G:/6.13/vue/src/views/deal/DealRetroactive.vue"],names:[],mappings:";AACA;EACE,mBAAmB;EACnB,iBAAiB;CAClB",file:"DealRetroactive.vue",sourcesContent:["\n.el-checkbox+.el-checkbox {\n  margin-right: 20px;\n  margin-left: 0px;\n}\n"],sourceRoot:""}])},vfJ7:function(e,t,a){var r=a("qmC9");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("a2943892",r,!0)}});
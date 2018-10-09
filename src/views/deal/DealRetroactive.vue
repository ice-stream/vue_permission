<template>
  <div style="margin: 25px">
    <el-card style="height: 800px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="height: 40px">>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>人事管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">个人考勤</el-breadcrumb-item>
        <el-breadcrumb-item>补签处理</el-breadcrumb-item>
      </el-breadcrumb>

      <el-form  :inline="true" size="small" :model="formline" label-width="90px">
        <el-form-item label="查询日期">
          <el-date-picker
            v-model="formline.startDate"
            type="date"

            placeholder="开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="至" label-width="25px">
          <el-date-picker
            v-model="formline.endDate"
            type="date"
            format="yyyy-MM-dd"
            placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
        </el-form-item>

      </el-form>


      <div style="height: 30px"></div>
      <el-table  :data="tableData" border highlight-current-row style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column  prop="userRetroactiveId" label="补签编号" width="150"></el-table-column>
        <el-table-column  prop="userName" label="用户名" width="150"></el-table-column>
        <el-table-column  prop="userClassesChildRecordId" label="班次" width="150"></el-table-column>
        <el-table-column  prop="signInTime" label="签到时间" width="150"></el-table-column>
        <el-table-column  prop="operatingTime" label="操作时间" width="150"></el-table-column>
        <el-table-column  prop="checkmanId" label="审批人" width="150"></el-table-column>
        <el-table-column  prop="checkStateId" label="审批状态" width="150"></el-table-column>
        <el-table-column  prop="applyForReason" label="理由" width="150"></el-table-column>
        <el-table-column  prop="remark" label="备注" ></el-table-column>
        <el-table-column
          prop=""
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="cancel(scope.row)">删除</el-button>
            <el-button size="mini" type="danger" @click="deal(scope.row)">处理</el-button>
          </template>

        </el-table-column>
      </el-table>

      <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next":total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>


  function getHoursTime(date) {
    if(date==""){return null}
    var newDate = new Date(date);
    var year = newDate.getFullYear();
    var month = newDate.getMonth() + 1;
    var day = newDate.getDate();
    var  hours=newDate.getHours();
    var  minute=newDate.getMinutes();
    var  seconds=newDate.getSeconds();
    return year + "-" + month + "-" + day+":"+hours+":"+minute+":"+seconds;
  }


  function getDateTime(date) {
    if(date==""){return null}
    var newDate = new Date(date);
    var year = newDate.getFullYear();
    var month = newDate.getMonth() + 1;
    var day = newDate.getDate();
    return year + "-" + month + "-" + day;
  }


  export default {

    components: {ElForm},
    data() {
      return {
        dialogName:'aa',
        checkList: ['',],
        tableData:[],
        page:1,
        total:0,

        formline: {
          startDate: '',
          endDate:'',
          page:1,
          total:0,



        },
        value: '',
        revise:false,
        add: false,
        addWidth: '120px',
        value1: '',
        value2: ''
      }
    },
//    created(){
//      this.search()
//    },

    methods:{

      //分页
      handleCurrentChange(val){
        this.page = val;
        this.search();
      },

      search:function () {
        var formData={
          startDate:getDateTime(this.formline.startDate),
          endDate:getDateTime(this.formline.endDate),
          pageIndex:this.page,
        }
        var qs = require('querystring')
        var _self = this;
        this.$ajax.post('/cms-attendance-web/selectRetroactive',
          qs.stringify(formData)).then(function(result){
          var list = result.data.list;
          _self.total=result.data.page.record*10;
          for(var i=0;i<list.length;i++){

            list[i].signInTime = getDateTime(list[i].signInTime);
            list[i].operatingTime = getDateTime(list[i].operatingTime);
            if(list[i].checkStateId==1){
              list[i].checkStateId="已处理";
            }else{
              list[i].checkStateId="未处理";
            }
          }
          _self.tableData=result.data.list;
        })
      },



      //处理
      deal(row){
        var r = confirm("是否进行处理?");
        if(r==false){return}
        var formData={

          userRetroactiveId:row.userRetroactiveId,

        }
        var _self = this;
        var qs = require('querystring');
        this.$ajax.post('/cms-attendance-web/dealRetroactive',
          qs.stringify(formData)).then((response) => {
          _self.revise = false
          if (response.data.num === 1) {
            this.$message.success('提交成功！')


          } else {
            this.$message.success('提交失败！')

          }
        _self.search();
        })
      },
      //注销
      cancel(row){
        var r = confirm("是否确认注销?");
        if(r==false){return}
        var formData={
          userRetroactiveId:row.userRetroactiveId,
        }
        var _self = this;
        var qs = require('querystring');
        this.$ajax.post('/cms-attendance-web/deleteRetroactive',
          qs.stringify(formData)).then((response) => {
          _self.revise = false
          if (response.data.num === 1) {
            this.$message.success('提交成功！')
            //  跳转到登录成功页

          } else {
            this.$message.success('提交失败！')

          }
        _self.search();
        })
      },

    }



  }
</script>

<style>
  .el-checkbox+.el-checkbox {
    margin-right: 20px;
    margin-left: 0px;
  }
</style>

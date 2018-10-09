<template>
  <div style="margin: 25px">
    <el-card style="height: 800px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="height: 40px">>
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>考勤系统</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/staff' }">个人考勤</el-breadcrumb-item>
        <el-breadcrumb-item>个人补签</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form  :inline="true" size="small" :model="formline" label-width="90px">
        <el-form-item label="查询日期">
          <el-date-picker
            v-model="formline.startDate"
            type="date"
            format="yyyy-MM-dd"
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

        <el-form-item>
          <el-button type="warning" @click="revise = true">新增</el-button>
        </el-form-item>

      </el-form>


      <div style="height: 30px"></div>
      <el-table  :data="tableData" border highlight-current-row style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column  prop="userRetroactiveId" label="补签编号" width="100"></el-table-column>
        <el-table-column  prop="userName" label="用户名" width="200"></el-table-column>
        <el-table-column  prop="signInTime" label="签到时间" width="200"></el-table-column>
        <el-table-column  prop="operatingTime" label="操作时间" width="200"></el-table-column>
        <el-table-column  prop="checkmanId" label="审批人" width="200"></el-table-column>
        <el-table-column  prop="checkStateId" label="审批状态" width="200"></el-table-column>
        <el-table-column  prop="applyForReason" label="理由" width="200"></el-table-column>
        <el-table-column  prop="remark" label="备注" ></el-table-column>
      </el-table>

      <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next":total="total">
      </el-pagination>

      <el-dialog title="补签申请" :visible.sync="revise" width="65%">
      <el-form :model="form">
        <el-form-item label="申请人：" :label-width="addWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-row type="flex">
          <el-col :span="10">
            <el-form-item label="时间："  :label-width="addWidth">
              <el-date-picker
                v-model="form.signInTime"
                type="datetime"
                placeholder="签到时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="10">
            <el-form-item label="理由："  :label-width="addWidth">
              <el-input v-model="form.applyforreason"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="revise = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>


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
        tableData: [{

        }],
        formline: {
          startDate: '',
          endDate:'',
          page:1,
          total:0,
          uid:''

        },


        form: {
          name: '',
          signintime:'',
          applyforreason:'',
          operationUserId:''

        },

        value: '',
        revise:false,
        add: false,
        addWidth: '120px',

      }
    },
    methods: {
      //分页
      handleCurrentChange(val){
        this.page = val;
        this.search();
      },

      search:function () {
        var user = sessionStorage.getItem('user');
        if (user) {
          user= JSON.parse(user);
        }

        var formData={
          startDate:getDateTime(this.formline.startDate),
          endDate:getDateTime(this.formline.endDate),
          pageIndex:this.page,
          uid: user.uid

        }
        var qs = require('querystring')
        var _self = this;
        this.$ajax.post('/cms-attendance-web/selectMyRetroactive',
          qs.stringify(formData)).then(function (result) {
          var list = result.data.list;
          _self.total=result.data.page.record*10;
          for (var i = 0; i < list.length; i++) {

            list[i].signInTime = getHoursTime(list[i].signInTime);

            list[i].operatingTime = getHoursTime(list[i].operatingTime);
            if(list[i].checkType==1){
              list[i].checkType="已处理";
            }else{
              list[i].checkType="未处理";
            }
          }
          _self.tableData=result.data.list;
        })
      },

      submitForm: function (form) {

        var user = sessionStorage.getItem('user');
        if (user) {
          user= JSON.parse(user);
        }

        var formData = {
          userName: this.form.name,
          signInTime: getHoursTime(this.form.signInTime),
          applyForReason: this.form.applyforreason,
          operationUserId:user.uid,

        }

        var qs = require('querystring')
        var _self = this;
        this.$ajax.post('/cms-attendance-web/addRetroactive',
          qs.stringify(formData)).then((response) => {
          _self.revise = false
          if (response.data.num === 1) {
            this.$message.success('提交成功！')


          } else {
            this.$message.success('提交失败！')

          }

        })


      }

    }
  }
</script>

<style>
  .el-checkbox+.el-checkbox {
    margin-right: 20px;
    margin-left: 0px;
  }
</style>

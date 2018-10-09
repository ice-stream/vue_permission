<template>
  <div style="margin: 25px">
    <el-card style="height: 900px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="height: 40px">>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>人事管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">巡岗管理</el-breadcrumb-item>
        <el-breadcrumb-item>巡岗查询</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form  :inline="true" size="small" :model="formline" label-width="90px">
        <el-form-item>
          <el-button type="primary" @click="search()"size="medium" >查询</el-button>
        </el-form-item>

      </el-form>


      <template>
        <vue-event-calendar :events="demoEvents" >

        </vue-event-calendar>
      </template>

      </el-card>


  </div>
</template>

<script>

  let today = new Date()
  export default {
    name: 'app',
    data () {
      return {
        demoEvents: [{
          date: '',
          title:'',
          desc: ''
        },],

        uid:'',


    }
    },

    methods: {

      search:function () {
     /*   this.demoEvents[0].title="巡岗";
        this.demoEvents[0].desc="路线地点";*/
        var user = sessionStorage.getItem('user');
        if (user) {
          user= JSON.parse(user);
        }

        var formData={
          uid: user.uid

        }
        var qs = require('querystring')
        var _self = this;
        this.$ajax.post('/cms-attendance-web/getPatrolById',
          qs.stringify(formData)).then(function(result){
          var patDate= result.data.patDate;
          var userName=result.data.userName;
          var  addnessInfo=result.data.addnessInfo;

          console.log(patDate)
          console.log(userName)
          console.log(addnessInfo)
           _self.demoEvents[0].date=patDate;
            _self.demoEvents[0].title=userName;
            _self.demoEvents[0].desc=addnessInfo;




        })




      },


      handleDayChanged (data) {
        console.log('date-changed', data)
      },
      handleMonthChanged (data) {
        console.log('month-changed', data)
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


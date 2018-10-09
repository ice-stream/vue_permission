<template>
  <div style="margin: 25px">
    <el-card style="height: 800px">

      <el-breadcrumb separator-class="el-icon-arrow-right" style="height: 30px">>
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>巡岗系统</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/staff' }">个人巡岗</el-breadcrumb-item>
        <el-breadcrumb-item>巡岗签到</el-breadcrumb-item>
      </el-breadcrumb>

      <el-form  :inline="true" size="small" :model="formline" label-width="90px">

        <el-form-item>
          <el-button type="primary" @click="submitForm1()"size="medium" >巡岗签到</el-button>
        </el-form-item>

      </el-form>

    </el-card>
  </div>
</template>

<script>


  Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;

  }

  //调用：
  var time1 = new Date().Format("yyyy-MM-dd hh:mm:ss ");
  var time2 = new Date().Format("hh:mm:ss");



  export default {

    components: {ElForm},
    data() {
      return {
        dialogName:'aa',
        checkList: ['',],
        tableData: [{

        }],

        userId:'',
        signInTime:'',
        value: '',
        revise:false,
        add: false,
        addWidth: '120px',

      }
    },
    methods: {
      submitForm1: function (form) {

        var user = sessionStorage.getItem('user');
        if (user) {
          user= JSON.parse(user);
        }
        var formData = {
          userId: user.uid
        }

        var qs = require('querystring')
        var _self = this;
        this.$ajax.post('/cms-attendance-web/siginPatrol',
          qs.stringify(formData)).then((response) => {
          if (response.data.num === 1) {
            this.$message.success('签到成功！')

          } else {
            this.$message.success('签到失败！')

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

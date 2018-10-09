<template>
  <div style="margin: 25px">
    <el-card style="height: 800px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="height: 40px">>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>人事管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">个人考勤</el-breadcrumb-item>
        <el-breadcrumb-item>签到页面</el-breadcrumb-item>
      </el-breadcrumb>






      <div class="home">
        <table  cellspacing="1" cellpadding="1" >
          <thead id="thead">
          <tr>
            <td>日</td>
            <td>一</td>
            <td>二</td>
            <td>三</td>
            <td>四</td>
            <td>五</td>
            <td>六</td>
          </tr>
          </thead>
          <tbody id="tbody"></tbody>
        </table>
        <button id="button" class="float"  @click="submitForm()" >签到</button>
        <button id="button2" class="float">本月已签</button>
      </div>
    </el-card>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        uid:''
      }
    },
    mounted () {
      this.init();
    },
    methods:{
      init() {
        $(function(){
          var sliarrn=[15,17,16,18]
          var $thead=$('#thead'),
            $tbody=$('#tbody'),
            $button=$('#button'),
            $button2=$('#button2'),
            wk=true,
            slidate=new Date(),
            _nullnei='',
            de=slidate.getDate()+1;
          var monthFirst = new Date(slidate.getFullYear(), parseInt(slidate.getMonth()), 1).getDay();//获取当月的1日等于星期几
          var d = new Date(slidate.getFullYear(), parseInt(slidate.getMonth() + 1), 0); //获取月
          var conter=d.getDate();//获取当前月的天数

          //遍历日历网格
          for(var i=1; i<=6;i++){
            _nullnei+="<tr>";
            for(var j=1; j<=7;j++)
            {
              _nullnei+='<td></td>';
            }
            _nullnei+="</tr>";
          }
          $tbody.html(_nullnei);

          //遍历网格内容
          var $slitd=$tbody.find("td");
          for(var i=0; i<conter; i++)
          {
            $slitd.eq(i+monthFirst).html("<p>"+parseInt(i+1)+"</p>")
          }

          Funback();//给当前日加样式
          Funmore();//本月未签到样式
          Funmonth();//查询已签到
          $button.on("click",function(){

            if(wk==true)
            {
              sliarrn.push(de-1);//把当日传入已签
              Funmonth();	//再次查询签到
              alert('已签到');
            }
          })
          $button2.on("click",function(){



            alert('你本月已签到'+  sliarrn.length  +'次')
          })
          function Funback(){
            $slitd.eq(parseInt(de)).addClass('color')
          }

          function Funmore(){
            for(var i=0; i<de; i++)
            {
              $slitd.eq(i).addClass('weiqian')
            }
          }
          function Funmonth(){
            for(var i=0; i<conter; i++)
            {
              for(var j=0; j<sliarrn.length;j++)
              {
                if(i==sliarrn[j])
                {
                  $slitd.eq(i+1).addClass('los')
                }
              }
            }
          }
        })


      },
      submitForm:function (form) {

        var user = sessionStorage.getItem('user');
        if (user) {
          user= JSON.parse(user);
        }

        var formData = {
          userId: user.uid

        }
        console.log(formData.userId)
        var qs = require('querystring')
        var _self = this;
        this.$ajax.post('/cms-attendance-web/addAttendance',
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

<style >
  *{margin: 0; padding: 0;}
  .home{ width: 700px; margin: auto; background: #D2691E;}
  .home thead>tr>td{ width: 100px; height: 40px; text-align: center; color: #fff;}
  .home tbody>tr>td{ width: 100px; height: 100px; margin: 1px; background: #ececec; text-align: center;}
  .float{ float: left;}
  #button,#button2{ width: 300px;height: 80px; font-size: 50px;}
  #button2{ margin-left: 100px;}
  .color{ color: red; font-size: 30px;}
  .los{ color: #008573;font-size: 30px;}
  .weiqian{color: #03A9F4; font-size: 30px;}


</style>

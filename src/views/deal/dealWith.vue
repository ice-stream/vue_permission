<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
              highlight-current-row>
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span v-text="getIndex(scope.$index)"> </span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="userName" label="用户名" style="width: 60px;"></el-table-column>


      <el-table-column align="center" label="开始时间" width="170">
        <template slot-scope="scope">
          <span>{{scope.row.startDate}}</span>
        </template>
      </el-table-column>



      <el-table-column align="center" label="结束时间" width="170">
        <template slot-scope="scope">
          <span>{{scope.row.endDate}}</span>
        </template>
      </el-table-column>



      <el-table-column align="center" label="创建时间" width="170">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="applyType" label="申请类型" style="width: 60px;">

      </el-table-column>

      <el-table-column align="center" prop="checkState" label="状态" style="width: 60px;">

      </el-table-column>

      <el-table-column align="center" label="审核时间" width="170">
        <template slot-scope="scope">
          <span>{{scope.row.checkTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="checkMan" label="审核人" style="width: 60px;">

      </el-table-column>



      <el-table-column align="center" prop="remark" label="备注" style="width: 60px;"></el-table-column>
      <el-table-column align="center" label="管理" width="200" v-if="hasPerm('attendance:update')">
        <template slot-scope="scope">
          <el-button type="primary" icon="edit" @click="showUpdate(scope.$index)">处理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNum"
      :page-size="listQuery.pageRow"
      :total="totalCount"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="65%">
      <el-form class="small-space" :model="tempArticle" >
        <el-form-item label="申请人：" :label-width="addWidth">
          <el-input v-model="tempArticle.userName"></el-input>
        </el-form-item>

        <el-row type="flex">
          <el-select v-model="tempArticle.value4" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="success" @click="createArticle">创 建</el-button>
        <el-button type="primary" v-else @click="updateArticle">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form";

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



  export default {
    components: {ElForm},
    data() {
      return {
        totalCount: 0, //分页组件--数据总条数
        list: [],//表格的数据
        listLoading: false,//数据加载等待动画
        listQuery: {
          pageNum: 1,//页码
          pageRow: 50,//每页条数

        },
        dialogStatus: 'create',
        dialogFormVisible: false,
        textMap: {
          update: '编辑',
          create: '编辑考勤'
        },
        tempArticle: {
          id: "",
          userName: "",
          value4:1
        },
        value: '',
        revise:false,
        add: false,
        addWidth: '120px',

        options: [{
          value: 0,
          label: '不批准'
        }, {
          value: 1,
          label: '批准'
        }],
        value4:''
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        //查询列表
        if (!this.hasPerm('attendance:list')) {
          return
        }

        this.listLoading = true;
        this.api({
          url: "/attendance/listAttendance",
          method: "post",
          params: this.listQuery
        }).then(data => {
          this.listLoading = false;

          let list=data.list;
          for(var i=0;i<list.length;i++){
            list[i].startDate = getHoursTime(list[i].startDate);
            list[i].createTime = getHoursTime(list[i].createTime);
            list[i].endDate = getHoursTime(list[i].endDate);
            list[i].checkTime = getHoursTime(list[i].checkTime);
            if(list[i].checkState==1){
              list[i].checkState="已处理";
            }else{
              list[i].checkState="未处理";
            }

          }
          this.list = data.list;
          this.totalCount = data.totalCount;
        })
      },
      handleSizeChange(val) {
        //改变每页数量
        this.listQuery.pageRow = val
        this.handleFilter();
      },
      handleCurrentChange(val) {
        //改变页码
        this.listQuery.pageNum = val
        this.getList();
      },
      getIndex($index) {
        //表格序号
        return (this.listQuery.pageNum - 1) * this.listQuery.pageRow + $index + 1
      },

      showUpdate($index) {
        //显示修改对话框
        this.tempArticle.id = this.list[$index].id;
        this.tempArticle.userName = this.list[$index].userName;
        this.dialogStatus = "update"
        this.dialogFormVisible = true
      },

      updateArticle() {


        let  formData={
          id:  this.tempArticle.id,
          userName:this.tempArticle.userName,
          value:this.tempArticle.value4
        }
        console.log(formData)
        //保存新文章




        //修改文章
        this.api({
          url: "/attendance/dealAttendance",
          method: "post",
          data: formData
        }).then(() => {
          this.getList();
          this.dialogFormVisible = false
        })
      },







    }
  }
</script>

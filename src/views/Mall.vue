<template>

<el-row style="height:500px">
          <el-dialog
            :title="会员信息"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <!-- 用户的表单信息 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="食材" prop="name">
                    <el-input placeholder="请输入食材" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="剩余" prop="num">
                  <el-input v-model="form.num"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button @click="handleAdd" type="primary" size="small" style="margin-bottom:10px">
                + 新增
            </el-button>
        </div>
  <el-col :span="6" v-for="(food, index) in shicai" :key="index" :offset="index > 0 ? 0.5 : 0" style="padding:0 10px 10px 0"  >
    <el-card :body-style="{ padding: '0px' }">
      <img :src="food.img" class="image">
      <div style="padding: 10px;">
        <h4>{{food.name}}</h4><br>
        <div class="xinxi">
          <p>价格:</p>
          <span style="color:red;width:20%">￥{{food.price}}</span>
          <p>剩余:</p>
          <span style="color:#666;width:20%">{{food.num}}份</span>
        </div>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate | shijianfilter("yyy-mm-dd hh:mm:ss") }}</time>
          <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="handleEdit">修改</el-button>
              <el-button type="primary" size="small" @click="open">下架</el-button>
          </span>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
</template>

<script>
export default {
  data() {
    return {
      shicai:[
        {
          name:'鲜牛肉',
          price:38,
          num: 30,
          img:require("../assets/images/1.png")
        },
         {
          name:'鸭肠',
          price:18,
          num: 44,
          img:require("../assets/images/2.png")
        },
         {
          name:'招牌虾滑',
          price:28,
          num: 56,
          img:require("../assets/images/3.png")
        },
         {
          name:'青笋',
          price:18,
          num: 24,
          img:require("../assets/images/4.png")
        },
         {
          name:'红糖糍粑',
          price:18,
          num: 28,
          img:require("../assets/images/5.png")
        },
         {
          name:'海带苗',
          price:6,
          num: 30,
          img:require("../assets/images/6.png")
        },
         {
          name:'羊羔肉',
          price:32,
          num: 30,
          img:require("../assets/images/7.png")
        },
         {
          name:'牛肉',
          price:32,
          num: 30,
          img:require("../assets/images/IMG_3095.png")
        },
         {
          name:'牛肉',
          price:32,
          num: 30,
          img:require("../assets/images/IMG_3095.png")
        },
         {
          name:'牛肉',
          price:32,
          num: 30,
          img:require("../assets/images/IMG_3095.png")
        }
        , {
          name:'牛肉',
          price:32,
          num: 30,
          img:require("../assets/images/IMG_3095.png")
        }
      ],
      currentDate: new Date(),
      dialogVisible: false,
        form: {
          name: '',
          price: '',
          num: '',
      },
      
    }
  },
  filters:{
    shijianfilter:function(value,args){
      var dt = new Date(value)

      var y = dt.getFullYear()
      //这里month得加1
      var m = dt.getMonth()+1
      var d = dt.getDate()
      //如果要求的时间格式只有年月日
      if(args.toLowerCase() === "yyy-mm-dd"){
          return `${y}-${m}-${d}`
      //如果时间要求精确到时分秒
      }else{
          var hh = dt.getHours()
          var mm = dt.getMinutes()
          var ss = dt.getSeconds();
          return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
      }
    }
  },
   methods: {
      open() {
        this.$confirm('下架此商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleAdd(){
        this.modalType = 0
        this.dialogVisible = true
      },
      cancel(){
        this.dialogVisible = false
      },
      submit(){
        this.dialogVisible = false
        this.$refs.form.resetFields()
      },
      handleEdit() {
        this.modalType = 1
        this.dialogVisible = true
      },
    }

}
</script>

<style>
  .time {
    margin-right: 10px;
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    margin: 0;
    float: right;
  }

  .image {
    width: 300px;
    height: 220px;
    display: block;

  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .el-main{
    height: 500px;
  }
  .xinxi{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-button{
    margin-left: 5px;
  }
</style>
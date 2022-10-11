<template>
  <div class="bg">
    <el-form ref="form" :model="form" label-width="70px" :rules="rules" :inline="true" class="login-container">
    <h3 class="login_title">木木火锅后台管理系统</h3>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="submit" style="margin-left: 105px;margin-top: 10px;" type="primary">登录</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Mock from 'mockjs' // eslint-disable-line no-unused-vars
import Cookie from 'js-cookie'
import {getMenu} from '../api'
export default {
  data(){
    return{
      form:{
        username:'',
        password:''
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ]
      }
    }
  },
  methods:{
    submit(){
      // const token =  Mock.Random.guid()

      this.$refs.form.validate((valid)=>{
        if(valid){
          getMenu(this.form).then(({data})=>{
            if(data.code === 20000){
              //token信息存入cookie用于不同页面的通信
              Cookie.set('token',data.data.token)
              // 获取菜单的数据，存入store中
              this.$store.commit('setMenu', data.data.menu)
              this.$store.commit('addMenu', this.$router)
              //跳转到首页
              this.$router.push('/home')
            }else{
              this.$message.error(data.data.message);
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.bg{
  width:100%;
  height:100%;
  position:fixed;
  background: url('../assets/images/zzz.png') center center no-repeat;
  background-size: 100% 100%;
}
.login-container {
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: rgba(241, 236, 236, 0.4);
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .login_title {
        text-align: center;
        margin-bottom: 40px;
        color: #8f1d22;
    }
    .el-input {
        width: 198px;
    }
}
/deep/.el-form-item__label {
  color: #ffffff;
}
/deep/.el-button--primary{
  background-color: #8f1d22;
  border-color: #8f1d22;
}
</style>
<template>
  <el-row>
    <el-col :span="8" style="padding-right:10px">
      <el-card class="box-card">
       <div class="user">
         <img src="../assets/images/IMG_3095.png" alt="">
         <div class="userinfo">
           <p class="name">木木火锅</p>
           <p class="access">后台管理员</p>
         </div>
       </div>
       <div class="login-info">
         <p>上次登录时间：<span>2022-10-09</span></p>
         <p>上次登录地点：<span>安徽.淮北</span></p>
         <p>本次登录门店：<span>淮北万达广场店</span></p>
       </div>
      </el-card>
      <el-card style="margin-top:20px;height:340px">
        <el-table :data="tableData" style="width: 100%" height="340">
          <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val" />
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left:10px">
      <div class="num1">
        <el-card v-for="item in countData" :key="item" :body-style="{display:'flex', padding:0}">
          <i class="icon" :class="'el-icon-'+item.icon" :style="{background:item.color}"></i>
            <div class="detail">
              <p class="num">{{item.value}}</p>
              <p class="txt">{{item.name}}</p>
            </div>
        </el-card>
      </div>
      <el-card style="height:240px;">
        <div ref="echarts1" style="height:240px"></div>
      </el-card>
        <div class="graph">
            <el-card style="height:200px;">
              <div ref="echarts2" style="height:200px"></div>
            </el-card>
            <el-card style="height:200px;">
              <div ref="echarts3" style="height:180px"></div>
            </el-card>
        </div>
    </el-col>
  </el-row>
</template>

<script>
import {getData} from '../api'
import * as echarts from 'echarts'

export default {
  data(){
    return{
      tableData:[],
      tableLabel:{
        name:'食材',
        todayBuy:'今日销量',
        monthBuy: '本月销量',
        totalBuy:'累计销量'
      },
      countData: [
        {
          name: "今日小桌数",
          value: 123,
          icon: "sunny",
          color: "#2ec7c9",
        },
        {
          name: "今日中桌数",
          value: 81,
          icon: "dish",
          color: "#ffb980",
        },
        {
          name: "今日大桌数",
          value: 34,
          icon: "fork-spoon",
          color: "#5ab1ef",
        },
        {
          name: "本月小桌数",
          value: 4234,
          icon: "sunny",
          color: "#2ec7c9",
        },
        {
          name: "本月中桌数",
          value: 1490,
          icon: "dish",
          color: "#ffb980",
        },
        {
          name: "本月大桌数",
          value: 990,
          icon: "fork-spoon",
          color: "#5ab1ef",
        },
      ]
    }
  },
  mounted(){
    getData().then(({data})=>{
      const {tableData} = data.data
      this.tableData= tableData

      const echarts1 = echarts.init(this.$refs.echarts1) 
      var echarts1Option = {} 
      const {orderData,userData,videoData} = data.data // eslint-disable-line no-unused-vars
      const xAxis = Object.keys(orderData.data[0])
      echarts1Option.xAxis = {
        data:xAxis
      }
      echarts1Option.yAxis = { }
      echarts1Option.legend = {
        data:xAxis
      }
      echarts1Option.title = {
          text: '本周最受欢迎的食材销量',
          top: "20px",
          left: "35%",
          fontSize: "8px",
          fontWeight: 200,
      }
      echarts1Option.series=[]
      xAxis.forEach(key => {
        echarts1Option.series.push({
          name:key,
          data:orderData.data.map(item => item[key]),
          type:'line'
        })
      })
      echarts1.setOption(echarts1Option)

      const echarts2 = echarts.init(this.$refs.echarts2)  // eslint-disable-line no-unused-vars
      const echarts2Option = {
        title: {
          text: '本周会员变化',
          bottom: "20px",
          left: "35%",
          fontSize: "5px",
          fontWeight: "lighter",
        },
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map(item=>item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name:'新增会员',
            data:userData.map(item=>item.new),
            type:'bar'
          },
          {
            name:'活跃会员',
            data:userData.map(item=>item.active),
            type:'bar'
          }
        ],
      }
      echarts2.setOption(echarts2Option)

       const echarts3 = echarts.init(this.$refs.echarts3)  // eslint-disable-line no-unused-vars
       const echarts3Option = {
        title: {
          text: '销量占比',
          top: "2px",
          left: "2px",
          fontSize: "5px",
        },
         tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
            "#e94829"
          ],
          series: [
            {
              data:videoData,
              type:'pie'
            }
          ],
       }
       echarts3.setOption(echarts3Option)
    })

    
  }
}
</script>

<style lang="less" scoped>
  .user{
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    img{
      margin-right: 40px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
  .userinfo{
    .name{
      font-size: 32px;
      margin-top: 10px;
    }
    .access{
      color: #999;
    }
  }
  .login-info{
    p{
    line-height: 28px;
    font-size: 14px;
    color: #999;
      span{
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .num1{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .icon{
      width: 60px;
      height: 60px;
      font-size: 20px;
      text-align: center;
      line-height: 60px;
      color: #fff;
    }
    .detail{
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num{
        font-size: 20px;
        margin-bottom: 10px;
        line-height: 20px;
        height: 20px;
      }
      .txt{
        font-size: 10px;
        color: #999;
        text-align: center;
      }
    }
    .el-card{
        margin-bottom: 20px;
        width: 32%;
    }
  }
  .graph{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card{
      width: 48%;
    }
  }
</style>
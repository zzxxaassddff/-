//home.js
 
// mock数据模拟
import Mock from 'mockjs'
 
// 图表数据
let List = []
export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数100到800之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 8; i++) {
      List.push(
        Mock.mock({
          麻辣毛肚: Mock.Random.float(100, 800, 0, 0),
          鲜牛肉: Mock.Random.float(100, 800, 0, 0),
          羊肉: Mock.Random.float(100, 800, 0, 0),
          午餐肉: Mock.Random.float(100, 800, 0, 0),
          金针菇: Mock.Random.float(100, 800, 0, 0),
          可口可乐: Mock.Random.float(100, 800, 0, 0),
          虾滑: Mock.Random.float(100, 800, 0, 0)
        })
      )
    }
    return {
      code: 1000,
      data: {
        // 饼图
        videoData: [
          {
            name: '麻辣毛肚',
            value: 20
          },
          {
            name: '鲜牛肉',
            value: 18
          },
          {
            name: '羊肉',
            value: 15
          },
          {
            name: '午餐肉',
            value: 22
          },
          {
            name: '金针菇',
            value: 22
          },
          {
            name: '可口可乐',
            value: 16
          },
          {
            name: '虾滑',
            value: 25
          }
        ],
        // 柱状图
        userData: [
          {
            date: '周一',
            new: 5,
            active: 100
          },
          {
            date: '周二',
            new: 10,
            active: 80
          },
          {
            date: '周三',
            new: 12,
            active: 67
          },
          {
            date: '周四',
            new: 23,
            active: 130
          },
          {
            date: '周五',
            new: 35,
            active: 250
          },
          {
            date: '周六',
            new: 43,
            active: 370
          },
          {
            date: '周日',
            new: 33,
            active: 270
          }
        ],
        // 折线图
        orderData: {
          date: ['20220901', '20220902', '20220903', '20220904', '20220905', '20220906', '20220907'],
          data: List
        },
        tableData: [
          {
            name: '麻辣毛肚',
            todayBuy: 50,
            monthBuy: 350,
            totalBuy: 2200
          },
          {
            name: '鲜牛肉',
            todayBuy: 30,
            monthBuy: 220,
            totalBuy: 2400
          },
          {
            name: '羊肉',
            todayBuy: 80,
            monthBuy: 450,
            totalBuy: 6500
          },
          {
            name: '午餐肉',
            todayBuy: 120,
            monthBuy: 650,
            totalBuy: 4500
          },
          {
            name: '金针菇',
            todayBuy: 30,
            monthBuy: 200,
            totalBuy: 3400
          },
          {
            name: '可口可乐',
            todayBuy: 150,
            monthBuy: 1200,
            totalBuy: 7000
          },
          {
            name: '虾滑',
            todayBuy: 50,
            monthBuy: 300,
            totalBuy: 2200
          }
        ]
      }
    }
  }
}
import echarts from '@/echarts'
// 导入地图数据
import chinaMap from '@/assets/json/china.json'
// 注册地图
echarts.registerMap('china', chinaMap)

export default function (el: HTMLElement) {
  const myChart = echarts.init(el)
  // 绘制图表
  const setOption = (options: any) => {
    myChart.setOption(options)
  }
  // 图表重绘函数
  const updateResize = () => {
    myChart.resize()
  }
  // 监听窗口变化，重绘图表
  window.addEventListener('resize', () => {
    updateResize()
  })
  return {
    myChart,
    updateResize,
    setOption
  }
}

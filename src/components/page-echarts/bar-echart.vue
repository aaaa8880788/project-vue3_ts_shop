<template>
  <div
    class="echarts"
    ref="echartsRef"
    :style="{ height: height, width: width }"
  ></div>
</template>

<script setup lang="ts">
import useEchart from '@/hooks/use-echart'
import echarts from '@/echarts'
import {
  computed,
  defineProps,
  withDefaults,
  ref,
  onMounted,
  watchEffect
} from 'vue'
interface Props {
  seriesData: any[]
  xAxisData: any[]
  width?: string
  height?: string
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '500px'
})

const options = computed(() => {
  return {
    xAxis: {
      data: props.xAxisData,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      },
      splitLine: {
        show: false
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    tooltip: {
      // trigger: 'axis',
      // axisPointer: {
      //   type: 'shadow'
      // }
    },
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: props.seriesData
      }
    ]
  }
})

// 基于准备好的dom，初始化echarts实例
const echartsRef = ref<HTMLElement>()

onMounted(() => {
  const { setOption, myChart } = useEchart(echartsRef.value!)
  watchEffect(() => {
    setOption(options.value)
  })
  const zoomSize = 6
  myChart.on('click', function (params: any) {
    myChart.dispatchAction({
      type: 'dataZoom',
      startValue: props.xAxisData[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
        props.xAxisData[
          Math.min(params.dataIndex + zoomSize / 2, props.seriesData.length - 1)
        ]
    })
  })
})
</script>

<style scoped></style>

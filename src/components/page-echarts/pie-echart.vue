<template>
  <div
    class="echarts"
    ref="echartsRef"
    :style="{ height: height, width: width }"
  ></div>
</template>

<script setup lang="ts">
import type { IDataType } from './type'
import useEchart from '@/hooks/use-echart'
import {
  computed,
  defineProps,
  withDefaults,
  ref,
  onMounted,
  watchEffect
} from 'vue'
interface Props {
  pieData: IDataType[]
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '500px'
})

const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'center'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        center: ['50%', '55%'],
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
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
})
</script>

<style scoped></style>

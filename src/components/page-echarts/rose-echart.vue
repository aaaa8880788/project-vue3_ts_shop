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
  roseData: IDataType[]
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
      trigger: 'item',
      formatter: function (params: any) {
        return `${params.marker}${params.name} : ${params.value} (${params.percent}%)`
      }
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        type: 'pie',
        radius: [5, 130],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        center: ['50%', '55%'],
        data: props.roseData
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

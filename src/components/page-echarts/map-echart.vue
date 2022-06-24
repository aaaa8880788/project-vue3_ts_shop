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
import { convertData } from './utils/convert-data'
import {
  computed,
  defineProps,
  withDefaults,
  ref,
  onMounted,
  watchEffect
} from 'vue'
interface Props {
  mapData: IDataType[]
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

    geo: {
      map: 'china',

      aspectScale: 0.75,

      layoutCenter: ['50%', '51.5%'], //地图位置

      layoutSize: '118%',

      roam: false, //关闭缩放

      itemStyle: {
        borderColor: 'rgba(147, 235, 248, 1)',

        borderWidth: 0.5,

        color: {
          type: 'linear-gradient',

          x: 0,

          y: 1500,

          x2: 2500,

          y2: 0,

          colorStops: [
            {
              offset: 0,

              color: '#009DA1' // 0% 处的颜色
            },
            {
              offset: 1,

              color: '#005B9E' // 50% 处的颜色
            }
          ],

          global: true // 缺省为 false
        },

        opacity: 0.5
      },
      regions: [
        {
          name: '南海诸岛',

          itemStyle: {
            areaColor: 'rgba(0, 10, 52, 1)',

            borderColor: 'rgba(0, 10, 52, 1)'
          },

          emphasis: {
            areaColor: 'rgba(0, 10, 52, 1)',

            borderColor: 'rgba(0, 10, 52, 1)'
          }
        }
      ],
      emphasis: {
        itemStyle: {
          areaColor: '#2a333d'
        }
      },

      z: 2
    },

    series: [
      {
        name: '销量',
        type: 'map',
        map: 'china',
        aspectScale: 0.75,
        layoutCenter: ['50%', '50%'], //地图位置
        layoutSize: '128%',
        roam: false, //关闭缩放
        itemStyle: {
          borderColor: 'rgba(147, 235, 248, 0.6)',
          borderWidth: 0.8,
          areaColor: {
            type: 'linear-gradient',
            x: 0,
            y: 1200,
            x2: 1000,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#009DA1' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#005B9E' // 50% 处的颜色
              }
            ],
            global: true // 缺省为 false
          }
        },
        emphasis: {
          label: {
            show: false
          },
          itemStyle: {
            areaColor: 'rgba(147, 235, 248, 0)'
          }
        },
        zlevel: 1,
        data: props.mapData,
        tooltip: {
          formatter: function (params: any) {
            return `${params.marker}${params.name}`
          }
        }
      },
      {
        name: '销量',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: convertData(props.mapData),
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        emphasis: {
          scale: 'true'
        },
        tooltip: {
          formatter: function (params: any) {
            return `销量<br />${params.marker}${params.name}:${params.value[2]}`
          }
        },
        label: {
          show: false
        },
        itemStyle: {
          color: 'rgba(255, 225, 0, 1)',
          shadowBlur: 10,
          shadowColor: 'rgba(255, 225, 0, 1)'
        },
        zlevel: 1
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

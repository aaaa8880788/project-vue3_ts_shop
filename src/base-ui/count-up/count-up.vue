<template>
  <span ref="countRef" />
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, ref, watch, onMounted } from 'vue'
import { CountUp } from 'countup.js'
import type { CountUpOptions } from 'countup.js'
interface Props {
  number: number
  options?: object
}
const props = withDefaults(defineProps<Props>(), {
  number: 0,
  options: () => ({})
})

// 定义属性
const defaultOptions: CountUpOptions = {
  decimalPlaces: 2, // 保留两位
  duration: 2, // 动画时长
  separator: ',', // 千位分割
  decimal: '.', // 小数分割
  prefix: '￥' // 单位
}

const countRef = ref<HTMLDivElement | null>(null)
const instance = ref<CountUp | null>(null)

watch(
  () => props.number,
  () => {
    update(props.number)
  }
)
onMounted(() => {
  createCounter()
})

const createCounter = () => {
  if (!countRef.value) return
  const opts: CountUpOptions = { ...defaultOptions, ...props.options }
  instance.value = new CountUp(countRef?.value, props.number, opts)
  start()
}

const start = () => {
  if (!instance.value) return
  instance?.value.start()
}
const update = (number: number) => {
  if (!instance.value) return
  instance?.value.update(number)
}
</script>

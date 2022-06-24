<template>
  <div class="page-count-up">
    <BuCard :title="panelData.title">
      <div class="title">
        <count-up
          :number="panelData.number1"
          :options="panelData.amount === 'saleroom' ? options2 : options1"
        ></count-up>
      </div>
      <div class="content">
        <div class="tip">
          <span>{{ panelData.tips }}</span>
        </div>
        <div class="count">
          <count-up
            :number="panelData.number2"
            :options="panelData.amount === 'saleroom' ? options2 : options1"
          ></count-up>
        </div>
      </div>
    </BuCard>
  </div>
</template>

<script setup lang="ts">
import countUp from '@/base-ui/count-up/count-up.vue'
import BuCard from '@/base-ui/card/card.vue'
import { defineProps, withDefaults } from 'vue'
import type { IPanelData } from './type'
interface Props {
  panelData: IPanelData
}
const props = withDefaults(defineProps<Props>(), {
  panelData: () => ({
    title: '默认标题',
    tips: '小提示',
    number1: 5000,
    number2: 5000
  })
})

const options1 = {
  decimalPlaces: 0,
  prefix: ''
}
const options2 = {
  decimalPlaces: 0,
  prefix: '￥' // 单位
}
</script>

<style scoped lang="less">
.page-count-up {
  text-align: left;
  .title {
    font-size: 30px;
    font-weight: 700;
  }
  .content {
    margin-top: 10px;
    display: flex;
    color: rgb(156, 156, 156);
    .tip {
      margin-right: 10px;
    }
  }
}
</style>

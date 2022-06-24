<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in goodsAmountCount" :key="item.title">
        <el-col :md="12" :lg="6" :xl="6">
          <page-count-up :panelData="item"></page-count-up>
        </el-col>
      </template>
    </el-row>
    <el-row class="row" :gutter="10">
      <el-col :span="7">
        <BuCard title="分类商品数量（饼图）">
          <pie-echart :pieData="goodsCategoryCount"></pie-echart>
        </BuCard>
      </el-col>
      <el-col :span="10">
        <BuCard title="不同城市商品销量">
          <map-echart :mapData="goodsAddressSale"></map-echart>
        </BuCard>
      </el-col>
      <el-col :span="7">
        <BuCard title="分类商品数量（玫瑰图）">
          <rose-echart :roseData="goodsCategoryCount"></rose-echart>
        </BuCard>
      </el-col>
    </el-row>
    <el-row class="row" :gutter="10">
      <el-col :span="12">
        <BuCard title="分类商品销量">
          <line-echart v-bind="goodsCategorySale"></line-echart>
        </BuCard>
      </el-col>
      <el-col :span="12">
        <BuCard title="分类商品收藏">
          <bar-echart v-bind="goodsCategoryFavor"></bar-echart>
        </BuCard>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { computed, watchEffect } from 'vue'
import BuCard from '@/base-ui/card/card.vue'
import pieEchart from '@/components/page-echarts/pie-echart.vue'
import roseEchart from '@/components/page-echarts/rose-echart.vue'
import lineEchart from '@/components/page-echarts/line-echart.vue'
import barEchart from '@/components/page-echarts/bar-echart.vue'
import mapEchart from '@/components/page-echarts/map-echart.vue'
import pageCountUp from '@/components/page-count-up/page-count-up.vue'

const store = useStore()
// 发送网络请求商品分类图表数据
store.dispatch('main/getGoodsCategoryDataAction')

const goodsCategoryCount = computed(() => {
  return store.state.main.goodsCategoryCount.map((item) => {
    return {
      name: item.name,
      value: item.goodsCount
    }
  })
})
const goodsCategorySale = computed(() => {
  const xAxisData: string[] = []
  const seriesData: any[] = []
  const SaleData = store.state.main.goodsCategorySale
  for (const item of SaleData) {
    xAxisData.push(item.name)
    seriesData.push(item.goodsCount)
  }
  return { xAxisData, seriesData }
})
const goodsCategoryFavor = computed(() => {
  const xAxisData: string[] = []
  const seriesData: any[] = []
  const SaleData = store.state.main.goodsCategoryFavor
  for (const item of SaleData) {
    xAxisData.push(item.name)
    seriesData.push(item.goodsFavor)
  }
  return { xAxisData, seriesData }
})
const goodsAddressSale = computed(() => {
  return store.state.main.goodsAddressSale.map((item) => {
    return {
      name: item.address,
      value: item.count
    }
  })
})
const goodsAmountCount = computed(() => {
  return store.state.main.goodsAmountList
})
</script>

<style scoped lang="less">
.dashboard {
  padding: 20px;
}
.row {
  margin-top: 20px;
}
</style>

<template>
  <div>
    <div class="VueTimeSlot">
      <div class="VueTimeSlotList">
        <div
          class="VueTimeSlotItems"
          v-for="(item, index) in times"
          :key="index"
        >
          {{ getItemsSection(index) }}
          <div
            class="VueTimeSlotBox"
            :class="{
              VueTimeSlotBoxSelect: BlueBox.includes(index),
              VueTimeSlotBoxItems: getItemsSection(index)
            }"
            @mouseover="ItmeListOnMouseover(index)"
            @click="ItmeListOnclick(index)"
          ></div>
          {{ index }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const times = ref<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

const BlueBox = ref<number[]>([])
const TimeItems = ref<number[]>([])
const ItmeListOnclick = (id: number) => {
  BlueBox.value.push(id)
  if (BlueBox.value.length > 2) {
    BlueBox.value = []
    TimeItems.value = []
    BlueBox.value.push(id)
  }
}

const ItmeListOnMouseover = (id: number) => {
  if (BlueBox.value.length == 1) {
    TimeItems.value[0] = id
  }
}

const getItemsSection = (id: number) => {
  let flag = false
  if (id > BlueBox.value[0]) {
    flag = id > BlueBox.value[0] && id < TimeItems.value[0]
  } else {
    flag = id < BlueBox.value[0] && id > TimeItems.value[0]
  }
  return flag
}
</script>

<style lang="scss" scoped>
.VueTimeSlot {
  .VueTimeSlotList {
    display: flex;
    .VueTimeSlotItems {
      // background-color: red;
      display: inline-block;
      padding: 30px 0px;
      &:last-child {
        .VueTimeSlotBox {
          border-right: 1px #ccc solid;
        }
      }
      .VueTimeSlotBox {
        width: 50px;
        height: 20px;
        border: 1px #ccc solid;
        border-right: none;
        cursor: pointer;
      }
      .VueTimeSlotBoxSelect {
        background-color: rgb(50, 150, 250) !important;
      }
      .VueTimeSlotBoxItems {
        background-color: rgba(50, 150, 250, 0.3);
      }
    }
  }
}
</style>

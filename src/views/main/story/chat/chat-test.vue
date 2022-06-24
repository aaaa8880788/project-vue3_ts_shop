<template>
  <div class="chat">
    <el-form>
      <el-form-item label="测试1">
        <el-select v-model="test1" @change="selectChange" clearable>
          <el-option label="存在" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测试2" v-if="test2">
        <el-input></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const test1 = ref('')
const test2 = ref(false)
const selectChange = (val: any) => {
  test2.value = false
  console.log(val)
  if (val === 1) {
    console.log(val)
    test2.value = true
  }
}
</script>

<style scoped></style>

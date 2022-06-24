<template>
  <div id="not-found">
    <div class="box">
      <h1>Page Not Found</h1>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
#not-found {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .box {
    width: 600px;
    height: 300px;
    background-color: rgb(111, 255, 0);
    border-radius: 20px;
    h1 {
      line-height: 300px;
      text-align: center;
      margin: 0;
    }
  }
}
</style>

<template>
  <div class="alert-box">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.alert-box {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
  color: #fe4657;
  background-color: #fddfe2;
  border-left: 10px solid #fe4657;
}
</style>

<template>
  <el-header class="shadow">
    <el-row type="flex" align="middle" justify="space-between">
      <h5 class="hidden-xs-only">
        <i class="el-icon-s-data" /> Pumpkins
        <small>球鞋数据库</small>
      </h5>
      <el-menu :default-active="activeIndex" mode="horizontal" :router="true">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/trending">人气单品</el-menu-item>
        <el-menu-item index="/starlist">收藏夹</el-menu-item>
        <el-menu-item index="/cargo">仓库</el-menu-item>
      </el-menu>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeIndex: this.$route.path
    };
  },
  watch: {
    $route(to) {
      this.activeIndex = to.path;
    },
  },
};
</script>

<style></style>

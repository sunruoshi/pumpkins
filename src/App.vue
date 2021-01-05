<template>
  <el-container>
    <div id="app" class="app">
      <router-view name="Header" />
      <router-view name="Main" />
      <el-backtop target=".app"></el-backtop>
    </div>
  </el-container>
</template>

<style lang="scss">
.app {
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  font-family: "Helvetica Neue", "PingFang SC";
}
body {
  margin: 0;
}
.main {
  min-height: 100%;
}
.muted {
  color: #909399;
}
.aside {
  padding: 20px;
}
.shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.empty {
  height: 100%;
}
.alert {
  margin-bottom: 5px;
}
.badge-corner {
  margin-top: 10px;
}
.loading {
  height: 80vh;
}
.row-margin {
  margin-top: 20px;
}
.card-group {
  margin-bottom: 16px;
}
.tag {
  margin-right: 10px;
}
.chart {
  width: 100%;
  height: 400px;
}
</style>

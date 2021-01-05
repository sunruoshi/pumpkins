<template>
  <el-container class="main">
    <el-aside class="aside shadow hidden-xs-only">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="star">
          <template v-slot:title>
            <i class="el-icon-star-off"></i>收藏夹<el-badge
              :value="starList.length"
              v-if="starList.length > 0"
            ></el-badge>
          </template>
          <div v-if="starList.length == 0">
            <el-row type="flex" align="middle" justify="center">
              <p class="muted">无内容</p>
            </el-row>
          </div>
          <el-row>
            <el-col v-for="index in starList.length" :key="index">
              <Card
                :form="starList[index - 1]"
                v-if="starList.indexOf(starList[index - 1]) !== -1"
              />
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item name="log">
          <template v-slot:title>
            <i class="el-icon-odometer"></i>活动日志
          </template>
          <el-alert
            v-for="(log, index) in consoleLog"
            :key="index"
            :title="consoleLog[index].title"
            :description="consoleLog[index].description"
            :type="consoleLog[index].type"
            show-icon
          >
          </el-alert>
        </el-collapse-item>
        <el-collapse-item name="info">
          <template v-slot:title>
            <i class="el-icon-warning-outline"></i>使用说明
          </template>
          <div class="badge-corner">
            <el-badge value="beta">
              <el-tag type="info" size="medium" effect="dark">仓库</el-tag>
            </el-badge>
            <p>
              点击卡片左上角搜索图表可查看鞋款详细价格。点击价格表最右侧可将对应尺码添加到仓库。点击仓库库存列表最右侧按钮可将该条目从仓库移除。
            </p>
          </div>
          <div>
            <el-tag type="info" size="medium" effect="dark">收藏夹</el-tag>
            <p>
              点击卡片右上角星标可将鞋款添加到收藏夹。再次点击可以取消收藏。
            </p>
          </div>
          <div>
            <el-tag type="info" size="medium" effect="dark"
              >localStorage</el-tag
            >
            <p>仓库与收藏夹数据同步保存在浏览器localStorage中。</p>
          </div>
          <div>
            <el-tag type="info" size="medium" effect="dark">搜索</el-tag>
            <p>只支持搜索英文关键词。</p>
          </div>
          <div>
            <el-tag type="info" size="medium" effect="dark">涨幅</el-tag>
            <p>涨幅为StockX全码最低出价与发售价之间的差值。负数即低于原价。</p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="about">
          <template v-slot:title>
            <i class="header-icon el-icon-cpu"></i>关于此应用
          </template>
          <div>
            <el-badge type="success" value="Vue.js"></el-badge>
            <el-badge type="danger" value="Vuex"></el-badge>
            <el-badge type="primary" value="Element-UI"></el-badge>
            <el-badge type="primary" value="Echarts"></el-badge>
            <el-badge type="info" value="sam@teamzoon.com"></el-badge>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-aside>
    <router-view></router-view>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  name: "Main",
  components: {
    Card: defineAsyncComponent(() =>
      import(/* webpackChunkName: "card" */ "../components/Card.vue")
    )
  },
  computed: {
    ...mapState({
      consoleLog: state => state.consoleLog,
      rate: state => state.rate,
      updateTime: state => state.updateTime,
      newError: state => state.newError,
      starList: state => state.starList
    })
  },
  data() {
    return {
      activeName: "info"
    };
  },
  watch: {
    updateTime: function() {
      this.$message({
        showClose: true,
        message: "数据已更新",
        type: "success"
      });
    },
    newError: function() {
      this.$message({
        showClose: true,
        message: this.newError,
        type: "error"
      });
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style></style>

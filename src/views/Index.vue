<template>
  <el-container>
    <el-main>
      <div
        v-if="isLoading"
        v-loading="isLoading"
        element-loading-text="数据加载中"
        element-loading-spinner="el-icon-loading"
        class="loading"
      ></div>
      <el-row type="flex" align="middle" justify="space-between">
        <div>
          <el-input
            type="text"
            size="small"
            v-model="inputKeywords"
            placeholder="搜索"
            prefix-icon="el-icon-search"
            @change="getProduct(inputKeywords)"
          >
          </el-input>
        </div>
        <small v-if="!isLoading" class="muted"
          ><i class="el-icon-refresh" /> 数据更新: {{ updateTime }}</small
        >
      </el-row>
      <div v-if="!isLoading" class="row-margin">
        <el-image
          src="https://tva1.sinaimg.cn/large/0081Kckwly1gll0yelcevj31kj0i8ami.jpg"
        ></el-image>
        <el-row type="flex" align="middle" justify="space-between">
          <h4>我的收藏夹</h4>
        </el-row>
        <div v-if="starList.length == 0">
          <el-row type="flex" align="middle" justify="center" class="loading">
            <p class="muted">无内容</p>
          </el-row>
        </div>
        <el-row>
          <el-col
            :xl="4"
            :md="6"
            :xs="12"
            v-for="index in starList.length"
            :key="index"
            class="card-group"
          >
            <el-space wrap size="large">
              <Card :form="starList[index - 1]" />
            </el-space>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  name: "Trending",
  components: {
    Card: defineAsyncComponent(() =>
      import(/* webpackChunkName: "card" */ "../components/Card.vue")
    )
  },
  data() {
    return {};
  },
  computed: {
    inputKeywords: {
      get() {
        return this.$store.state.inputKeywords;
      },
      set(inputKeywords) {
        this.$store.commit("updateInputKeywords", inputKeywords);
      }
    },
    ...mapState({
      updateTime: state => state.updateTime,
      isLoading: state => state.isLoading,
      starList: state => state.starList
    })
  },
  methods: {
    getProduct(kwd) {
      this.$router.push({ name: "product" });
      this.$store.dispatch("product/getProduct", kwd);
    }
  },
  created: function() {
    this.$store.commit("newUpdateTime", new Date().toLocaleTimeString());
  }
};
</script>

<style></style>

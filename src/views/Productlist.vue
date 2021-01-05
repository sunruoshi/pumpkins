<template>
  <el-container>
    <el-main>
      <el-page-header @back="goBack" content="查询结果"> </el-page-header>
      <el-divider></el-divider>
      <div
        v-if="isLoading"
        v-loading="isLoading"
        element-loading-text="数据加载中"
        element-loading-spinner="el-icon-loading"
        class="loading"
      ></div>
      <div v-if="!isLoading">
        <el-card v-if="productData.source.length > 0">
          <Chart id="product" :dataset="productData" :series="series" />
        </el-card>
        <el-row class="row-margin" :gutter="16">
          <el-col
            :xl="4"
            :md="6"
            :xs="12"
            v-for="index in productList.length"
            :key="index"
            class="card-group"
          >
            <Card :form="productList[index - 1]" />
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
  name: "Productlist",
  components: {
    Card: defineAsyncComponent(() =>
      import(/* webpackChunkName: "card" */ "../components/Card.vue")
    ),
    Chart: defineAsyncComponent(() =>
      import(/* webpackChunkName: "chart" */ "../components/Chart.vue")
    )
  },
  data() {
    return {
      series: [
        { name: "发售价", type: "bar", stack: "总价" },
        {
          name: "涨幅",
          type: "bar",
          stack: "总价"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      productList: state => state.product.productList,
      productData: state => state.product.productData,
      isLoading: state => state.isLoading
    })
  },
  methods: {
    goBack() {
      this.$store.commit(
        "updateConsoleLog",
        {
          title: "返回上级页面",
          description: new Date().toLocaleTimeString(),
          type: "info"
        },
        { root: true }
      );
      this.$store.commit("updateInputKeywords", "");
      this.$router.go(-1);
    }
  }
};
</script>

<style></style>

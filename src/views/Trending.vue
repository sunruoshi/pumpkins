<template>
  <el-container>
    <el-main>
      <div v-if="isLoading">
        <el-card><el-skeleton :rows="5" animated/></el-card>
        <el-card class="row-margin"><el-skeleton :rows="5" animated/></el-card>
      </div>
      <el-card v-if="trendData.source.length > 0">
        <Chart id="trending" :dataset="trendData" :series="series" />
      </el-card>
      <div class="row-margin">
        <el-row :gutter="16">
          <el-col
            :xl="4"
            :md="6"
            :xs="12"
            v-for="index in list.length"
            :key="index"
            class="card-group"
          >
            <Card :form="list[index - 1]" />
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
    ),
    Chart: defineAsyncComponent(() =>
      import(/* webpackChunkName: "chart" */ "../components/Chart.vue")
    )
  },
  data() {
    return {
      series: [
        {
          name: "发售价",
          type: "bar",
          stack: "总价"
        },
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
      list: state => state.trending.list,
      trendData: state => state.trending.trendData,
      isLoading: state => state.isLoading
    })
  },
  methods: {},
  created() {
    if (this.list.length === 0) {
      this.$store.dispatch("trending/fetchTrending");
    }
  }
};
</script>

<style></style>

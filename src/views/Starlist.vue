<template>
  <el-container>
    <el-main>
      <div v-if="isLoading">
        <el-card><el-skeleton :rows="5" animated/></el-card>
        <el-card class="row-margin"><el-skeleton :rows="5" animated/></el-card>
      </div>
      <div v-if="starList.length == 0">
        <el-row type="flex" align="middle" justify="center" class="loading">
          <p class="muted">无内容</p>
        </el-row>
      </div>
      <div v-if="!isLoading">
        <el-card v-if="starData.source.length > 0">
          <Chart id="starlist" :dataset="starData" :series="series" />
        </el-card>
        <el-row class="row-margin" :gutter="16">
          <el-col
            :xl="4"
            :md="6"
            :xs="12"
            v-for="index in starList.length"
            :key="index"
            class="card-group"
          >
            <Card :form="starList[index - 1]" />
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
      starList: state => state.starList,
      starData: state => state.starData.starData,
      isLoading: state => state.isLoading
    })
  },
  watch: {
    starList: function() {
      this.$store.dispatch("starData/getStar", this.starList);
    }
  },
  mounted() {
    this.$store.dispatch("starData/getStar", this.starList);
  }
};
</script>

<style></style>

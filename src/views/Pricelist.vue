<template>
  <el-container>
    <el-main>
      <el-page-header @back="goBack" content="查询结果"> </el-page-header>
      <el-divider></el-divider>
      <div v-if="isLoading">
        <el-card><el-skeleton :rows="5" animated/></el-card>
        <el-card class="row-margin"><el-skeleton :rows="5" animated/></el-card>
      </div>
      <div v-if="!isLoading">
        <el-card>
          <strong>{{ info.shoeName }}</strong>
          <p>货号: {{ info.styleID }}</p>
          <p>品牌: {{ info.brand }}</p>
          <p>配色: {{ info.colorway }}</p>
          <p>发售日期: {{ info.releaseDate }}</p>
        </el-card>
        <el-tabs type="border-card" class="row-margin">
          <el-tab-pane :lazy="true">
            <template #label>
              <span><i class="el-icon-monitor"></i> 价格图表</span>
            </template>
            <Chart
              id="price"
              :dataset="chartData"
              :series="series"
              v-if="chartData.source.length > 0"
            />
          </el-tab-pane>
          <el-tab-pane>
            <template #label>
              <span><i class="el-icon-tickets"></i> 价格明细</span>
            </template>
            <el-table :data="chartData.source" stripe size="small">
              <el-table-column prop="size" label="鞋码" min-width="70" sortable fixed>
              </el-table-column>
              <el-table-column prop="stockX" label="StockX" min-width="90" sortable>
                <template v-slot="scope">¥{{ scope.row.stockX }}</template>
              </el-table-column>
              <el-table-column prop="goat" label="Goat" min-width="80" sortable>
                <template v-slot="scope">¥{{ scope.row.goat }}</template>
              </el-table-column>
              <el-table-column prop="stadiumGoods" label="StadiumGoods" min-width="130" sortable>
                <template v-slot="scope">¥{{ scope.row.stadiumGoods }}</template>
              </el-table-column>
              <el-table-column prop="quantity" label="数量" min-width="70" sortable>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template v-slot="scope">
                  <el-button
                    size="mini"
                    type="success"
                    @click="addCargoItem(scope.row.size, scope.row.stockX, scope.row.quantity)"
                    >加入仓库</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  name: "Pricelist",
  components: {
    Chart: defineAsyncComponent(() =>
      import(/* webpackChunkName: "chart" */ "../components/Chart.vue")
    )
  },
  data() {
    return {
      series: [
        { name: "StockX", type: "bar" },
        { name: "Goat", type: "bar" },
        { name: "StadiumGoods", type: "bar" }
      ]
    };
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      info: state => state.price.info,
      chartData: state => state.price.chartData,
      cargo: state => state.cargo
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
      this.$router.go(-1);
    },
    addCargoItem(size, price, quantity) {
      var cargoItem = {
        styleID: this.info.styleID,
        brand: this.info.brand,
        size: `US${size}`,
        stockX: price,
        quantity: quantity,
        shoeName: this.info.shoeName,
        thumbnail: this.info.thumbnail
      };
      this.$store.commit("updateCargo", cargoItem);
      this.$store.commit(
        "updateConsoleLog",
        {
          title: `${this.info.styleID}已加入仓库`,
          description: new Date().toLocaleTimeString(),
          type: "info"
        },
        { root: true }
      );
      this.$message({
        showClose: true,
        message: `${this.info.styleID}已加入仓库`,
        type: "success"
      });
    }
  }
};
</script>

<style></style>

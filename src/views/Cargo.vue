<template>
  <el-container>
    <el-main>
      <div v-if="isLoading">
        <el-card><el-skeleton :rows="5" animated/></el-card>
        <el-card class="row-margin"><el-skeleton :rows="5" animated/></el-card>
      </div>
      <div v-if="!isLoading">
        <el-row type="flex" align="middle" justify="start">
          <el-tag class="tag">
            总价值<strong> ¥{{ totalValue }}</strong>
          </el-tag>
          <el-tag>
            总库存<strong> {{ totalQuantity }}</strong>
          </el-tag>
        </el-row>
        <el-row
          v-if="activeName === 'brand'"
          type="flex"
          align="middle"
          justify="start"
          class="row-margin"
        >
          <el-tag
            type="info"
            v-for="index in brandData.length"
            :key="index"
            class="tag"
          >
            {{ brandData[index - 1].property
            }}<strong> ¥{{ brandData[index - 1].value }}</strong>
          </el-tag>
        </el-row>
        <el-row
          v-if="activeName === 'size'"
          type="flex"
          align="middle"
          justify="start"
          class="row-margin overflow"
        >
          <el-tag
            type="info"
            v-for="index in sizeData.length"
            :key="index"
            class="tag"
          >
            {{ sizeData[index - 1].property
            }}<strong> ¥{{ sizeData[index - 1].value }}</strong>
          </el-tag>
        </el-row>
        <el-tabs v-model="activeName" type="border-card" class="row-margin">
          <el-tab-pane name="table">
            <template #label>
              <span><i class="el-icon-tickets"></i> 库存列表</span>
            </template>
            <el-table :data="cargo" show-summary size="small">
              <el-table-column prop="thumbnail" label="图片" width="80" fixed>
                <template v-slot="scope">
                  <el-image :src="scope.row.thumbnail" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column prop="shoeName" label="名称" min-width="160">
              </el-table-column>
              <el-table-column prop="brand" label="品牌" min-width="80">
              </el-table-column>
              <el-table-column
                prop="styleID"
                label="货号"
                min-width="100"
                sortable
              >
              </el-table-column>
              <el-table-column prop="size" label="鞋码" min-width="70" sortable>
              </el-table-column>
              <el-table-column
                prop="stockX"
                label="价值"
                min-width="100"
                sortable
              >
                <template v-slot="scope">¥{{ scope.row.stockX }}</template>
              </el-table-column>
              <el-table-column
                prop="quantity"
                label="数量"
                min-width="70"
                sortable
              >
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template v-slot="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="removeCargoItem(scope.row)"
                    >移出仓库</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane :lazy="true" name="brand">
            <template #label>
              <span><i class="el-icon-monitor"></i> 品牌分布</span>
            </template>
            <Piechart
              id="brand"
              :dataset="brandData"
              :series="seriesBrand"
              v-if="brandData.length > 0"
            />
          </el-tab-pane>
          <el-tab-pane :lazy="true" name="size">
            <template #label>
              <span><i class="el-icon-monitor"></i> 尺码分布</span>
            </template>
            <Piechart
              id="size"
              :dataset="sizeData"
              :series="seriesSize"
              v-if="sizeData.length > 0"
            />
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
  name: "Cargo",
  components: {
    Piechart: defineAsyncComponent(() =>
      import(/* webpackChunkName: "pie-chart" */ "../components/Piechart.vue")
    )
  },
  data() {
    return {
      activeName: "table",
      seriesBrand: [
        {
          name: "品牌",
          type: "pie",
          roseType: "radius",
          radius: ["20%", "70%"],
          center: ["50%", "50%"],
          encode: {
            itemName: "property",
            value: "value"
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ],
      seriesSize: [
        {
          name: "鞋码",
          type: "pie",
          roseType: "radius",
          radius: ["20%", "70%"],
          center: ["50%", "50%"],
          encode: {
            itemName: "property",
            value: "value"
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  },
  computed: {
    totalQuantity() {
      var quantity = 0;
      var i;
      var length = this.cargo.length;
      for (i = 0; i < length; i++) {
        quantity += this.cargo[i].quantity;
      }
      return quantity;
    },
    totalValue() {
      var value = 0;
      var i;
      var length = this.cargo.length;
      for (i = 0; i < length; i++) {
        value += this.cargo[i].stockX;
      }
      return value;
    },
    ...mapState({
      isLoading: state => state.isLoading,
      cargo: state => state.cargo,
      brandData: state => state.brandData,
      sizeData: state => state.sizeData
    })
  },
  watch: {
    cargo: function() {
      this.$store.commit("updateBrandData", this.groupBy(this.cargo, "brand"));
      this.$store.commit("updateSizeData", this.groupBy(this.cargo, "size"));
    }
  },
  methods: {
    removeCargoItem(row) {
      var index = this.cargo.indexOf(row);
      this.$store.commit("removeCargo", index);
      this.$store.commit(
        "updateConsoleLog",
        {
          title: `移出仓库: ${row.styleID}`,
          description: new Date().toLocaleTimeString(),
          type: "error"
        },
        { root: true }
      );
      this.$message({
        showClose: true,
        message: "已移出仓库",
        type: "error"
      });
    },
    groupBy(objectArray, property) {
      var groupObj = objectArray.reduce((acc, obj) => {
        var key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
      var targetArr = [];
      var i;
      var length = Object.values(groupObj).length;
      for (i = 0; i < length; i++) {
        var obj = {};
        obj.property = Object.keys(groupObj)[i];
        obj.value = Object.values(groupObj)[i].reduce((acc, cur) => {
          return acc + cur.stockX;
        }, 0);
        targetArr.push(obj);
      }
      return targetArr;
    }
  },
  mounted() {
    this.$store.commit("updateBrandData", this.groupBy(this.cargo, "brand"));
    this.$store.commit("updateSizeData", this.groupBy(this.cargo, "size"));
  }
};
</script>

<style></style>

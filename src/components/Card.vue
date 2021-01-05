<template>
  <div>
    <el-card shadow="hover">
      <el-row type="flex" justify="space-between">
        <el-button
          circle
          size="mini"
          icon="el-icon-search"
          @click="getPrice(form.styleID)"
        ></el-button>
        <el-button
          circle
          v-if="!isStared()"
          size="mini"
          icon="el-icon-star-off"
          @click="addStar(form)"
        ></el-button>
        <el-button
          circle
          type="danger"
          v-if="isStared()"
          size="mini"
          icon="el-icon-star-on"
          @click="removeStar(form)"
        ></el-button>
      </el-row>
      <el-image :src="form.thumbnail" fit="contain"> </el-image>
      <div>
        <el-row type="flex" justify="space-between" align="middle">
          <span>
            <el-badge
              value="StockX 最低"
              type="success"
              class="hidden-xs-only"
            ></el-badge>
            <strong v-if="form.lowestResellPrice">
              {{ form.lowestResellPrice.stockX }}</strong
            >
          </span>
          <el-badge
            v-if="form.profit"
            :value="`¥${form.priceVariety}`"
            type="danger"
          ></el-badge>
          <el-badge
            v-else
            :value="`¥${form.priceVariety}`"
            type="info"
          ></el-badge>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Card",
  props: {
    form: Object
  },
  computed: {
    ...mapState({
      starList: state => state.starList,
      consoleLog: state => state.consoleLog
    })
  },
  methods: {
    getPrice(id) {
      this.$router.push({ name: "price" });
      this.$store.dispatch("price/getPrice", id);
    },
    addStar(obj) {
      this.$store.commit("updateStarList", obj);
      this.$store.commit(
        "updateConsoleLog",
        {
          title: `加入收藏夹: ${obj.styleID}`,
          description: new Date().toLocaleTimeString(),
          type: "info"
        },
        { root: true }
      );
      this.$message({
        showClose: true,
        message: "已添加到收藏夹",
        type: "warning"
      });
    },
    removeStar(obj) {
      var index = this.starList.indexOf(obj);
      this.$store.commit("removeStarList", index);
      this.$store.commit(
        "updateConsoleLog",
        {
          title: `移出收藏夹: ${obj.styleID}`,
          description: new Date().toLocaleTimeString(),
          type: "error"
        },
        { root: true }
      );
      this.$message({
        showClose: true,
        message: "已移出收藏夹",
        type: "error"
      });
    },
    isStared() {
      var key = this.form.styleID;
      var checkKey = function(el) {
        return el.styleID === key;
      };
      return this.starList.some(checkKey);
    }
  }
};
</script>

<style></style>

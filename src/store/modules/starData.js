const state = () => ({
  starData: {
    dimensions: ["styleID", "retailPrice", "priceVariety"],
    source: []
  }
});

const mutations = {
  updateStarData(state, payload) {
    state.starData.source = payload;
  }
};

const actions = {
  getStar({ commit }, star) {
    console.time("getStar");
    commit(
      "updateConsoleLog",
      {
        title: "请求更新: 收藏夹",
        description: new Date().toLocaleTimeString(),
        type: "warning"
      },
      { root: true }
    );
    commit("reverseIsLoading", null, { root: true });
    var status = function(response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    };
    var json = function(response) {
      return response.json();
    };
    fetch("https://api.exchangeratesapi.io/latest?symbols=CNY&base=USD")
      .then(status)
      .then(json)
      .then(jsonResRate => {
        var rate = jsonResRate.rates.CNY;
        // Change currency to CNY
        var starChartData = star.map(obj => {
          return {
            styleID: obj.styleID,
            priceVariety: obj.priceVariety,
            retailPrice: Math.round(rate * obj.retailPrice)
          };
        });
        commit("updateStarData", starChartData);
        commit("newUpdateTime", new Date().toLocaleTimeString(), {
          root: true
        });
        commit("newRate", rate, { root: true });
        commit("reverseIsLoading", null, { root: true });
        commit(
          "updateConsoleLog",
          {
            title: "数据已更新: 收藏夹",
            description: new Date().toLocaleTimeString(),
            type: "success"
          },
          { root: true }
        );
        console.timeEnd("getStar");
      })
      .catch(error => {
        console.error(error);
        commit(
          "updateConsoleLog",
          {
            title: "错误 " + new Date().toLocaleTimeString(),
            description: `${error}`,
            type: "error"
          },
          { root: true }
        );
        commit("reverseIsLoading", null, { root: true });
        commit("newError", error, { root: true });
      });
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};

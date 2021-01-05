const state = () => ({
  productList: [],
  productData: {
    dimensions: ["styleID", "retailPrice", "priceVariety"],
    source: []
  }
});

const mutations = {
  updateProductList(state, payload) {
    state.productList = payload;
  },
  updateProductData(state, payload) {
    state.productData.source = payload;
  }
};

const actions = {
  getProduct({ commit }, kwd) {
    console.time("getProduct");
    commit(
      "updateConsoleLog",
      {
        title: `请求更新: ${kwd}`,
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
    console.time("sneaks-api-getProduct");
    fetch(`https://sneakyapi.herokuapp.com/search/${kwd}`)
      .then(status)
      .then(json)
      .then(jsonResponse => {
        console.timeEnd("sneaks-api-getProduct");
        console.time("rate-api");
        fetch("https://api.exchangeratesapi.io/latest?symbols=CNY&base=USD")
          .then(status)
          .then(json)
          .then(jsonResRate => {
            console.timeEnd("rate-api");
            console.time("script-product");
            var rate = jsonResRate.rates.CNY;
            // Change currency to CNY
            var i;
            var length = jsonResponse.length;
            for (i = 0; i < length; i++) {
              var variety =
                rate *
                (jsonResponse[i].lowestResellPrice.stockX -
                  jsonResponse[i].retailPrice);
              var profit = variety > 0 ? true : false;
              Object.assign(jsonResponse[i], {
                priceVariety: Math.round(variety),
                profit: profit
              });
              jsonResponse[i].lowestResellPrice.stockX =
                "¥" +
                Math.round(
                  rate * jsonResponse[i].lowestResellPrice.stockX
                ).toString();
            }
            var productChartData = jsonResponse.map(obj => {
              return {
                styleID: obj.styleID,
                priceVariety: obj.priceVariety,
                retailPrice: Math.round(rate * obj.retailPrice)
              };
            });
            commit(
              "updateConsoleLog",
              {
                title: `数据已更新: ${kwd}`,
                description: new Date().toLocaleTimeString(),
                type: "success"
              },
              { root: true }
            );
            commit("updateProductData", productChartData);
            commit("updateProductList", jsonResponse);
            commit("newUpdateTime", new Date().toLocaleTimeString(), {
              root: true
            });
            commit("newRate", rate, { root: true });
            commit("reverseIsLoading", null, { root: true });
            console.timeEnd("script-product");
            console.timeEnd("getProduct");
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
      });
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};

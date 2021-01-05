const state = () => ({
  info: {},
  chartData: {
    dimensions: ["size", "stockX", "goat", "stadiumGoods"],
    source: []
  }
});

const mutations = {
  updateInfo(state, payload) {
    state.info = Object.assign({}, state.info, payload);
  },
  updateChartdata(state, payload) {
    state.chartData.source = payload;
  }
};

const actions = {
  getPrice({ commit }, id) {
    console.time("getPrice");
    commit(
      "updateConsoleLog",
      {
        title: `请求更新: ${id}`,
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
    console.time("sneaks-api-getPrice");
    fetch(`https://sneakyapi.herokuapp.com/id/${id}/prices`)
      .then(status)
      .then(json)
      .then(jsonResponse => {
        console.timeEnd("sneaks-api-getPrice");
        console.time("rate-api");
        fetch("https://api.exchangeratesapi.io/latest?symbols=CNY&base=USD")
          .then(status)
          .then(json)
          .then(jsonResRate => {
            console.timeEnd("rate-api");
            console.time("script-price");
            var rate = jsonResRate.rates.CNY;
            var variety = Math.round(
              rate *
                (jsonResponse.lowestResellPrice.stockX -
                  jsonResponse.retailPrice)
            );
            var profit =
              jsonResponse.lowestResellPrice.stockX - jsonResponse.retailPrice >
              0
                ? true
                : false;
            // Map new array for price table
            const keys = Object.keys(jsonResponse.resellPrices);
            // Output: ["stockX", "goat", "stadiumGoods", "flightClub"]
            const mergedInnerKeys = Array.from(
              new Set(
                keys
                  .reduce(
                    (val, key) => [
                      ...val,
                      ...Object.keys(jsonResponse.resellPrices[key])
                    ],
                    []
                  )
                  .sort((a, b) => a - b)
              )
            );
            // Output: ["4", "5", "6", .... , "12.5"]
            const jsonData = mergedInnerKeys.map(key => ({
              size: key,
              quantity: 1,
              ...keys.reduce(
                (v, k) => ({
                  ...v,
                  [k]:
                    jsonResponse.resellPrices[k][key] !== undefined
                      ? Math.round(rate * jsonResponse.resellPrices[k][key])
                      : undefined
                }),
                {}
              )
            }));
            commit("updateInfo", {
              shoeName: jsonResponse.shoeName,
              styleID: jsonResponse.styleID,
              thumbnail: jsonResponse.thumbnail,
              brand: jsonResponse.brand,
              colorway: jsonResponse.colorway,
              releaseDate: jsonResponse.releaseDate,
              priceVariety: variety,
              profit: profit,
              lowestResellPrice: {
                stockX:
                  "¥" +
                  Math.round(
                    rate * jsonResponse.lowestResellPrice.stockX
                  ).toString()
              }
            });
            commit(
              "updateConsoleLog",
              {
                title: `数据已更新: ${id}`,
                description: new Date().toLocaleTimeString(),
                type: "success"
              },
              { root: true }
            );
            commit("newUpdateTime", new Date().toLocaleTimeString(), {
              root: true
            });
            commit("newRate", rate, { root: true });
            commit("reverseIsLoading", null, { root: true });
            commit("updateChartdata", jsonData);
            console.timeEnd("script-price");
            console.timeEnd("getPrice");
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

import { createStore } from "vuex";
import trending from "./modules/trending";
import product from "./modules/product";
import price from "./modules/price";
import starData from "./modules/starData";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  state: {
    inputKeywords: "",
    rate: undefined,
    updateTime: "",
    isLoading: false,
    newError: "",
    consoleLog: [],
    starList: JSON.parse(localStorage.getItem("starList")) || [],
    cargo: JSON.parse(localStorage.getItem("cargo")) || [],
    brandData: [],
    sizeData: []
  },
  mutations: {
    updateInputKeywords(state, payload) {
      state.inputKeywords = payload;
    },
    reverseIsLoading(state) {
      state.isLoading = !state.isLoading;
    },
    newUpdateTime(state, payload) {
      state.updateTime = payload;
    },
    newRate(state, payload) {
      state.rate = payload;
    },
    newError(state, payload) {
      state.newError = payload;
    },
    updateConsoleLog(state, payload) {
      state.consoleLog.push(payload);
    },
    updateStarList(state, payload) {
      state.starList.push(payload);
      localStorage.setItem("starList", JSON.stringify(state.starList));
    },
    removeStarList(state, payload) {
      state.starList.splice(payload, 1);
      localStorage.setItem("starList", JSON.stringify(state.starList));
    },
    updateCargo(state, payload) {
      state.cargo.push(payload);
      localStorage.setItem("cargo", JSON.stringify(state.cargo));
    },
    removeCargo(state, payload) {
      state.cargo.splice(payload, 1);
      localStorage.setItem("cargo", JSON.stringify(state.cargo));
    },
    updateBrandData(state, payload) {
      state.brandData = payload;
    },
    updateSizeData(state, payload) {
      state.sizeData = payload;
    }
  },
  actions: {},
  modules: {
    trending,
    product,
    price,
    starData
  },
  strict: debug
});

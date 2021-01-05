import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "element-plus/lib/theme-chalk/display.css";
import {
  ElAlert,
  ElInput,
  ElButton,
  ElIcon,
  ElRow,
  ElCol,
  ElBadge,
  ElCard,
  ElCollapse,
  ElCollapseItem,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElTabs,
  ElTag,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElDivider,
  ElImage,
  ElBacktop,
  ElPageHeader,
  ElSkeleton,
  ElMessage
} from "element-plus";

const components = [
  ElAlert,
  ElAside,
  ElBacktop,
  ElBadge,
  ElButton,
  ElCard,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElContainer,
  ElDivider,
  ElHeader,
  ElIcon,
  ElImage,
  ElInput,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElPageHeader,
  ElRow,
  ElSkeleton,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTag
];

const plugins = [ElMessage];

const app = createApp(App);

components.forEach(component => {
  app.component(component.name, component);
});

plugins.forEach(plugin => {
  app.use(plugin);
});

app
  .use(store)
  .use(router)
  .mount("#app");

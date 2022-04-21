<template>
  <div id="app">
    <router-view />
    <go-top />
  </div>
</template>
<script>
import appUpdate from "./utils/updateApp";
import GoTop from "@/components/GoTop";

export default {
  name: "App",
  components: {
    GoTop,
  },
  mounted() {
    // update app
    document.addEventListener("plusready", () => {
      appUpdate();
    });
  },
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 24px;
  background: #f5f5f5;
}
.flex-layout {
  display: flex;
  height: 100%;
  flex-direction: column;
  .flex-layout__body {
    flex: 1;
    overflow-y: scroll;
  }
}
</style>

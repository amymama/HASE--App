<template>
  <div class="tab-bar">
    <van-tabbar route>
      <template v-for="(item, index) in tabs">
        <van-tabbar-item
          v-if="item.permission"
          :key="index"
          :to="item.path"
          v-action:[item.permission]
          :replace="item.replace"
        >
          <span>{{ item.title }}</span>
          <template slot="icon">
            <i class="iconfont" :class="item.icon"></i>
          </template>
        </van-tabbar-item>
        <van-tabbar-item
          v-else
          :key="index"
          :to="item.path"
          :replace="item.replace"
        >
          <span>{{ item.title }}</span>
          <template slot="icon">
            <i class="iconfont" :class="item.icon"></i>
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "TabBar",
  data() {
    return {
      tabs: [
        {
          title: "HOME",
          path: "/index",
          icon: "icon-home",
          permission: "tabBar:HOME",
          replace: true,
        },
        {
          title: "MENU",
          path: "/menu",
          icon: "icon-pmt",
          // permission: "tabBar:MENU",
          replace: true,
        },
        {
          title: "HISHOP",
          path: "/shop",
          icon: "icon-shop",
          permission: "tabBar:HISHOP",
          replace: true,
        },
        {
          title: "ME",
          path: "/me",
          icon: "icon-me",
          replace: true,
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.tab-bar {
  .iconfont {
    font-size: 36px !important;
  }
  .van-tabbar-item--active {
    color: #2058ab;
    font-weight: bold;
  }
}
</style>

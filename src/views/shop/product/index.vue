<template>
  <div>
    <van-nav-bar :title="title" fixed left-arrow @click-left="clickLeft"></van-nav-bar>
    <div class="page-hasnav">
      <keep-alive include="ProductList">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$route.meta.title;
    },
  },
  methods: {
    clickLeft() {
      const { query } = this.$route;
      if (query.new_shopid) {
        this.$router.push({
          name: "PosmList",
          query: {
            ...query,
          },
        });
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
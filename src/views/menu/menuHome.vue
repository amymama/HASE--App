<template>
  <div class="menu">
    <div class="menu_item menu_item01">
      <router-link :to="{ path: '/zso' }">
        <div class="menu_item_img menu_item_img01">
          <span />
        </div>
        <div class="menu_item_info">
          <!-- <span>{{i18n.get("E-Learning")}}</span> -->
          <span>Zso</span>
        </div>
      </router-link>
    </div>
    <div class="menu_item menu_item02">
      <router-link :to="{ path: '/order' }">
        <div class="menu_item_img menu_item_img02">
          <span />
        </div>
        <div class="menu_item_info">
          <!-- <span>{{i18n.get("E-Learning")}}</span> -->
          <span>Order</span>
        </div>
      </router-link>
    </div>

  </div>
</template>
<style lang="scss" scoped>
@import url("./index.less");
</style>
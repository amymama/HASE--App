<template>
  <div class="flex-layout notice-list" style="background: #FFF">
    <div class="flex-layout__header">
      <!-- TOP BAR -->
      <van-nav-bar
        left-arrow
        @click-left="goBack"
        title="Dashboard"
      />
      <van-search
        clearable
        v-model="name"
        shape="round"
        background="#2058AB"
      />
    </div>
    <div class="flex-layout__body">
      <van-tabs v-model="active">
        <van-tab v-for="(item0, index0) in list" :title="item0.name" :key="index0">
          <van-empty v-if="item0.data.length == 0" :description="$t('shopCommon.NoData')" />
            <van-cell-group v-else>
              <template v-for="(item, index) in item0.data">
                <van-cell
                  v-if="handleShowItem(item)"
                  center
                  is-link
                  :key="index"
                  :title="item.name"
                  @click="handleGetDetail(item)">
                  <template #icon>
                    <img src="@/assets/images/shop/report_icon.png"  style="margin-right: 10px"/>
                  </template>
                </van-cell>
              </template>
            </van-cell-group>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ReportList',
  data() {
    return{
      list: [
        {
          name: 'Sell Out', data: []
        },
        {
          name: 'Hi Shop', data: []
        }
      ],
      name: '',
      active: 0
    }
  },
  computed:{
    ...mapGetters([
      'auths',
    ])
  },
  created () {
    const { tab } = this.$route.query
    this.active = tab ? +tab : 0
    this.list[0].data = []
    this.list[1].data = []
    this.$store.dispatch('user/GetInfo').then((res) => {
      this.auths.map((item) => {
        if (item.report_url) {
          if (item.click_module == 'PMT') {
            this.list[0].data.push(item)
          }
          if (item.click_module == 'HiShop') {
            this.list[1].data.push(item)
          }
        }
      })
    })
  },
  methods: {
    handleShowItem(item) {
      const { name } = item
      if (this.name) {
        const itemName = item.name.toUpperCase()
        const keyword = this.name.toUpperCase()
        return itemName.includes(keyword)
      } else {
        return true
      }
    },
    handleGetDetail (item) {
      const { report_url, name } = item
      report_url && this.$router.push({ name: 'ReportDetail', query: { report_url, name } })
    }
  }
}
</script>

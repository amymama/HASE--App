<template>
  <div class="search-bar">
    <van-popup
     v-model="dealerShow"
    :close-on-click-overlay="false"
    :style="{
      width: '100%',
      height: '100%'
    }">

          <van-nav-bar
        left-arrow
        @click-left="onCancel"
        :title="$t('Ship To')"
      />
      <!-- Search bar -->
      <div class="search-top">
        <van-search
          v-model="keyword"
          show-action
          autofocus="false"
          placeholder="Please input keywords"
          background="#f2f2f2"
          shape="round"
          @search="onSearch"
          @cancel="onCancel"
        />
      </div>

    </van-popup>
  </div>
</template>
<script>
export default {
    data(){
        return{
            dealerShow:false,
            keyword:''
        }
    },
    methods:{
        onSearch(){},
        onShow(){
            this.dealerShow=true
        },
        onCancel(){
            this.dealerShow=false

        }
        
    }
    
}
</script>
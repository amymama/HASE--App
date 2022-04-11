<template>
  <van-popup
    v-model="visible"
    position="right"
    :style="{
      height: '100%',
      width: '100%'
    }"
  >
    <div class="flex-layout" style="background: #FFF">
      <div class="flex-layout__header">
        <!-- TOP BAR -->
        <van-nav-bar
          title="Select PIC"
          left-arrow
          @click-left="visible = false"
        />
        <!-- SEARCH -->
        <van-search
          clearable
          v-model="name"
          shape="round"
          background="#2058AB"
        />
      </div>
      <div class="flex-layout__body">
        <van-radio-group v-model="selectUser">
          <van-cell-group>
            <!-- item begin-->
            <template v-for="(item, index) in list">
              <van-cell
                v-if="handleShowItem(item)"
                :key="index"
                :title="`${item.username}_${item.realname}`"
                :label="item.picrole"
                clickable
                @click="selectUser = item.id">
                <template #right-icon>
                  <van-radio :name="item.id" />
                </template>
              </van-cell>
            </template>
            <!-- item end -->
          </van-cell-group>
        </van-radio-group>
      </div>
      <div class="flex-layout__footer">
        <van-button
          square
          block
          color="#2058AB"
          @click="onSubmit">
          OK
        </van-button>
      </div>
    </div>
  </van-popup>
</template>
<script>
export default {
  name: 'SelectPic',
  data() {
    return {
      visible: false,
      name: '',
      selectUser: '',
      list: []
    }
  },
  methods: {
    // Show Modal
    show(piclist) {
      this.visible = true
      this.list = piclist
    },
    handleShowItem(item) {
      const { username, realname } = item
      const { name } = this
      if (name) {
        const itemUserName = username.toUpperCase() || ''
        const itemRealName = realname.toUpperCase() || ''
        const keyword = name.toUpperCase()
        return itemUserName.includes(keyword) || itemRealName.includes(keyword)
      } else {
        return true
      }
    },
    // Select ok
    onSubmit() {
      const { selectUser } = this
      if (selectUser) {
        this.$emit('selectPicOK', selectUser)
      }
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
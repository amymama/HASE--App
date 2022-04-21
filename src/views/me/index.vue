<template>
  <div class="page-hastab page-me">
    <div class="page-me__header">
      <div class="avatar">
        <div class="avatar-box">
          <img
            v-if="avatar"
            class="avatar-img"
            @click="$refs.changeAvatar.show()"
            :src="avatar" >
          <img
            v-else
            class="avatar-img"
            @click="$refs.changeAvatar.show()"
            src="@/assets/images/avatar.png" >
        </div>
        <h2 class="user-name">
          {{ userInfo.realname }}
        </h2>
      </div>
    </div>
    <!-- me menu -->
    <div class="page-me__body">
      <div class="me-menue-item">
        <van-cell-group>
          <van-cell :title="$t('uCenter.UserCode')" :value="userInfo.username" >
            <template #icon>
              <i class="iconfont icon-user"></i>
            </template>
          </van-cell>
          <template v-if="userShopInfo">
            <van-cell :title="$t('uCenter.Shop')" :value="userShopInfo.new_shop_name">
              <template #icon>
                <i class="iconfont icon-shop"></i>
              </template>
            </van-cell>
            <van-cell :title="$t('uCenter.Dealer')" :value="userShopInfo.new_customer_code">
              <template #icon>
                <i class="iconfont icon-dealer"></i>
              </template>
            </van-cell>
            <van-cell  :title="$t('shopFA.Branch')" :value="userShopInfo.new_branch_name">
              <template #icon>
                <i class="iconfont icon-branch"></i>
              </template>
            </van-cell>
            <van-cell :title="$t('uCenter.Channel')" :value="userShopInfo.new_channel_name">
              <template #icon>
                <i class="iconfont icon-channel"></i>
              </template>
            </van-cell>
          </template>
          <van-cell :title="$t('uCenter.CNIC')" :value="userInfo.new_cnic">
            <template #icon>
              <i class="iconfont icon-cnic"></i>
            </template>
          </van-cell>
          <van-cell :title="$t('uCenter.Mobile')" :value="userInfo.phone">
            <template #icon>
              <i class="iconfont icon-tel"></i>
            </template>
          </van-cell>
          <van-cell :title="$t('uCenter.Type')" :value="type">
            <template #icon>
              <i class="iconfont icon-type"></i>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="me-menue-item">
        <van-cell-group>
          <van-cell :title="$t('uCenter.VersionCode')" :value="appVersion" @click="checkVesion">
            <template #icon>
              <i class="iconfont icon-version"></i>
            </template>
          </van-cell>
          <van-cell :title="$t('uCenter.ShareGTM')" is-link @click="$refs.shareQr.show()">
            <template #icon>
              <i class="iconfont icon-share"></i>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="me-menue-item">
        <van-cell-group>
          <van-cell :title="$t('uCenter.RefreshData')" icon="replay" @click="refreshData">
          </van-cell>
        </van-cell-group>
      </div>
      <!-- corrent pwd & sign out  -->
      <div class="me-actions">
        <div class="item" v-if="userInfo.new_user_type == 2">
          <van-button
            round
            block
            color="linear-gradient(to right, #528de4, #2058AB)"
            @click="$refs.changePwd.show()">
            {{ $t('uCenter.ChangePwd') }}
          </van-button>
        </div>
        <div class="item">
          <van-button
            round
            block
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            :loading="siginOutLoading"
            @click="handleSignOut">
            {{ $t('uCenter.SignOut') }}
          </van-button>
        </div>
      </div>
    </div>
    <!-- conent end -->
    <tab-bar />
    <!-- edite avatar -->
    <change-avatar ref="changeAvatar" />
    <!-- edite pwd -->
    <change-pwd ref="changePwd" />
    <!-- share app -->
    <share-qr ref="shareQr" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TabBar from '@/components/TabBar'
import ChangeAvatar from './components/ChangeAvatar'
import ChangePwd from './components/ChangePwd'
import ShareQr from './components/ShareQr'
import appUpdate from '@/utils/updateApp'

export default {
  name: 'Me',
  components: {
    TabBar,
    ChangeAvatar,
    ChangePwd,
    ShareQr
  },
  data() {
    return {
      appVersion: '',
      type: '',
      siginOutLoading: false,
      checkVersionLoading: false
    }
  },
  computed:{
    ...mapGetters([
      'avatar',
      'userInfo',
      'userShopInfo',
      'roles'
    ])
  },
  mounted () {
    this.getAppLocalVersion()
    this.handleGetRoles()
  },
  methods: {
    // refresh data
    refreshData () {
      this.$store.dispatch('user/GetInfo').then((res) => {
        this.$toast.success(this.$t('uCenter.RefreshSuccess'))
      })
    },
    // checkVesion
    checkVesion () {
      if (window.plus) {
        appUpdate(true)
      }
    },
    // get app local version 
    getAppLocalVersion () {
      if (window.plus) {
        plus.runtime.getProperty(plus.runtime.appid, (inf) => {
          this.appVersion = inf.version
        })
      }
    },
    // get user role
    handleGetRoles () {
      if (this.roles.length > 0) {
        var roles = [] 
        this.roles.map((item) => {
          roles.push(item.role_name)
        })
        this.type = roles.join(',')
      }
    },
    // sign out
    handleSignOut() {
      this.$dialog.confirm({
        title: 'Tip',
        message: 'Do you really want to sign out?',
      })
      .then(() => {
        this.siginOutLoading = true
        setTimeout(() => {
          this.$store.dispatch('user/Logout').then(() => {
            this.siginOutLoading = false
            window.location.reload()
          })
        }, 1000)
      })
      .catch(() => {
        this.siginOutLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-me{
  background: #F5F5F5;
  .page-me__header{
    background: linear-gradient(to left top, #80aff5, #2058AB);
    border-bottom-left-radius: 375px 64px;
    border-bottom-right-radius: 375px 64px;
    .avatar{
      padding: 64px 0 200px 0;
      .avatar-box{
        width: 148px;
        height: 148px;
        border-radius: 50%;
        border: 6px solid #a9bddb;
        margin: 0 auto;
        overflow: hidden;
        img{
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .user-name{
        text-align: center;
        font-size: 36px;
        line-height: 64px;
        font-weight: normal;
        color: #FFF;
      }
    }
  }
  .page-me__body{
    margin-top: -160px;
    .me-menue-item{
      background: #FFF;
      margin: 24px;
      border-radius: 34px;
      overflow: hidden;
      .iconfont{
        margin-right: 18px;
        font-size: 36px;
        color: #333;
      }
    }
    .me-actions{
      padding:12px 34px;
      .item{
        margin-bottom: 24px;
      }
    }
  }
}
</style>
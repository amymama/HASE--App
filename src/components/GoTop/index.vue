
​<template>
  <div class="goTop" v-show="show" @click="goTop">
    <van-icon name="arrow-up" />
  </div>
</template>
<script>
export default {
  name: "GoTop",
  data() {
    return {
      scrollTop: "",
      show: false
    }
  },
  watch: {
    scrollTop(val) {
      if (this.scrollTop > 1000) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  },
  methods: {
    handleScroll() {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (this.scrollTop > 1000) {
        this.show = true
      }
    },
    goTop() {
      let timer = null,
        _that = this
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 250
          document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
          _that.show = false
        }
      })
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
.goTop {
  position: fixed;
  right: 20px;
  bottom: 180px;
  width: 48px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 6px rgba(0,0, 0, .1);
  i{
    line-height: 48px;
  }
}
</style>


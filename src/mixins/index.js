//APP GOLOBAL MIXINS
let mixin={
  methods:{
    // 返回上一页
    goBack() {
      this.$router.go(-1)
    }
  }
}
export default mixin
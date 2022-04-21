<template>
  <van-action-sheet
    v-model="visible"
    :actions="actions"
    close-on-click-action
    @select="onSelect"
  />
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      actions: [
        { name: 'EN', value: 'en' },
        { name: 'AR', value: 'id' }
      ]
    }
  },
  methods: {
    // Show action sheet
    show() {
      this.visible = true
    },
    // Select language
    onSelect(item) {
      var value = item.value
      this.$i18n.locale = value
      this.$store.commit('app/SET_LANG', value)
      window.location.reload()
    }
  }
}
</script>
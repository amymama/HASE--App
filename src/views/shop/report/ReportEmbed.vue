<template>
  <div class="report-box">
    <!-- topbar -->
    <van-nav-bar
      left-arrow
      @click-left="goBack"
      :title="reportName"
    />
    <!-- content -->
    <div class="reprot-box" ref="reportBox">
      <div id="embedContainer" :style="{ height: innerH + 'px' }"></div>
    </div>
  </div>
</template>

<script>
import { postEmbedReport } from '@/api/common'

export default {
  name: 'ReportEmbed',
  data () {
    return {
      reportName: '',
      innerH: 400
    }
  },
  watch: {
   '$route' (to, from) {
     this.handleGetUrl()
   }
  }, 
  created () {
    this.reportName = this.$route.query.name || ''
    this.handleGetUrl()
  },
  methods: {
    handleGetUrl () {
      this.$nextTick(() => {
        this.handleGetReportHeight()
        this.handleInit()
        window.addEventListener('resize', this.handleGetReportHeight)
      })
    },
    handleGetReportHeight () {
      var wh = document.body.clientHeight
      this.innerH = wh - document.getElementById('embedContainer').offsetTop
    },
    handleInit() {
      const { report_url } = this.$route.query
      report_url && postEmbedReport({
        reportId: report_url
      }).then((res) => {
        const { success, data } = res
        if (success) {
          const reportContainer = document.getElementById('embedContainer')
          const models = window['powerbi-client'].models;
          const config = {
            type: 'report',
            tokenType: models.TokenType.Embed,
            accessToken: data.EmbedToken.token,
            embedUrl:data.EmbedReports[0].EmbedUrl,
            id: data.EmbedReports[0].ReportId,
            permissions: models.Permissions.All,
            settings: {
              filterPaneEnabled: false,
              navContentPaneEnabled: true,
              layoutType: models.LayoutType.MobilePortrait
            }
          };
          const report = powerbi.embed(reportContainer, config)
        }
      })
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleGetReportHeight)
  }
}
</script>

<style lang="less">
.reprot-box{
  background: #FFF;
  padding-left: 15px;
}
.ant-layout-footer{
  display: none;
}
iframe{
  border: 0;
}
</style>
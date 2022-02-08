// DSM ROUTES
export default [
  {
    path: '',
    name: 'PmtHome',
    component: () => import('@/views/pmt/home'),
    meta: { title: 'Home', module: 'PMT', keepAlive: false }
  },
  {
    path: 'Gift_Registration',
    name: 'Gift_Registration',
    component: () => import('@/views/pmt/giftRegistration'),
    meta: { title: 'Gift Registration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'Incentive',
    name: 'Incentive',
    component: () => import('@/views/pmt/incentive'),
    meta: { title: 'PMT Incentive', module: 'PMT', keepAlive: false }
  },
  {
    path: 'mhModelDetail',
    name: 'mhModelDetail',
    component: () => import('@/views/pmt/incentive/components/mhModelDetail'),
    meta: { title: 'MH Model Detail', module: 'PMT', keepAlive: false }
  },
  {
    path: 'attendant',
    name: 'attendant',
    component: () => import('@/views/pmt/attendant'),
    meta: { title: 'Attendant', module: 'PMT', keepAlive: false }
  },
  {
    path: 'applyAbsence',
    name: 'applyAbsence',
    component: () => import('@/views/pmt/attendant/components/applyAbsence'),
    meta: { title: 'Apply Absence', module: 'PMT', keepAlive: false }
  },
  {
    path: 'applyOvertime',
    name: 'applyOvertime',
    component: () => import('@/views/pmt/attendant/components/applyOvertime'),
    meta: { title: 'Apply Overtime', module: 'PMT', keepAlive: false }
  },
  {
    path: 'retailInvoice/:retailId&&:pageType',
    name: 'retailInvoice',
    component: () => import('@/views/pmt/retailInvoice'),
    meta: { title: 'Retail Invoice', module: 'PMT', keepAlive: false }
  },
  {
    path: 'retailBarcode/:retailId&&:pageType',
    name: 'retailBarcode',
    component: () => import('@/views/pmt/retailBarcode'),
    meta: { title: 'Retail Barcode', module: 'PMT', keepAlive: false }
  },
  {
    path: 'salesForecast',
    name: 'salesForecast',
    component: () => import('@/views/pmt/salesForecast'),
    meta: { title: 'Sales Forecast', module: 'PMT', keepAlive: false }
  },
  {
    path: 'stocKCheck',
    name: 'stocKCheck',
    component: () => import('@/views/pmt/stocKCheck'),
    meta: { title: 'Sales Forecast', module: 'PMT', keepAlive: false }
  },
  {
    path: 'visitStatistics',
    name: 'visitStatistics',
    component: () => import('@/views/pmt/visitStatistics'),
    meta: { title: 'Sales Forecast', module: 'PMT', keepAlive: false }
  },
  {
    path: 'retailList',
    name: 'retailList',
    component: () => import('@/views/pmt/retailList'),
    meta: { title: 'Retail List', module: 'PMT', keepAlive: false }
  },
  {
    path: 'competitorSales',
    name: 'competitorSales',
    component: () => import('@/views/pmt/competitorSales'),
    meta: { title: 'Competitor Sales', module: 'PMT', keepAlive: false }
  },
  {
    path: 'competitorPrice',
    name: 'competitorPrice',
    component: () => import('@/views/pmt/competitorPrice'),
    meta: { title: 'Competitor Price', module: 'PMT', keepAlive: false }
  },
  {
    path: 'eLearning',
    name: 'eLearning',
    component: () => import('@/views/pmt/eLearning'),
    meta: { title: 'E-Learning', module: 'PMT', keepAlive: false }
  },
  {
    path: 'course',
    name: 'course',
    component: () => import('@/views/pmt/eLearning/components/course'),
    meta: { title: 'E-Learning', module: 'PMT', keepAlive: false }
  },
  {
    path: 'courseVideo',
    name: 'courseVideo',
    component: () => import('@/views/pmt/eLearning/components/courseVideo'),
    meta: { title: 'E-Learning', module: 'PMT', keepAlive: false }
  },
  {
    path: 'courseImg',
    name: 'courseImg',
    component: () => import('@/views/pmt/eLearning/components/courseImg'),
    meta: { title: 'E-Learning', module: 'PMT', keepAlive: false }
  },
  {
    path: 'courseIOSPdf',
    name: 'courseIOSPdf',
    component: () => import('@/views/pmt/eLearning/components/courseIOSPdf'),
    meta: { title: 'E-Learning', module: 'PMT', keepAlive: false }
  },
  {
    path: 'courseAndroidPdf',
    name: 'courseAndroidPdf',
    component: () => import('@/views/pmt/eLearning/components/courseAndroidPdf'),
    meta: { title: 'E-Learning', module: 'PMT', keepAlive: false }
  },
  {
    path: '/mdPolicyScheme',
    name: 'mdPolicyScheme',
    component: () => import('@/views/pmt/policy/mdPolicyScheme'),
    meta: { title: 'Sales Forecast', module: 'PMT', keepAlive: false }
  },
  {
    path: '/pmtPolicyScheme',
    name: 'pmtPolicyScheme',
    component: () => import('@/views/pmt/policy/pmtPolicyScheme'),
    meta: { title: 'Sales Forecast', module: 'PMT', keepAlive: false }
  },
  {
    path: '/tlPolicyScheme',
    name: 'tlPolicyScheme',
    component: () => import('@/views/pmt/policy/tlPolicyScheme'),
    meta: { title: 'Sales Forecast', module: 'PMT', keepAlive: false }
  },
  {
    path: '/psPolicyScheme',
    name: 'psPolicyScheme',
    component: () => import('@/views/pmt/policy/psPolicyScheme'),
    meta: { title: 'Sales Forecast', module: 'PMT', keepAlive: false }
  },
  {
    path: '/psHotModelPolicyScheme',
    name: 'psHotModelPolicyScheme',
    component: () => import('@/views/pmt/policy/psHotModelPolicyScheme'),
    meta: { title: 'Sales Forecast', module: 'PMT', keepAlive: false }
  },
  {
    path: '/pstlPolicyScheme',
    name: 'pstlPolicyScheme',
    component: () => import('@/views/pmt/policy/pstlPolicyScheme'),
    meta: { title: 'Sales Forecast', module: 'PMT', keepAlive: false }
  },
  {
    path: '/mePolicyScheme',
    name: 'mePolicyScheme',
    component: () => import('@/views/pmt/policy/mePolicyScheme'),
    meta: { title: 'Sales Forecast', module: 'PMT', keepAlive: false }
  },
  {
    path: '/metlPolicyScheme',
    name: 'metlPolicyScheme',
    component: () => import('@/views/pmt/policy/metlPolicyScheme'),
    meta: { title: 'Sales Forecast', module: 'PMT', keepAlive: false }
  },
  {
    path: '/hotModelPolicy',
    name: 'hotModelPolicy',
    component: () => import('@/views/pmt/policy/hotModelPolicy'),
    meta: { title: 'Sales Forecast', module: 'PMT', keepAlive: false }
  },
  {
    path: '/shopPicPolicyScheme',
    name: 'shopPicPolicyScheme',
    component: () => import('@/views/pmt/policy/shopPicPolicyScheme'),
    meta: { title: 'Sales Forecast', module: 'PMT', keepAlive: false }
  },
  {
    path: '/spModelPolicyScheme',
    name: 'spModelPolicyScheme',
    component: () => import('@/views/pmt/policy/spModelPolicyScheme'),
    meta: { title: 'Sales Forecast', module: 'PMT', keepAlive: false }
  },
  {
    path: 'test',
    name: 'test',
    component: () => import('@/views/pmt/eLearning/components/test'),
    meta: { title: 'E-Learning', module: 'PMT', keepAlive: false }
  },
  {
    path: 'testDetail',
    name: 'testDetail',
    component: () => import('@/views/pmt/eLearning/components/testDetail'),
    meta: { title: 'E-Learning', module: 'PMT', keepAlive: false }
  },
  {
    path: 'experience',
    name: 'experience',
    component: () => import('@/views/pmt/eLearning/components/experience'),
    meta: { title: 'E-Learning', module: 'PMT', keepAlive: false }
  },
  {
    path: '/retailSubmit/:retailId&&:pageType',
    name: 'retailSubmit',
    component: () => import('@/views/pmt/retailSubmit'),
    meta: { title: 'Retail Submit', module: 'PMT', keepAlive: false }
  },
  {
    path: 'experienceDetail',
    name: 'experienceDetail',
    component: () => import('@/views/pmt/eLearning/components/experienceDetail'),
    meta: { title: 'Experience Sharing', module: 'PMT', keepAlive: false }
  },
  {
    path: 'guestSurvey',
    name: 'guestSurvey',
    component: () => import('@/views/pmt/guestSurvey'),
    meta: { title: 'Experience Sharing', module: 'PMT', keepAlive: false }
  },
  {
    path: 'guestSurveyDetail',
    name: 'guestSurveyDetail',
    component: () => import('@/views/pmt/guestSurvey/components/guestSurveyDetail'),
    meta: { title: 'Experience Sharing', module: 'PMT', keepAlive: false }
  },
  {
    path: 'workPlan',
    name: 'workPlan',
    component: () => import('@/views/pmt/workPlan'),
    meta: { title: 'Working Plan', module: 'PMT', keepAlive: false }
  },
  {
    path: 'workPlanDetail',
    name: 'workPlanDetail',
    component: () => import('@/views/pmt/workPlan/components/workPlanDetail'),
    meta: { title: 'Working Plan Detail', module: 'PMT', keepAlive: false }
  },
  {
    path: 'collaboration',
    name: 'collaboration',
    component: () => import('@/views/pmt/collaboration'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'collaborationDetail',
    name: 'collaborationDetail',
    component: () => import('@/views/pmt/collaboration/components/collaborationDetail'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'approvalList',
    name: 'approvalList',
    component: () => import('@/views/pmt/approvalList'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'workingPlanList',
    name: 'workingPlanList',
    component: () => import('@/views/pmt/approvalList/workingPlanList'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'absence',
    name: 'absence',
    component: () => import('@/views/pmt/approvalList/components/absence'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'complaint',
    name: 'complaint',
    component: () => import('@/views/pmt/approvalList/components/complaint'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'retailDetail',
    name: 'retailDetail',
    component: () => import('@/views/pmt/approvalList/components/retailDetail'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'spRegister',
    name: 'spRegister',
    component: () => import('@/views/pmt/approvalList/components/spRegister'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'overtimeList',
    name: 'overtimeList',
    component: () => import('@/views/pmt/approvalList/components/overtimeList'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'psIncentive',
    name: 'psIncentive',
    component: () => import('@/views/pmt/incentive/psIncentive'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'pstlIncentive',
    name: 'pstlIncentive',
    component: () => import('@/views/pmt/incentive/pstlIncentive'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'workPlanCreate',
    name: 'workPlanCreate',
    component: () => import('@/views/pmt/workPlan/components/workPlanCreate'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'meIncentive',
    name: 'meIncentive',
    component: () => import('@/views/pmt/incentive/meIncentive'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'metlIncentive',
    name: 'metlIncentive',
    component: () => import('@/views/pmt/incentive/metlIncentive'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'wallet',
    name: 'wallet',
    component: () => import('@/views/pmt/wallet'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'walletDetail',
    name: 'walletDetail',
    component: () => import('@/views/pmt/wallet/components/walletDetail'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'walletHostory',
    name: 'walletHostory',
    component: () => import('@/views/pmt/wallet/components/walletHostory'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'picWallet',
    name: 'picWallet',
    component: () => import('@/views/pmt/picWallet'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'picWalletHostory',
    name: 'picWalletHostory',
    component: () => import('@/views/pmt/picWallet/components/picWalletHostory'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'picWalletDetail',
    name: 'picWalletDetail',
    component: () => import('@/views/pmt/picWallet/components/picWalletDetail'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
  {
    path: 'mySalary',
    name: 'mySalary',
    component: () => import('@/views/pmt/mySalary'),
    meta: { title: 'Collaboration', module: 'PMT', keepAlive: false }
  },
]


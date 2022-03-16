export default {
  name: 'الإسم',
  tel: 'تلفون .',
  save: 'مقتصد',
  confirm: 'أكّد',
  cancel: 'ألغى',
  delete: 'حذف .',
  complete: 'Complete',
  loading: 'تحميل ....',
  telEmpty: 'Please fill in the tel',
  nameEmpty: 'Please fill in the name',
  nameInvalid: 'Malformed name',
  confirmDelete: 'Anda yakin ingin menghapus?',
  telInvalid: 'Malformed phone number',
  vanCalendar: {
    end: 'نهاية .',
    start: 'بداية .',
    title: 'عنوان',
    startEnd: 'الكشافة',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthTitle: function monthTitle(year, month) {
      return year + "/" + month;
    },
    rangePrompt: function rangePrompt(maxRange) {
      return "Choose no more than " + maxRange + " days";
    }
  },
  vanCascader: {
    select: 'Memilih'
  },
  vanContactCard: {
    addText: 'Add contact info'
  },
  vanContactList: {
    addText: 'Add new contact'
  },
  vanPagination: {
    prev: 'أعلى',
    next: 'التالي'
  },
  vanPullRefresh: {
    pulling: 'Tarik untuk menyegarkan...',
    loosing: 'Longgar untuk menyegarkan...'
  },
  vanSubmitBar: {
    label: 'Total：'
  },
  vanCoupon: {
    unlimited: 'Tak terbatas',
    discount: function discount(_discount) {
      return _discount * 10 + "% off";
    },
    condition: function condition(_condition) {
      return "Paling sedikit " + _condition;
    }
  },
  vanCouponCell: {
    title: 'Coupon',
    tips: 'No coupons',
    count: function count(_count) {
      return "You have " + _count + " coupons";
    }
  },
  vanCouponList: {
    empty: 'No coupons',
    exchange: 'Exchange',
    close: 'Close',
    enable: 'Available',
    disabled: 'Unavailable',
    placeholder: 'Coupon code'
  },
  vanAddressEdit: {
    area: 'Area',
    postal: 'Postal',
    areaEmpty: 'Please select a receiving area',
    addressEmpty: 'Address can not be empty',
    postalEmpty: 'Wrong postal code',
    defaultAddress: 'Set as the default address',
    telPlaceholder: 'Phone',
    namePlaceholder: 'Name',
    areaPlaceholder: 'Area'
  },
  vanAddressEditDetail: {
    label: 'Address',
    placeholder: 'Address'
  },
  vanAddressList: {
    add: 'Add new address'
  }
};
// Import Vant UI
import Vue from 'vue'
import {
  Badge,
  Image as VanImage,
  Cascader,
  Button,
  Icon,
  List,
  Tag,
  NavBar,
  Tabbar,
  TabbarItem,
  Cell,
  CellGroup,
  Form,
  Field,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Switch,
  Search,
  Popup,
  Dialog,
  Toast,
  ActionSheet,
  Col,
  Row,
  ImagePreview,
  NoticeBar,
  DatetimePicker,
  Stepper,
  Step,
  Steps,
  Swipe,
  SwipeItem,
  TreeSelect,
  Grid,
  GridItem,
  Empty,
  Divider,
  Sticky,
  Popover,
  Tab,
  Tabs,
  Uploader,
  Calendar,
  Locale,
  Picker,
  DropdownMenu,
  DropdownItem,
  CountDown,
  Loading,
  Card,
  SwipeCell,
  Lazyload,
  Collapse,
  CollapseItem,
  PullRefresh,
  Overlay
} from 'vant'
import enUS from 'vant/es/locale/lang/en-US';
List.props.customEle = {
  type: String,
  default: 'div'
}
List.props.showLoading = {
  type: Boolean,
  default: true
}
List.render = function () {
  var h = arguments[0];
  var Placeholder = h("div", {
    "ref": "placeholder",
    "key": "placeholder",
    // "class": bem('placeholder')
  });
  return h(this.customEle, {
    // "class": bem(),
    "attrs": {
      "role": "feed",
      "aria-busy": this.innerLoading
    }
  }, [this.direction === 'down' ? this.slots() : Placeholder, this.showLoading && this.genLoading(), this.genFinishedText(), this.genErrorText(), this.direction === 'up' ? this.slots() : Placeholder]);
}
Locale.use(enUS)
Vue.use(Button)
  .use(Badge)
  .use(Picker)
  .use(VanImage)
  .use(Cascader)
  .use(Icon)
  .use(List)
  .use(Tag)
  .use(NavBar)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Cell)
  .use(CellGroup)
  .use(Form)
  .use(Field)
  .use(RadioGroup)
  .use(Radio)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Switch)
  .use(Search)
  .use(Popup)
  .use(Dialog)
  .use(Toast)
  .use(ActionSheet)
  .use(Col)
  .use(Row)
  .use(ImagePreview)
  .use(NoticeBar)
  .use(DatetimePicker)
  .use(Stepper)
  .use(Step)
  .use(Steps)
  .use(Swipe)
  .use(SwipeItem)
  .use(TreeSelect)
  .use(Grid)
  .use(GridItem)
  .use(Empty)
  .use(Divider)
  .use(Sticky)
  .use(Popover)
  .use(Tab)
  .use(Tabs)
  .use(Uploader)
  .use(Calendar)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Loading)
  .use(Card)
  .use(CountDown)
  .use(SwipeCell)
  .use(Lazyload)
  .use(Collapse)
  .use(CollapseItem)
  .use(PullRefresh)
  .use(Overlay)


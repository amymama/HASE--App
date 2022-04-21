<template>
  <div class="todo-list">
    <van-cell icon="todo-list-o" class="home-todolist__title">
      <template #title>
        <van-tag type="primary">
          To Do Task
        </van-tag>
      </template>
      <template #right-icon>
        <van-badge :content="count">
          <van-icon name="wap-nav" />
        </van-badge>
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in ShopList"
      :to="{
        name: item.routeName,
        query: item.query
      }"
      :key="index"
      center
      is-link
      :title="`HiShop(${item.title})`">
      <template #icon>
        <img class="icon_todo" src="@/assets/images/home/icon_shop.png">
      </template>
      <template #label>
        <span style="color: red">{{ item.count }}</span> {{ item.name }}
      </template>
    </van-cell>
  </div>
</template>
<script>
import { getTodoListCount } from '@/api/shop'

export default {
  name: 'TodoList',
  data() {
    return {
      ShopList: [],
      count: 0
    }
  },
  created () {
    this.handleGetTodo()
  },
  methods: {
    // GET TODO LIST
    handleGetTodo () {
      const getShopTodos = new Promise((resolve, reject) => {
        getTodoListCount().then((res) => {
          const { data, success } = res;
          if (success) {
            this.ShopList = [
              {
                routeName: "ApproveShop",
                title: 'New Shop',
                name: 'new shop processes need your approval',
                query: { new_process_type: '1' },
                count: data.NewShopQty
              },
              {
                routeName: "ApproveShop",
                title: 'Close Shop',
                name: 'close shop processes need your approval',
                query: { new_process_type: '2' },
                count: data.CloseShopQty
              },
              {
                routeName: "ApprovePlan",
                title: 'Visit Plans',
                name: 'visit plans need your approval',
                query: {},
                count: data.VisitPlanQty
              }
            ];
            resolve(this.ShopList);
          } else {
            reject();
          }
        })
        .catch(() => {
          reject();
        });
      });

      // GET SHOP BASE DATA
      this.$toast.loading({ duration: 0, forbidClick: true });
      Promise.all([getShopTodos]).then(() => {
        const { ShopList } = this
        var count = 0
        ShopList.map((item) => {
          count+= item.count
        })
        this.count = count
        this.$toast.clear();
      })
      .catch((e) => {
        this.$toast.clear();
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  .todo-list{
    .icon_todo{
      display: block;
      width: 54px;
      height: 54px;
      margin-right: 24px;
    }
  }
</style>

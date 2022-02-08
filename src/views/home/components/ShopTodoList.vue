<template>
  <div class="shop-todo-list" v-if="list.length > 0">
    <template >
      <router-link
        v-for="(item, index) in list"
        :to="{
          name: item.routeName,
          query: item.query
        }"
        :key="index">
        <van-cell
          class="to-do-list-item"
          v-if="item.count > 0"
          is-link>
          <van-row
            type="flex">
            <van-col span="6">
              <van-cell
                center
                class="lable-title-shop"
                title="FF"
              />
            </van-col>
            <van-col span="18">
              <van-cell>
                <template #title>
                  <span class="count">
                    {{ item.count }}
                  </span>
                  {{ item.name }}
                </template>
              </van-cell>
            </van-col>
          </van-row>
        </van-cell>
      </router-link>
    </template>
  </div>
</template>
<script>
import { getTodoListCount } from '@/api/shop'

export default {
  name: 'ShopTodoList',
  data() {
    return {
      list: []
    }
  },
  created () {
    this.handleGetTodo()
  },
  methods: {
    // GET SHOP MODULE TODO LIST
    handleGetTodo () {
      getTodoListCount().then((res) => {
        const { success, data } = res
        if (success) {
          this.list = [
            {
              routeName: "ApproveShop",
              name: 'new shop processes need your approval',
              query: { new_process_type: '1' },
              count: data.NewShopQty
            },
            {
              routeName: "ApproveShop",
              name: 'close shop processes need your approval',
              query: { new_process_type: '2' },
              count: data.CloseShopQty
            },
            {
              routeName: "ApprovePlan",
              name: 'visit plans need your approval',
              query: {},
              count: data.VisitPlanQty
            }
          ]
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.shop-todo-list{
  background: #F2F2F2;
  .to-do-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px;
    margin-bottom: 5px;
    .count{
      color: #ee4300;
    }
    .lable-title-shop {
      padding-left: 0;
      padding-right: 0;
      height: 1.75rem;
      text-align: center;
      background-color: #1ad31a;
      color: #FFFFFF;
    }
  }

  .van-cell__title {
    font-weight: bold;
  }
}
</style>

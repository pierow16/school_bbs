<template>
  <v-card class="mx-auto">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="pa-4">
      <el-tab-pane label="数码设备" name="phone"></el-tab-pane>
      <el-tab-pane label="证件" name="card"></el-tab-pane>
      <el-tab-pane label="日用品" name="thing"></el-tab-pane>
      <el-tab-pane label="服饰" name="clothing"></el-tab-pane>
    </el-tabs>
    <v-list three-line>
      <template v-for="item in posts">
        <v-list-item :key="item.title" :to="`/posts/${item._id}`">
          <!-- 头像 -->
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
            <v-avatar class="mr-10" color="white" size="43">
              <span style="color: black; font-weight: bold">{{
                checkCat(item.cat)
              }}</span>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle
              v-html="item.user.name"
            ></v-list-item-subtitle>
            <v-list-item-subtitle>{{
              getDateFormat(item.createdAt)
            }}</v-list-item-subtitle>
            <v-divider class="my-2"></v-divider>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[2, 5, 6]"
      background
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </v-card>
</template>
<script>
export default {
  auth: false,
  data() {
    return {
      posts: {},
      query: {},
      currentPage: 1,
      pageSize: 5,
      total: 1,
      page: {},
      pageSizes: [2, 5, 10],
    }
  },
  // async asyncData({ $axios }) {
  //   const data = await $axios.$get('posts', {
  //     params: {
  //       query: {
  //         where: {
  //           category: 'find',
  //         },
  //         limit: 5,
  //         page: 1,
  //       },
  //     },
  //   })
  //   // const posts = res.data   $get
  //   return {
  //     posts: data.data,
  //   }
  // },
  methods: {
    handleClick(tab, event) {
      this.fetch1(tab.name)
    },
    async fetch1(cats) {
      const data = await this.$axios.$get('posts', {
        params: {
          query: {
            where: {
              category: 'find',
              cat: cats,
            },
            limit: this.query.limit,
            page: this.query.page,
          },
        },
      })
      this.total = data.total
      this.posts = data.data
      console.log('query=' + this.query)
    },
    checkCat(date) {
      let cat = ''
      if (date === 'phone') {
        cat = '数码'
      } else if (date === 'thing') {
        cat = '日用品'
      } else if (date === 'card') {
        cat = '证件'
      } else {
        cat = '服饰'
      }
      return cat
    },
    getDateFormat(date) {
      return new Date(date).toLocaleString()
    },
    handleSizeChange(size) {
      this.query.limit = size
      this.fetch()
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.query.page = currentPage
      this.fetch()
    },
    async fetch() {
      const data = await this.$axios.$get('posts', {
        params: {
          query: {
            where: {
              category: 'find',
            },
            limit: this.query.limit,
            page: this.query.page,
          },
        },
      })
      this.total = data.total
      this.posts = data.data
      console.log('query=' + this.query)
    },
  },
  created() {
    this.query.limit = 5
    this.query.page = 1
    this.fetch()
  },
}
</script>
<style></style>

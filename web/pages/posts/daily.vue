<template>
  <v-card class="mx-auto">
    <v-list three-line>
      <template v-for="item in posts">
        <v-list-item :key="item.title" :to="`/posts/${item._id}`">
          <!-- 头像 -->
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
            <v-avatar class="mr-10" color="white" size="43">
              <span style="color: black; font-weight: bold">{{
                checkCat(item.category)
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
    <!-- 分页 -->
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
      input: '',
      select: '',
      query: {},
      currentPage: 1,
      pageSize: 5,
      total: 1,
      page: {},
      pageSizes: [2, 5, 10],
      posts: {},
    }
  },
  // async asyncData({ $axios }) {
  //   const data = await $axios.$get('posts')
  //   // const posts = res.data   $get
  //   return {
  //     posts: data.data,
  //   }
  // },
  methods: {
    getDateFormat(date) {
      return new Date(date).toLocaleString()
    },
    checkCat(date) {
      let cat = ''
      if (date === 'daily') {
        cat = '日常'
      } else if (date === 'lost') {
        cat = '失物招领'
      } else {
        cat = '建议'
      }

      return cat
    },
    async search() {
      const data = await this.$axios.$get('posts', {
        params: {
          query: {
            where: {
              title: { $regex: this.input },
            },
          },
        },
      })
      this.posts = data.data
    },
    async fetch() {
      const data = await this.$axios.$get('posts', {
        params: {
          query: {
            where: {
              category: 'daily',
            },
            limit: this.query.limit,
            page: this.query.page,
          },
        },
      })
      // console.log('limit' + this.query.limit + 'currentPage' + this.currentPage)
      this.total = data.total
      this.posts = data.data
      console.log('query=' + this.query)
    },

    async fetch1() {
      const data = await this.$axios.$get('posts', {
        params: {
          query: {
            where: {
              category: 'daily',
            },
            limit: 5,
            page: 1,
          },
        },
      })
      this.total = data.total
      this.posts = data.data
      console.log('query=' + this.query)
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
  },
  created() {
    this.query.limit = 5
    this.query.page = 1
    this.fetch1()
  },
}
</script>
<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>

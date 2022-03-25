<template>
  <v-card class="mx-auto">
    <v-list three-line>
      <template v-for="item in comments">
        <v-list-item
          :key="item._id"
          :to="`/posts/${item.object}`"
          v-if="item.replies.length != 0"
        >
          <v-list-item-content v-for="rep in item.replies" :key="rep._id">
            您的评论 "{{ item.content }}"有新的回复"{{ rep.content }}""
            <v-list-item-subtitle>{{
              getDateFormat(item.createdAt)
            }}</v-list-item-subtitle>
            <v-divider class="my-2"></v-divider>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <!-- 分页 -->
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[2, 5, 6]"
      background
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination> -->
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      comments: {},
      query: {},
      currentPage: 1,
      pageSize: 5,
      total: 1,
      page: {},
      pageSizes: [2, 5, 10],
    }
  },
  // async asyncData({ $axios }) {
  //   const data = await $axios.$get('posts/andU')
  //   // const posts = res.data   $get
  //   return {
  //     posts: data.data,
  //   }
  // },
  created() {
    this.query.limit = 5
    this.query.page = 1
    this.fetch()
  },
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
    async fetch() {
      this.comments = await this.$axios.$get('comments', {
        params: {
          query: {
            where: {
              user: this.$store.state.auth.user._id,
            },
          },
        },
      })
    },
    async fetch1() {
      const data = await this.$axios.$get('posts', {
        params: {
          query: this.query,
        },
      })
      this.total = data.total
      this.posts = data.data
      console.log(
        'limit=' + this.query.limit + 'this.query.page=' + this.query.page
      )
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
}
</script>

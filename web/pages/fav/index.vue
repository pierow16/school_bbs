<template>
  <v-card class="mx-auto">
    <h3 class="pa-3">收藏夹</h3>
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
            <v-list-item-subtitle v-html="item.desc"></v-list-item-subtitle>
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
  data() {
    return {
      posts: {},
      post: {},
      query: {},
      currentPage: 1,
      pageSize: 5,
      total: 1,
      page: {},
      pageSizes: [2, 5, 10],
    }
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
        cat = '招领'
      } else if (date === 'advice') {
        cat = '建议'
      } else {
        cat = '寻物'
      }

      return cat
    },
    async fav() {
      const data = await this.$axios.$get('actions/fav1', {
        params: {
          query: {
            where: {
              user: this.user_id,
            },
            limit: 5,
            page: 1,
          },
        },
      })
      console.log(data)
      const posts = data.map((item) => item.object)
      this.posts = posts
      // const posts = res.data   $get
      // return {
      //   posts: data.data,
      // }
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
    this.user_id = this.$store.state.auth.user._id
    console.log(this.$store.state.auth.user._id)
    this.fav()
  },
}
</script>
<style></style>

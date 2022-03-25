<template>
  <v-card class="mx-auto">
    <v-list three-line>
      <template v-for="item in posts">
        <v-list-item :key="item.title" :to="`/posts/${item._id}`">
          <!-- 头像 -->
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
            <v-avatar
              class="mr-10"
              color="white"
              size="43"
              v-if="item.category"
            >
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
          <!-- $router.push(`/posts/edit/${item._id}`) -->

          <v-btn
            color="success"
            class="mr-4"
            :to="'/posts/postEdit/?id=' + item._id"
          >
            修改
          </v-btn>
          <el-button type="danger" @click="remove(item._id)">删除</el-button>
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
      query: {},
      currentPage: 1,
      pageSize: 5,
      total: 1,
      page: {},
      pageSizes: [2, 5, 10],
    }
  },
  methods: {
    async fetch() {
      const data = await this.$axios.$get('posts', {
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
      this.posts = data.data
      // const posts = res.data   $get
      // return {
      //   posts: data.data,
      // }
      // console.log(this.posts)
    },
    checkCat(date) {
      let cat = ''
      if (date === 'daily') {
        cat = '日常'
      } else if (date === 'lost') {
        cat = '寻物'
      } else if (date === 'advice') {
        cat = '建议'
      } else {
        cat = '招领'
      }

      return cat
    },
    async remove(id) {
      console.log(id)
      try {
        await this.$confirm('是否确认删除')
      } catch (error) {
        return
      }
      await this.$axios.delete(`posts/${id}`)
      this.$message.success('删除成功')
      this.$router.go(-1)
      this.fetch()
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
  },
  created() {
    this.user_id = this.$store.state.auth.user._id
    // console.log(this.$store.state.auth.user._id)
    this.fetch()
    this.query.limit = 5
    this.query.page = 1
  },
}
</script>
<style></style>

<template>
  <v-card class="mx-auto">
    <div style="margin-top: 3px; margin-left: 38px; width: 50%">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
    </div>
    <v-list three-line>
      <template v-for="item in posts">
        <v-list-item :key="item.title">
          <a :to="`/posts/${item._id}`" :href="`/posts/${item._id}`">
            <!-- 头像 -->
            <v-list-item-avatar :to="`/posts/${item._id}`">
              <v-img :src="item.avatar"></v-img>
              <a :to="`/posts/${item._id}`" :href="`/posts/${item._id}`">
                <v-avatar class="mr-10" color="pink" size="43">
                  <span style="color: white">{{
                    checkCat(item.category)
                  }}</span>
                </v-avatar>
              </a>
            </v-list-item-avatar>
          </a>
          <v-list-item-content :to="`/posts/${item._id}`">
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.desc"></v-list-item-subtitle>
            <v-list-item-subtitle>{{
              getDateFormat(item.createdAt)
            }}</v-list-item-subtitle>
            <v-list-item-subtitle>期望值:{{ item.index }}</v-list-item-subtitle>
            <v-divider class="my-2"></v-divider>
          </v-list-item-content>

          <!-- $router.push(`/posts/edit/${item._id}`) -->
          <el-button type="warning" @click="setIndex(item)">置顶</el-button>
          <el-button type="warning" @click="reIndex(item)">取消置顶</el-button>
          <v-btn
            color="success"
            class="mr-4 ml-4"
            :to="'/posts/postEdit/?id=' + item._id"
          >
            修改
          </v-btn>
          <el-button :key="item._id" type="danger" @click="remove(item._id)"
            >删除</el-button
          >
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
      input: '',
      query: {},
      currentPage: 1,
      pageSize: 5,
      total: 1,
      page: {},
      pageSizes: [2, 5, 10],
      posts: {},
      post: {},
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
        cat = '失物招领'
      } else {
        cat = '建议'
      }
      return cat
    },
    async fetch() {
      const data = await this.$axios.$get('posts', {
        params: {
          query: this.query,
        },
      })
      // console.log('limit' + this.query.limit + 'currentPage' + this.currentPage)
      this.total = data.total
      this.posts = data.data
      console.log(
        'limit=' + this.query.limit + 'this.query.page=' + this.query.page
      )
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
    async setIndex(post) {
      console.log(post)
      post.index = post.index + 1
      try {
        await this.$confirm('是否置顶该帖子')
        await this.$axios.put(`posts/${post._id}`, post)
      } catch (error) {
        return
      }

      this.$message.success('置顶成功')
      this.fetch()
    },
    async reIndex(post) {
      console.log(post)
      if (post.index !== 0) {
        post.index = post.index - 1
      } else {
        post.index = 0
      }

      try {
        await this.$confirm('是否取消置顶该帖子')
        await this.$axios.put(`posts/${post._id}`, post)
      } catch (error) {
        return
      }

      this.$message.success('取消置顶成功')
      this.fetch()
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
      this.total = data.total
      this.$router.push({
        name: 'admins',
        params: { posts: this.posts },
      })
    },
  },
  created() {
    this.user_id = this.$store.state.auth.user._id
    // console.log(this.$store.state.auth.user._id)
    this.query.limit = 5
    this.query.page = 1
    this.fetch1()
  },
}
</script>
<style>
.el-select .el-input {
  width: 150px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>

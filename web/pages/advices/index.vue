<template>
  <v-card class="mx-auto">
    <!-- 导航栏 -->
    <el-tabs v-model="activeName" @tab-click="handleClick" class="pa-4">
      <el-tab-pane label="课程教学" name="study"></el-tab-pane>
      <el-tab-pane label="宿舍生活" name="live"></el-tab-pane>
      <el-tab-pane label="食堂饮食" name="food"></el-tab-pane>
      <el-tab-pane label="校园设施" name="school"></el-tab-pane>
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
            <v-list-item-subtitle
              ><span
                >收藏:{{ item.fav_count }} &nbsp; 评论:{{
                  item.comment_count
                }}</span
              ><span style="color: white">{{ getCount(item.id) }}</span
              >{{ getDateFormat(item.createdAt) }}</v-list-item-subtitle
            >
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
    handleClick(tab, event) {
      this.fetch1(tab.name)
    },
    async fetch1(cats) {
      const data = await this.$axios.$get('posts', {
        params: {
          query: {
            where: {
              category: 'advice',
              cat: cats,
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
    checkCat(date) {
      let cat = ''
      if (date === 'school') {
        cat = '校园'
      } else if (date === 'live') {
        cat = '宿舍'
      } else if (date === 'food') {
        cat = '食堂'
      } else {
        cat = '教学'
      }
      return cat
    },
    async fetch() {
      const data = await this.$axios.$get('posts', {
        params: {
          query: {
            where: {
              category: 'advice',
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
    async getCount(id) {
      // 统计修改收藏数
      const data1 = await this.$axios.$get('actions/count', {
        params: {
          query: {
            where: {
              name: 'like',
              object: id,
            },
          },
        },
      })
      // console.log('收藏数=' + data1)
      this.post.fav_count = data1
      const data2 = await this.$axios.$get('comments', {
        params: {
          query: {
            where: {
              object: id,
            },
          },
        },
      })
      // console.log('评论数=' + data2.length)
      this.post.comment_count = data2.length
      await this.$axios.$put(`posts/${this.id}`, this.post)
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

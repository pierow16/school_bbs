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
            <span v-if="item.index > 1" style="color: red">[置顶]</span>
            <span style="display: inline-block">{{ item.title }}</span>
            <v-list-item-subtitle
              v-html="item.user.name"
            ></v-list-item-subtitle>
            <v-list-item-subtitle>
              <span
                >收藏:{{ item.fav_count }} &nbsp; 评论:{{
                  item.comment_count
                }}</span
              ><span style="color: white">{{ getCount(item.id) }}</span>
              {{ getDateFormat(item.createdAt) }}</v-list-item-subtitle
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
      input: '',
      select: '',
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
  //   const data = await $axios.$get('posts/andU')
  //   // const posts = res.data   $get
  //   return {
  //     posts: data.data,
  //   }
  // },
  created() {
    this.query.limit = 5
    this.query.page = 1
    this.fetch1()
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
        cat = '寻物'
      } else if (date === 'advice') {
        cat = '建议'
      } else {
        cat = '招领'
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

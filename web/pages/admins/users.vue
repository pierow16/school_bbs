<template>
  <v-card class="mx-auto">
    <div
      style="margin-top: 3px; margin-left: 8px; margin-left: 38px; width: 50%"
    >
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
      <template v-for="item in users">
        <v-list-item :key="item.title" :to="`/user/detail/${item._id}`">
          <!-- 头像 -->
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
            <v-avatar class="mr-10" color="pink" size="32" v-if="item.category">
              <span>{{ item.username[0] }}</span>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.name"></v-list-item-title>
            <v-list-item-subtitle v-html="item.college"></v-list-item-subtitle>
            <v-list-item-subtitle v-html="item.phone"></v-list-item-subtitle>
            <v-list-item-subtitle>{{
              getDateFormat(item.createdAt)
            }}</v-list-item-subtitle>
            <v-divider class="my-2"></v-divider>
          </v-list-item-content>
          <!-- $router.push(`/posts/edit/${item._id}`) -->

          <v-btn
            color="success"
            class="mr-4"
            :to="'/admins/userEdit/?id=' + item._id"
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
      users: {},
      input: '',
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
    async fetch() {
      const data = await this.$axios.$get('users', {
        params: {
          query: this.query,
        },
      })
      // console.log('limit' + this.query.limit + 'currentPage' + this.currentPage)
      this.total = data.total
      this.users = data.data
    },

    async fetch1() {
      const data = await this.$axios.$get('users', {
        params: {
          query: this.query,
        },
      })
      this.total = data.total
      this.users = data.data
      console.log(
        'limit=' + this.query.limit + 'this.query.page=' + this.query.page
      )
    },
    async remove(id) {
      console.log(id)
      try {
        await this.$confirm('是否确认删除')
      } catch (error) {
        return
      }
      await this.$axios.delete(`users/${id}`)
      this.$message.success('删除成功')
      this.$router.go(-1)
      this.fetch()
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
    async search() {
      const data = await this.$axios.$get('users', {
        params: {
          query: {
            where: {
              name: { $regex: this.input },
            },
          },
        },
      })
      this.users = data.data
      this.total = data.total
      this.$router.push({
        name: 'admins-users',
        params: { users: this.users },
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
<style></style>

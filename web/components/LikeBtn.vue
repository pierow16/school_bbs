<template>
  <v-btn icon :color="status ? 'pink' : null" @click="toggle">
    <v-icon>mdi-heart</v-icon>
  </v-btn>
</template>
<script>
export default {
  props: {
    type: { type: String, required: true },
    object: { type: String, required: true },
  },
  data() {
    return {
      status: false,
    }
  },
  methods: {
    // 查询状态
    async getStatus() {
      const ret = await this.$axios.$get('actions/status', {
        params: {
          type: this.type,
          object: this.object,
          name: 'like',
        },
      })
      this.status = ret.status
    },
    // 点击切换状态
    async toggle() {
      if (this.$store.state.auth.user) {
        const ret = await this.$axios.$post('actions/toggle', {
          type: 'Post',
          object: this.object,
          name: 'like',
        })
        this.status = ret.status
        try {
          await this.getCount(this.object)
        } catch (error) {
          console.log(error)
        }
      } else {
        this.$message.error('登录后才能使用收藏功能')
      }
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
      const post = await this.$axios.$get(`posts/${id}`)
      post.fav_count = data1
      await this.$axios.$put(`posts/${id}`, post)
    },
  },
  mounted() {
    // 获取当前状态
    this.getStatus()
  },
  // created() {
  //   this.getStatus()
  // },
}
</script>
<style></style>

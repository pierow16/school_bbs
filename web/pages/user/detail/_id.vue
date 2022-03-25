<template>
  <div class="pa-3">
    <h4 class="pa-3">用户信息页</h4>
    <v-divider class="my-2"></v-divider>
    <div class="pa-3">昵 称：{{ user.name }}</div>
    <v-divider class="my-2"></v-divider>
    <div class="pa-3">手机号：{{ user.phone }}</div>
    <v-divider class="my-2"></v-divider>
    <div class="pa-3">学 院：{{ user.college }}</div>
    <v-divider class="my-2"></v-divider>
    <div class="pa-3">个性签名：{{ user.desc }}</div>
    <v-divider class="my-2"></v-divider>
  </div>
</template>
<script>
export default {
  auth: false,
  data() {
    return {
      dialogFormVisible: false,
      user: {},
      formLabelWidth: '120px',
      id: '',
    }
  },
  // 获取id
  async asyncData({ params, $axios }) {
    const { id } = params
    const user = await $axios.$get(`users/${id}`)
    return {
      id,
      user,
    }
  },
  methods: {
    async submit() {
      try {
        const id = this.$route.params.id
        await this.$axios.$put(`users/${id}`, this.user)
        this.dialogFormVisible = false
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
<style>
.btn {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: 20px;
  margin-top: 20px;
}
</style>

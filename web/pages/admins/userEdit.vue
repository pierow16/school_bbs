<template>
  <div class="about">
    <!-- 可以用{{id}}打印看看有没有数据 -->
    <h3 class="pa-3">修改用户信息</h3>
    <v-form ref="form" v-model="valid" lazy-validation class="pa-3">
      <v-text-field
        v-model="model.username"
        label="用户名"
        required
      ></v-text-field>
      <v-text-field
        v-model="model.password"
        label="密码"
        type="password"
        autocomplete="new-password"
      ></v-text-field>
      <v-text-field v-model="model.name" label="昵称" required></v-text-field>
      <v-text-field
        v-model="model.college"
        label="学院"
        required
      ></v-text-field>
      <v-text-field
        v-model="model.phone"
        label="手机号"
        required
      ></v-text-field>
      <v-text-field v-model="model.type" label="权限" required></v-text-field>
      <v-btn color="success" class="mr-4" @click="submit"> 保存 </v-btn>
    </v-form>
  </div>
</template>
<script>
export default {
  data: () => ({
    model: {},
  }),
  methods: {
    async fetch() {
      const id = this.$route.query.id
      const user = await this.$axios.$get(`users/${id}`)
      this.model = user
    },
    async submit() {
      const id = this.$route.query.id
      await this.$axios.$put(`users/${id}`, this.model)
      this.$router.go(-1)
      this.$message.success('修改成功')
    },
  },
  created() {
    this.fetch()
  },
}
</script>

<template>
  <div>
    <h4 class="pa-4">请先登录</h4>
    <v-form class="pa-4" @submit.prevent="login">
      <v-text-field
        v-model="loginModel.username"
        label="用户名"
        :rules="[(v) => !!v || '用户名不能为空']"
      ></v-text-field>
      <v-text-field
        v-model="loginModel.password"
        label="密码"
        type="password"
        autocomplete="new-password"
        :rules="[(v) => !!v || '密码不能为空']"
      ></v-text-field>
      <div class="error_msg" style="color: red">{{ loginMessage }}</div>
      <v-btn color="success" type="submit">登录</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    loginModel: {},
    registerModel: {},
    loginMessage: '',
  }),
  created() {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    async login() {
      const validMap = /^[a-zA-Z0-9_-]{4,16}$/
      validMap.test(this.loginModel.username)
      if (!validMap.test(this.loginModel.username)) {
        this.loginMessage = '请输入正确用户名'
        return false
      }
      if (this.loginModel.password.length < 6) {
        this.loginMessage = '请输入正确的用户名或密码'
        return false
      }
      try {
        await this.$auth.loginWith('local', {
          data: this.loginModel,
        })
        this.isShowLoginForm = false
        this.$router.go(0)
      } catch (err) {
        this.loginMessage = '*用户名或密码错误'
      }
    },
  },
}
</script>

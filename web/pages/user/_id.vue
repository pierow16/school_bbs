<template>
  <div class="pa-3">
    <h4 class="pa-3">个人信息页</h4>
    <div class="pa-3">用 户：{{ user.username }}</div>
    <v-divider class="my-2"></v-divider>
    <div class="pa-3">昵 称：{{ user.name }}</div>
    <v-divider class="my-2"></v-divider>
    <div class="pa-3">手机号：{{ user.phone }}</div>
    <v-divider class="my-2"></v-divider>
    <div class="pa-3">学 院：{{ user.college }}</div>
    <v-divider class="my-2"></v-divider>
    <div class="pa-3">个性签名：{{ user.desc }}</div>
    <v-divider class="my-2"></v-divider>
    <!-- Form -->
    <el-button
      type="text"
      @click="dialogFormVisible = true"
      class="pa-3 btn"
      v-if="
        ($store.state.auth.user._id != null &&
          user._id === $store.state.auth.user._id) ||
        ($store.state.auth.user._id != null &&
          $store.state.auth.user.type === 0)
      "
      >修改</el-button
    >

    <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="user.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学院" :label-width="formLabelWidth">
          <el-input v-model="user.college" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="个签" :label-width="formLabelWidth">
          <el-input v-model="user.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
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

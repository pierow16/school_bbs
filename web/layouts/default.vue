<template>
  <v-app id="inspire">
    <!-- 顶部导航栏 -->
    <v-app-bar app color="white">
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="pink" size="32">
          <span v-if="$store.state.auth.user">{{
            $store.state.auth.user.username[0]
          }}</span>
        </v-avatar>
        <v-btn
          v-if="$store.state.auth.user"
          color="#504242"
          text
          :to="`/user/${$store.state.auth.user._id}`"
        >
          个人信息
        </v-btn>
        <v-btn
          v-for="link in links"
          :key="link"
          color="#504242"
          text
          :to="link.link"
        >
          {{ link.text }}
        </v-btn>
        <!-- 登录注册 -->
        <v-btn v-if="$store.state.auth.user" color="#504242" text>
          hello{{ $store.state.auth.user.name }}
          <v-btn color="grey" text @click="logout()">退出登录</v-btn>
        </v-btn>
        <v-btn v-else color="#504242" text @click="isShowLoginForm = true">
          登录
        </v-btn>
        <v-btn color="#504242" text @click="isShowRegisterForm = true">
          注册
        </v-btn>
        <div style="margin-top: 3px; margin-left: 8px">
          <el-input
            placeholder="请输入内容"
            v-model="input"
            class="input-with-select"
          >
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="帖子标题" value="1"></el-option>
              <el-option label="用户" value="2"></el-option>
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-input>
        </div>
        <!-- <v-spacer></v-spacer> -->
        <!-- <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive> -->
      </v-container>
    </v-app-bar>
    <!-- 搜索 -->

    <!-- 主体部分 -->
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <!-- 左侧侧菜单栏 -->
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="item in items"
                  :key="item.text"
                  link
                  :to="item.link"
                >
                  <v-list-item-content>
                    <v-list-item-title> {{ item.text }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <!-- 分割线 -->
                <v-divider class="my-2"></v-divider>
                <!-- 管理员版块 -->
                <v-list-item v-if="this.admin === 0" to="/admins/posts">
                  <v-list-item-content>
                    <v-list-item-title> 管理帖子 </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="this.admin === 0" to="/admins/users">
                  <v-list-item-content>
                    <v-list-item-title> 管理用户 </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <!-- <v-list-item link color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title> Refresh </v-list-item-title>
                  </v-list-item-content>
                </v-list-item> -->
              </v-list>
            </v-sheet>
          </v-col>
          <!-- 右侧内容区 -->
          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <Nuxt />
              <!-- <nuxt-child /> -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- 登录表单 -->
    <v-bottom-sheet
      v-model="isShowLoginForm"
      inset
      overlay-opacity="0.8"
      overlay-color="white"
    >
      <v-form class="pa-4" @submit.prevent="login">
        <v-text-field
          v-model="loginModel.username"
          label="用户名"
          :counter="5"
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
    </v-bottom-sheet>
    <!-- 注册表单 -->
    <v-bottom-sheet
      v-model="isShowRegisterForm"
      inset
      overlay-opacity="0.8"
      overlay-color="white"
    >
      <v-form class="pa-4" @submit.prevent="register">
        <v-text-field
          v-model="registerModel.username"
          label="用户名"
          :counter="6"
          :rules="[(v) => !!v || '用户名不能为空']"
        ></v-text-field>
        <v-text-field
          v-model="registerModel.password"
          label="密码"
          type="password"
          autocomplete="new-password"
          :rules="[(v) => !!v || '密码不能为空']"
        ></v-text-field>
        <v-text-field
          v-model="registerModel.name"
          label="昵称"
          :rules="[(v) => !!v || '昵称不能为空']"
        ></v-text-field>
        <v-text-field v-model="registerModel.phone" label="电话"></v-text-field>
        <v-text-field
          v-model="registerModel.college"
          label="学院"
        ></v-text-field>
        <v-btn color="success" type="submit">注册</v-btn>
      </v-form>
    </v-bottom-sheet>
  </v-app>
</template>

<script>
export default {
  auth: false,

  data: () => ({
    input: '',
    select: '1',
    isShowLoginForm: false,
    isShowRegisterForm: false,
    loginModel: {},
    registerModel: {},
    loginMessage: '',
    data: '',
    admin: 1,
    links: [
      // {
      //   icon: '',
      //   text: '个人主页',
      //   link: '/user',
      // },
      { icon: '', text: '收藏夹', link: '/fav' },
      { icon: '', text: '消息', link: '/message' },
      { icon: '', text: '发布', link: '/posts/postEd1' },
    ],
    items: [
      { icon: '', text: '首页', link: '/' },
      { icon: '', text: '个人帖子', link: '/user' },
      { icon: '', text: '收藏夹', link: '/fav' },

      { icon: '', text: '发布帖子', link: '/posts/postEd1' },
      { icon: '', text: '日常版块', link: '/posts/daily' },
      { icon: '', text: '寻物启事', link: '/lost/lost' },
      { icon: '', text: '失物招领', link: '/lost/find' },
      { icon: '', text: '建议意见', link: '/advices' },
    ],
  }),
  created() {
    // this.$vuetify.theme.dark=true
    this.checkAdmin()
    console.log('admin=' + this.admin)
  },
  methods: {
    checkAdmin() {
      if (this.$store.state.auth.user) {
        if (this.$store.state.auth.user.type === 0) {
          this.admin = 0
          console.log(this.admin)
        }
      } else {
        this.admin = 1
      }
    },
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
      } catch (err) {
        this.loginMessage = '*用户名或密码错误'
      }
      this.$router.go(0)
    },
    async register() {
      await this.$axios.$post('auth/register', this.registerModel)
      this.isShowRegisterForm = false
    },
    async logout() {
      // this.$store.state.auth.user = {}
      // this.$store.state.auth.token = null
      await this.$auth.logout(/* .... */)
      this.$router.go(0)
    },
    async search() {
      if (this.select === '1') {
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

        this.$router.push({
          name: 'search-posts',
          params: { posts: this.posts },
        })
      } else if (this.select === '2') {
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

        this.$router.push({
          name: 'search-users',
          params: { users: this.users },
        })
      } else {
        // 默认查帖子
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
        this.$router.push({
          name: 'search-posts',
          params: { posts: this.posts },
        })
      }
    },
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
.error_msg {
  color: #edf0f3;
  font-size: 14px;
}
</style>

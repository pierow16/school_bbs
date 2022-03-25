<template>
  <!-- 评论区 -->
  <v-card tile class="pa-3">
    <v-form @submit.prevent="send">
      <v-text-field
        v-model="content"
        label="发点什么..."
        required
        append-icon="mdi-send"
        @click:append="send"
      >
      </v-text-field>
    </v-form>
    评论列表
    <v-list three-line>
      <v-list-item v-for="(item, i) in comments" :key="i">
        <v-list-item-content v-if="!item.reply">
          <v-list-item-title>
            <v-list-item-avatar color="blue" v-if="!item.reply">
              <!-- <v-img :src="item.avatar"></v-img> -->
              <!-- item.user.username[0].topUpperCase() -->
              <span style="color: white">{{
                item.user.name.substring(0, 2)
              }}</span>
            </v-list-item-avatar>
            {{ item.content }}
            <span class="btns">
              <el-button type="text" @click="show(item)" v-if="!item.reply"
                >回复</el-button
              >
              <el-button
                type="text"
                @click="remove(item._id)"
                class="pa-3"
                v-if="admin === 0"
                >删除</el-button
              >
            </span>

            <div style="margin-left: 7%">
              {{ item.user.name }} {{ getDateFormat(item.createdAt) }}
            </div>
            <v-divider class="my-2"></v-divider>
          </v-list-item-title>
          <!-- 回复列表 -->
          <v-list-item-subtitle v-if="item.replies.length != 0">
            <h3 class="pa-2">回复</h3>
            <v-list-item v-for="(recom, i) in item.replies" :key="i">
              <span style="margin-left: 7%">{{ recom.content }}</span>
              <span class="btns">
                <el-button type="text" @click="show(item)">回复</el-button>
                <el-button
                  type="text"
                  @click="remove(recom._id)"
                  class="pa-3"
                  v-if="admin === 0"
                  >删除</el-button
                >
              </span>
            </v-list-item>
            <div style="margin-left: 7%">
              {{ item.user.name }}{{ getDateFormat(item.createdAt) }}
            </div>
            <v-divider class="my-2"></v-divider>
          </v-list-item-subtitle>
        </v-list-item-content>

        <!-- 回复评论表单 -->
        <div class="pa-3">
          <v-form
            v-show="item.isShow"
            @submit.prevent="answer(item._id)"
            class="pa-3"
          >
            <v-text-field
              v-model="recontent"
              label="发点什么..."
              required
              append-icon="mdi-send"
              @click:append="answer(item)"
            >
            </v-text-field>
          </v-form>
        </div>

        <!-- end -->
      </v-list-item>
    </v-list>

    <!-- 打印数据<p>{{ comments }}</p> -->
    <!-- </v-form> -->
  </v-card>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    object: {
      type: String,
      required: true,
      answers: [],
    },
  },
  data() {
    return {
      content: null,
      recontent: null,
      comments: [],
      recomments: [],
      isShowForm: false,
      admin: 1,
    }
  },
  created() {
    this.fetch()
    this.checkAdmin()
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
    getDateFormat(date) {
      return new Date(date).toLocaleString()
    },
    show(item) {
      if (!item.isShow) {
        this.$set(item, 'isShow', false)
        item.isShow = !item.isShow
      } else {
        item.isShow = !item.isShow
      }
      // if (this.isShowForm === true) {
      //   this.isShowForm = false
      // } else {
      //   this.isShowForm = true
      // }
    },
    async answer(item) {
      // 添加回复信息
      const data = await this.$axios.$post('comments', {
        type: this.type,
        object: this.object,
        content: this.recontent,
        reply: item._id,
      })
      // com=data.data
      console.log(data._id)
      // 获取被回复的对象
      const com = await this.$axios.$get(`comments/${item._id}`)
      // 往回复列表里添加数据
      com.replies.push(data._id)
      await this.$axios.$put(`comments/${item._id}`, com)
      // this.recontent = null
      await this.fetch()
    },
    async send() {
      if (this.$store.state.auth.user) {
        await this.$axios.$post('comments', {
          type: this.type,
          object: this.object,
          content: this.content,
        })
        this.content = null
        console.log(this.object)
        try {
          await this.getCount(this.object)
          await this.fetch()
        } catch (error) {
          console.log(error)
        }
      } else {
        this.$message.error('登录后才能使用评论功能')
      }
    },
    async fetch() {
      this.comments = await this.$axios.$get('comments', {
        params: {
          query: {
            where: {
              type: this.type,
              object: this.object,
            },
          },
        },
      })
    },
    async remove(id) {
      console.log(id)
      try {
        await this.$confirm('是否确认删除')
      } catch (error) {
        return
      }
      await this.$axios.delete(`comments/${id}`)
      this.$message.success('删除成功')

      this.fetch()
    },
    async getCount(id) {
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
      const post = await this.$axios.$get(`posts/${id}`)
      post.comment_count = data2.length
      await this.$axios.$put(`posts/${id}`, post)
    },
  },
}
</script>
<style>
.btns {
  position: absolute;
  right: 0;
  top: 20%;
}
</style>

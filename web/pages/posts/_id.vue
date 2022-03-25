<template>
  <div class="pa-3">
    <h3 class="pa-3">{{ post.title }}</h3>
    <div class="pa-3">作者:{{ user.name }}</div>
    <!-- <div v-if="post.desc" class="pa-3">简介:{{ post.desc }}</div> -->

    <v-divider class="my-2"></v-divider>
    <div v-html="post.content" class="pa-4"></div>
    <div class="pa-3">{{ getDateFormat(post.createdAt) }}</div>
    <span class="pa-3">所属版块: {{ checkCat(post.category) }}</span>
    <span class="pa-3" v-if="post.cat">> {{ checkCat(post.cat) }}</span>
    <v-divider class="my-2"></v-divider>
    <!-- 收藏 -->
    <like-btn type="Post" :object="post._id" class="pa-4"></like-btn>
    <!-- 评论 -->
    <comment-list
      type="Post"
      :object="post._id"
      class="pa-3"
      style="margin-top: 10px"
    ></comment-list>
  </div>
</template>
<script>
import LikeBtn from '../../components/LikeBtn.vue'
import CommentList from '../../components/CommentList.vue'
export default {
  auth: false,
  components: { LikeBtn, CommentList },
  data() {
    return {
      name: '',
    }
  },
  // 获取id
  async asyncData({ params, $axios }) {
    const { id } = params
    const post = await $axios.$get(`posts/${id}`)
    const user = await $axios.$get(`users/${post.user}`)
    return {
      id,
      post,
      user,
    }
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
        cat = '寻物启事'
      } else if (date === 'advice') {
        cat = '建议意见'
      } else if (date === 'find') {
        cat = '失物招领'
      } else if (date === 'phone') {
        cat = '数码设备'
      } else if (date === 'card') {
        cat = '证件'
      } else if (date === 'thing') {
        cat = '日用品'
      } else if (date === 'clothing') {
        cat = '服饰'
      } else if (date === 'study') {
        cat = '课程教学'
      } else if (date === 'live') {
        cat = '宿舍生活'
      } else if (date === 'food') {
        cat = '食堂饮食'
      } else if (date === 'school') {
        cat = '校园设施'
      }
      return cat
    },
    async getCount() {
      // 统计修改收藏数
      const data1 = await this.$axios.$get('actions/count', {
        params: {
          query: {
            where: {
              name: 'like',
              object: this.id,
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
              object: this.id,
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
    this.getCount()
  },
}
</script>
<style></style>

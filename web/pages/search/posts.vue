<template>
  <v-card class="mx-auto">
    <v-list three-line>
      <template v-for="item in posts">
        <v-list-item :key="item.title" :to="`/posts/${item._id}`">
          <!-- 头像 -->
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.desc"></v-list-item-subtitle>
            <v-list-item-subtitle
              v-html="item.createdAt"
            ></v-list-item-subtitle>
            <v-divider class="my-2"></v-divider>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script>
export default {
  auth: false,
  data() {
    return {
      posts: {},
    }
  },

  methods: {},
  created() {
    this.posts = this.$route.params.posts
    // console.log(this.$route.params.posts)
  },
}
</script>
<style></style>

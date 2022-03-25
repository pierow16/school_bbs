<template>
  <v-card class="mx-auto">
    <v-list three-line>
      <template v-for="item in users">
        <v-list-item :key="item.username" :to="`/user/detail/${item._id}`">
          <!-- 头像 -->
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
            <v-avatar class="mr-10" color="pink" size="42">
              <span style="color: white">{{ item.name.substring(0, 2) }}</span>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.name"
              >昵称:{{ item.name }}</v-list-item-title
            >
            <v-list-item-subtitle v-html="item.desc"></v-list-item-subtitle>
            <v-list-item-subtitle>{{
              getDateFormat(item.createdAt)
            }}</v-list-item-subtitle>
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
      users: {},
    }
  },
  methods: {
    getDateFormat(date) {
      return new Date(date).toLocaleString()
    },
  },
  created() {
    this.users = this.$route.params.users
    console.log(this.$route.params.users)
  },
}
</script>
<style></style>

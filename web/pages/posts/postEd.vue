<template>
  <div class="about">
    <!-- 可以用{{id}}打印看看有没有数据 -->
    <h3 class="pa-3">发帖</h3>
    <v-form ref="form" v-model="valid" lazy-validation class="pa-3">
      <v-text-field
        v-model="model.title"
        label="帖子标题"
        required
      ></v-text-field>

      <v-text-field
        v-model="model.desc"
        label="帖子副标题"
        required
      ></v-text-field>
      <vue-editor v-model="model.content" class="pa-3"> </vue-editor>
      <v-select
        v-model="model.category"
        :items="categories"
        label="版块"
        @change="selectFn($event)"
        required
      ></v-select>
      <!--失物招领  -->
      <v-select
        v-show="this.selected === 2"
        v-model="model.cat"
        :items="cat2"
        label="子分类"
        required
      ></v-select>
      <!-- 建议意见 -->
      <v-select
        v-show="this.selected === 1"
        v-model="model.cat"
        :items="cat1"
        label="子分类"
        required
      ></v-select>
      <v-btn color="success" class="mr-4" @click="submit"> 发布 </v-btn>
    </v-form>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor,
  },
  data: () => ({
    select: null,
    model: {},
    categories: ['日常', '建议意见', '寻物启事', '失物招领'],
    cat2: ['数码设备', '证件', '日用品', '服饰'],
    cat1: ['课程教学', '宿舍生活', '食堂饮食', '校园设施'],
    selected: 0,
  }),
  methods: {
    async submit() {
      // 大版块
      if (this.model.category === '日常') {
        this.model.category = 'daily'
      } else if (this.model.category === '建议意见') {
        this.model.category = 'advice'
      } else if (this.model.category === '寻物启事') {
        this.model.category = 'lost'
      } else {
        this.model.category = 'find'
      }
      // 小版块
      if (this.model.cat === '数码设备') {
        this.model.cat = 'phone'
      } else if (this.model.cat === '证件') {
        this.model.cat = 'card'
      } else if (this.model.cat === '日用品') {
        this.model.cat = 'thing'
      } else if (this.model.cat === '服饰') {
        this.model.cat = 'clothing'
      } else if (this.model.cat === '课程教学') {
        this.model.cat = 'study'
      } else if (this.model.cat === '宿舍生活') {
        this.model.cat = 'live'
      } else if (this.model.cat === '食堂饮食') {
        this.model.cat = 'food'
      } else if (this.model.cat === '校园设施') {
        this.model.cat = 'school'
      }
      await this.$axios.$post('posts', this.model)

      this.$router.go(-1)
      this.$message.success('发布成功')
    },
    selectFn(e) {
      console.log(e)
      console.log(e.target.selectedIndex) // 选择项的index索引
      console.log(e.target.value) // 选择项的value
      if (e.target.selectedIndex === 2) {
        // 建议意见
        this.selected = 1
      } else if (e.target.selectedIndex === 3 || e.target.selectedIndex === 4) {
        // 寻物
        this.selected = 2
      }
    },
  },
}
</script>

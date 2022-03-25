import { ApiProperty } from '@nestjs/swagger';
import { arrayProp, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Category } from './category.model';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    // 自动添加创建时间戳和更新时间戳
    timestamps: true,
  },
})
export class Post {
  @ApiProperty({ description: '作者', example: 'user1' })
  @prop({ ref: User })
  user: Ref<User>;
  @ApiProperty({ description: '帖子标题', example: '帖子1' })
  @prop()
  title: string;
  @ApiProperty({ description: '帖子内容', example: '简介' })
  @prop()
  desc: string;
  @ApiProperty({ description: '帖子内容', example: '大学生活' })
  @prop()
  content: string;
  @ApiProperty({ description: '分类', example: 'daily' })
  @prop()
  category: Ref<Category>;
  @ApiProperty({ description: '分类', example: 'Card' })
  @prop()
  cat: Ref<Category>;
  @ApiProperty({ description: '权重', example: '0' })
  @prop()
  index: Number;
  @ApiProperty({ description: '收藏数', example: '0' })
  @prop()
  fav_count: Number;
  @ApiProperty({ description: '点赞数', example: '0' })
  @prop()
  good_count: Number;
  @ApiProperty({ description: '评论数', example: '0' })
  @prop()
  comment_count: Number;
  // 一对多关联
  // @arrayProp({itemsRef:'Category'})
  // category:Ref<Category>[]
}

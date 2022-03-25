import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Post } from './post.model';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    // 自动添加创建时间戳和更新时间戳
    timestamps: true,
  },
})
export class Comment {
  @ApiProperty({ description: '评论人', example: 'user1' })
  @prop({ ref: User })
  user: Ref<User>;
  @ApiProperty({ description: '评论对象', example: 'Post' })
  @prop({ enum: ['Post', 'User'] })
  type: string;
  @ApiProperty({ description: '评论对像的id', example: '12133' })
  @prop({ refPath: 'type' })
  object: Ref<Post | User>;
  @ApiProperty({ description: '内容', example: 'hello' })
  @prop({})
  content: string;
  @ApiProperty({ description: '回复', example: '_id' })
  @prop({ref: Comment} )
  reply:Ref<Comment>
  @ApiProperty({ description: '回复列表', example: '_id' })
  @prop({ref: Comment} )
  replies:[Ref<Comment>]
  // 一对多关联
  // @arrayProp({itemsRef:'Category'})
  // category:Ref<Category>[]
}

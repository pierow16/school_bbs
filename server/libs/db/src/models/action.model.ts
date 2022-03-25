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
export class Action {
  @ApiProperty({ description: '用户', example: 'user1' })
  @prop({ ref: User })
  user: Ref<User>;
  @ApiProperty({ description: '操作对象类型', example: 'Post' })
  @prop({ enum: ['Post', 'User'] })
  type: string;
  @ApiProperty({ description: '操作对象id', example: '13234' })
  @prop({ refPath: 'type' })
  object: Ref<Post | User>;
  @ApiProperty({ description: '操作', example: 'like' })
  @prop({ enum: ['like', 'upvote'] })
  name: string;
  // 一对多关联
  // @arrayProp({itemsRef:'Category'})
  // category:Ref<Category>[]
}

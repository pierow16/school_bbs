import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    // 自动添加创建时间戳和更新时间戳
    timestamps: true,
  },
})
export class Category {
  @ApiProperty({ description: '分类名', example: '失物招领' })
  @prop({ enum: ['daily', 'advice','lost'] })
  name: string;
}

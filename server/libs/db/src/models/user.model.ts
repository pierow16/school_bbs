import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';
@modelOptions({
  schemaOptions: {
    // 自动添加创建时间戳和更新时间戳
    timestamps: true,
  },
})
export class User {
  @ApiProperty({ description: '用户名', example: 'user1' })
  @prop()
  username: string;
  @ApiProperty({ description: '密码', example: 'pass1' })
  @prop({
    // 查询时候默认不展示处理
    select: false,
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;
  @ApiProperty({ description: '权限', example: '1' })
  @prop()
  type:Number;
  @ApiProperty({ description: '手机号', example: '13087989999' })
  @prop()
  phone:string;
  @ApiProperty({ description: '学院', example: '启迪数字学院' })
  @prop()
  college:string;
  @ApiProperty({ description: '昵称', example: '小熊软糖' })
  @prop()
  name:string;
  @prop()
  desc:string;
}

import { Post } from '@libs/db/models/post.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
@Crud({ model: Post })
@ApiTags('帖子')
@Controller('posts')
export class PostsController {
  constructor(
    // 类型提示 model:  不写也行
    @InjectModel(Post) private readonly model: ReturnModelType<typeof Post>,
  ) {}
}

import { Post as PostSchem } from '@libs/db/models/post.model';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { userInfo } from 'node:os';
import { CurrentUser } from '../auth/cruuent-user.decorator';
@Crud({
  model: PostSchem,
  // 关掉创建修改删除接口   _id: -1,
  routes:{
    find: {
      populate:"user",
      sort: { 
        index:-1, 
        comment_count:-1,
        _id: -1
      },
    },
    
    
  }
  // routes: {
  //   update: false,
  //   delete: false,
  // },
})
@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  constructor(@InjectModel(PostSchem) private model) {}
  @Get('andU')
  async andU(@Query('query') query:string) {
    const params =JSON.parse(query)
    return await this.model.find().populate('user').where(params.where).setOptions(params);
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto, @CurrentUser() user) {
    dto.user = user._id;
    dto.fav_count=0;
    dto.good_count=0;
    dto.comment_count=0;
    return await this.model.create(dto);
  }


  

}

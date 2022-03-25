import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Comment } from '@libs/db/models/comment.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/cruuent-user.decorator';
import { ApiTags } from '@nestjs/swagger';
@Controller('comments')
@ApiTags('评论')
export class CommentsController {
  constructor(
    @InjectModel(Comment) private commentModel: ReturnModelType<typeof Comment>,
  ) {}
  @Get()
  async index(@Query('query') query:string) {
    const params =JSON.parse(query)
    console.log(query)
    // populate('user')关联查询user把user对象也调出来。需要用户头像   .setOptions(params); .sort('-_id').limit(20)
    return await this.commentModel.find().populate(['replies','user']).populate({path:'replies',populate:{path:'user'}}).where(params.where).setOptions(params);
  }
  @Delete(':id')
  async delCom(@Param('id') id:string,@Body() dto) {
    // const params =JSON.parse(query)
    console.log(id)
    return await this.commentModel.findByIdAndDelete(`${id}`,dto);
  }
  @Get(':id')
  async getCom(@Param('id') id:string) {
    // const params =JSON.parse(query)
    console.log(id)
    return await this.commentModel.findById(`${id}`).populate(['replies','user']).populate({path:'replies',populate:{path:'user'}});
  }
  @Put(':id')
  async Update(@Param('id') id:string,@Body() dto) {
    console.log(id)
    return await this.commentModel.findByIdAndUpdate(`${id}`,dto);
  }
  @Get('count')
  async count(@Query('query') query:string) {
    const params =JSON.parse(query)
    console.log(query)
   
    return await this.commentModel.find().where(params.where).setOptions(params);
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto, @CurrentUser() user) {
    dto.user = user._id;
    dto.replies=[];
    return await this.commentModel.create(dto);
  }
}

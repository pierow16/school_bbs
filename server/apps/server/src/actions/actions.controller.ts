import { Action } from '@libs/db/models/action.model';
import { Body, Controller, Get, Post, UseGuards, Query, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { CurrentUser } from '../auth/cruuent-user.decorator';
@Controller('actions')
@ApiTags('用户操作')
export class ActionsController {
  constructor(
    @InjectModel(Action) private actionModel: ReturnModelType<typeof Action>,
  ) {}

  @Get('status')
  @UseGuards(AuthGuard('jwt'))
  async getStatus(@Query() dto, @CurrentUser() user) {
    console.log(dto);
    dto.user = user._id;
    const count = await this.actionModel.countDocuments(dto);
    console.log(count);
    return {
      status: count > 0,
    };
  }
  @Get('count')
  async Count(@Query('query') query:string) {
    const params =JSON.parse(query)
    const count = await this.actionModel.find().count().where(params.where).setOptions(params);
    return count;
  }
  @Post('toggle')
  @UseGuards(AuthGuard('jwt'))
  async toggle(@Body() dto, @CurrentUser() user) {
    dto.user = user._id;
    const ret = await this.getStatus(dto, user);
    if (ret.status) {
      // 存在数据则删除
      await this.actionModel.deleteMany();
    } else {
      // 否则创建一条数据
      await this.actionModel.create(dto);
    }
    return await this.getStatus(dto, user);
  }
  @Get('fav')
  @UseGuards(AuthGuard('jwt'))
  async fav(@Body() dto, @CurrentUser() user){
    
    dto.user=user._id
    const ret =await this.actionModel.find().populate('object');
    return ret;
  }
  @Get('fav1')
  @UseGuards(AuthGuard('jwt'))
  async fav1(@Body() dto, @CurrentUser() user,@Query('query') query:string){
    const params =JSON.parse(query)
    console.log(query)
    dto.user=user._id
    const ret =await this.actionModel.find().populate('object').where(params.where).setOptions(params);
    return ret;
  }
}

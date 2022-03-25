import { User } from '@libs/db/models/user.model';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './cruuent-user.decorator';
@Controller('auth')
@ApiTags('登录权限')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() dto: RegisterDto) {
    const { username, password,college,phone,desc,name } = dto;
    const user = await this.userModel.create({
      username,
      password,
      name,
      college,
      phone,
      desc,
      type:1
    });
    
    return user;
  }
  makeString(): string {
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 30; i++) {

      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));

    }

    return outString;
  }
  
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @Req() req) {
    // dto数据传输对象
    return {
      token: this.jwtService.sign(String(req.user._id)),
    };
  }

  @Post('loginout')
  @ApiOperation({ summary: '退出登录' })
  @UseGuards(AuthGuard('local'))
  @Get()
  async loginout() {
    // dto数据传输对象
    return "退出成功";
  }

  // swagger验证
  @Get('user')
  @ApiOperation({ summary: '获取个人信息' })
  @ApiBearerAuth()
  //守卫
  @UseGuards(AuthGuard('jwt'))
  // 使用自定义装饰器 @CurrentUser() user
  // async user(@CurrentUser() user:User){
  //     // dto数据传输对象
  //     return user
  // }
  async user(@Req() req) {
    // dto数据传输对象
    return { user: req.user };
  }
}

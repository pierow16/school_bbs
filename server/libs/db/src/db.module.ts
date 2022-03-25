import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Post } from './models/post.model';
import { Category } from './models/category.model';
import { Action } from './models/action.model';
import { Comment } from './models/comment.model';
const models = TypegooseModule.forFeature([
  User,
  Post,
  Category,
  Action,
  Comment,
]);
// 全局引用 把模块标记为全局
@Global()
@Module({
  imports: [
    // 异步加载方式
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        };
      },
    }),

    // 导入模型
    models,
  ],
  providers: [DbService],
  // 导出
  exports: [DbService, models],
})
export class DbModule {}

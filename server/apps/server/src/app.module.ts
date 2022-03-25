import { Module } from '@nestjs/common';
import { CommonModule } from 'libs/common/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ActionsModule } from './actions/actions.module';
import { CommentsModule } from './comments/comments.module';
import { CategoriesModule } from './categories/categories.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    PostsModule,
    ActionsModule,
    CommentsModule,
    CategoriesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

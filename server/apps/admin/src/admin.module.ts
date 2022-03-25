import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from './users/users.module';

import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';
import { CommonModule } from 'libs/common/src';

@Module({
  imports: [CommonModule, UsersModule, CategoriesModule, PostsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

import { Category } from '@libs/db/models/category.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
@Crud({ model: Category })
@Controller('categories')
@ApiTags('分类')
export class CategoriesController {
  constructor(@InjectModel(Category) private readonly model) {}
}

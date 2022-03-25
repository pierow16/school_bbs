import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  type:Number;
  @ApiProperty()
  phone:string;
  @ApiProperty()
  college:string;
  @ApiProperty()
  name:string;
  @ApiProperty()
  desc:string;
}

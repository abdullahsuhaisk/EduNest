import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
  UseInterceptors,
  Session,
  UseGuards
  // UseInterceptors,
  // ClassSerializerInterceptor
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import {
  Serialize,
  SerializeInterceptor,
} from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthGuard } from '../guards/auth.guard';



// Decorators
@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    // return this.usersService.create(body.email, body.password);
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    // return this.usersService.create(body.email, body.password);
    const user = await this.authService.signIn(body.email, body.password);
    // console.log(session);
    session.userId = user.id;
    return user;
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // @Serialize(UserDto) If ı want to apply serialze only spesific route

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('Handler runninng !!!');
    const user = await this.usersService.findOne(parseInt(id));
    // console.log(user);
    // console.log(!user);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  // @Get('/whoami')
  // async whoAmI(@Session() session: any) {
  //   const user = await this.usersService.findOne(session.userId);
  //   console.log(session);
  //   return user;
  // }
  @UseGuards(AuthGuard)
  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
    console.log(user);
  }

  @UseGuards(AuthGuard)
  @Post('/signout')
  signOut(@Session() session: any, @CurrentUser() user: User) {
    console.log(session);
    console.log(user)
    session.userId = null;
    console.log(session);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}

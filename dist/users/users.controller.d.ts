import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    createUser(body: CreateUserDto, session: any): Promise<User>;
    signIn(body: CreateUserDto, session: any): Promise<User>;
    findUser(id: string): Promise<User>;
    findAllUsers(email: string): Promise<User[]>;
    whoAmI(user: User): User;
    signOut(session: any, user: User): void;
    removeUser(id: string): Promise<User>;
    updateUser(id: string, body: UpdateUserDto): Promise<User>;
}

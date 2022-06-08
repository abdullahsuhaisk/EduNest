import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;
  const mockEmail = 'abcd@abc.com';
  const mockPass = '123456';

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: mockEmail,
          password: mockPass,
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([
          { id: 1, email: email, password: mockPass } as User,
        ]);
      },
      remove: (id: number) => {
        return Promise.resolve({
          id,
          email: mockEmail,
          password: mockPass,
        } as User);
      },
      update: (id: number, { email: string }) => {
        return Promise.resolve({
          id,
          email: mockEmail,
          password: mockPass,
        } as User);
      },
    };
    fakeAuthService = {
      signIn: (email: string, password: string) => {
        return Promise.resolve({
          id: 1,
          email: email,
          password: mockPass,
        } as User);
      },
      // signUp: () => {},
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers(mockEmail);
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual(mockEmail);
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async (done) => {
    fakeUsersService.findOne = () => null;
    try {
      await controller.findUser(1);
    } catch (error) {
      done();
    }
  });

  it('signIn updates session object and returns user', async () => {
    const session = {userId: -10};
    const user = await controller.signIn({ email: mockEmail, password: mockPass }, session);
    expect(user.id).toEqual(1)
    expect(session.userId).toEqual(1)
  });
});

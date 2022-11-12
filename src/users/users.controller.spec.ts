import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersServiceMock: Partial<UsersService>;

  beforeEach(async () => {
    usersServiceMock = {
      createUser: (username: string) => {
        return Promise.resolve();
      },
      list: () => {
        return Promise.resolve([
          { id: 1, username: 'elonmusk', createdAt: new Date() },
        ]);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

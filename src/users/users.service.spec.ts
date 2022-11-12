import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createMockDataSource } from '../mocks/data-source.mock';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const mockDataSource = await createMockDataSource();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          name: 'default',
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService],
    })
      .overrideProvider(DataSource)
      .useValue(mockDataSource)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

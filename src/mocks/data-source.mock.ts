import { DataSource } from 'typeorm';
import { newDb } from 'pg-mem';

export const createMockDataSource = async () => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public.registerFunction({
    name: 'current_database',
    implementation: () => 'test',
  });

  db.public.registerFunction({
    name: 'version',
    implementation: () => '15.1',
  });

  const ds: DataSource = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'],
  });
  await ds.initialize();
  await ds.synchronize();

  return ds;
};

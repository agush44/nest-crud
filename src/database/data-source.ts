import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '',
  database: process.env.POSTGRES_DB || 'testdb',
  entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
  synchronize: false,
  migrations: [path.join(__dirname, '/../migrations/*{.ts,.js}')],
  migrationsTableName: 'migrations',
});

import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/user.entity.js';
import { Product } from '../products/product.entity.js';

export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: String(process.env.POSTGRES_USER || 'postgres'),
  password: String(process.env.POSTGRES_PASSWORD || ''),
  database: process.env.POSTGRES_DB || 'testdb',
  entities: [User, Product],
  synchronize: true,
});

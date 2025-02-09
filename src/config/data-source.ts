import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import {User} from '../users/entities/user.entity'; // Chemin relatif correct

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [User],
  migrations: [__dirname + '/../migrations/*.ts'],  // Corrige également le chemin des migrations
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
});
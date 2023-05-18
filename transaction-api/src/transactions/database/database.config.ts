import { Client, types } from 'pg';

const databaseConfig: Client = {
  user: 'cfabrica46',
  password: 'abcd',
  host: 'localhost',
  port: 5432,
  database: 'yape',
};

export default databaseConfig;

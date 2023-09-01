import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET,
    access_secret_expires_in: process.env.JWT_ACCESS_SECRET_EXIPIRES_IN,
  },
};

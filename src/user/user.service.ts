import { connection } from '../app/database/mysql';
import { UserModel } from './user.model';

export const createUser = async (user: UserModel) => {
  const statement = `
        INSERT INTO user
        SET ?
    `;

  const [data] = await connection.promise().query(statement, user);

  return data;
};

interface GetUserOptions {
  needPassword?: boolean;
}

export const getUserByName = async (
  name: string,
  options: GetUserOptions = {},
) => {
  const { needPassword } = options;

  const statement = `
    SELECT id, name 
    ${needPassword ? ', password'  : ''}
    FROM user
    WHERE name = ?
  `;

  const [data] = await connection.promise().query(statement, name);
  console.log('data', data);
  return data[0];

};
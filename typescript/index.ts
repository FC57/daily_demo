import { GET_USER } from './constant/index.ts';

// ts 内置类型工具 ThisType<T> 可定义函数内 this 的类型，Awaited<T> 获取Promise返回类型

/** 用户接口 */
interface User {
  /** 用户名 */
  name: string;
  /** 用户id */
  userId: number;
  /** 是否超管 */
  isRoot: boolean;
}

/**
 * 获取用户信息
 * @param userId 用户id
 */
async function getUser(userId: number): Promise<User> {
  try {
    return (await fetch(GET_USER, { method: 'POST', body: JSON.stringify({ userId }) }).then(res =>
      res.json()
    )) as User;
  } catch (error) {
    const userDefault: User = { name: '', userId: 0, isRoot: false };
    return userDefault;
  }
}

/** 该类型即为 User */
type GetUser = Awaited<ReturnType<typeof getUser>>;
const user: GetUser = { name: '', userId: 0, isRoot: false };

console.log(GET_USER, user);

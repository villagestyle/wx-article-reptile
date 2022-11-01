import { mongo } from "../utils/connectSQL";
import TokenService from "./token";

/** 用户登录 */
export const login = async (data: UserLoginCredentials) => {
  const userDataSet = await (await mongo).connect("user");

  const user = await userDataSet.Collection.findOne<UserInfo>(data);

  userDataSet.connection.close();

  if (user) {
    const token = await TokenService.updateToken(user._id);

    const userInfo = await getUserInfo(user._id);

    return { ...userInfo, token };

  } else {
    return { code: 500, msg: "用户名或密码错误" };
  }
};

// 注册用户
export const register = async (data: UserRegisterCredentials) => {
    const userDataSet = await (await mongo).connect("user");

    const exist = await userDataSet.Collection.findOne<UserInfo>({
        username: data.username
    });

    if (exist) {
        return { code: 500, msg: "已存在同名用户" };
    }

    await userDataSet.Collection.insertOne(data);

    return { code: 200 };
}

/** 获取用户信息 */
export const getUserInfo = async (userId: string) => {
  const userDataSet = await (await mongo).connect("user");

  const userInfo = await userDataSet.Collection.findOne<UserInfo>({
    _id: userId
  });

  userDataSet.connection.close();

  if (userInfo) {
    return { code: 200, data: userInfo };
  } else {
    return { code: 500, msg: "用户信息不存在" };
  }
};

export default {
    login,
    getUserInfo,
    register
}
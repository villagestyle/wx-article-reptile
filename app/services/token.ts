import { mongo } from "../utils/connectSQL";
import jwt from "jsonwebtoken";
import { Config } from "../config";

export default {
  /** 获取数据库中存储的token信息 */
  findTokenFromDB: async (params: TokenSearchParams) => {
    const tokenDataSet = await (await mongo).connect("tokens");
    const lib_token = await tokenDataSet.Collection.findOne<ConnectToken>(
      params
    );

    tokenDataSet.connection.close();
    return lib_token;
  },

  /** 刷新token, 如果不存在则新建token */
  updateToken: async (userId: string) => {
    // 获取新的token
    const newToken = jwt.sign(
      {
        _id: userId
      },
      Config.AssessTokenKey,
      {
        expiresIn: "1h",
        issuer: "villageStyle"
      }
    );

    const tokenDataSet = await (await mongo).connect("tokens");

    const exist = await tokenDataSet.Collection.findOne({ userId: userId });

    if (exist) {
      // 更新token
      await tokenDataSet.Collection.updateOne(
        {
          userId: userId
        },
        {
          $set: {
            refresh_token: newToken
          }
        }
      );
    } else {
      await tokenDataSet.Collection.insertOne({
        userId: userId,
        refresh_token: newToken,
        assess_token: newToken
      })
    }

    //  关闭数据库链接
    tokenDataSet.connection.close();

    return newToken;
  }
};

interface TokenSearchParams {
  userId?: string;
  assess_token?: string;
}

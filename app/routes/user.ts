import { FastifyInstance } from "fastify";
import Joi from "joi";
import UserService from '../services/user';

// 登录参数校验
const UserLoginValidate = Joi.object<UserLoginCredentials>({
  username: Joi.string().min(3).max(16).required(),
  password: Joi.string().min(6).max(16).required()
});

// 用户注册参数校验
const UserRegisterValidate = Joi.object<UserRegisterCredentials>({
  username: Joi.string().min(3).max(16).required(),
  password: Joi.string().min(6).max(16).required(),
  sex: Joi.allow(0,1,2).required(),
  memo: Joi.string().max(50)
});

export const setupUserRouter = (app: FastifyInstance) => {
  // 测试接口
  app.get("/test/:id", (req, res) => {
    const params = req.params;
    console.log("这是params", params);
    res.status(200).send({ code: 0, data: { msg: "hello world" } });
  });

  // 登录接口
  app.post('/user/login', async (req, res) => {
    const data = req.body as UserLoginCredentials;

    const result = UserLoginValidate.validate(data);

    if (result.error) {
      res.status(500).send(result.error);
      return;
    }

    const ret = await UserService.login(data);

    res.status(ret.code).send(ret);
  });

  // 用户注册
  app.post('/user/register', async (req, res) => {
    const data = req.body as UserRegisterCredentials;

    const result = UserRegisterValidate.validate(data);

    if (result.error) {
      res.status(500).send(result.error);
      return;
    }

    const ret = await UserService.register(data);

    res.status(ret.code).send(ret);
  })
};

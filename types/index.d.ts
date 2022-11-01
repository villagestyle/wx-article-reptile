type Sex = 0 | 1 | 2;

interface UserTokenInfo {
  _id: string;
}

// 数据库中的token数据结构
interface ConnectToken {
  refresh_token: string;
  userId: string;
  assess_token: string;
}

// 全局配置文件
interface ConfigType {
  readonly SysNo: string;
  readonly AssessTokenKey: string;
}

// 用户登录凭证
interface UserLoginCredentials {
  username: string;
  password: string;
}

// 用户注册凭证
interface UserRegisterCredentials {
  username: string;
  password: string;
  sex: Sex;
  memo?: string;
}

// 数据库中存储的用户信息
interface UserInfo {
  username: string;
  password: string;
  sex: Sex;
  _id: string;
  memo?: string;
}
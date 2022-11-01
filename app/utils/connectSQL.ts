import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017";

export const connectSQL = (): Promise<typeof mongoose> => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, {})
      .then((db) => {
        resolve(db);
      })
      .catch((err) => {
        console.log("数据库连接失败");
        reject(err);
      });
  });
};

export const mongo = connectSQL();
import mongoose from "mongoose";
import app from "./app";

const port: number = 2000;

export async function main() {
  const uri: any = process.env.DB_URL || "mongodb://localhost:27017/firstdb";
  try {
    (await mongoose.connect(uri)) as any;
    console.log("Database is connected");
    // app listen
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log("Database connect error", error);
  }
}

main();

import * as dotenv from "dotenv";

import connectDB from "./configs/connect-db.config.js";
import cors from "cors";
import express from "express";
import rootRoutes from "./routes/index.js";

// import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();

// middlewares
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  }),
);

app.get("/", (_, res) => {
  res.send("hello word");
});

//connect db
connectDB();

//doc swagger
// app.use('/documents', swaggerUi.serve, swaggerUi.setup(api))

//routes
app.use(`/api/v1`, rootRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 ~Server is running on port ${port}`);
});

app.use(async (req, res) => {
  try {
      await func(req, res, next); // gọi hàm xử lý request
  } catch (error) {
      return res.status(500).json({
          message: error.message,
          success: false,
      });
  }
});
//mảng ban đầu
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//             0  1  2  3  4  5  6  7  8
// const Dev = 123 + '1'
// console.log("🚀 ~ Dev:", Dev)

// // console.log("🚀 ~ Dev:", Dev)

// let test = 456
// test =789 + '1'
// console.log("🚀 ~ test:", test)

// var hello = 199
// hello=789 + 1 + '1'
// console.log("🚀 ~ hello:", hello)
// hello =false
// console.log("🚀 ~ hello:", hello)
// console.log(1 === '1')

//Thêm phần tử ở cuối mảng
//push()
// numbers.push(8)
// console.log("🚀 ~ numbers:", numbers)

// xóa phần tử cuối cùng
// numbers.pop();
// console.log("🚀 ~ numbers:", numbers)

//Thêm phần từ vào đầu mảng
// numbers.unshift(0)
// console.log("🚀 ~ numbers:", numbers)

//xóa phần tử đầu tiên
// numbers.shift()
// console.log("🚀 ~ numbers:", numbers)

//Tạo một mảng mới từ bản ban đầu
// let binhphuong = numbers
// for (let i = 0; i < binhphuong.length; i++ ) {
//     binhphuong[i] = binhphuong[i] * binhphuong[i]
// }
// console.log("🚀 ~ binhphuong:", binhphuong)
// let binhphuong = numbers.map(mini => mini * 3)
// console.log("🚀 ~ binhphuong:", binhphuong)

//Lọc phần từ (tìm kiếm)
// let filtered = numbers.filter((num) => {
//     return num > 3
// })

// console.log("🚀 ~ filtered:", filtered);
// // for (let i = "a"; i <= "z"; i++ ) {
// //     console.log("🚀 ~ i:", i)
// // }

//Tính tổng các phần tử trong mảng
//reduce
// let total = numbers.reduce((num, num2) => {
//   return num + num2;
// });
// console.log("🚀 ~ total:", total);

import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import expenseRouter from "./routes/expense.js"
import leaderboardRouter from "./routes/leaderboard.js";
import paymentRouter from "./routes/payment.js";
import dotenv from "dotenv"
import mongoose from "mongoose";


dotenv.config();
const app=express();



app.use(express.json());
app.use(cors());

app.use("/auth",authRouter);
app.use("/expense",expenseRouter);
app.use("/leaderboard",leaderboardRouter);
app.use("/payment",paymentRouter)

const CONNECTION_URL =process.env.MONGO_URL;
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


import express from "express";
import cors from "cors";
import router from "./func.js";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api", router);

app.listen(8000, () => {
  console.log("working on 8000");
});

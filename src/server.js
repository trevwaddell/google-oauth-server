import express from "express";
import "./services/passport";
import authRoutes from "./routes/auth";

const port = process.env.PORT || 9001;
const app = express();

authRoutes(app);

app.listen(port, () => console.log(`Listening on PORT ${port}`));

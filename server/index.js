import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
const cross_origin = process.env.CROSS_ORIGIN || "*";

app.use(express.json({ limit: "20kb" })); // Size limit to pass in body
app.use(
	cors({
		origin: cross_origin,
	})
);
app.on("error", (error) => {
	console.error(error);
	process.exit(1);
});

app.listen(port, () => {
	console.log(`Server is listening on ${port}`);
});

app.get("/", (req, res) => {
	res.send("<h1>API is up and running 🚀</h1>");
});

import userRouter from "./routes/user.route.js";
app.use("/bfhl", userRouter);

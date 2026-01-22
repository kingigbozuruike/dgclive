import express from "express";
import cors from "cors";
import "dotenv/config";
import { prisma } from "./lib/prisma";

const app = express();

app.use(cors({
	origin: ["http://localhost:3000"],
	credentials: true
}));
app.use(express.json());

app.get("/health", async (req, res) => {
	try {
		const now = await prisma.$queryRaw`SELECT NOW()`;
		res.json({ ok: true, now });
	} catch (err) {
		console.error(err);
		res.status(500).json({ ok: false, error: "DB connection failed" });
	}
});

const port = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(port, () => {
	console.log(`API running on http://localhost:${port}`);
});

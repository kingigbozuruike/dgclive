import { supabaseAdmin } from "../lib/supabaseAdmin";
import { Request, Response, NextFunction } from "express";

export async function requireAuth(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization?.replace("Bearer ", "");

	if (!token) {
		return res.status(401).json({ error: "Missing token" });
	}

	const { data, error } = await supabaseAdmin.auth.getUser(token);

	if (error || !data.user) {
		return res.status(401).json({ error: "Invalid token" });
	}

	// req.user = {
	// 	id: data.user.id,
	// 	email: data.user.email!
	// };

	next();
}

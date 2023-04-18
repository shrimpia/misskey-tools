import { FastifyReply } from "fastify";

import { die } from "@/server/utils/die.js";
import { getUser } from "@/services/users/get-user.js";
import { updateUser } from "@/services/users/update-user.js";
import { upsertUser } from "@/services/users/upsert-user.js";

export const login = async (reply: FastifyReply, user: Record<string, unknown>, host: string, token: string) => {
	const isNewcomer = !(await getUser(user.username as string, host));
	await upsertUser(user.username as string, host, token);

	const u = await getUser(user.username as string, host);

	if (!u) {
		await die(reply);
		return;
	}

	if (isNewcomer) {
		await updateUser(u.username, u.host, {
			prevNotesCount: user.notesCount as number ?? 0,
			prevFollowingCount: user.followingCount as number ?? 0,
			prevFollowersCount: user.followersCount as number ?? 0,
		});
	}

	await reply.view('frontend', { token: u.misshaiToken });
}

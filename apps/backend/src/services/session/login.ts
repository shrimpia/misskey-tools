import { getUser } from "@/services/users/get-user.js";
import { updateUser } from "@/services/users/update-user.js";
import { upsertUser } from "@/services/users/upsert-user.js";

export const login = async (user: Record<string, unknown>, host: string, token: string): Promise<string> => {
	const isNewcomer = !(await getUser(user.username as string, host));
	await upsertUser(user.username as string, host, token);

	const u = await getUser(user.username as string, host);
	if (!u) {
		throw new Error('No such user.');
	}

	if (isNewcomer) {
		await updateUser(u.username, u.host, {
			prevNotesCount: user.notesCount as number ?? 0,
			prevFollowingCount: user.followingCount as number ?? 0,
			prevFollowersCount: user.followersCount as number ?? 0,
		});
	}

	return u.misshaiToken;
}

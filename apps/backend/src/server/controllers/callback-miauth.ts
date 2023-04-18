import { RouteHandler } from "fastify";
import axios from "axios";

import { login } from "@/services/session/login.js";
import { sessionHostCache } from "@/server/cache.js";
import { die } from "@/server/utils/die.js";

/**
 * MisskeyにMiAuth認証を飛ばしたときに返ってくるコールバックのハンドラーです。
 */
export const callbackMiauthController: RouteHandler<{Querystring: {session: string}}> = async (req, reply) => {
	const session = req.query.session as string | undefined;
	if (!session) {
		await die(reply, 'sessionRequired');
		return;
	}
	const host = sessionHostCache[session];
	delete sessionHostCache[session];
	if (!host) {
		await die(reply);
		console.error('host is null or undefined');
		return;
	}

	const url = `https://${host}/api/miauth/${session}/check`;
	const res = await axios.post(url, {});
	const { token, user } = res.data;

	if (!token || !user) {
		await die(reply);
		if (!token) console.error('token is null or undefined');
		if (!user) console.error('user is null or undefined');
		return;
	}

	const toolsToken = await login(user, host, token);
	await reply.view('frontend', { token: toolsToken });
};

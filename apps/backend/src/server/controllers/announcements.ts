import { RouteHandler } from "fastify";
import striptags from "striptags";

import { markdown } from "@/libs/markdown.js";
import { prisma } from "@/libs/prisma.js";


export const announcementsController: RouteHandler<{Params: {id: string}}> = async (req, reply) => {
	const a = await prisma.announcement.findUnique({ where: {id: Number(req.params.id)} });
	const stripped = striptags(markdown.render(a?.body ?? '').replace(/\n/g, ' '));
	await reply.view('frontend', a ? {
		t: a.title,
		d: stripped.length > 80 ? stripped.substring(0, 80) + '…' : stripped,
	} : {});
}

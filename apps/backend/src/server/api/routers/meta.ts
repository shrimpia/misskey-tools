import { meta } from "@/config";
import { procedure, router } from "@/libs/trpc";

import { currentTokenVersion } from "tools-shared/dist/const.js";

export const metaRouter = router({
	get: procedure.query(() => ({
		version: meta.version,
		currentTokenVersion,
	})),
});

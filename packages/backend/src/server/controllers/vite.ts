import { RouteHandler } from 'fastify';

/**
 * Vite アセットを返します。
 */
export const viteController: RouteHandler = async (req, reply) => {
  // リクエストされたファイルのパス
  const path = req.url.slice('/vite'.length);

  // 本番環境
  if (process.env.NODE_ENV === 'production') {
    reply.statusCode = 404;
    return {
      error: '未実装',
    };
  }

  // 開発環境
  reply.redirect(302, 'http://localhost:5173' + path);
};

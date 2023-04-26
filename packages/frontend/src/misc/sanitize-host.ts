export const hostRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:\d*)?$/;

/**
 * acctフォーマット、URL、ホスト名のいずれかを受け付け、正規化し、ホスト名を返します。
 * @param hostLike 正規化用のacct形式文字列、URL、ホスト名のいずれか。
 */
export const sanitizeHost = (hostLike: string) => {
  if (hostLike == null) {
    throw new Error('URL not detected');
  }
  const atPosition = hostLike.lastIndexOf('@');
  let hostName = hostLike;
  if (atPosition >= 0) {
    // acct
    hostName = hostLike.slice(atPosition + 1);
  } else if (hostLike.startsWith('http')) {
    // url
    const url = toUrl(hostLike);
    if (url != null) {
      hostName = url.host;
    }
  }

  // 終端に / がついていたらとってあげる
  if (hostName.endsWith('/')) {
    hostName = hostName.slice(0, hostName.length - 1);
  }

  if (!hostRegex.test(hostName)) {
    throw new Error('URL not detected');
  }

  return hostName;
};

/**
 * URLとしてパースできた場合はURLオブジェクトを、なければnullを返します。
 * @param url
 */
export const toUrl = (url: string) => {
  try {
    return new URL(url);
  } catch (e) {
    if (e instanceof TypeError) {
      return null;
    }
    throw e;
  }
};

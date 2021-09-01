import React, { useState } from 'react';

export const LoginForm: React.VFC = () => {
	const [host, setHost] = useState('');

	return (
		<nav>
			<div>
				<strong>インスタンスURL</strong>
			</div>
			<div className="hgroup">
				<input
					className="input-field"
					type="text"
					placeholder="例: misskey.io"
					value={host}
					onChange={(e) => setHost(e.target.value)}
					required
				/>
				<button
					className={!host ? 'btn' : 'btn primary'}
					style={{ width: 128 }}
					disabled={!host}
					onClick={() => location.href = `//${location.host}/login?host=${encodeURIComponent(host)}`}
				>
					ログイン
				</button>
			</div>
		</nav>
	);
};

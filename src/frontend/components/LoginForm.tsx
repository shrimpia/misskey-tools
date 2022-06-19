import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Input = styled.input`
	width: auto;
	flex: 1;
`;

export const LoginForm: React.VFC = () => {
	const [host, setHost] = useState('');
	const {t} = useTranslation();

	return (
		<nav>
			<div>
				<strong>{t('instanceUrl')}</strong>
			</div>
			<div className="hgroup login-form">
				<Input
					className="input-field"
					type="text"
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
					{t('login')}
				</button>
			</div>
		</nav>
	);
};

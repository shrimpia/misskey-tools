import React from 'react';
import { Link } from 'react-router-dom';
import { welcomeMessage } from '../../misc/welcome-message';

export type HeaderProps = {
	hasTopLink?: boolean;
};

export const Header: React.FC<HeaderProps> = ({hasTopLink, children}) => {
	const message = React.useMemo(
		() => welcomeMessage[Math.floor(Math.random() * welcomeMessage.length)] , []);

	return (
		<header className={'xarticle card shadow-4 mt-5 mb-3'}>
			<div className="body">
				<h1 className="text-primary mb-0" style={{ fontSize: '2rem' }}>
					{hasTopLink ? <Link to="/">みす廃アラート</Link> : 'みす廃アラート'}
				</h1>
				<h2 className="text-dimmed ml-1">{message}</h2>
				{children}
			</div>
		</header>
	);
};

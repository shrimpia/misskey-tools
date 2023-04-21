import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	position: relative;
	width: 100vw;
	height: 100vh;
	background: ${import.meta.env.DEV ? 'url("https://placekitten.com/1280/720")' : 'var(--blue-5)'};
	background-size: cover;
	background-blend-mode: darken;
	color: var(--white);
	padding: 16px;
	align-items: center;
	justify-content: center;

	${import.meta.env.DEV ? `
	&::before {
		content: '';
		background-color: #00000060;
		position: absolute;
		inset: 0;
	}
	` : ''}

	> div {
		min-width: 0;
		z-index: 1;
	}
`;

const PlainPre = styled.pre`
	color: inherit;
	background: none;
	padding: 8px;
`;

export const ErrorPage: React.FC<{error: Error}> = ({error}) => {
  const location = useLocation();

  const errorInfo = `
=== Misskey Tools Internal Error ===
name: ${error.name}
message: ${error.message}
stack: ${error.stack}
location: ${location.pathname}
ua: ${navigator.userAgent}
luckyItem: Shrimp
	`.trim();
  return (
    <Container>
      <div style={{minWidth: 0}}>
        <h2><i className="fas fa-skull" /> 内部エラー</h2>
        <p>Misskey Tools にて予期しないエラーが発生しました。開発者へ不具合報告をお願いします。</p>
        <p>報告の際は以下の情報を伝えてください。</p>
        <PlainPre>
          {errorInfo}
        </PlainPre>
      </div>
    </Container>
  );
};

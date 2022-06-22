import { useCallback, useEffect, useState } from 'react';
import { useSelector } from '../store';

export const actualThemes = [
	'light',
	'dark',
] as const;

export const themes = [
	...actualThemes,
	'system',
] as const;

export type Theme = typeof themes[number];

export type ActualTheme = typeof actualThemes[number];

export const useTheme = () => {
	const {theme, accentColor} = useSelector(state => state.screen);

	const [ osTheme, setOsTheme ] = useState<ActualTheme>('dark');

	const applyTheme = useCallback(() => {
		const actualTheme = theme === 'system' ? osTheme : theme;
		if (actualTheme === 'dark') {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	}, [theme, osTheme]);

	// テーマ変更に追従する
	useEffect(() => {
		applyTheme();
	}, [theme, osTheme]);

	// システムテーマ変更に追従する
	useEffect(() => {
		const q = window.matchMedia('(prefers-color-scheme: dark)');
		setOsTheme(q.matches ? 'dark' : 'light');

		const listener = () => setOsTheme(q.matches ? 'dark' : 'light');
		q.addEventListener('change', listener);
		return () => {
			q.removeEventListener('change', listener);
		};
	}, [osTheme, setOsTheme]);

	// カラー変更に追従する
	useEffect(() => {
		const {style} = document.body;
		style.setProperty('--primary', `var(--${accentColor})`);
		for (let i = 1; i <= 10; i++) {
			style.setProperty(`--primary-${i}`, `var(--${accentColor}-${i})`);
		}
	}, [accentColor]);
};

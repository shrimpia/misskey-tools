import { useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { titleAtom } from '@/store/client-state';

export const useTitle = (title: string) => {
	const setTitle = useSetAtom(titleAtom);
  useEffect(() => {
		setTitle(title);
    return () => {
			setTitle(null);
    };
  }, [title]);
};

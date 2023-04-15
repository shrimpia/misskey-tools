import { useEffect } from 'react';
import { useAtom } from 'jotai';
import * as atoms from '@/store/slices/auth'

export const useTitle = (title: string) => {
	const [_, setTitle] = useAtom(atoms.title)
  useEffect(() => {
		setTitle(title);
    return () => {
			setTitle(null);
    };
  }, [title]);
};

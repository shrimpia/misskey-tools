import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../store/slices/screen';

export const useTitle = (title: string) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle(title));
    return () => {
      dispatch(setTitle(null));
    };
  }, [title]);
};

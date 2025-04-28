import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '@/store/store';
import { fetchUser } from '@/store/userSlice';

const useAuth = () => {
  const dispatch: AppDispatch = useDispatch(); // Tipar o dispatch corretamente
  const { user, loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user) {
    // Pass the required argument, e.g., user ID
      dispatch(fetchUser());
      console.log(user)
    }
  }, [dispatch, user]);

  return { user, loading, error };
};

export default useAuth;
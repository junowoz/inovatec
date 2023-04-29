import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { userState } from 'context/User/UserState';

const withAuth = (Component) => {
  return (props) => {
    const user = userState((state) => state.user);
    const router = useRouter();

    useEffect(() => {
      if (!user || Object.keys(user).length === 0) {
        router.replace('/login');
      }
    }, [user]);

    return <Component {...props} />;
  };
};

export default withAuth;

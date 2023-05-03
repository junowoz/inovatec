import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { userState } from 'context/UserState';

const withAuth = (Component) => {
  const WithAuth = (props) => {
    const user = userState((state) => state.user);
    const router = useRouter();

    useEffect(() => {
      if (!user || Object.keys(user).length === 0) {
        router.replace('/login');
      }
    }, [user]);

    return <Component {...props} />;
  };

  WithAuth.displayName = `WithAuth(${getDisplayName(Component)})`;

  return WithAuth;
};

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export default withAuth;


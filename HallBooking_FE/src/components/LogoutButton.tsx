import React from 'react';
import { Button } from 'antd';
import { useAuth } from '../context/AuthContext';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Button onClick={logout} type="primary" danger>
      Logout
    </Button>
  );
};

export default LogoutButton;

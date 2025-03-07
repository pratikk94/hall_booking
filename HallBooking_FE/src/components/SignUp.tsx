import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSignup = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      // Replace with your API call
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        message.success('Signup successful!');
      } else {
        message.error(data.message || 'Signup failed');
      }
    } catch {
      message.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={handleSignup}>
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Signup
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;

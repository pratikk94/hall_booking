import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, message, Tag } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { InputRef } from 'antd';
import type { FilterDropdownProps as AntFilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

interface User {
  id: string;
  name: string;
  userId: string;
  employeeId: string;
  email: string;
  mobileNumber: string;
  department: string;
  role: 'admin' | 'user';
  bookings?: Array<{
    id: string;
    title: string;
    start: string;
    end: string;
    status: 'pending' | 'approved' | 'rejected';
  }>;
}

// Add initial dummy data
const initialUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    userId: 'john.doe',
    employeeId: 'EMP001',
    email: 'john.doe@company.com',
    mobileNumber: '9876543210',
    department: 'IT',
    role: 'admin',
    bookings: [
      {
        id: 'b1',
        title: 'Team Meeting',
        start: '2024-03-15T10:00:00',
        end: '2024-03-15T11:00:00',
        status: 'approved'
      }
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    userId: 'jane.smith',
    employeeId: 'EMP002',
    email: 'jane.smith@company.com',
    mobileNumber: '9876543211',
    department: 'HR',
    role: 'user',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    userId: 'mike.j',
    employeeId: 'EMP003',
    email: 'mike.j@company.com',
    mobileNumber: '9876543212',
    department: 'Finance',
    role: 'user',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    userId: 'sarah.w',
    employeeId: 'EMP004',
    email: 'sarah.w@company.com',
    mobileNumber: '9876543213',
    department: 'Marketing',
    role: 'user',
  },
  {
    id: '5',
    name: 'Admin User',
    userId: 'admin.user',
    employeeId: 'EMP005',
    email: 'admin.user@company.com',
    mobileNumber: '9876543214',
    department: 'IT',
    role: 'admin',
  }
];

type DataIndex = keyof User;

const UserManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = React.useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<User> => ({
    filterDropdown: (props: AntFilterDropdownProps) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={props.selectedKeys[0]}
          onChange={(e) => props.setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(props.selectedKeys as string[], props.confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(props.selectedKeys as string[], props.confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => props.clearFilters && handleReset(props.clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => props.close()}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record: User) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value?.toString().toLowerCase() ?? ''),
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 150,
    },
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
      ...getColumnSearchProps('employeeId'),
      width: 120,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      width: 200,
    },
    {
      title: 'Mobile',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
      width: 120,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      width: 120,
      filters: [
        { text: 'IT', value: 'IT' },
        { text: 'HR', value: 'HR' },
        { text: 'Finance', value: 'Finance' },
        { text: 'Marketing', value: 'Marketing' },
        { text: 'Operations', value: 'Operations' },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 100,
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'User', value: 'user' },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'blue' : 'green'}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)} 
            size="small"
          />
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            size="small"
          />
        </Space>
      ),
    },
  ];

  const handleAddUser = () => {
    setIsModalVisible(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    editForm.setFieldsValue({
      ...user,
    });
    setIsEditModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Delete User',
      content: 'Are you sure you want to delete this user?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setUsers(users.filter(user => user.id !== id));
        message.success('User deleted successfully');
      },
    });
  };

  const handleEditModalOk = async () => {
    try {
      const values = await editForm.validateFields();
      if (editingUser) {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === editingUser.id
              ? { ...user, ...values }
              : user
          )
        );
        message.success('User updated successfully');
        setIsEditModalVisible(false);
        setEditingUser(null);
        editForm.resetFields();
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setEditingUser(null);
    editForm.resetFields();
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
        ...values,
      };
      
      setUsers([...users, newUser]);
      message.success('User added successfully');
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleModalCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '16px 0', background: '#fff', borderRadius: '8px' }}>
      <div style={{ marginBottom: '16px', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>User Management</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
          Add User
        </Button>
      </div>

      {users.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No users found
        </div>
      ) : (
        <Table 
          columns={columns} 
          dataSource={users} 
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: 800 }}
          size="small"
        />
      )}

      <Modal
        title="Edit User"
        open={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
        width={800}
      >
        <Form
          form={editForm}
          layout="vertical"
          name="editUserForm"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              name="employeeId"
              label="Employee ID"
              rules={[{ required: true, message: 'Please enter employee ID' }]}
            >
              <Input placeholder="Enter employee ID" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item
              name="mobileNumber"
              label="Mobile Number"
              rules={[
                { required: true, message: 'Please enter mobile number' },
                { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit mobile number' }
              ]}
            >
              <Input placeholder="Enter mobile number" />
            </Form.Item>

            <Form.Item
              name="department"
              label="Department"
              rules={[{ required: true, message: 'Please select department' }]}
            >
              <Select placeholder="Select department">
                <Select.Option value="IT">IT</Select.Option>
                <Select.Option value="HR">HR</Select.Option>
                <Select.Option value="Finance">Finance</Select.Option>
                <Select.Option value="Marketing">Marketing</Select.Option>
                <Select.Option value="Operations">Operations</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select role' }]}
            >
              <Select placeholder="Select role">
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="user">User</Select.Option>
              </Select>
            </Form.Item>
          </div>

          {(editingUser?.bookings ?? []).length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <h4>User Bookings</h4>
              <Table
                dataSource={editingUser?.bookings ?? []}
                size="small"
                pagination={false}
                rowKey="id"
                columns={[
                  {
                    title: 'Title',
                    dataIndex: 'title',
                    key: 'title',
                  },
                  {
                    title: 'Start',
                    dataIndex: 'start',
                    key: 'start',
                    render: (date: string) => new Date(date).toLocaleString(),
                  },
                  {
                    title: 'End',
                    dataIndex: 'end',
                    key: 'end',
                    render: (date: string) => new Date(date).toLocaleString(),
                  },
                  {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status: 'pending' | 'approved' | 'rejected') => (
                      <Tag color={
                        status === 'approved' ? 'green' : 
                        status === 'pending' ? 'gold' : 'red'
                      }>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Tag>
                    ),
                  },
                ]}
              />
            </div>
          )}
        </Form>
      </Modal>

      <Modal
        title="Add New User"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          name="userForm"
        >
          <Form.Item
            name="name"
            label="User Name"
            rules={[{ required: true, message: 'Please enter user name' }]}
          >
            <Input placeholder="Enter user name" />
          </Form.Item>

          <Form.Item
            name="userId"
            label="User ID"
            rules={[{ required: true, message: 'Please enter user ID' }]}
          >
            <Input placeholder="Enter user ID" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: 'Please select department' }]}
          >
            <Select placeholder="Select department">
              <Select.Option value="IT">IT</Select.Option>
              <Select.Option value="HR">HR</Select.Option>
              <Select.Option value="Finance">Finance</Select.Option>
              <Select.Option value="Marketing">Marketing</Select.Option>
              <Select.Option value="Operations">Operations</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select role' }]}
          >
            <Select placeholder="Select role">
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="user">User</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement; 
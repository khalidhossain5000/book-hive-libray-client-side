import React from 'react';
import ManageUsersClient from '@/components/dashboard/ManageUsers/ManageUsersClient';

export const metadata = {
  title: 'Manage Users | BookHive Dashboard',
  description: 'Manage users, assign roles, and handle user permissions.',
};

const ManageUsers = () => {
    return (
        <ManageUsersClient />
    );
};

export default ManageUsers;
import React from 'react';
import AddBookClient from '@/components/dashboard/AddBook/AddBookClient';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';

export const metadata = {
  title: 'Add Book | BookHive Dashboard',
  description: 'Add a new book to the library catalog.',
};

const AddBookPage = () => {
    return (
        <PrivateRoute allowedRoles={['admin']}>
        <AddBookClient />
        </PrivateRoute>
    );
};

export default AddBookPage;

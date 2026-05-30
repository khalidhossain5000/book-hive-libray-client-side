import React from 'react';
import AddBookClient from '@/components/dashboard/AddBook/AddBookClient';

export const metadata = {
  title: 'Add Book | BookHive Dashboard',
  description: 'Add a new book to the library catalog.',
};

const AddBookPage = () => {
    return (
        <AddBookClient />
    );
};

export default AddBookPage;

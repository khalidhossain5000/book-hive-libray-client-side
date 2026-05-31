import UserBorrowedBooks from '@/components/dashboard/UserBorrowedBooks/UserBorrowedBooks';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import React from 'react';

const BorrowedBooksDashboardPage = () => {
    return (
     <PrivateRoute allowedRoles={['user','admin']}>
            <UserBorrowedBooks/>
    </PrivateRoute>
    );
};

export default BorrowedBooksDashboardPage;

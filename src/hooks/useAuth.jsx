"use client"
import { AuthContext } from '@/context/AuthContext';
import React, { use, useContext } from 'react';


const useAuth = () => {
    const authInfo = useContext(AuthContext);
    return authInfo
};

export default useAuth;
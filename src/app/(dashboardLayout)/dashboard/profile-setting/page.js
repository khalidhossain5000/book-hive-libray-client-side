import React from 'react';
import SettingsProfile from '@/components/dashboard/settings/settingsProfile';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';

export const metadata = {
  title: 'Profile Settings | BookHive Dashboard',
  description: 'Manage your profile settings.',
};

const ProfileSetting = () => {
    return (
        <PrivateRoute>
        <SettingsProfile />

        </PrivateRoute>
    );
};

export default ProfileSetting;
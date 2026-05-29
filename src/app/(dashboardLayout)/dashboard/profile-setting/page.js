import React from 'react';
import SettingsProfile from '@/components/dashboard/settings/settingsProfile';

export const metadata = {
  title: 'Profile Settings | BookHive Dashboard',
  description: 'Manage your profile settings.',
};

const ProfileSetting = () => {
    return (
        <SettingsProfile />
    );
};

export default ProfileSetting;
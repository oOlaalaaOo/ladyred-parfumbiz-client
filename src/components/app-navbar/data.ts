import {
    IconBinaryTree2,
    IconDashboard,
    IconLogout,
    IconUserCircle,
} from '@tabler/icons';

const MockData = {
    navbar: [
        { label: 'Dashboard', icon: IconDashboard, link: '/q/dashboard' },
        {
            label: 'Referral Logs',
            icon: IconBinaryTree2,
            link: '/q/referral-logs',
        },
        {
            label: 'Account',
            icon: IconUserCircle,
            links: [
                {
                    label: 'Change Password',
                    link: '/q/change-password',
                },
                {
                    label: 'Account details',
                    link: '/q/account-details',
                },
            ],
        },
        { label: 'Logout', icon: IconLogout, link: '/logout' },
    ],
};

export default MockData;

import { Grid } from '@mantine/core';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import type { ReactElement } from 'react';
import { useMutation } from 'react-query';
import AppHeadTitle from '../../../components/app-head-title/app-head-title';
import WithSidebarLayout from '../../../components/layouts/with-sidebar-layout/with-sidebar-layout';
import AuthUserDetails, {
    IAuthUserDetailsSubmitProps,
} from '../../../features/auth/user-details/user-details';
import { IUser } from '../../../interfaces';
import axiosInstance from '../../../libs/axios.lib';
import { authenticatedPage } from '../../../utils/authenticated-page';
import { NextPageWithLayout } from '../../_app';

const AccountDetailsPage: NextPageWithLayout<{
    user: IUser;
    accessToken: string;
}> = ({ user, accessToken }) => {
    const mutation = useMutation<IUser, Error, IAuthUserDetailsSubmitProps>({
        mutationFn: async (formData) => {
            const resp = await axiosInstance.post<IUser>(
                '/auth/update/details',
                {
                    userId: user._id,
                    name: formData.name,
                    mobileNo: formData.mobileNo,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            return resp.data;
        },
        onSuccess: (data) => {
            console.log('data', data);
        },
        onError: (error) => {
            console.log('error', error);
        },
    });

    return (
        <div className='account-details-page'>
            <AppHeadTitle />

            <Grid>
                <Grid.Col span={5}>
                    <AuthUserDetails
                        user={user}
                        onSubmit={(data) => mutation.mutate(data)}
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
};

AccountDetailsPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <WithSidebarLayout pageName={'Account details'}>
            {page}
        </WithSidebarLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return authenticatedPage(context, (user, accessToken) => {
        return {
            props: {
                user,
                accessToken,
            },
        };
    });
};

export default AccountDetailsPage;

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import type { ReactElement } from 'react';
import AppHeadTitle from '../../../components/app-head-title/app-head-title';
import WithSidebarLayout from '../../../components/layouts/with-sidebar-layout/with-sidebar-layout';
import ReferralLogs from '../../../features/referral-logs/referral-logs';
import { IUser } from '../../../interfaces';
import { authenticatedPage } from '../../../utils/authenticated-page';
import { NextPageWithLayout } from '../../_app';

const ReferralLogsPage: NextPageWithLayout<{
    user: IUser;
    accessToken: string;
}> = ({ user, accessToken }) => {
    return (
        <div className='logs-page'>
            <AppHeadTitle />

            <ReferralLogs user={user} accessToken={accessToken} />
        </div>
    );
};

ReferralLogsPage.getLayout = function getLayout(page: ReactElement) {
    return <WithSidebarLayout pageName={'Logs'}>{page}</WithSidebarLayout>;
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

export default ReferralLogsPage;

import { Grid, Modal } from '@mantine/core';
import { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import { ReactElement, useState } from 'react';
import { useMutation } from 'react-query';
import AppButton from '../../../components/app-button/app-button';
import AppDashboardWidget from '../../../components/app-dashboard-widget/app-dashboard-widget';
import AppHeadTitle from '../../../components/app-head-title/app-head-title';
import AppNotification from '../../../components/app-notification/app-notification';
import WithSidebarLayout from '../../../components/layouts/with-sidebar-layout/with-sidebar-layout';
import Cashout, {
    ICashout,
    ICashoutSubmitProps,
} from '../../../features/cashout/cashout';
import Cashouts from '../../../features/cashouts/cashouts';
import DirectDownlines from '../../../features/direct-downlines/direct-downlines';
import { IUser } from '../../../interfaces';
import axiosInstance from '../../../libs/axios.lib';
import { authenticatedPage } from '../../../utils/authenticated-page';
import { NextPageWithLayout } from '../../_app';

const DashboardPage: NextPageWithLayout<{ user: IUser; accessToken: string }> =
    ({ user, accessToken }) => {
        const [unilevelModal, setUnilevelModal] = useState<boolean>(false);
        const [cashoutNotification, setCashoutNotification] = useState<{
            show: boolean;
            title: string;
            message: string;
            mode: 'success' | 'error' | 'info' | 'warning';
        }>({
            show: false,
            title: '',
            message: '',
            mode: 'error',
        });

        const unilevelCashoutMutation = useMutation<
            ICashout,
            AxiosError,
            ICashoutSubmitProps
        >({
            mutationFn: async (formData) => {
                const resp = await axiosInstance.post<ICashout>(
                    '/cashout',
                    {
                        userId: user._id,
                        userUnilevelPoints: user.unilevelPoints,
                        userRepeatPurchasePoints: user.repeatPurchasePoints,
                        userMobileNo: formData.userMobileNo,
                        cashoutAmount: formData.cashoutAmount,
                        cashoutType: 'unilevel',
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                return resp.data;
            },
            onSuccess: () => {
                setCashoutNotification({
                    title: 'Success',
                    message: 'Successfully request a cashout.',
                    mode: 'success',
                    show: true,
                });
            },
            onError: (error: any) => {
                if (error && error.response) {
                    setCashoutNotification({
                        title: 'Error',
                        message: error.response.data.message,
                        mode: 'error',
                        show: true,
                    });
                }
            },
            onSettled: () => {
                setUnilevelModal(false);
            },
        });

        return (
            <div>
                <AppHeadTitle />

                <Grid>
                    <Grid.Col span={6}>
                        <AppDashboardWidget
                            title={'Unilevel'}
                            subtitle={'Jade'}
                            balance={`PHP ${user.unilevelPoints}.00`}
                            ctaComponent={
                                <AppButton
                                    sx={() => ({
                                        marginTop: '10px',
                                    })}
                                    onClick={() => setUnilevelModal(true)}
                                    fullWidth
                                >
                                    Request for cash out
                                </AppButton>
                            }
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <AppDashboardWidget
                            title={'Repeat Purchases'}
                            subtitle={'monthly purchase'}
                            balance={`PHP ${user.repeatPurchasePoints}.00`}
                            ctaComponent={
                                <Grid>
                                    <Grid.Col span={6}>
                                        <AppButton
                                            sx={() => ({
                                                marginTop: '10px',
                                            })}
                                            fullWidth
                                            disabled
                                        >
                                            Request for cash out
                                        </AppButton>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <AppButton
                                            sx={() => ({
                                                marginTop: '10px',
                                            })}
                                            fullWidth
                                            variant='light'
                                            disabled
                                        >
                                            Request for purchase
                                        </AppButton>
                                    </Grid.Col>
                                </Grid>
                            }
                        />
                    </Grid.Col>
                </Grid>

                <Grid
                    sx={() => ({
                        marginTop: '50px',
                    })}
                >
                    <Grid.Col span={12}>
                        <Cashouts user={user} accessToken={accessToken} />
                    </Grid.Col>
                </Grid>

                <Grid
                    sx={() => ({
                        marginTop: '50px',
                    })}
                >
                    <Grid.Col span={12}>
                        <DirectDownlines
                            user={user}
                            accessToken={accessToken}
                        />
                    </Grid.Col>
                </Grid>

                <Modal
                    centered
                    opened={unilevelModal}
                    onClose={() => setUnilevelModal(false)}
                    title='Unilevel cashout'
                >
                    <Cashout
                        user={user}
                        onSubmit={(data) =>
                            unilevelCashoutMutation.mutate(data)
                        }
                    />
                </Modal>

                {cashoutNotification.show === true ? (
                    <AppNotification
                        title={cashoutNotification.title}
                        message={cashoutNotification.message}
                        mode={cashoutNotification.mode}
                        onClose={() =>
                            setCashoutNotification((v) => ({
                                ...v,
                                show: false,
                            }))
                        }
                    />
                ) : null}
            </div>
        );
    };

DashboardPage.getLayout = function getLayout(page: ReactElement) {
    return <WithSidebarLayout pageName={'Dashboard'}>{page}</WithSidebarLayout>;
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

export default DashboardPage;

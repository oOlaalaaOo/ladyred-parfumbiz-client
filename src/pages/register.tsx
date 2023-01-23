import type { GetServerSideProps, NextPage } from 'next';
import { Alert, Center, Flex, Paper, Title } from '@mantine/core';
import AuthRegister, {
    IAuthRegisterSubmitProps,
} from '../features/auth/register/register';
import { useMutation } from 'react-query';
import axiosInstance from '../libs/axios.lib';
import { IUser } from '../interfaces';
import { useRouter } from 'next/router';
import AppHeadTitle from '../components/app-head-title/app-head-title';
import AppLogo from '../components/app-logo/app-logo';
import { useState } from 'react';
import AppNotification from '../components/app-notification/app-notification';
import { AxiosError } from 'axios';
import { IconAlertCircle } from '@tabler/icons';

const RegisterPage: NextPage = () => {
    const router = useRouter();

    const [showNotification, setShowNotification] = useState(false);
    const [showAlert, setShowAlert] = useState({
        title: '',
        message: '',
        show: false,
    });

    const mutation = useMutation<
        { user: IUser },
        AxiosError,
        IAuthRegisterSubmitProps
    >({
        mutationFn: async (formData) => {
            const resp = await axiosInstance.post('/auth/register', formData);

            return resp.data;
        },
        onSuccess: () => {
            setShowNotification(true);

            setTimeout(() => {
                router.push('/');
            }, 1000);
        },
        onError: (error: any) => {
            if (error && error.response) {
                setShowAlert({
                    show: true,
                    title: '',
                    message:
                        error.response.data &&
                        error.response.data.error &&
                        error.response.data.error.message,
                });
            }
        },
    });

    const handleOnSubmit = (data: IAuthRegisterSubmitProps) => {
        mutation.mutate(data);
    };

    return (
        <div className='home-page'>
            <AppHeadTitle />

            {showNotification ? (
                <AppNotification
                    title='Success'
                    message='Successfully registered!'
                    mode='success'
                    onClose={() => setShowNotification(false)}
                />
            ) : null}

            <Flex
                direction='column'
                align='center'
                justify='center'
                sx={() => ({
                    width: '100vw',
                    height: '100vh',
                })}
            >
                <Paper
                    shadow='xs'
                    p='xl'
                    withBorder
                    radius='md'
                    sx={() => ({
                        width: '500px',
                    })}
                >
                    <Center>
                        <AppLogo />
                    </Center>

                    {showAlert.show === true ? (
                        <Alert
                            icon={<IconAlertCircle size={16} />}
                            title={showAlert.title}
                            color='red'
                            sx={() => ({
                                marginTop: '20px',
                                marginBottom: '20px',
                            })}
                        >
                            {showAlert.message}
                        </Alert>
                    ) : null}

                    <AuthRegister onSubmit={handleOnSubmit} />
                </Paper>
            </Flex>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { cookies } = context.req;

    if (cookies['accessToken']) {
        return {
            redirect: {
                destination: '/q/dashboard',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export default RegisterPage;

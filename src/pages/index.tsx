import type { GetServerSideProps, NextPage } from 'next';
import { Alert, Center, Flex, Paper, Title } from '@mantine/core';
import AuthLogin, { IAuthLoginSubmitProps } from '../features/auth/login/login';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import axiosInstance from '../libs/axios.lib';
import { IUser } from '../interfaces';
import Head from 'next/head';
import AppHeadTitle from '../components/app-head-title/app-head-title';
import { IconAlertCircle } from '@tabler/icons';
import { useState } from 'react';
import AppLogo from '../components/app-logo/app-logo';

const Home: NextPage = () => {
    const router = useRouter();

    const [showAlert, setShowAlert] = useState(false);

    const mutation = useMutation<
        { accessToken: string; message: string; success: boolean; user: IUser },
        Error,
        IAuthLoginSubmitProps
    >({
        mutationFn: async (formData) => {
            const resp = await axiosInstance.post('/auth/login', formData);

            return resp.data;
        },
        onSuccess: (data) => {
            document.cookie = `accessToken=${data.accessToken}; path=/`;

            router.replace('/q/dashboard');
        },
        onError: () => {
            setShowAlert(true);
        },
    });

    const handleOnSubmit = async (data: IAuthLoginSubmitProps) => {
        setShowAlert(false);

        mutation.mutate({
            username: data.username,
            password: data.password,
        });
    };

    return (
        <div className='home-page'>
            <AppHeadTitle />

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

                    {showAlert === true ? (
                        <Alert
                            icon={<IconAlertCircle size={16} />}
                            title=''
                            color='red'
                        >
                            Username and password did not matched.
                        </Alert>
                    ) : null}

                    <AuthLogin onSubmit={handleOnSubmit} />
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

export default Home;

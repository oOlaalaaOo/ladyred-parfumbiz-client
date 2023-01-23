import { Center, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import AppButton from '../../../components/app-button/app-button';
import AppInput from '../../../components/app-input/app-input';
import styles from './register.module.scss';

export interface IAuthRegisterSubmitProps {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
    uniqueCode: string;
    referralCode: string;
}

interface IAuthRegister {
    onSubmit: (values: IAuthRegisterSubmitProps) => void;
}

const AuthRegister = ({ onSubmit }: IAuthRegister) => {
    const router = useRouter();

    const form = useForm({
        initialValues: {
            name: '',
            username: '',
            password: '',
            confirmPassword: '',
            uniqueCode: '',
            referralCode: '',
        },

        validate: {
            name: (value) =>
                value.length === 0 ? 'Full name is required.' : null,
            username: (value) =>
                value.length === 0 ? 'Username is required.' : null,
            password: (value) =>
                value.length === 0 ? 'Password is required.' : null,
            confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords did not match.' : null,
            uniqueCode: (value) =>
                value.length === 0 ? 'Unique Code is requred.' : null,
            referralCode: (value) =>
                value.length === 0 ? 'Referral Code is requred.' : null,
        },
    });

    return (
        <form
            className={styles['register-form']}
            onSubmit={form.onSubmit((values) => onSubmit(values))}
        >
            <div className={styles['register-form__field']}>
                <AppInput
                    placeholder='Enter full name'
                    label='Full name'
                    name='name'
                    autoComplete='name'
                    {...form.getInputProps('name')}
                />
            </div>
            <div className={styles['register-form__field']}>
                <AppInput
                    placeholder='Enter username'
                    label='Username'
                    name='username'
                    autoComplete='username'
                    {...form.getInputProps('username')}
                />
            </div>
            <div className={styles['register-form__field']}>
                <AppInput
                    placeholder='Enter password'
                    label='Password'
                    type='password'
                    name='password'
                    autoComplete='password'
                    {...form.getInputProps('password')}
                />
            </div>
            <div className={styles['register-form__field']}>
                <AppInput
                    placeholder='Enter confirm password'
                    label='Confirm password'
                    type='password'
                    name='confirmPassword'
                    autoComplete='confirm-password'
                    {...form.getInputProps('confirmPassword')}
                />
            </div>
            <div className={styles['register-form__field']}>
                <AppInput
                    placeholder='Enter unique code'
                    label='Unique code'
                    name='uniqueCode'
                    autoComplete='unique-code'
                    {...form.getInputProps('uniqueCode')}
                />
            </div>
            <div className={styles['register-form__field']}>
                <AppInput
                    placeholder='Enter referral code'
                    label='Referral code'
                    name='referralCode'
                    autoComplete='referral-code'
                    {...form.getInputProps('referralCode')}
                />
            </div>
            <div className={styles['register-form__field']}>
                <AppButton
                    fullWidth
                    type='submit'
                    sx={() => ({ marginTop: '30px' })}
                >
                    Complete Registration
                </AppButton>

                <Center
                    sx={() => ({
                        marginTop: '12px',
                        marginBottom: '12px',
                    })}
                >
                    <Text fz='xs'>OR</Text>
                </Center>

                <AppButton
                    fullWidth
                    type='button'
                    variant='light'
                    onClick={() => router.push('/')}
                >
                    Already have account?
                </AppButton>
            </div>
        </form>
    );
};

export default AuthRegister;

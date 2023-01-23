import { useForm } from '@mantine/form';
import AppButton from '../../../components/app-button/app-button';
import AppInput from '../../../components/app-input/app-input';
import { IUser } from '../../../interfaces';
import styles from './user-details.module.scss';

export interface IAuthUserDetailsSubmitProps {
    name: string;
    mobileNo?: string;
}

interface IAuthUserDetails {
    onSubmit: (values: IAuthUserDetailsSubmitProps) => void;
    user: IUser;
}

const AuthUserDetails = ({ onSubmit, user }: IAuthUserDetails) => {
    const form = useForm({
        initialValues: {
            name: user.name,
            mobileNo: user.mobileNo,
        },

        validate: {
            name: (value) =>
                value.length === 0 ? 'Full name is required.' : null,
        },
    });

    return (
        <form
            className={styles['user-details-form']}
            onSubmit={form.onSubmit((values) => onSubmit(values))}
        >
            <div className={styles['user-details-form__field']}>
                <AppInput
                    placeholder='Enter full name'
                    label='Full name'
                    name='name'
                    autoComplete='name'
                    {...form.getInputProps('name')}
                />
            </div>
            <div className={styles['user-details-form__field']}>
                <AppInput
                    placeholder='Enter mobile no.'
                    label='Mobile no.'
                    name='mobileNo'
                    autoComplete='mobileNo'
                    {...form.getInputProps('mobileNo')}
                />
            </div>

            <div className={styles['user-details-form__field']}>
                <AppButton
                    fullWidth
                    type='submit'
                    sx={() => ({ marginTop: '30px' })}
                >
                    Update details
                </AppButton>
            </div>
        </form>
    );
};

export default AuthUserDetails;

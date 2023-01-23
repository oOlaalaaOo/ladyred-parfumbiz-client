import { useForm } from '@mantine/form';
import { FC } from 'react';
import AppButton from '../../components/app-button/app-button';
import AppInput from '../../components/app-input/app-input';
import { IUser } from '../../interfaces';
import { CONSTANTS } from '../../utils/constants';
import styles from './cashout.module.scss';

export interface ICashout {
    _id: string;
    user: string;
    userUnilevelPoints: number;
    userRepeatPurchasePoints: number;
    userMobileNo?: string;
    cashoutAmount: number;
    cashoutType: 'unilevel' | 'repeat-purchase';
    status: 'pending' | 'denied' | 'confirmed' | 'paid';
    createdDate: any;
    updatedDate: any;
}

export interface ICashoutSubmitProps {
    cashoutAmount: number;
    userMobileNo: string;
}

interface ICashoutProps {
    onSubmit: (values: ICashoutSubmitProps) => void;
    user: IUser;
}

const Cashout: FC<ICashoutProps> = ({ onSubmit, user }) => {
    const form = useForm({
        initialValues: {
            cashoutAmount: user.unilevelPoints,
            userMobileNo: user.mobileNo,
        },
        validate: {
            cashoutAmount: (value) => {
                if (isNaN(value)) return 'Cashout amount must be a numbers.';
                if (String(value).length === 0) 'Cashout amount is required.';
                if (value === 0) return 'Cashout amount is required.';
                if (value < CONSTANTS.APP_MINIMUM_CASHOUT_AMOUNT)
                    return `You need atleast minimum of ${CONSTANTS.APP_MINIMUM_CASHOUT_AMOUNT} to cashout`;
                if (value > user.unilevelPoints)
                    return 'Cashout amount is too high than the current unilevel points.';

                return null;
            },
            userMobileNo: (value) =>
                value.length === 0 ? 'Mobile No. is required.' : null,
        },
    });

    return (
        <form
            className={styles['cashout-form']}
            onSubmit={form.onSubmit((values) => onSubmit(values))}
        >
            <div className={styles['cashout-form__field']}>
                <AppInput
                    placeholder='0.00'
                    label='Cashout'
                    name='cashoutAmount'
                    autoComplete='cashoutAmount'
                    {...form.getInputProps('cashoutAmount')}
                />
            </div>
            <div className={styles['cashout-form__field']}>
                <AppInput
                    placeholder='+963xxxxxxxxxx'
                    label='Mobile No.(GCASH)'
                    name='userMobileNo'
                    autoComplete='userMobileNo'
                    {...form.getInputProps('userMobileNo')}
                />
            </div>
            <div className={styles['cashout-form__field']}>
                <AppButton
                    fullWidth
                    type='submit'
                    sx={() => ({ marginTop: '30px' })}
                >
                    Submit cashout
                </AppButton>
            </div>
        </form>
    );
};

export default Cashout;

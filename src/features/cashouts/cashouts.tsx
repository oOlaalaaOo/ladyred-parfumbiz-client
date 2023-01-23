import { Table, Text, Title } from '@mantine/core';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { IUser } from '../../interfaces';
import axiosInstance from '../../libs/axios.lib';
import { ICashout } from '../cashout/cashout';

interface ICashoutsProps {
    user: IUser;
    accessToken: string;
    title?: string;
}

const Cashouts: FC<ICashoutsProps> = ({
    title = 'Cashouts',
    user,
    accessToken,
}) => {
    const { data } = useQuery<ICashout[], Error>('cashouts', async () => {
        const resp = await axiosInstance.get(`/cashout/${user._id}/unilevel`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return resp.data;
    });

    return (
        <>
            <Title>{title}</Title>

            <Table
                sx={() => ({
                    marginTop: '24px',
                })}
                horizontalSpacing='sm'
                verticalSpacing='sm'
                striped
                highlightOnHover
            >
                <thead>
                    <tr>
                        <th>Cashout Type</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.length === 0 ? (
                        <tr>
                            <td
                                colSpan={4}
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                <Text fz='sm'>No data.</Text>
                            </td>
                        </tr>
                    ) : null}

                    {data &&
                        data.map((d) => (
                            <tr key={d._id}>
                                <td>{d.cashoutType}</td>
                                <td>{d.cashoutAmount}</td>
                                <td>{d.status}</td>
                                <td>{d.createdDate}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    );
};

export default Cashouts;

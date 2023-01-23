import { Table, Text, Title } from '@mantine/core';
import { useQuery } from 'react-query';
import { IUser } from '../../interfaces';
import axiosInstance from '../../libs/axios.lib';

interface IDirectDownlinesProps {
    title?: string;
    user: IUser;
    accessToken: string;
}

const DirectDownlines = ({
    title = 'Direct downlines',
    user,
    accessToken,
}: IDirectDownlinesProps) => {
    const { data } = useQuery<IUser[], Error>('direct-downlines', async () => {
        const resp = await axiosInstance.get<IUser[]>(
            `/user/${user.uniqueCode}/direct-downlines`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

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
                        <th>Name</th>
                        <th>Registered Date</th>
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
                                <Text fz='sm'>
                                    It seems you don't have yet any direct
                                    downlines
                                </Text>
                            </td>
                        </tr>
                    ) : null}

                    {data?.map((d) => (
                        <tr key={d._id}>
                            <td>{d.name}</td>
                            <td>{d.createdDate}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default DirectDownlines;

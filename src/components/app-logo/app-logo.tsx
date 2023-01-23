import { Code } from '@mantine/core';
import { CONSTANTS } from '../../utils/constants';

const AppLogo = () => {
    return (
        <Code
            sx={() => ({
                fontSize: '20px',
                fontWeight: 700,
                color: '#DC3535',
            })}
        >
            {CONSTANTS.APP_NAME}
        </Code>
    );
};

export default AppLogo;

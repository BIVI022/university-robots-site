import { ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import AdminLayout from '@/common/layouts/AdminLayout/AdminLayout';
import ContentContainer from '@/common/layouts/AdminLayout/components/ContentContainer/ContentContainer';

const Login: NextPageWithLayout = () => {
    const router = useRouter();

    return <ContentContainer></ContentContainer>;
};

Login.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Login;

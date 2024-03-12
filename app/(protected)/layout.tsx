import Header from '@/components/Header';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default AdminLayout;

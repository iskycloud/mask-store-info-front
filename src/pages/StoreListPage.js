import React from 'react';
import DefaultLayout from '../components/DefaultLayout';
import StoreList from '../components/store/StoreList';

const StoreListPage = () => {
  return (
    <DefaultLayout>
      <StoreList />
    </DefaultLayout>
  );
};

export default StoreListPage;

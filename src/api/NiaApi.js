import NiaApiClient from './NiaApiClient';

export const getStoresByAddr = ({ address }) => {
  const requestConfig = {
    params: {
      address,
    },
  };
  return NiaApiClient.get('/storesByAddr/json', requestConfig);
};

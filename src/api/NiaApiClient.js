import axios from 'axios';

const NiaApiClient = axios.create();

NiaApiClient.defaults.baseURL = 'https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1';

export default NiaApiClient;

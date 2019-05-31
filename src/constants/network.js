import {Network, Networks} from 'stellar-sdk';

const NETWORK = {
  available: {
    test: {
      horizonURL: 'http://tcoast.myoschain.com',  
      networkPassphrase:  'osch test network'         //Networks.TESTNET
    },
    public: {
      horizonURL: 'http://coast.myoschain.com',
      networkPassphrase: 'osch public network'
    }
  },
  defaultName: 'test',
};
export default NETWORK;

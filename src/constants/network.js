import {Network, Networks} from 'stellar-sdk';

const NETWORK = {
  available: {
    test: {
      horizonURL: 'http://coast.oschain.io',  //https://horizon-testnet.stellar.org
      //horizonURL: 'http://40.113.192.187:8000',  //https://horizon-testnet.stellar.org
      //horizonURL: 'http://127.0.0.1:8000',  //https://horizon-testnet.stellar.org
      networkPassphrase:  'osch public network'         //Networks.TESTNET
//      horizonURL: 'https://horizon-testnet.stellar.org',
 //     networkPassphrase: Networks.TESTNET
    },
    public: {
      horizonURL: 'http://coast.oschain.io',
      networkPassphrase: Networks.PUBLIC
    }
  },
  defaultName: 'test',
};
export default NETWORK;

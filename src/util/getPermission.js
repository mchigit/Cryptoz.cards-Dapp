import Web3 from 'web3'
import {store} from '../store/'

let getPermission = async () => {
    console.log('inside async..');
      // Modern dapp browsers...
      if (window.ethereum) {
          console.log('inside window.ethereum...');
          window.web3 = new Web3(ethereum);
          try {
              console.log('..inside try...');
              // Request account access if needed
              await ethereum.enable();
              // Acccounts now exposed
              //web3.eth.sendTransaction({/* ... */});
              console.log('DONE Permissions');
          } catch (error) {
              // User denied account access...
              console.log('USer denied us :(');
          }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        console.log('inside legacy dapp browsers...');
          window.web3 = new Web3(web3.currentProvider);
          // Acccounts always exposed
          web3.eth.sendTransaction({/* ... */});
      }
      // Non-dapp browsers...
      else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
}

export default getPermission
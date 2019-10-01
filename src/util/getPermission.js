import {store} from '../store/'



window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            
            // Acccounts now exposed
            console.log('!!!!! WE ARE IN, from getPermissions on load');
            
            //Go through the web3 registration process
            store.dispatch('registerWeb3')
            
        } catch (error) {
            // User denied account access...
            console.log('User denied permission:', error);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        //Go through the web3 registration process
        store.dispatch('registerWeb3')
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

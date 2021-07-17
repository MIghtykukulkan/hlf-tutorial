/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        
        let key1 = "p1"
        var patient1 = {
            "name" : "kumar",
            "diagnosis" : "cancer",
            "hospital" : "apollo"
        }
        
        
  
        let key2 = "p2"
        var patient2 = {
            "name" : "Rajesh",
            "diagnosis" : "diabetes",
            "hospital" : "CMS"
        }


        
        let key3 = "p3"
        var patient3 = {
            "name" : "Rahul",
            "diagnosis" : "diabetes",
            "hospital" : "CMS"
        }

         
        let key4 = "p4"
        var patient4 = {
            "name" : "Madhu",
            "diagnosis" : "dialysis",
            "hospital" : "CMS"
        }

         
        let key5 = "p5"
        var patient5 = {
            "name" : "Ravi",
            "diagnosis" : "angiogram",
            "hospital" : "CMS"
        }

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        await contract.submitTransaction('writeJsonData', key1, JSON.stringify(patient1));
        await contract.submitTransaction('writeJsonData', key2, JSON.stringify(patient2));
        await contract.submitTransaction('writeJsonData', key3, JSON.stringify(patient3));
        await contract.submitTransaction('writeJsonData', key4, JSON.stringify(patient4));
        await contract.submitTransaction('writeJsonData', key5, JSON.stringify(patient5));
      
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();
        return;

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();

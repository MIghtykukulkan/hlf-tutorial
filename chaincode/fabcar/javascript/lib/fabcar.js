/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    
    async initLedger(ctx){
        await ctx.stub.putState("genisis", "new ledger")
        return "success"
    }

    //need to store a json object
    async writeJsonData(ctx, key, value){
        let jsonvalue = JSON.parse(value)
        console.log("***********************",jsonvalue);
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(jsonvalue)));
        return Buffer.from(JSON.stringify(jsonvalue));
    }

    async readData(ctx, key){
        let response = await ctx.stub.getState(key)
        response = response.toString('utf-8')
        return JSON.stringify(response);
        
    }


    async queryPatientsByDiagnosis(ctx, diagnosis){

        let queryString = {}
        queryString.selector = {"diagnosis":diagnosis}
        let iterator =  await ctx.stub.getQueryResult(JSON.stringify(queryString))
        let result = await this.getIteratorData(iterator) 
        return JSON.stringify(result)

    }
    
    async getIteratorData(iterator){

        let resultArray = []

        while(true){
            let res = await iterator.next()
            let resJson = {}
            //res.value.key            
            //res.value.value
            if(res.value && res.value.value.toString()){
                resJson.key = res.value.key;
                resJson.value = JSON.parse(res.value.value.toString('utf-8'))
                resultArray.push(resJson)
            }

            if(res.done){
                await iterator.close();
                return resultArray
            }
        }
    } 
    
    
   
}

module.exports = FabCar;

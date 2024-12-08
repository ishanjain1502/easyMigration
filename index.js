const mongoose = require('mongoose');
const {writeLog} = require('./logger');

const fs = require('fs');

const processMigration = async ({ uri, options={}} , primaryCollection ,arrayOfCOllectionsRequired, callbackFunc, {limitOptions=1}) => {
    try{

        await mongoose.connect(uri, options);
        console.log('Connected to the database');
        const dbDataPointer = getData({ limit: 100 }, primaryCollection);

        // write log to initiate migration
        // writeLog('initiate_migration');
        // const csv = require('csv-writer').createObjectCsvWriter({
        //     path: 'primaryCollectionClone.csv',
        //     header: [
        //         {id: '_id', title: '_id'},
        //         {id: 'createdAt', title: 'createdAt'},
        //         {id: 'updatedAt', title: 'updatedAt'}
        //         // Add more fields as needed
        //     ]
        // });

        const cloneData = await primaryCollection.find({}).lean();
        await csv.writeRecords(cloneData);
        console.log('Primary collection clone saved to primaryCollectionClone.csv');

        while (true) {
            let data = await dbDataPointer.next().value;
            if (!data || data.length == 0) {
                console.log("Empty data");
                break;
            }
            await performOperation(data, arrayOfCOllectionsRequired, callbackFunc );
        }

        writeLog('migration_complete');
        // Close the connection
        mongoose.connection.close();

        writeLog('close_connection');

        process.exit(0);

    }catch(err){
        console.log(err);
    }
}

function* getData(options = { limit: 100 }, primaryCollection) {
    let page = 0;
    while (true) {
        console.log(`Page ${page + 1} with ${options.limit}`);
        yield primaryCollection
            .find({}, {})
            .limit(options.limit)
            .skip(page * options.limit)
            .sort({ createdAt: 1 })
            .lean();

        page += 1;
    }
}

async function performOperation(data, arrayOfCOllectionsRequired, callbackFunc, primaryCollection) {
    try{

       await callbackFunc(data, ...arrayOfCOllectionsRequired, writeLog, primaryCollection);

    }catch(err){
        console.log(err);
    }
}


const processRollback = async({ uri, options={}} , primaryCollection ,arrayOfCOllectionsRequired, callbackFunc, {limitOptions=1}) => {
        try{

        await mongoose.connect(uri, options);
        console.log('Connected to the database');
        const dbDataPointer = getData({ limit: 100 }, primaryCollection);

        // write log to initiate rollback
        writeLog('initiate_Rollback');

        while (true) {
            let data = await dbDataPointer.next().value;
            if (!data || data.length == 0) {
                console.log("Empty data");
                break;
            }
            await performOperation(data, arrayOfCOllectionsRequired, callbackFunc, primaryCollection );
        }

        writeLog('rollback_complete');
        // Close the connection
        mongoose.connection.close();

        writeLog('close_connection');

        process.exit(0);

    }catch(err){
        console.log(err);
    }
}

module.exports = {processMigration, processRollback};
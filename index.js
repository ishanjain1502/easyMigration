const mongoose = require('mongoose');
const {writeLog} = require('./logger');

const processMigration = async ({ uri, options={}} , primaryCollection ,arrayOfCOllectionsRequired, callbackFunc, {limitOptions=1}) => {
    try{

        await mongoose.connect(uri, options);
        console.log('Connected to the database');
        const dbDataPointer = getData({ limit: 100 }, primaryCollection);

        // write log to initiate migration
        writeLog('initiate_migration');

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

async function performOperation(data, arrayOfCOllectionsRequired, callbackFunc ) {
    try{

       await callbackFunc(data, ...arrayOfCOllectionsRequired, writeLog);

    }catch(err){
        console.log(err);
    }
}

module.exports = processMigration;
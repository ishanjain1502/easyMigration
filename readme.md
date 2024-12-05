# Mongo Easy Migration Plugin

Easy Migration is a MongoDB plugin designed to simplify the process of writing and managing migrations in MongoDB databases. It streamlines the development workflow by providing a clear and structured approach to database changes.
<br/>

## Features
<ul>
<li>Intuitive API: Write migrations with ease using simple and well-documented methods.</li>
<li>Rollback Support: Provides an easy way to undo migrations (coming soon) </li>
<li>Customizable: Supports custom migration logic to suit your application needs.</li>
<li>Error Handling: Robust error reporting and logging to help debug issues.</li>
</ul>

## Setup

install library from npm using
```
npm i mongodbplugin
```
<br/>

## Usage

What you need is your <br/>
<ol>
    <li>Your mongoDB URI</li>
    <li>Your primary collection on which migration has to take data from</li>
    <li>Your list of remaining collections, or the collection on which the migration is to be performed on</li>
    <li>Callback function with logic of what is required to be done</li>
</ol>

```
const processMigration = require("mongodbplugin");

let mongoDB_URI = process.env.DB_URL

let primaryCollection = require("./models/primaryCollection");
let secondaryCollection = require("./models/secondaryCollection");
let ternaryCollection = require("./models/ternaryCollection");

let callbackFn = require("./migrations/updateNewFieldsInDB);

processMigration( { uri:mongoDB_URI, options: {
        // this includes further options that you want to pair up with mongodb
    }},
    primaryCollection,
    [ primaryCollection, secondaryCollection, ternaryCollection ],
    callbackFn
)

```

## Coming Soon

Improved overall Performance.<br/>
Improved logging capabilities.<br/>
Rollback support.<br/>


// Import required module express, fast-csv, multer, mongodb and fs packages
const multer = require('multer')
const csv = require('csv-parser')
const fs = require('fs')
const express = require('express')
const stringify = require('csv-stringify').stringify

var router = express.Router()
const CSV = require('../db/csvSchema')



const upload = multer({dest: 'tmp/test/csv'});

const readFile = (fileName) => new Promise((resolve, reject) => {
    const stream = [];

    fs.createReadStream(fileName).pipe(csv())
        .on('data', (data) => stream.push(data))
        .on('end', () => {
            resolve(stream)
        });
});

router.post('/', upload.single('file'), async (req, res, next) => {
    const fileContents = await readFile(req.file.path)

    await CSV.create(fileContents, function (error, data) {
        res.sendStatus(200)
    })
});

module.exports = router;
// Import required module express, fast-csv, multer, mongodb and fs packages
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const express = require('express');
const stringify = require('csv-stringify').stringify

var router = express.Router();

let file

const upload = multer({dest: 'tmp/test/csv'});

const readFile = (fileName, field, count) => new Promise((resolve, reject) => {
    const stream = [];
    let i = 0

    fs.createReadStream(fileName).pipe(csv())
        .on('data', (data) => {
            if (i < count) {
                stream.push(data)
                i++
            }
        })
        .on('end', () => {
            console.log(stream.sort((a, b) => {
                let retval = 0;

                if (a[field] > b[field])
                    retval = -1;
                if (a[field] < b[field])
                    retval = 1;
                if (retval === 0)
                    retval = a["point_granularity"] < b["point_granularity"] ? -1 : 1;
                return retval;
            }))

            resolve(stream)
        });


});


router.get('/', async function(req, res) {
    const field = req.query.field
    const count = req.query.count

    if (file) {
        const fileContents = await readFile(file, field, count)
        res.send(fileContents);
    }
    else {
        res.sendStatus(400)
    }

});

router.post('/', upload.single('file'), async (req, res, next) => {
    const field = req.query.field
    const count = req.query.count

    file = req.file.path
    const fileContents = await readFile(req.file.path, field, count)

    stringify(fileContents, {
        header: true
    }, function (err, str) {
        const fileName = Date.now() + '.csv'
        const path = './files/' + fileName

        //create the files directory if it doesn't exist
        if (!fs.existsSync('./files')) {
            fs.mkdirSync('./files')
        }

        fs.writeFile(path, str, function (err) {
            if (err) {
                console.error(err)
                return res.status(400).json({success: false, message: 'An error occurred'})
            }

            res.send("http://localhost:3000/download/" + fileName)
        })
    })

});

module.exports = router;
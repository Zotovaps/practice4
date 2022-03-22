const mongoose = require('mongoose')

const csvSchema = new mongoose.Schema({
    policyID: {type: String, default: ""},
    statecode: {type: String, default: ""},
    county: {type: String, default: ""},
    eq_site_limit: {type: String, default: ""},
    hu_site_limit: {type: String, default: ""},
    fl_site_limit: {type: String, default: ""},
    fr_site_limit: {type: String, default: ""},
    tiv_2011: {type: String, default: ""},
    tiv_2012: {type: String, default: ""},
    eq_site_deductible: {type: String, default: ""},
    hu_site_deductible: {type: String, default: ""},
    fl_site_deductible: {type: String, default: ""},
    fr_site_deductible: {type: String, default: ""},
    point_latitude: {type: String, default: ""},
    point_longitude: {type: String, default: ""},
    line: {type: String, default: ""},
    construction: {type: String, default: ""},
    point_granularity: {type: String, default: ""},
})

module.exports = mongoose.model('CSV', csvSchema, 'Csv');

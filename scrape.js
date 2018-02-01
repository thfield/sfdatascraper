'use strict'
const axios = require('axios')
const writeCSV = require('jsutils/write-csv')

const uri = 'https://data.sfgov.org/resource/8ez2-fksg.json?department=Ethics%20Commission'
const fileName = 'EthicsDatasets.csv'

axios.get(uri)
  .then(function (response) {
    dealwithit(response.data)
  })
  .catch(function (error) {
    console.error(error)
  })

function dealwithit (data) {
  let foo = parse(data)
  writeCSV(fileName, foo)
}

function parse (data) {
  return data.map(desiredFields)
}

function desiredFields (d) {
  return {
    name: d.dataset_name,
    socrata_id: d.datasetid,
    api_id: d.nbeid,
    description: d.description
  }
}

'use strict'
var HOST = process.argv.splice(2)[0] || '';
var UPLOAD = process.argv.splice(2)[1] || '';
module.exports = {
  NODE_ENV: '"production"',
  HOST: HOST,
  UPLOAD: UPLOAD
}

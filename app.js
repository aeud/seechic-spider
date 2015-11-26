var fs = require('fs')
var csv = require('csv')
var request = require('request')
var async = require('async')

csv.parse(fs.readFileSync(__dirname + '/urls.csv', 'utf-8'), (err, resp) => {
    async.parallel(resp.map(row => {
        return (callback) => {
            var url = row[0]
            var startTime = new Date().getTime()
            request.get(url, (err, resp, body) => {
                console.log([url, '' + (new Date().getTime() - startTime) + ' ms'])
                callback(null, true)
            }) 
        }
    }))
})
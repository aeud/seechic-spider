var fs = require('fs')
var csv = require('csv')
var request = require('request')
var async = require('async')
var parseString = require('xml2js').parseString

request.get('http://sg.seechic.com/sitemap.xml', function(err, resp, body){
    parseString(body, function (err, res) {
        console.log('Crawling ' + res.urlset.url.length + ' pages...')
        async.parallel(res.urlset.url.map(row => {
            return (callback) => {
                var url = row.loc[0]
                var startTime = new Date().getTime()
                request.get(url, (err, resp, body) => {
                    console.log([url, '' + (new Date().getTime() - startTime) + ' ms'])
                    callback(null, true)
                }) 
            }
        }))
    })
})
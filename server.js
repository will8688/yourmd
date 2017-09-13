const Hapi              = require('hapi')
const server            = new Hapi.Server()
const Good              = require('good')

server.connection({
    host: 'localhost',
    port: 6969,
    routes: {
        cors: true
    }
});

const searchDictionary = require("./searchDictionary");

server.route({
    method: 'GET',
    path: '/',
    handler: (req, res) => {
        if(req && req.query && req.query.s){
            const search = req.query.s;
            const result = searchDictionary(search);
            res(result);
        }else{
            res('Param "s" is required');
        }
    }
})

server.register({
    register: Good,
    options: {
        reporters: {
            console: [
                {
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [
                        {
                            response: '*',
                            log: '*'
                        }
                    ]
                },
                {
                    module: 'good-console'
                },
                'stdout'
            ]
        }
    }

}, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(err => {

        if(err){

            throw err
        }

        console.log('...and we\'re up & runnin at: ', server.info.uri)
    })
});
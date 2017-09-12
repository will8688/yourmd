const Hapi              = require('hapi')
const server            = new Hapi.Server()
const Good              = require('good')

server.connection({
    host: 'localhost',
    port: 6969,
    routes: {
        cors: true
    }
})

server.route({
    method: 'GET',
    path: '/',
    handler: (req, res) => {
        const dict = ['congestive heart disease',
            'headache',
            'HA',
            'sore head',
            'head pain',
            'cephalalgia',
            'cephalgia',
            'cephalodynia',
            'head ache',
            'headaches'];
        let s = req.query.s;
        s = s.replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g,'');
        const words = s.split(' ');
        let dict2 = [];
        let $return = [];
        words.map((word) => {
            dict2 = dict.map((phrase) => {
                let s2 = phrase.search(word);
                if(s2 !== -1){
                    $return.push(phrase);
                }
                return phrase;
            });
        });
        res($return)
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
})
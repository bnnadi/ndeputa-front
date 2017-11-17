// libraries
var expressBodyParser = require('body-parser');
var expressCookieParser = require('cookie-parser');
var expressDevice = require('express-device');
// var expressMulter = require('multer');
var expressRequestParam = require('request-param');
var expressSession = require('express-session');
var fs = require('fs');
// var maxmind = require('maxmind');
var os = require('os');
var passport = require('passport');
var redis = require('redis');
// var striptags = require('striptags');


// maxmind.init(ROOT + '/config/GeoIPCity.dat', {
//     indexCache: true,
//     checkForUpdates: true
// });

//classes
var RedisStore = require('connect-redis')(expressSession);

// instances

var redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {
    auth_pass: process.env.REDIS_PASS
});

// var upload = expressMulter();

// var redisStoreOptions = {
//     client: redisClient,
//     db: parseInt(process.env.REDIS_DB),
// };

Object.defineProperty(global, 'bnStack', {
    get: function() {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
            return stack;
        };
        var err = new Error();
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

Object.defineProperty(global, 'bnLine', {
    get: function() {
        return '\033[33mline ' + bnStack[1].getLineNumber() + '\033[0m';
    }
});

Object.defineProperty(global, 'bnFunction', {
    get: function() {
        return '\033[32mline ' + bnStack[1].getFunctionName() + '\033[0m';
    }
});


module.exports = function() {

    this.locals.ENVIRONMENT = process.env.ENVIRONMENT || 'development';


    // configure Express middleware

    // ignore all git requests
    this.use(function(req, res, next) {

        if (req.path && req.path.indexOf('.git') !== -1) {
            res.status(404);
            return;
        }

        next();

    });

    this.use(function(req, res, next) {

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-version');

        next();

    });

    this.use(expressRequestParam());

    this.use(expressDevice.capture());

    this.use(expressBodyParser());

    this.use(expressSession({
        secret: 'asdhwhnxxiou1mizxehdncfx3gx',
        cookie: {
            maxAge: 3 * 24 * 60 * 60 * 1000
        },
        resave: true,
        saveUninitialized: true,
        store: new RedisStore(redisStoreOptions)
    }));

    this.use(passport.initialize());
    this.use(passport.session());

    // custom middleware
    this.use(function(req, res, next) {


        req.bnBoolean = function(param, defaultValue) {

            if (req.param(param) === undefined) {
                return defaultValue;
            } else {

                var value;

                if (typeof req.param(param) === 'boolean') {
                    value = req.param(param);
                } else {
                    value = req.param(param) === 'true';
                }

                return value;

            }

        };


        req.bnArray = function(param, defaultValue) {

            if (req.param(param) === undefined) {
                return defaultValue;
            } else if (!Array.isArray(req.param(param))) {
                return [];
            } else {
                return req.param(param);
            }

        };

        req.bnRemote = function() {

            var ipAddress = this.ip.substring(this.ip.indexOf('f:') + 2);
            var location = maxmind.getLocation(ipAddress);

            var record = {};

            record.ip = ipAddress;
            // record.device = useragent.device.family;

            record.browser = {};
            record.os = {};
            record.location = {};

            try {
                record.browser.family = useragent.ua.family;
                record.browser.version = useragent.ua.major + '.' + useragent.ua.minor + '.' + useragent.ua.patch;
            } catch (e) {
                record.browser.family = null;
                record.browser.version = null;
            }

            try {
                record.os.family = useragent.os.family;
                record.os.version = useragent.os.major + '.' + useragent.os.minor + '.' + useragent.os.patch;
            } catch (e) {
                record.os.family = null;
                record.os.version = null;
            }

            try {
                record.location.country = location.countryName;
                record.location.region = location.regionName;
                record.location.postal = location.postalCode;
            } catch (e) {
                record.location.country = null;
                record.location.region = null;
                record.location.postal = null;
            }

            return record;

        };

        next();

    });

};
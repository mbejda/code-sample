require('dotenv').config();

const store = require('greenlock-storage-s3').create({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID
    , secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    , bucketRegion: process.env.AWS_BUCKET_REGION
    , bucketName: process.env.AWS_BUCKET_NAME
    , configDir: 'acme/'
    , accountsDir: 'accounts/'
    , debug: true
});
const Greenlock = require("greenlock-express");

const greenlock = Greenlock.create({
    store: store
});


////////////////////
// INIT GREENLOCK //
////////////////////

var path = require('path');
var os = require('os');
var Greenlock = require('greenlock');
var AWS = require('aws-sdk');

var greenlock = Greenlock.create({
    version: 'draft-12',
    server: 'https://acme-v02.api.letsencrypt.org/directory',

    // Use the approveDomains callback to set per-domain config
    // (default: approve any domain that passes self-test of built-in challenges)
    approveDomains: approveDomains,

    // the default servername to use when the client doesn't specify
    servername: 'cccc.rlty.app',

    // If you wish to replace the default account and domain key storage plugin
    store: require('le-store-fs').create({
        configDir: path.join(os.homedir(), 'acme/etc'),
        webrootPath: '/tmp/acme-challenges'
    })
});

/////////////////////
// APPROVE DOMAINS //
/////////////////////

var http01 = require('le-challenge-fs').create({
    webrootPath: '/tmp/acme-challenges'
});
function approveDomains(opts, certs, cb) {
    // This is where you check your database and associated
    // email addresses with domains and agreements and such

    // Opt-in to submit stats and get important updates
    opts.communityMember = true;

    // If you wish to replace the default challenge plugin, you may do so here
    opts.challenges = { 'http-01': http01 };

    // The domains being approved for the first time are listed in opts.domains
    // Certs being renewed are listed in certs.altnames
    // certs.domains;
    // certs.altnames;
    opts.email = 'mbejda@live.com';
    opts.agreeTos = true;

    // NOTE: you can also change other options such as `challengeType` and `challenge`
    // opts.challengeType = 'http-01';
    // opts.challenge = require('le-challenge-fs').create({});

    cb(null, { options: opts, certs: certs });
}




var redirectHttps = require("redirect-https")();
var acmeChallengeHandler = greenlock.middleware(redirectHttps);
require("http")
    .createServer(acmeChallengeHandler)
    .listen(80, function() {
        console.log("Listening for ACME http-01 challenges on", this.address());
    });


var spdyOptions = Object.assign({}, greenlock.tlsOptions);
spdyOptions.spdy = { protocols: ["h2", "http/1.1"], plain: false };
var server = require("spdy").createServer(
    spdyOptions,
    require("express")().use("/",
        function(req, res) {
            console.log(req.headers);

            var s3 = new AWS.S3();
            console.log(req.path)


            s3.getObject({Bucket: 'cccc.rlty.app', Key: 'index.html'})
                .createReadStream()
                .pipe(res);



            //	res.setHeader("Content-Type", "text/html; charset=utf-8");
            //	res.end("<h1>Hello, 🔐 Secure World!</h1>");
        })
);
server.on("error", function(err) {
    console.error(err);
});
server.on("listening", function() {
    console.log("Listening for SPDY/http2/https requests on", this.address());
});
server.listen(443);

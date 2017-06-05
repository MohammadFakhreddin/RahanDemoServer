/**
 * Created by M.Fakhreddin on 29/05/2017.
 */
const os = require('os');
module.exports = {
    'sessionSecret': 'r#ma@fha_a)khr+Maendpdrion*ject',
    'sessionLifeTime': 4320000000,//Half of day
    'httpPort': 3241,
    "bcryptRounds": 10,
    "mongoUrl": "127.0.0.1:27017/rahahan",
    'windows': /^win/.test(os.platform()),
    "type": "dev",
    "cookieName": "RahahanSession"
};
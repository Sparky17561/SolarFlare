import crypto from 'crypto';


const hash = crypto.createHash('sha256');
hash.update('test');
console.log(hash.digest('hex'));

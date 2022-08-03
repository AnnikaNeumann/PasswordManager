//use the crypto library which comes with node modules.

const crypto = require('crypto');
//secret needs to be 32 characters long
const secret = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

//for each encryption we need an identifier
const encrypt = (password) =>{
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv('aes-256-ctr',Buffer.from(secret), iv);

    const encryptedPassword = Buffer.concat([
        cipher.update(password), 
        cipher.final(),
    ]);

    //return an object
    return {
        iv:iv.toString("hex"),
        password:encryptedPassword.toString("hex")
    };
};


const decrypt =(encryption) =>{
    const decipher = crypto.createDecipheriv(
        'aes-256-ctr',
        //a Buffer acts like a cache, data area for temporary store
        Buffer.from(secret), 
        Buffer.from(encryption.iv, "hex")
    );

    const decryptedPassword = Buffer.concat([
        decipher.update(Buffer.from(encryption.password, "hex")),
        decipher.final(),
    ]);

    return decryptedPassword.toString();
};


module.exports = {encrypt, decrypt};
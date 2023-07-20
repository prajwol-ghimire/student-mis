const crypto = require('crypto');

const algorithm = 'aes-256-cbc'; 
const passphrase = 'ncitmis'; 
// const key = crypto.pbkdf2Sync(passphrase, salt, 100000, 32, 'sha256'); // this did random on every so made static
// const salt = crypto.randomBytes(16);
const salt = Buffer.from([0xdd, 0x7f, 0x5a, 0x10, 0x60, 0x2d, 0x1c, 0x9f, 0xe8, 0xc8, 0xfd, 0x16, 0xdd, 0x53, 0xad, 0x35]);
const key = Buffer.from([
    0xe1, 0x55, 0x32, 0x39, 0x53, 0xa7, 0xe4, 0xcd, 0x15, 0xe6, 0xb8, 0xd2, 0x19, 0x28, 0x7b, 0xbb,
    0x89, 0x35, 0xd5, 0xc3, 0xc5, 0x0d, 0xc5, 0xec, 0xc2, 0xf1, 0x2f, 0x23, 0x40, 0xf2, 0xa0, 0x56]);

function encrypt(text) {
  const iv = crypto.randomBytes(16); // Generate a random initialization vector
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(encryptedword,res, req) {
  // Ensure the encrypted text is in the correct format (no additional decoding)
  try{
      let codedText = decodeURIComponent(encryptedword)
      const [ivHex, encryptedHex] = codedText.split(':');
      const iv = Buffer.from(ivHex, 'hex');
      const encrypted = Buffer.from(encryptedHex, 'hex');
      const decipher = crypto.createDecipheriv(algorithm, key, iv);
      let decrypted = decipher.update(encrypted);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
  }catch{
      
  }

}

module.exports = {
    encrypt,
    decrypt
}
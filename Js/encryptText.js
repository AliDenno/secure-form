async function encryptMessage(Text) {
    if(Text!==""){
  if(window.crypto.getRandomValues){
      const publicKeyString = `-----BEGIN PGP PUBLIC KEY BLOCK-----
        Version: OpenPGP.js v4.1.0
        Comment: https://openpgpjs.org

        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xILO
        -----END PGP PUBLIC KEY BLOCK-----`;

      var options = {
        message: openpgp.message.fromText(Text),
        publicKeys: (await openpgp.key.readArmored(publicKeyString)).keys
      };
      var result = await openpgp.encrypt(options).then(function(ciphertext){
        return ciphertext.data
      });
      return result;
  }
    return "This browser does not support basic cryptography!";
    }
}

const decryptAttachement  = async() => {
  if(window.crypto.getRandomValues){
    if(document.getElementById("decryptAttachementTextArea").value != ""){
      const privateKeyString = `-----BEGIN PGP PRIVATE KEY BLOCK-----
            Version: OpenPGP.js v4.1.0
            Comment: https://openpgpjs.org

            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
            WYh6IO6wtY5+iVCQIA==
            =nkEk
            -----END PGP PRIVATE KEY BLOCK-----`;
      const passphrase = `super long and hard to guess secret`;
      const privKeyObj = (await openpgp.key.read(privateKeyString)).keys[0]
      //await privKeyObj.decrypt(passphrase)
      var options = {
        message: await openpgp.message.readArmored(document.getElementById("decryptAttachementTextArea").value),
        privateKeys: [privKeyObj],
        format: 'binary'
      };

      openpgp.decrypt(options).then(function(plaintext){
        document.getElementById("decryptAttachementTextArea").value = plaintext.data;
      });

      document.getElementById("decryptAttachement").disabled = true;
      document.getElementById("decryptAttachement").title = "You may only encrypt once.";
      document.getElementById("decryptAttachement").removeEventListener("click", encryptMessage);
    }
  }
  else{
    window.alert("This browser does not support basic cryptography!");
  }
}
document.getElementById("decryptAttachement").addEventListener("click", decryptAttachement);
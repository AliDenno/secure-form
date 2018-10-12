const encryptMessage  = async() => {
  if(window.crypto.getRandomValues){
    if(document.getElementById("encryptTextArea").value != ""){
      const publicKeyString = `-----BEGIN PGP PUBLIC KEY BLOCK-----
        Version: OpenPGP.js v4.1.0
        Comment: https://openpgpjs.org

        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
        =xILO
        -----END PGP PUBLIC KEY BLOCK-----`;

      // Text and public key should be added here 
      var options = {
        message: openpgp.message.fromText(document.getElementById("encryptTextArea").value),
        publicKeys: (await openpgp.key.readArmored(publicKeyString)).keys
      };

      // Encryption happens here
      openpgp.encrypt(options).then(function(ciphertext){
        document.getElementById("encryptTextArea").value = ciphertext.data;
      });

      document.getElementById("encryptText").disabled = true;
      document.getElementById("encryptText").title = "You may only encrypt once.";
      document.getElementById("encryptText").removeEventListener("click", encryptMessage);
    }
  }
  else{
    window.alert("This browser does not support basic cryptography!");
  }
}

document.getElementById("encryptText").addEventListener("click", encryptMessage);
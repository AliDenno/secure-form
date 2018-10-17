var myFile = "";
var foobar = "";
  var openFile = function(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(e){
      var dataURL = e.target.result;
      myFile=dataURL;
      foobar = new Uint8Array(dataURL);
    };
    reader.readAsArrayBuffer(input.files[0]);
  };

const encryptAttachement  = async() => {
  if(window.crypto.getRandomValues){
    
      const publicKeyString = `-----BEGIN PGP PUBLIC KEY BLOCK-----
            Version: OpenPGP.js v4.1.0
            Comment: https://openpgpjs.org

            mQENBFX2lVMBCADBIpQ4I68q7F1XjCiSg6Gd6NsqUx6eLYysEdc7WkKwOQWBcD/2
            /np1yf8giR/pZo9gCCYj8FBe74GoJsHStMn1ITTG3GKshGrTuAPUuMuL/V5M5+QO
            SzkJpOVWiO4Dfnt0WoNuDOY/qN9acXL6waYMaoD8DDqxPEwPBoPsv4aBbgknO+ai
            02WGmqinnZ18ujs+TIscwkWyqHcpG/5Gj7+olMjxM+kWYkWkZz+R5DWZ+QE2CePF
            VbUnHQXr0y7OmvDeg4858qIt1fDcDB09rFyVXqLih0P1DyjAGpEuUSX0asYQw43h
            3abD9fs5BLPSJm/TBFdLlznLCnuB5oqmxWAdABEBAAG0KVJhbGYgUGFwcm90bnkg
            PHJhbGYucGFwcm90bnlAcGlyb2Jhc2UuZGU+iQE5BBMBCAAjBQJV9pVTAhsDBwsJ
            CAcDAgEGFQgCCQoLBBYCAwECHgECF4AACgkQEoOwc/Nk8WOdcQf/ZjdB5bnVQw5o
            gOxKwgzuKdxK4756Vb+lbvojLpTd32zf5S86/Tu8j3DSIXd7VAVtcXPjRsWlARxQ
            Puj0UdtNmIN43yol83a03k+yKJ30a8ttPl5VizPw2vzIZ7qLhpchWNEnyLGJrydy
            hkGwFjutlFmMvwxwEaGrY47Q5EkGbmUe95xyFku865hdSah53hAhOgQfsat+gaWZ
            cAD8wBF9HcPmy9YvhRxMjCAKdN97pSTTkB8XW3fnWxdsbEFNTlPhtkQoCGDFgHa6
            G3SYmdcnRmSZzXTt3XMJ2JQCXQi+smnkkqdL2wpzsBi0/crorUNcWEB2xqSGiRtE
            jV2pJs/jn7kBDQRV9pVTAQgAzTvrWXD3PZDU/qiMCS1mNC/JMd6CdpiJ7p+VjVHA
            Ocg/1tGwm/SfGffATI8GIxeH6w3JrBB/HDDOnMibq4txpX2TYppWnvwG035N3BLp
            yXGeF3uH/p8rdky3n/SB7DMY5vn3uPTKfrACV3vkLcFhwsnM2Yu1i8yFam8pYQ6r
            x0z9mjhNlYEej7s1aj4JPuBEu8MyKyb3VOpGIKOGvctaZX/IsOHDjYDShO1q94d+
            zPsmls/6yKsULWxRRhw85IeefK4dJXYb5E+8AtN3ogV5aj8aN+QXnGZ1FMzYKs3L
            ugsRnBiEaixaeMcrkRu6v4E0KTVO5+lsiudxzb9GJXVNFwARAQABiQEfBBgBCAAJ
            BQJV9pVTAhsMAAoJEBKDsHPzZPFj43IH/2MRxF/kcwD4m6G36wmRJ6RWuh1MpoCJ
            RdL5+2Htc/ayD+MGg9zpnAg2yDqj3cFK8Kqbnp4y2aPkp96HZWEpfRvmfOmcRJ1k
            5Gl5tVENgqU+njTsXZ9hfPFs0F5mZNcxy4Zj76DDu5SLiiuZm34s3nHD238HxpE7
            VW2sqlb11DKJDFBPjWYvgDO43o8T1H24oVcONjmbUEpHd4ctM5UzKsWmBsTCfWmK
            NPxWfiIuHo7CVCxwjDfV4Yt6nnp1r/pxM0bTp4b43vheCcCZI0j/MdNC0KWKUcOV
            NKkbhPpWneEO6gImM5wnC160Td/duGucnaUPLI5l1P0hX7UAy0sTkCM=
            =vtNh
            -----END PGP PUBLIC KEY BLOCK-----`;

      var options = {
        message: openpgp.message.fromBinary(foobar),
        publicKeys: (await openpgp.key.readArmored(publicKeyString)).keys,
        armor: true   
      };

      openpgp.encrypt(options).then(function(ciphertext){
        document.getElementById("encryptAttachementTextArea").value = ciphertext.data //message.packets.write()
      });

      document.getElementById("encryptAttachement").disabled = true;
      document.getElementById("encryptAttachement").title = "You may only encrypt once.";
      document.getElementById("encryptAttachement").removeEventListener("click", encryptMessage);
  }
  else{
    window.alert("This browser does not support basic cryptography!");
  }
}
document.getElementById("encryptAttachement").addEventListener("click", encryptAttachement);
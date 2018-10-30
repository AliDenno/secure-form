attachmentList =  [];
function messenger(){
    var x = document.getElementById("myFiles");
    for (var i = 0; i < x.files.length; i++) {
        readUploadedFileAsText(x.files[i])
    }
}

// Convert the file to binary in order to encrypt it and use a promise to confirm
const readUploadedFileAsText = (file) => {
    const temporaryFileReader = new FileReader();
    $(".overlay").show();
    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
    };
    temporaryFileReader.onload = (e) => {
        attachmentList.push({name:file.name, value:new Uint8Array(e.target.result)});
        resolve(temporaryFileReader.result);
        $(".overlay").hide();
    };
    temporaryFileReader.readAsArrayBuffer(file);
});
};

// Validate elements
var isValidElement = function isValidElement(element) {
    return element.name && element.value;
};

var isValidValue = function isValidValue(element) {
    return !['checkbox', 'radio'].includes(element.type) || element.checked;
};

var isCheckbox = function isCheckbox(element) {return element.type === 'checkbox';};

var isMultiSelect = function isMultiSelect(element) {return element.options && element.multiple;};

var getSelectValues = function getSelectValues(options) {return [].reduce.call(options, function (values, option) {
    return option.selected ? values.concat(option.value) : values;
}, []);};

// Read the form and extract name-value content
var formToJSON = function formToJSON(elements) {return [].reduce.call(elements, function (data, element) {
    if (isValidElement(element) && isValidValue(element)) {

        // more than one value?
        if (isCheckbox(element)) {
            data[element.name] = (data[element.name] || []).concat(element.value);
        } else if (isMultiSelect(element)) {
            data[element.name] = getSelectValues(element);
        } else {
            data[element.name] = element.value;
        }
    }
    return data;
}, {});};

var handleFormSubmit = function handleFormSubmit(event) {
    // prevent the default submit action
    event.preventDefault();

    var data = formToJSON(form.elements);

    // Only for output
    var dataContainerText = document.getElementsByClassName('results__display')[0];
    var dataContainerTextEncrypt = document.getElementsByClassName('results__display')[1];
    var dataContainerAttachEncrypt = document.getElementsByClassName('results__display')[2];

    var obj = new Object();
    var fileExtensions=[];
    var fileNames=[];
    var promises = [];
    var encryptedFiles = [];
    var filesSize = 0 ;

    // Loop the uploaded files and save the name, and extentions
    for (var i = 0; i < attachmentList.length; i++) {
        fileExtensions.push(attachmentList[i].name.split('.').pop())
        fileNames.push(attachmentList[i].name)
        promises.push(encryptAttachement(attachmentList[i].value))
    }

    data.files=fileNames
    dataContainerText.textContent = JSON.stringify(data, null, "  ");
    promises.unshift(encryptMessage(JSON.stringify(data, null, "  ")))

    // Wait for encryption then Output and send
    Promise.all(promises)
        .then(values => {
        for (i = 0; i < values.length; i++) {
        if(typeof values[i] != 'undefined'){
            if(i===0){
                obj.form = values[0];dataContainerTextEncrypt.textContent=values[0];
                document.getElementById("results__heading__Size").innerHTML="- Size: "+new Blob([values[0]]).size +" bytes"
            }else{
                encryptedFiles.push(values[i])
                dataContainerAttachEncrypt.textContent=dataContainerAttachEncrypt.textContent+values[i];
                filesSize=filesSize+new Blob([values[i]]).size
                document.getElementById("results__heading__Att__Size").innerHTML="- Size: "+ filesSize +" bytes"
            }
        }
    }
    if(encryptedFiles.length > 0){
        obj.files=encryptedFiles;
        obj.extensions=fileExtensions;
    }

    // Send encrypted Content to the controller
    const url = "http://localhost/pb/site/pbs-bw/bwajax?function=secureForm";
    fetch(url, {
        method : "POST",
        body: JSON.stringify(obj)

    }).then(
        response => response.text()
).then(
        html => console.log(html)
);
});
};

var form = document.getElementsByClassName('contact-form')[0];
form.addEventListener('submit', handleFormSubmit);
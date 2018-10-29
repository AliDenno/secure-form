var attachment = "";
attachmentList =  [];
function messenger(){
    var x = document.getElementById("myFiles");
    for (var i = 0; i < x.files.length; i++) {
        readUploadedFileAsText2(x.files[i])
    }
}
const readUploadedFileAsText2 = (file) => {
    const temporaryFileReader = new FileReader();
    $(".overlay").show();
    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
    };
    temporaryFileReader.onload = (e) => {
        var dataURL = e.target.result;
        attachment = new Uint8Array(dataURL);
        resolve(temporaryFileReader.result);
        var obj = {name:file.name, value:attachment};
        attachmentList.push(obj);
        $(".overlay").hide();
    };
    temporaryFileReader.readAsArrayBuffer(file);
});
};

const readUploadedFileAsText = (event) => {
    const temporaryFileReader = new FileReader();
    $(".overlay").show();
    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
    };
    temporaryFileReader.onload = (e) => {
        var dataURL = e.target.result;
        resolve(temporaryFileReader.result);
        attachment = new Uint8Array(dataURL);
        $(".overlay").hide();
    };
    temporaryFileReader.readAsArrayBuffer(event.files[0]);
});
};

var myTEST = function() {
    console.log(attachment)
}

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

    var dataContainerText = document.getElementsByClassName('results__display')[0];
    var dataContainerTextEncrypt = document.getElementsByClassName('results__display')[1];
    var dataContainerAttachEncrypt = document.getElementsByClassName('results__display')[2];

    var fileExtensions=[];
    var fileNames=[];
    var promises = [];

    for (var i = 0; i < attachmentList.length; i++) {
        fileExtensions.push(attachmentList[i].name.split('.').pop())
        fileNames.push(attachmentList[i].name)
        promises.push(encryptAttachement(attachmentList[i].value))
    }
    data.files=fileNames
    console.log(data)
    dataContainerText.textContent = JSON.stringify(data, null, "  ");
    promises.unshift(encryptMessage(JSON.stringify(data, null, "  ")))
    var obj = new Object();
    var encryptedFiles = [];
    Promise.all(promises)
        .then(values => {
        for (i = 0; i < values.length; i++) {
            if(typeof values[i] != 'undefined'){
                if(i===0){
                    obj.form = values[0];dataContainerTextEncrypt.textContent=values[0];
                }else{
                    encryptedFiles.push(values[i])
                }
            }
        }
        if(encryptedFiles.length > 0){
            obj.files=encryptedFiles
        }

    obj.extensions=fileExtensions
    var jsonString= JSON.stringify(obj);
    console.log(obj)

    const url = "http://localhost/pb/site/pbs-bw/bwajax?function=testFetch";
    fetch(url, {
        method : "POST",
        body: jsonString

    }).then(
            response => response.text()
    ).then(
            html => console.log(html)
    );
});
};

var form = document.getElementsByClassName('contact-form')[0];
form.addEventListener('submit', handleFormSubmit);
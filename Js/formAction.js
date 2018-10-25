var attachment = "";
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

function fun()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           console.log("YE")
        }
    };
    xhttp.open("GET", "http://localhost/pb/site/pbs-bw/bwajax?function=everything", true);
    xhttp.send();
}
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}
var handleFormSubmit = function handleFormSubmit(event) {
    // prevent the default submit action
    event.preventDefault();

    var data = formToJSON(form.elements);

    var dataContainerText = document.getElementsByClassName('results__display')[0];
    var dataContainerTextEncrypt = document.getElementsByClassName('results__display')[1];
    var dataContainerAttachEncrypt = document.getElementsByClassName('results__display')[2];

    dataContainerText.textContent = JSON.stringify(data, null, "  ");

    var obj = new Object();
    Promise.all([encryptMessage(JSON.stringify(data, null, "  ")), encryptAttachement(attachment)])
        .then(values => {
        obj.form = values[0];dataContainerTextEncrypt.textContent=values[0];
        obj.file  = values[1];dataContainerAttachEncrypt.textContent=values[1];
    console.log(obj)
        var jsonString= JSON.stringify(obj);
        console.log(jsonString)

        var request  = createCORSRequest('get', "http://localhost/pb/site/pbs-bw/bwajax?function=secureForm&content="+encodeURIComponent(jsonString));
        if (request){
            request.onload = function(){
                //do something with request.responseText
            };
            request.send();
        }

});



};

var form = document.getElementsByClassName('contact-form')[0];
form.addEventListener('submit', handleFormSubmit);
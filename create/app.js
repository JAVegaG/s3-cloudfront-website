const keyDiv = document.getElementById('key_div');
const valueDiv = document.getElementById('value_div');
const typeSelector = document.getElementById('type_selector');
const resultBody = document.getElementById('result');

const addFieldButton = document.getElementById('add_field');
const removeFieldButton = document.getElementById('remove_field');
const createNewRecord = document.getElementById('create_record');

addFieldButton.addEventListener('click', addField);

removeFieldButton.addEventListener('click', removeField);

createNewRecord.addEventListener('click', createRecord);

function addField() {

    const childrenIndex = typeSelector.selectedIndex
    const newType = typeSelector.children.item(childrenIndex).getAttribute('value')

    const newKey = document.createElement('input');
    const newValue = document.createElement('input');

    newKey.setAttribute('type', 'text');
    newKey.setAttribute('required', '');

    newValue.setAttribute('type', newType.toString())
    newValue.setAttribute('required', '');

    keyDiv.appendChild(newKey);
    valueDiv.appendChild(newValue);

}

function removeField() {

    if (keyDiv.childElementCount > 2) {
        keyDiv.removeChild(keyDiv.lastChild);
        valueDiv.removeChild(valueDiv.lastChild);
    }

}

async function createRecord() {

    const formData = {}

    if (valueDiv.children.item(1).value.length === 0) {
        resultBody.innerHTML = 'You need to specify an ID first'
        return
    }

    if (Number(valueDiv.children.item(1).value) === 0) {
        resultBody.innerHTML = 'The ID must be greater than 0'
        return
    }

    for (let i = 1; i < keyDiv.childElementCount; i++) {

        var newKey;
        const newValue = valueDiv.children.item(i);

        if (i === 1) {
            newKey = keyDiv.children.item(i).getAttribute('value').toString();
        } else {
            newKey = keyDiv.children.item(i).value;
        }

        if (newValue.getAttribute('type') === 'number') {
            formData[newKey] = Number(newValue.value);
        } else {
            formData[newKey] = newValue.value;
        }

    }

    const raw = JSON.stringify(formData);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    resultBody.innerHTML = 'Loading...'

    await fetch("https://p58ybvz7v5.execute-api.us-east-1.amazonaws.com/books", requestOptions)
        .then(response => response.text())
        .then(data => {
            updateResult(data)
        })
        .catch(error => {
            resultBody.innerHTML = 'ERROR:' + error
        });

}

function updateResult(data) {
    resultBody.innerText = data.split('"')[1]
}
const keyDiv = document.getElementById('key_div');
const valueDiv = document.getElementById('value_div');
const resultBody = document.getElementById('result');

const idValue = document.getElementById('id_value');

const addFieldButton = document.getElementById('add_field');
const removeFieldButton = document.getElementById('remove_field');
const updateOldRecord = document.getElementById('update_record');

addFieldButton.addEventListener('click', addField);

removeFieldButton.addEventListener('click', removeField);

updateOldRecord.addEventListener('click', updateRecord);

function addField() {

    if (keyDiv.childElementCount < 5) {

        const newKey = document.createElement('input');
        const newValue = document.createElement('input');

        newKey.setAttribute('type', 'text');

        newValue.setAttribute('type', 'text')

        keyDiv.appendChild(newKey);
        valueDiv.appendChild(newValue);
    }

}

function removeField() {

    if (keyDiv.childElementCount > 2) {
        keyDiv.removeChild(keyDiv.lastChild);
        valueDiv.removeChild(valueDiv.lastChild);
    }

}

async function updateRecord() {

    const formData = {}

    if (idValue.value.length === 0) {
        resultBody.innerHTML = 'You need to specify an ID first'
        return
    }

    if (Number(idValue.value) === 0) {
        resultBody.innerHTML = 'The ID must be greater than 0'
        return
    }

    for (let i = 1; i < keyDiv.childElementCount; i++) {

        const newValue = valueDiv.children.item(i);

        const newKey = keyDiv.children.item(i).value;

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
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    let url = "https://p58ybvz7v5.execute-api.us-east-1.amazonaws.com/books" + "/" + idValue.value

    resultBody.innerHTML = 'Loading...'

    await fetch(url, requestOptions)
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
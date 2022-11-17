const resultBody = document.getElementById('result');
const idValue = document.getElementById('id_value');
const deleteOldRecord = document.getElementById('delete_record');

deleteOldRecord.addEventListener('click', deleteRecord);

async function deleteRecord() {

    if (idValue.value.length === 0) {
        resultBody.innerHTML = 'You need to specify an ID first'
        return
    }

    if (Number(idValue.value) === 0) {
        resultBody.innerHTML = 'The ID must be greater than 0'
        return
    }

    let url = "https://p58ybvz7v5.execute-api.us-east-1.amazonaws.com/books" + "/" + idValue.value

    const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

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
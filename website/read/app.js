const input = document.getElementById('id_value');
const resultBody = document.getElementById('result');
const tableDiv = document.getElementById("table")

const readButton = document.getElementById('read_record');

readButton.addEventListener('click', readRecord);

async function readRecord() {

    const searchId = input.value;

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let url

    if (searchId.length === 0) {
        url = "https://p58ybvz7v5.execute-api.us-east-1.amazonaws.com/books"
    } else {
        url = "https://p58ybvz7v5.execute-api.us-east-1.amazonaws.com/books" + "/" + searchId.toString()
    }

    resultBody.innerHTML = 'Loading...'

    console.log(url)

    await fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            updateResult(data)
        })
        .catch(error => {
            resultBody.innerHTML = 'ERROR:' + error
        });

}

function updateResult(data) {

    const selector = Object.keys(data)

    tableDiv.innerHTML = '';

    resultBody.innerText = 'The data searched corresponds to:'

    var table = '<table>';

    if (selector.length === 1) {
        table += '<tr>'
        for (header in data[selector[0]]) {
            table += `<th>${header}</th>`
        }
        table += '</tr>'

        table += '<tr>'
        for (header in data[selector[0]]) {
            table += `<td>${data[selector[0]][header]}</td>`
        }
        table += '</tr>'

    } else {
        let tableHeadList = []
        for (let i = 0; i < data[selector[0]].length; i++) {
            const item = data[selector[0]][i]
            tableHeadList = tableHeadList.concat([...Object.keys(item)])
        }
        const tableHeadSet = new Set(tableHeadList)

        table += '<tr>'
        tableHeadSet.forEach(header => {
            table += `<th>${header}</th>`
        })
        table += '</tr>'

        for (let i = 0; i < data[selector[0]].length; i++) {
            table += '<tr>'
            const item = data[selector[0]][i]
            tableHeadSet.forEach(header => {
                if (item.hasOwnProperty(header)) {
                    table += `<td>${item[header]}</td>`
                } else {
                    table += `<td></td>`
                }
            })
            table += '</tr>'
        }

    }

    table += "</table>"


    tableDiv.innerHTML = table;

}
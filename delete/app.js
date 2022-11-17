const input = document.querySelector('input');
const preview = document.querySelector('#preview');

if (input !== null) {
    input.addEventListener('change', displayPreview);
}

function displayPreview() {
    while (!!preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    const file = input.files[0];

    if (file.length === 0) {
        const errorText = document.createElement('p');
        errorText.textContent = 'No files currently selected for upload';
        preview.appendChild(errorText);
    } else {
        const errorText = document.createElement('p');

        if (validFileType(file)) {
            const imgBox = document.createElement('div');
            imgBox.setAttribute('id', 'img_box')
            errorText.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
            preview.appendChild(errorText);
            const image = document.createElement('img');
            image.setAttribute('id', 'inputImg');
            image.src = URL.createObjectURL(file);
            preview.appendChild(imgBox);
            imgBox.appendChild(image);
        } else {
            errorText.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
            preview.appendChild(errorText);
        }
    }
}


const fileTypes = [
    // "image/apng",
    // "image/bmp",
    // "image/gif",
    "image/jpeg",
    // "image/pjpeg",
    "image/png"
    // "image/svg+xml",
    // "image/tiff",
    // "image/webp",
    // "image/x-icon"
];

function validFileType(file) {
    return fileTypes.includes(file.type);
}

function returnFileSize(number) {
    if (number < 1024) {
        return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
        return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
        return `${(number / 1048576).toFixed(1)} MB`;
    }
}

const uploadButton = document.getElementById('submit_button')

const predictionResult = document.getElementById('result');

if (uploadButton !== null) {
    uploadButton.onclick = function () { getPrediction() }
}

async function getPrediction() {
    const formData = new FormData();
    formData.append("img", input.files[0], "[PROXY]");

    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };
    try {
        const response = await fetch("http://cifar-app:5000/predict", requestOptions)
        predictionResult.innerHTML = await response.text()
    } catch (error) {
        console.log(error)
    }

}
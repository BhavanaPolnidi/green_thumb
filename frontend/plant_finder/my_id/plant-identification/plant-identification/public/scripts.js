document.getElementById('preferencesForm').addEventListener('submit', function(event) {
    event.preventDefault();
    recommendPlants();
});

function identifyPlant() {
    const imageUpload = document.getElementById('imageUpload').files[0];
    if (!imageUpload) {
        alert('Please upload an image.');
        return;
    }

    const formData = new FormData();
    formData.append('image', imageUpload);

    fetch('/identify', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerHTML = Identified Plant: ${data.plantName};
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function recommendPlants() {
    const formData = new FormData(document.getElementById('preferencesForm'));

    fetch('/recommend', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('recommendations').innerHTML = Recommended Plants: ${data.plants.join(', ')};
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const app = express();
const port = 8080;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Upload route
app.post('/upload', upload.single('images'), (req, res) => {
    const formData = new FormData();
    formData.append('images', fs.createReadStream(path.join(__dirname, req.file.path)));

    axios.post('https://api.plant.id/v2/identify', formData, {
        headers: {
            ...formData.getHeaders(),
            'Api-Key': 'oMfK0unEzmGfx4FSVsAw2N0HqboMcRSSLr182XKCkXpZIP2wul' // Replace with your API key
        }
    })
    .then(response => {
        // Parse and format the API response
        const results = response.data.suggestions.map(suggestion => ({
            plantName: suggestion.plant_name,
            scientificName: suggestion.plant_details.scientific_name,
            probability: (suggestion.probability * 100).toFixed(2) + '%'
        }));

        res.json({ suggestions: results });
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    })
    .finally(() => {
        fs.unlinkSync(path.join(__dirname, req.file.path)); // Cleanup the uploaded file
    });
});

app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});

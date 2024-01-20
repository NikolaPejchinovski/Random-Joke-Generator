const express = require('express');
const cors = require('cors');
const request = require('request');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());


async function fetchJoke() {
    try {
        const res = await axios.get('https://api.api-ninjas.com/v1/jokes?limit=30', {
        headers: {
            'X-Api-Key': 'hr87WHv7ChvcSOXhI9noAw==DVjMDsHLGVsXFcQH'
        },
    })

    const data = res.data;
    await fs.writeFile('./db.json', '', (err) => {
        if(err) throw err;
        console.log('Data cleared');
    });

    await fs.appendFile('./db.json', JSON.stringify(data), (err) => {
        if(err) throw err;
        console.log('Data added');
    })

    return data;
    } catch (error) {
        console.error('Error fetching joke', error.message);
        throw error;
    }

}

fetchJoke();

const filePath = path.resolve(__dirname, 'db.json');

app.get('/joke', (req, res) => {
    res.sendFile(filePath, (err) => {
        if(err) throw err;
        console.log('File sent');
    });
});

app.listen(8000, () => {
    console.log('Server is running from port 8000.');
});
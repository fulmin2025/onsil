const fs = require('fs');
const https = require('https');

const options = {
    hostname: 'upload.wikimedia.org',
    path: '/wikipedia/commons/thumb/1/16/Cat_and_dog_sleeping.jpg/800px-Cat_and_dog_sleeping.jpg',
    headers: { 'User-Agent': 'Mozilla/5.0' }
};

https.get(options, (res) => {
    if (res.statusCode === 200) {
        const file = fs.createWriteStream('fallback.jpg');
        res.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log('Downloaded Cat_and_dog_sleeping.jpg');
        });
    } else {
        console.error(`Status Code: ${res.statusCode}`);
    }
}).on('error', (err) => {
    console.error(err.message);
});

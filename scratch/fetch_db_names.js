const https = require('https');

const options = {
  hostname: 'fkmcanwlcigofjhbfkzs.supabase.co',
  path: '/rest/v1/funeral_homes?select=name&order=name',
  headers: {
    'apikey': 'sb_publishable_9OyB7n3foIalMmDxq1-_PA_s3xYfcJS',
    'Authorization': 'Bearer sb_publishable_9OyB7n3foIalMmDxq1-_PA_s3xYfcJS',
    'Accept-Profile': 'public'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (Array.isArray(json)) {
        console.log("DB Names:");
        json.forEach(h => console.log(`- "${h.name}"`));
      } else {
        console.log("Error response:", json);
      }
    } catch (e) {
      console.log("Error parsing JSON:", e.message);
      console.log("Raw data:", data);
    }
  });
}).on('error', (err) => {
  console.log("Error:", err.message);
});

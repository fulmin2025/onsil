const fs = require('fs');

let content = fs.readFileSync('search.html', 'utf-8');

const target1 = `                    // Fallback to RAW_JSON if DB is empty\r
                    funeralHomesData = (typeof RAW_JSON !== 'undefined' && RAW_JSON.business) ? RAW_JSON.business : [];`;

const replace1 = `                    // Fallback to RAW_JSON if DB is empty\r
                    if (typeof RAW_JSON !== 'undefined' && RAW_JSON.business) {\r
                        funeralHomesData = RAW_JSON.business;\r
                    } else if (typeof REAL_DATA !== 'undefined') {\r
                        funeralHomesData = Object.keys(REAL_DATA).map((name, index) => {\r
                            const info = REAL_DATA[name];\r
                            return {\r
                                id: 'fallback-' + index,\r
                                name: name,\r
                                address: info.address || '',\r
                                latitude: info.latitude || 37.5665,\r
                                longitude: info.longitude || 126.9780,\r
                                image_url: info.imageUrl || '',\r
                                is_alliance: true,\r
                                prices: info.prices || []\r
                            };\r
                        });\r
                    } else {\r
                        funeralHomesData = [];\r
                    }`;

const target2 = `                // Fallback\r
                funeralHomesData = (typeof RAW_JSON !== 'undefined' && RAW_JSON.business) ? RAW_JSON.business : [];`;

const replace2 = `                // Fallback\r
                if (typeof RAW_JSON !== 'undefined' && RAW_JSON.business) {\r
                    funeralHomesData = RAW_JSON.business;\r
                } else if (typeof REAL_DATA !== 'undefined') {\r
                    funeralHomesData = Object.keys(REAL_DATA).map((name, index) => {\r
                        const info = REAL_DATA[name];\r
                        return {\r
                            id: 'fallback-' + index,\r
                            name: name,\r
                            address: info.address || '',\r
                            latitude: info.latitude || 37.5665,\r
                            longitude: info.longitude || 126.9780,\r
                            image_url: info.imageUrl || '',\r
                            is_alliance: true,\r
                            prices: info.prices || []\r
                        };\r
                    });\r
                } else {\r
                    funeralHomesData = [];\r
                }`;

if (content.includes(target1)) {
    content = content.replace(target1, replace1);
    console.log("Replaced target1");
} else {
    console.log("Could not find target1");
}

if (content.includes(target2)) {
    content = content.replace(target2, replace2);
    console.log("Replaced target2");
} else {
    console.log("Could not find target2");
}

fs.writeFileSync('search.html', content, 'utf-8');
console.log("File saved.");

import codecs

with codecs.open('search.html', 'r', 'utf-8') as f:
    content = f.read()

target = """                // Fetch from Supabase
                const data = await Auth.getAllFuneralHomes();
                if (data && data.length > 0) {
                    funeralHomesData = data;
                } else {
                    // Fallback to RAW_JSON if DB is empty
                    funeralHomesData = (typeof RAW_JSON !== 'undefined' && RAW_JSON.business) ? RAW_JSON.business : [];
                }"""

replacement = """                // Fetch from Supabase
                const data = await Auth.getAllFuneralHomes();
                if (data && data.length > 0) {
                    funeralHomesData = data;
                } else {
                    // Fallback to RAW_JSON if DB is empty
                    if (typeof RAW_JSON !== 'undefined' && RAW_JSON.business) {
                        funeralHomesData = RAW_JSON.business;
                    } else if (typeof REAL_DATA !== 'undefined') {
                        // Fallback to REAL_DATA
                        funeralHomesData = Object.keys(REAL_DATA).map((name, index) => {
                            const info = REAL_DATA[name];
                            return {
                                id: 'fallback-' + index,
                                name: name,
                                address: info.address || '',
                                latitude: info.latitude || 37.5665,
                                longitude: info.longitude || 126.9780,
                                image_url: info.imageUrl || '',
                                is_alliance: true,
                                prices: info.prices || []
                            };
                        });
                    } else {
                        funeralHomesData = [];
                    }
                }"""

target2 = """                // Fallback
                funeralHomesData = (typeof RAW_JSON !== 'undefined' && RAW_JSON.business) ? RAW_JSON.business : [];"""

replacement2 = """                // Fallback
                if (typeof RAW_JSON !== 'undefined' && RAW_JSON.business) {
                    funeralHomesData = RAW_JSON.business;
                } else if (typeof REAL_DATA !== 'undefined') {
                    funeralHomesData = Object.keys(REAL_DATA).map((name, index) => {
                        const info = REAL_DATA[name];
                        return {
                            id: 'fallback-' + index,
                            name: name,
                            address: info.address || '',
                            latitude: info.latitude || 37.5665,
                            longitude: info.longitude || 126.9780,
                            image_url: info.imageUrl || '',
                            is_alliance: true,
                            prices: info.prices || []
                        };
                    });
                } else {
                    funeralHomesData = [];
                }"""

new_content = content.replace(target, replacement).replace(target2, replacement2)

with codecs.open('search.html', 'w', 'utf-8') as f:
    f.write(new_content)

print("Replacement successful")

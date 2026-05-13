
const fs = require('fs');
const path = require('path');

const userFiles = ["search.html", "guide.html", "community.html", "self-diagnosis.html", "memory.html", "detail.html", "mypage.html", "reservation.html", "contact.html", "partnership.html", "login.html", "signup.html"];
const adminFiles = ["admin_reservations.html", "admin_partners.html", "admin_funeral_homes.html"];

const allFiles = [
    ...userFiles, 
    ...userFiles.map(f => `onsil/${f}`),
    ...adminFiles,
    ...adminFiles.map(f => `onsil/${f}`)
];

allFiles.forEach(fpath => {
    if (!fs.existsSync(fpath)) return;
    
    let content = fs.readFileSync(fpath, 'utf8');
    
    // Check if it has a fixed header
    if (content.includes('class="fixed top-0 z-50 w-full bg-white border-b border-brand/5')) {
        console.log(`Processing: ${fpath}`);
        
        // Find the <main> tag
        const mainRegex = /<main\s+class="([^"]*)"/i;
        const match = content.match(mainRegex);
        
        if (match) {
            let classes = match[1];
            // Ensure pt-24 is present
            if (!classes.includes('pt-') && !classes.includes('py-')) {
                classes += ' pt-24';
            } else {
                // Replace py-8 with pt-24 pb-8, etc.
                classes = classes.replace(/py-(\d+)/g, (m, p1) => {
                    const top = Math.max(parseInt(p1), 24);
                    return `pt-${top} pb-${p1}`;
                });
                if (!classes.includes('pt-')) {
                     classes += ' pt-24';
                } else {
                    // Update existing pt-
                    classes = classes.replace(/pt-(\d+)/g, (m, p1) => {
                        return `pt-${Math.max(parseInt(p1), 24)}`;
                    });
                }
            }
            content = content.replace(mainRegex, `<main class="${classes}"`);
        } else {
            // If no <main> tag, find the first section/div after </header>
            const headerEnd = content.indexOf('</header>');
            if (headerEnd !== -1) {
                const rest = content.substring(headerEnd + 9);
                const firstTagRegex = /<(section|div)\s+class="([^"]*)"/i;
                const tagMatch = rest.match(firstTagRegex);
                if (tagMatch) {
                    let tagClasses = tagMatch[2];
                    if (!tagClasses.includes('pt-') && !tagClasses.includes('py-')) {
                        tagClasses += ' pt-24';
                    } else {
                        tagClasses = tagClasses.replace(/py-(\d+)/g, `pt-24 pb-$1`);
                        tagClasses = tagClasses.replace(/pt-(\d+)/g, (m, p1) => `pt-${Math.max(parseInt(p1), 24)}`);
                    }
                    const newRest = rest.replace(firstTagRegex, `<${tagMatch[1]} class="${tagClasses}"`);
                    content = content.substring(0, headerEnd + 9) + newRest;
                }
            }
        }
        
        fs.writeFileSync(fpath, content, 'utf8');
        console.log(`Fixed Padding: ${fpath}`);
    }
});

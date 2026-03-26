const fs = require('fs');
const { execSync } = require('child_process');

const targetFiles = ['memory.html', 'index.html', 'search.html', 'aistar_page.html'];
const stableCommit = '969a7fe';
const brandImageUrl = 'images/professional_funeral_service.png';
const brandKitUrl = 'images/memory_professional_kit.png';

targetFiles.forEach(file => {
    console.log(`Restoring ${file} from ${stableCommit}...`);
    try {
        // Read raw buffer from Git to avoid any shell encoding mess
        const buffer = execSync(`git show ${stableCommit}:${file}`);
        let content = buffer.toString('utf8');

        // Apply Image Replacements safely on the string
        // 1. Unsplash general
        content = content.replace(/https:\/\/images\.unsplash\.com\/photo-[^'" >\s]+/g, brandImageUrl);
        
        // 2. Specific for memory.html (Bucket List)
        if (file === 'memory.html') {
            content = content.replace(/images\/professional_funeral_service\.png(?="[^>]+alt="Bucket List")/g, brandKitUrl);
            // Replace the makeup palette one specifically if general regex missed it or we want variety
            content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1516734212186-a967f81ad0d7\?auto=format&fit=crop&q=80&w=1000/g, brandImageUrl);
        }

        // 3. search.html p_item placeholders
        if (file === 'search.html') {
            content = content.replace(/"\.\/images\/p_item0[1-5](_ex_3)?\.webp"/g, `"${brandImageUrl}"`);
        }

        // 4. aistar_page.html pet_fulghsn.jpg
        if (file === 'aistar_page.html') {
            content = content.replace(/\/images\/pet_fulghsn\.jpg/g, brandImageUrl);
        }

        // Write back as UTF-8 (No BOM)
        fs.writeFileSync(file, content, { encoding: 'utf8' });
        console.log(`Successfully restored and updated ${file}`);
    } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
    }
});

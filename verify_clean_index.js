const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
console.log('총 줄 수:', content.split('\n').length);
console.log('</header> 존재 여부:', content.includes('</header>'));
console.log('Hero Section 존재 여부:', content.includes('Hero Section') || content.includes('min-h-[90vh]'));
console.log('Header 존재 여부:', content.includes('main-header'));
console.log('Mobile Nav 존재 여부:', content.includes('mobile-nav'));

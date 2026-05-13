
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

const globalStyle = `
    <style>
        /* 헤더 고정으로 인한 본문 가림 방지 */
        body {
            padding-top: 64px; /* h-16 */
        }
        @media (min-width: 640px) {
            body {
                padding-top: 72px; /* h-18 */
            }
        }
        /* 기존에 추가된 padding-top과 충돌 방지 */
        main {
            padding-top: 2rem !important; /* 기본 여백 확보 */
        }
    </style>
`;

allFiles.forEach(fpath => {
    if (!fs.existsSync(fpath)) return;
    
    let content = fs.readFileSync(fpath, 'utf8');
    
    // Check if it has the fixed header
    if (content.includes('id="main-header"') && content.includes('fixed')) {
        console.log(`Injecting global style: ${fpath}`);
        
        // Remove previously added pt-24 if it exists to keep it clean
        content = content.replace(/pt-24/g, '');
        
        // Inject style before </head>
        if (!content.includes('/* 헤더 고정으로 인한 본문 가림 방지 */')) {
            content = content.replace('</head>', `${globalStyle}\n</head>`);
        }
        
        fs.writeFileSync(fpath, content, 'utf8');
        console.log(`Updated: ${fpath}`);
    }
});

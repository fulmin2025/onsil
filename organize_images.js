/**
 * 장례식장별 사진 폴더 정리 스크립트
 * 실행: node organize_images.js
 * - images/ 폴더의 이미지를 images/funeral_homes/{장례식장명}/ 에 정리
 * - 외부 URL 이미지는 다운로드하여 저장
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT = __dirname;
const IMAGES_DIR = path.join(ROOT, 'images');
const HOMES_DIR = path.join(IMAGES_DIR, 'funeral_homes');

// 장례식장별 이미지 매핑 (로컬 파일명 기준)
const LOCAL_IMAGE_MAP = {
    '좋은친구들': ['goodfriends_main.jpg'],
    '별이되다': ['becomestars_main.jpg', 'becomestars_1.jpg', 'becomestars_2.jpg', 'becomestars_3.jpg', 'becomestars_4.jpg', 'becomestars_5.jpg', 'becomestars_6.jpg'],
    '하늘소풍': ['haneulsopoong_list_v2.png', 'haneulsopoong_list.png', 'haneulsopoong_basic.png', 'haneulsopoong_sky.png'],
    '이별공간': ['ibyeol_main.png'],
    '강아지펫헤븐': ['petheaven_exterior.png'],
    '위드엔젤': ['withangel_main.png'],
    '더포에버': ['theforever_main.png'],
    '펫노블레스': ['petnoblesse_main.png'],
    '패투헤븐': ['pettoheaven_main.jpg'],
    '강릉펫사랑': ['petsalang_1.png', 'petsalang_2.png', 'petsalang_3.png', 'petsalang_4.png', 'petsalang_5.png', 'petsalang_columbarium_1.png', 'petsalang_columbarium_2.png', 'petsalang_stone_1.png', 'petsalang_stone_2.png', 'petsalang_stone_3.png'],
    '한별리멤버파크': ['hanbyul_pkg_1.jpg', 'hanbyul_pkg_2.jpg', 'hanbyul_pkg_3.jpg', 'hanbyul_pkg_4.jpg', 'hanbyul_pkg_5.jpg', 'hanbyul_basic_custom.jpg', 'hanbyul_package_60_rattan.jpg', 'hanbyul_package_65_angel.jpg', 'hanbyul_package_95_premium.jpg'],
    '하늘별': ['haneul_basic.png', 'haneul_stone_basic.png', 'haneul_stone_cradle.png', 'haneul_stone_premium.jpg', 'haneul_stone_sky.png', 'haneul_stone_vip.jpg'],
    '펫바라기 남원점': ['petbaragi_gukhwa.png', 'petbaragi_stone.png', 'petbaragi_vip.png'],
    '하얀민들레': ['hayanmindeulle_main.jpg'],
    '스타펫': ['becomestars_1.jpg'],
    '로이힐즈': ['petsalang_1.png'],
    '아이드림펫': ['ibyeol_main.png'],
};

// 외부 URL 이미지 매핑 {장례식장명: URL}
const URL_IMAGE_MAP = {
    '스마일어게인': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/smileagain.webp',
    '굿바이펫': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/goodbyepet.webp',
    '러블리엔젤': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/lovelyangelang.webp',
    '경북반려동물장례식장': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/kyungbook.webp',
    '스타티스': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/statis.webp',
    '푸른솔': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/pureunsol.webp',
    '타임투': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/timetwo.webp',
    '러브펫 경기광주점': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/lovepet-kyungigwangju.webp',
    '해피펫': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/happypet.webp',
    '펫로스케어': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/petlosscare.webp',
    '좋은친구들_cloudfront': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/joeunchingudeul.webp',
    '펫포레스트 김포점': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/petforest-kyungigimpo.webp',
    '더포에버_cf': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/theforever.webp',
    '몽몽이엠파크': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/mongmongiempark.webp',
    '백꽃사랑하이빛': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/baekkkotsaranghaibit.webp',
    '어게인': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/again.webp',
    '아이별': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/pofos-gimhae.webp',
    '서래안펫타운': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/petforest-kyungigwangju.webp',
    '강릉펫사랑_cf': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/gangneungpetsarang.webp',
    '우바스': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/ubas.webp',
    '아리아펫': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/ariapet.webp',
    '아이들랜드': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/rememberpark.webp',
    '리멤버파크': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/rememberpark.webp',
    '펫콤': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/petcom.webp',
    '위드엔젤_cf': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/withangel.webp',
    '이별공간_cf': 'https://ebyulplace.com/wp-content/uploads/2025/02/공통장례1.webp',
    '펫포레스트 경기광주점': 'https://d21ntoj848ohi.cloudfront.net/business-main-img/petforest-kyungigwangju.webp',
};

function safeDirName(name) {
    return name.replace(/[\\/:*?"<>|]/g, '_').replace(/\s+/g, '_');
}

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`  📁 폴더 생성: ${dir}`);
    }
}

function copyLocalImage(srcName, destDir, destName) {
    const src = path.join(IMAGES_DIR, srcName);
    const dest = path.join(destDir, destName || srcName);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        return true;
    } else {
        console.log(`    ⚠️  파일 없음: ${srcName}`);
        return false;
    }
}

function downloadImage(url, destPath) {
    return new Promise((resolve, reject) => {
        const proto = url.startsWith('https') ? https : http;
        const file = fs.createWriteStream(destPath);
        const req = proto.get(url, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                file.close();
                fs.unlink(destPath, () => {});
                downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
                return;
            }
            if (res.statusCode !== 200) {
                file.close();
                fs.unlink(destPath, () => {});
                reject(new Error(`HTTP ${res.statusCode}: ${url}`));
                return;
            }
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
        });
        req.on('error', (err) => {
            fs.unlink(destPath, () => {});
            reject(err);
        });
        req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout: ' + url)); });
    });
}

async function main() {
    console.log('🚀 장례식장별 사진 폴더 정리 시작!\n');

    ensureDir(HOMES_DIR);

    // 1. 로컬 이미지 복사
    console.log('📋 [1/2] 로컬 이미지 업체별 폴더 복사...');
    for (const [homeName, files] of Object.entries(LOCAL_IMAGE_MAP)) {
        const dirName = safeDirName(homeName);
        const destDir = path.join(HOMES_DIR, dirName);
        ensureDir(destDir);
        let count = 0;
        for (const f of files) {
            if (copyLocalImage(f, destDir)) count++;
        }
        console.log(`  ✅ ${homeName}: ${count}개 복사`);
    }

    // 2. 외부 URL 이미지 다운로드
    console.log('\n🌐 [2/2] 외부 URL 이미지 다운로드...');
    for (const [rawName, url] of Object.entries(URL_IMAGE_MAP)) {
        const homeName = rawName.replace(/_cf$/, '').replace(/_cloudfront$/, '');
        const dirName = safeDirName(homeName);
        const destDir = path.join(HOMES_DIR, dirName);
        ensureDir(destDir);

        const ext = url.split('.').pop().split('?')[0] || 'webp';
        const fileName = 'main.' + ext;
        const destPath = path.join(destDir, fileName);

        if (fs.existsSync(destPath)) {
            console.log(`  ⏭️  ${homeName}: 이미 존재 (${fileName})`);
            continue;
        }

        try {
            await downloadImage(url, destPath);
            const stat = fs.statSync(destPath);
            console.log(`  ✅ ${homeName}: 다운로드 완료 (${(stat.size/1024).toFixed(1)}KB)`);
        } catch (e) {
            console.log(`  ❌ ${homeName}: 실패 - ${e.message}`);
        }
    }

    // 3. 결과 요약
    console.log('\n📊 정리 결과:');
    const folders = fs.readdirSync(HOMES_DIR);
    let totalFiles = 0;
    folders.forEach(f => {
        const fPath = path.join(HOMES_DIR, f);
        if (fs.statSync(fPath).isDirectory()) {
            const files = fs.readdirSync(fPath);
            totalFiles += files.length;
            console.log(`  📁 ${f}: ${files.length}개 파일`);
        }
    });

    console.log(`\n🎉 완료! 총 ${folders.length}개 업체 폴더, ${totalFiles}개 파일 정리됨`);
    console.log(`📂 저장 위치: images/funeral_homes/`);
}

main().catch(console.error);

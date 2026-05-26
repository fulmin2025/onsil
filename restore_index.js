/**
 * index.html 구조 복원 스크립트
 * - onsil/index.html을 원본으로 사용하여 구조 복원
 * - 바우처 배너는 헤더 바로 다음에 올바른 위치로 재삽입
 */
const fs = require('fs');
const path = require('path');

// onsil/index.html이 원본 (sync_onsil.js가 이미 복사했으나 수정 전 버전이 남아있을 수도 있음)
// git으로 원본을 복원하는 것이 가장 안전
const { execSync } = require('child_process');

try {
    // git으로 index.html을 HEAD~2(바우처 배너 추가 이전) 버전으로 복원
    execSync('git show HEAD~2:index.html > index.html', { cwd: __dirname });
    console.log('✅ git으로 index.html 복원 완료 (2커밋 이전 버전)');
} catch(e) {
    console.log('git 복원 실패, onsil/index.html 사용:', e.message);
    // 대안: onsil/index.html 사용 (sync 이전이면 동일)
    const onsilPath = path.join(__dirname, 'onsil', 'index.html');
    if (fs.existsSync(onsilPath)) {
        fs.copyFileSync(onsilPath, path.join(__dirname, 'index.html'));
        console.log('✅ onsil/index.html로 복원 완료');
    }
}

// 복원된 파일 확인
let content = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const hasHero = content.includes('Hero Section') || content.includes('min-h-[90vh]');
const hasHeader = content.includes('main-header');
console.log('Hero 섹션 존재:', hasHero);
console.log('Header 존재:', hasHeader);
console.log('총 줄 수:', content.split('\n').length);

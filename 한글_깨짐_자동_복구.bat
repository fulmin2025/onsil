@echo off
chcp 65001 > nul
echo ==========================================
echo [The 온실] 안드로이드 한글 깨짐 자동 복구 시작
echo ==========================================
echo.
echo 정상 인코딩된 HTML 파일을 onsil 폴더로 복사하고 있습니다...
echo.

copy /Y *.html onsil\

echo.
echo ------------------------------------------
echo 한글 복구가 완료되었습니다!
echo 이제 다음 명령어를 터미널에 입력하여 앱을 빌드하세요:
echo.
echo 1. npx cap copy android
echo 2. npx cap open android (안드로이드 스튜디오 실행)
echo.
echo ------------------------------------------
pause

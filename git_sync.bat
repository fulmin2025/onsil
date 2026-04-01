@echo off
setlocal
cd /d %~dp0

echo [Onsil Sync] GitHub 동기화를 시작합니다...

:: Git 경로 설정 (필요시 수정)
set GIT_CMD="C:\Program Files\Git\cmd\git.exe"

echo [1/3] 변경 사항 추가 중...
%GIT_CMD% add .

echo [2/3] 최신 내용 가져오기 (Pull)...
%GIT_CMD% pull origin main --rebase

echo [3/4] 커밋 중...
set COMMIT_MSG="Sync update: %date% %time%"
%GIT_CMD% commit -m "%COMMIT_MSG%"

echo [4/4] GitHub로 전송 중 (Push)...
%GIT_CMD% push origin main

if %ERRORLEVEL% neq 0 (
    echo [ERROR] 동기화 중 오류가 발생했습니다. 권한 설정을 확인해 주세요.
) else (
    echo [SUCCESS] GitHub 동기화가 완료되었습니다!
)

pause

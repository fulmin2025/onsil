$path = "c:\Users\Administrator\.gemini\test\onsil\reservation.html"
$lines = Get-Content $path

# 1. Update verification block (522-553)
$start = 521 
$end = 552   

$newLines = @(
'        if (requestBtn) {',
'            requestBtn.onclick = async () => {',
'                const phone = document.getElementById(''user-phone'').value;',
'                const name = document.getElementById(''user-name'').value;',
'                if (!phone || phone.length < 10) {',
'                    alert("올바른 휴대폰 번호를 입력해주세요.");',
'                    return;',
'                }',
'                if (!name) {',
'                    alert("성함을 입력해주세요.");',
'                    return;',
'                }',
'',
'                try {',
'                    requestBtn.disabled = true;',
'                    requestBtn.textContent = "인증 중...";',
'                    ',
'                    const res = await Auth.requestIdentityVerification({',
'                        fullName: name,',
'                        phoneNumber: phone',
'                    });',
'',
'                    if (res.success) {',
'                        isVerified = true;',
'                        if (typeof verifySection !== ''undefined'' && verifySection) verifySection.classList.add(''hidden'');',
'                        if (typeof successMsg !== ''undefined'' && successMsg) successMsg.classList.remove(''hidden'');',
'                        requestBtn.classList.add(''hidden'');',
'                        document.getElementById(''user-phone'').disabled = true;',
'                        validateForm();',
'                        alert("본인인증이 완료되었습니다.");',
'                    } else {',
'                        alert(res.message || "본인인증에 실패했습니다.");',
'                    }',
'                } catch (err) {',
'                    alert("오류 발생: " + err.message);',
'                } finally {',
'                    requestBtn.disabled = false;',
'                    requestBtn.textContent = isVerified ? "인증완료" : "인증요청";',
'                }',
'            };',
'        }'
)

$lines = $lines[0..($start-1)] + $newLines + $lines[($end+1)..($lines.Count-1)]

# 2. Fix other corrupted strings
for ($i = 0; $i -lt $lines.Count; $i++) {
    $lines[$i] = $lines[$i] -replace '\?몄뀡??留뚮즺?섏뿀?듬땲?? ?ㅼ떆 濡쒓렇?명빐二쇱꽭??', '세션이 만료되었습니다. 다시 로그인해주세요.'
    $lines[$i] = $lines[$i] -replace '\?щ컮瑜??대???踰덊샇瑜??낅젰?댁＜?몄슂\.', '올바른 휴대폰 번호를 입력해주세요.'
    $lines[$i] = $lines[$i] -replace '0??;', '0원'
}

# 3. Update Channel Key
for ($i = 0; $i -lt $lines.Count; $i++) {
    $lines[$i] = $lines[$i] -replace 'channel-key-f5a9e74f-4ef2-4fe0-89e8-8e85e65246b4', 'channel-key-c871e7bc-cc63-4daf-a74f-2b8b80a9d29c'
}

Set-Content -Path $path -Value $lines -Encoding UTF8

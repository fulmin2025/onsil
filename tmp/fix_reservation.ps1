$path = "c:\Users\Administrator\.gemini\test\onsil\reservation.html"
$content = Get-Content $path -Raw

# Replace Channel Key
$content = $content -replace 'channel-key-f5a9e74f-4ef2-4fe0-89e8-8e85e65246b4', 'channel-key-c871e7bc-cc63-4daf-a74f-2b8b80a9d29c'

# Define the old block to match exactly (including potential weird whitespace)
# We'll use a regex to match the block more flexibly if needed, but let's try literal first.
$oldBlock = 'if (requestBtn) {
            requestBtn.onclick = () => {
                const phone = document.getElementById(''user-phone'').value;
                if (!phone || phone.length < 10) {
                    alert("올바른 휴대폰 번호를 입력해주세요.");
                    return;
                }
                requestBtn.textContent = "재발송";
                verifySection.classList.remove(''hidden'');
                document.getElementById(''verify-code'').value = "";
                startTimer();
                alert("인증번호(123456)가 발송되었습니다. [테스트용]");
            };
        }'

# The new block
$newBlock = 'if (requestBtn) {
            requestBtn.onclick = async () => {
                const phone = document.getElementById(''user-phone'').value;
                const name = document.getElementById(''user-name'').value;
                if (!phone || phone.length < 10) {
                    alert("올바른 휴대폰 번호를 입력해주세요.");
                    return;
                }
                if (!name) {
                    alert("성함을 입력해주세요.");
                    return;
                }

                try {
                    requestBtn.disabled = true;
                    requestBtn.textContent = "인증 중...";
                    
                    const res = await Auth.requestIdentityVerification({
                        fullName: name,
                        phoneNumber: phone
                    });

                    if (res.success) {
                        isVerified = true;
                        if (successMsg) successMsg.classList.remove(''hidden'');
                        requestBtn.classList.add(''hidden'');
                        document.getElementById(''user-phone'').disabled = true;
                        validateForm();
                        alert("본인인증이 완료되었습니다.");
                    } else {
                        alert(res.message || "본인인증에 실패했습니다.");
                    }
                } catch (err) {
                    alert("오류 발생: " + err.message);
                } finally {
                    requestBtn.disabled = false;
                    requestBtn.textContent = isVerified ? "인증완료" : "인증요청";
                }
            };
        }'

# Try literal replace first
$content = $content.Replace($oldBlock, $newBlock)

Set-Content -Path $path -Value $content -Encoding UTF8

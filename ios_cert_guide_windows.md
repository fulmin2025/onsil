# 윈도우에서 iOS 인증서(P12) 준비하기 (No Mac 가이드)

Mac이 없어도 윈도우의 **OpenSSL** (Git 설치 시 함께 설치됨)을 사용하면 애플 개발자 사이트에 등록할 인증서를 만들 수 있습니다.

---

## 1. 준비물 확인
- **Git for Windows** 설치 여부 (설치 시 OpenSSL이 포함됩니다.)
- **Apple Developer 계정** (유료 멤버십)

---

## 2. CSR 생성 (인증서 서명 요청)
터미널(PowerShell 또는 CMD)을 열고 아래 명령어를 순서대로 입력하세요.

```powershell
# 1. 개인 키 생성
openssl genrsa -out ios_development.key 2048

# 2. CSR 생성 (이메일과 이름은 본인의 정보로 입력하세요)
# Common Name에는 본인의 이름을 적으시면 됩니다.
openssl req -new -key ios_development.key -out ios_development.csr -subj "/Email=본인이메일@example.com/CN=TheOnsil/C=KR"
```

---

## 3. Apple Developer 사이트 등록
1. [Apple Certificates 페이지](https://developer.apple.com/account/resources/certificates/list) 접속
2. **+** 버튼 클릭 -> **iOS Distribution (App Store and Ad Hoc)** 선택
3. 위에서 만든 `ios_development.csr` 파일을 업로드합니다.
4. 생성이 완료되면 `distribution.cer` 파일을 다운로드합니다.

---

## 4. P12 인증서로 변환 (GitHub에서 사용하기 위해)
다운로드받은 `.cer` 파일을 다시 윈도우에서 `.p12` 파일로 바꿉니다.

```powershell
# 3. .cer 파일을 .p12 파일로 변환 (비밀번호를 설정하게 됩니다. 잘 기억해두세요!)
openssl x509 -in distribution.cer -inform DER -out distribution.pem -outform PEM
openssl pkcs12 -export -inkey ios_development.key -in distribution.pem -out distribution.p12
```

---

## 5. Provisioning Profile 만들기
1. [Profiles 페이지](https://developer.apple.com/account/resources/profiles/list) 접속
2. **+** 버튼 클릭 -> **App Store** 또는 **Ad Hoc** 선택
3. 해당 앱의 App ID (`com.theonsil.onsil`)를 선택하고 위에서 만든 인증서를 연결합니다.
4. 완성된 `.mobileprovision` 파일을 다운로드합니다. ✨

---

> [!IMPORTANT]
> **다음 단계**
> 생성된 `distribution.p12` 파일과 `.mobileprovision` 파일은 잠시 후 GitHub Secrets에 등록할 예정이니 안전한 곳에 보관해 주세요!

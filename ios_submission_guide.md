# iOS 앱스토어 (App Store Connect) 등록 메타데이터 가이드

이 문서는 Apple App Store Connect에 새 앱을 등록하고 심사를 요청할 때 필요한 모든 텍스트 정보를 정리한 가이드입니다.

---

## 1. 앱 정보 (App Information)

| 항목 | 내용 |
| :--- | :--- |
| **이름 (Name)** | The 온실 |
| **부제 (Subtitle)** | 반려동물 장례 및 추모 서비스 |
| **기본 언어 (Primary Language)** | Korean (한국어) |
| **카테고리 (Category)** | 라이프스타일 (Lifestyle) |
| **번들 ID (Bundle ID)** | `com.theonsil.reservation` |

---

## 2. 버전 정보 (Version Information)

### 상세 설명 (Description)
> **[따뜻한 위로와 정성을 다하는 반려동물 장례 서비스, The 온실]**
> 
> 소중한 아이와의 마지막 이별, 'The 온실'이 함께합니다. 
> 
> The 온실은 반려동물을 위해 정직하고 투명한 장례 서비스를 제공하는 시설들을 선별하여 보호자님께 연결해 드립니다. 
> 
> ■ **주요 기능**
> - **시설 검색 및 예약**: 펫포레스트, 21그램 등 믿을 수 있는 장례 시설을 한눈에 비교하고 예약하세요.
> - **맞춤형 패키지**: 보호자님의 니즈에 맞는 다양한 장례 서비스를 선택하실 수 있습니다.
> - **추모 서비스**: 아이와의 기억을 소중히 간직할 수 있는 추모 공간을 제공합니다. (업데이트 예정)
> 
> 보호자님의 슬픔을 깊이 공감하며, 아이의 마지막 길을 가장 아름답고 정성스럽게 배웅할 수 있도록 돕겠습니다.

### 키워드 (Keywords)
> 반려동물장례, 강아지장례, 고양이장례, 펫장례, 추모, 펫포레스트, 21그램, 포포즈, 온실, The온실

### 지원 URL (Support URL)
> https://theonsil.co.kr/guide.html

### 마케팅 URL (Marketing URL)
> https://theonsil.co.kr

### 개인정보 처리방침 URL (Privacy Policy URL)
> https://theonsil.co.kr/privacy.html

---

## 3. 앱 권한 요청 설명 (Info.plist 반영됨)
심사팀에서 권한의 목적을 묻는 경우 아래 내용을 참고하세요.
- **카메라**: 장례 서비스 예약 시 증빙 서류 촬영 또는 서비스 이용 시 사진 활용을 위함.
- **사진첩**: 반려동물의 추모 사진 업로드 및 저장을 위함.

---

## 5. GitHub 클라우드 빌드 설정 (Mac 없는 사용자용)

GitHub Actions를 통해 Mac 없이 빌드하려면 아래 정보들을 GitHub 리포지토리의 **Settings -> Secrets and variables -> Actions**에 등록해야 합니다.

| Secret 이름 | 설명 |
| :--- | :--- |
| `IOS_P12_CERTIFICATE` | `distribution.p12` 파일을 Base64로 인코딩한 텍스트 |
| `IOS_P12_PASSWORD` | P12 파일 생성 시 설정한 비밀번호 |
| `IOS_PROVISIONING_PROFILE` | `.mobileprovision` 파일을 Base64로 인코딩한 텍스트 |
| `APP_STORE_CONNECT_ISSUER_ID` | App Store Connect Issuer ID (사용자 액세스 -> 키) |
| `APP_STORE_CONNECT_KEY_ID` | 생성한 API 키의 ID |
| `APP_STORE_CONNECT_PRIVATE_KEY` | `.p8` API 키 파일 내용 전체 |

> [!TIP]
> **P12 파일 Base64 변환 방법 (윈도우 터미널):**
> ```powershell
> [Convert]::ToBase64String([IO.File]::ReadAllBytes("distribution.p12"))
> ```
> 위 명령어를 실행해 나온 긴 텍스트를 복사해서 `IOS_P12_CERTIFICATE`에 넣으시면 됩니다.

---

## 6. 최종 제출 및 업로드 절차 안내
1. 코드 수정 후 GitHub에 `push` 하면 자동으로 빌드가 시작됩니다.
2. 빌드 성공 시 **Actions** 탭에서 생성된 `.ipa` 파일을 다운로드할 수 있습니다.
3. 다운로드한 `.ipa` 파일은 [Transporter](https://apps.apple.com/kr/app/transporter/id1450876684) (Mac 환경) 또는 **App Store Connect API**를 통해 제출합니다.

# Supabase 보안 설정 가이드 (필수 조치 사항)

사용자께서 직접 Supabase 대시보드에서 수행해야 하는 필수 보안 설정 가이드입니다.

## 1. 이메일 인증 활성화 (Email Confirmation)
가짜 이메일로 가입하는 것을 방지하고, 실제 사용자를 검증하기 위해 반드시 필요합니다.

- **위치**: [Supabase Dashboard](https://supabase.com/dashboard) -> 프로젝트 선택 -> **Authentication** -> **Settings** -> **Auth Providers**
- **조치**: 
    1. `Confirm email` 옵션을 **ON**으로 변경합니다.
    2. `Secure email change` 옵션도 **ON**으로 하는 것을 권장합니다.
- **효과**: 사용자가 회원가입 시 이메일 링크를 클릭해야만 계정이 활성화됩니다.

## 2. 비밀키(Service Role Key) 관리
현재 코드 전수 조사 결과, 프론트엔드에 노출된 비밀키는 없습니다. 하지만 향후 개발 시 주의가 필요합니다.

- **주의사항**: `service_role` 키는 `anon` 키와 달리 **모든 RLS 정책을 무시**합니다.
- **금지사항**: 절대 `.html`, `.js` 파일에 이메일이나 API Key를 넣지 마세요.
- **해결책**: 만약 비밀키가 노출된 것으로 의심된다면 **Settings -> API -> JWT Settings**에서 `Roll service_role key`를 눌러 키를 재발급받으세요.

## 3. 주기적 권한 감사 (Security Audit)
제가 관리자 페이지에 **'보안 감사 모니터'** 기능을 추가해 두었습니다. 주기적으로 접속하여 권한 누수가 없는지 확인하세요.

---
**보고**: 위의 1, 2번 사항은 제가 대시보드에 직접 접근할 수 없으므로 사용자께서 확인해 주셔야 하며, 3번 사항은 지금 즉시 코드로 구현하여 업로드하겠습니다.

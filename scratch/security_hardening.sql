-- ==========================================
-- Supabase Security Hardening Script
-- ==========================================

-- 1. 관리자 여부 확인 함수 (Security Definer 사용)
-- 보안상 이메일 목록을 정책에 직접 넣는 것보다 함수로 관리하는 것이 안전합니다.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        auth.jwt() ->> 'email' IN (
            'fulmin@nate.com', 
            'theonsil@gmail.com', 
            'admin@theonsil.co.kr', 
            'theonsilofficial@gmail.com', 
            'admin@onsil.com'
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. 모든 테이블 RLS 활성화 재확인
ALTER TABLE public.funeral_homes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qol_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_us ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partnership_inquiries ENABLE ROW LEVEL SECURITY;

-- 3. funeral_homes (장례식장) 보안 강화
DROP POLICY IF EXISTS "Admins can manage funeral homes" ON public.funeral_homes;
CREATE POLICY "Admins can manage funeral homes" ON public.funeral_homes 
    FOR ALL USING (public.is_admin());

-- 4. profiles (사용자 프로필) 보안 강화
-- 일반 사용자는 자신의 정보만 볼 수 있고, 관리자는 모두 볼 수 있음
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles 
    FOR SELECT USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles 
    FOR UPDATE USING (auth.uid() = id OR public.is_admin());

-- 5. reservations (예약) 보안 강화
DROP POLICY IF EXISTS "Admins can manage all reservations" ON public.reservations;
CREATE POLICY "Admins can manage all reservations" ON public.reservations 
    FOR ALL USING (public.is_admin());

-- 6. 스키마 노출 방지 (선택 사항)
-- public 스키마에 대한 접근을 제한하여 테이블 목록 등이 함부로 보이지 않게 합니다.
-- REVOKE ALL ON SCHEMA public FROM anon;
-- GRANT USAGE ON SCHEMA public TO anon;
-- GRANT SELECT ON public.funeral_homes TO anon;
-- GRANT INSERT ON public.contact_us TO anon;
-- ... 필요한 권한만 다시 부여하는 방식 (운영 환경에 따라 조절 필요)

-- 7. Audit Logging (선택 사항)
-- 중요한 테이블의 변경 이력을 남기기 위한 트리거 등을 추가할 수 있습니다.

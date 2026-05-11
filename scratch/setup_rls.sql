-- ==========================================
-- Supabase RLS (Row Level Security) 설정
-- ==========================================

-- 0. 관리자 권한 체크 함수 (선택 사항, 또는 직접 정책에 삽입)
-- 여기서는 직접 정책에 삽입하는 방식을 사용합니다.
-- 관리자 이메일 목록: 'fulmin@nate.com', 'theonsil@gmail.com', 'admin@theonsil.co.kr', 'theonsilofficial@gmail.com', 'admin@onsil.com'

-- 1. funeral_homes (장례식장 정보)
ALTER TABLE public.funeral_homes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view funeral homes" ON public.funeral_homes;
CREATE POLICY "Anyone can view funeral homes" ON public.funeral_homes FOR SELECT USING (true);
CREATE POLICY "Admins can manage funeral homes" ON public.funeral_homes 
    FOR ALL USING (auth.jwt() ->> 'email' IN ('fulmin@nate.com', 'theonsil@gmail.com', 'admin@theonsil.co.kr', 'theonsilofficial@gmail.com', 'admin@onsil.com'));

-- 2. profiles (사용자 프로필)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT 
    USING (auth.jwt() ->> 'email' IN ('fulmin@nate.com', 'theonsil@gmail.com', 'admin@theonsil.co.kr', 'theonsilofficial@gmail.com', 'admin@onsil.com'));

-- 3. reservations (장례 예약)
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own reservations" ON public.reservations;
CREATE POLICY "Users can view own reservations" ON public.reservations FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert own reservations" ON public.reservations;
CREATE POLICY "Users can insert own reservations" ON public.reservations FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own reservations" ON public.reservations;
CREATE POLICY "Users can update own reservations" ON public.reservations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all reservations" ON public.reservations 
    FOR ALL USING (auth.jwt() ->> 'email' IN ('fulmin@nate.com', 'theonsil@gmail.com', 'admin@theonsil.co.kr', 'theonsilofficial@gmail.com', 'admin@onsil.com'));

-- 4. community_posts (커뮤니티 게시글)
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view posts" ON public.community_posts;
CREATE POLICY "Anyone can view posts" ON public.community_posts FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth users can insert posts" ON public.community_posts;
CREATE POLICY "Auth users can insert posts" ON public.community_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Authors can update own posts" ON public.community_posts;
CREATE POLICY "Authors can update own posts" ON public.community_posts FOR UPDATE USING (auth.jwt() ->> 'email' = author_email);
DROP POLICY IF EXISTS "Authors can delete own posts" ON public.community_posts;
CREATE POLICY "Authors can delete own posts" ON public.community_posts FOR DELETE USING (auth.jwt() ->> 'email' = author_email);
CREATE POLICY "Admins can manage all posts" ON public.community_posts 
    FOR ALL USING (auth.jwt() ->> 'email' IN ('fulmin@nate.com', 'theonsil@gmail.com', 'admin@theonsil.co.kr', 'theonsilofficial@gmail.com', 'admin@onsil.com'));

-- 5. community_comments (커뮤니티 댓글)
ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view comments" ON public.community_comments;
CREATE POLICY "Anyone can view comments" ON public.community_comments FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth users can insert comments" ON public.community_comments;
CREATE POLICY "Auth users can insert comments" ON public.community_comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Authors can delete own comments" ON public.community_comments;
CREATE POLICY "Authors can delete own comments" ON public.community_comments FOR DELETE USING (auth.jwt() ->> 'email' = author_email);
CREATE POLICY "Admins can manage all comments" ON public.community_comments 
    FOR ALL USING (auth.jwt() ->> 'email' IN ('fulmin@nate.com', 'theonsil@gmail.com', 'admin@theonsil.co.kr', 'theonsilofficial@gmail.com', 'admin@onsil.com'));

-- 6. wishlist (찜 목록)
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage own wishlist" ON public.wishlist;
CREATE POLICY "Users can manage own wishlist" ON public.wishlist FOR ALL USING (auth.uid() = user_id);

-- 7. qol_results (삶의 질 평가 결과)
ALTER TABLE public.qol_results ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own qol_results" ON public.qol_results;
CREATE POLICY "Users can view own qol_results" ON public.qol_results FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Anyone can insert qol_results" ON public.qol_results;
CREATE POLICY "Anyone can insert qol_results" ON public.qol_results FOR INSERT WITH CHECK (true); -- 비로그인 허용

-- 8. contact_us (문의하기)
ALTER TABLE public.contact_us ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can insert contact_us" ON public.contact_us;
CREATE POLICY "Anyone can insert contact_us" ON public.contact_us FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view contact_us" ON public.contact_us FOR SELECT 
    USING (auth.jwt() ->> 'email' IN ('fulmin@nate.com', 'theonsil@gmail.com', 'admin@theonsil.co.kr', 'theonsilofficial@gmail.com', 'admin@onsil.com'));

-- 9. partnership_inquiries (제휴 제안)
ALTER TABLE public.partnership_inquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can insert partnership_inquiries" ON public.partnership_inquiries;
CREATE POLICY "Anyone can insert partnership_inquiries" ON public.partnership_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view partnership_inquiries" ON public.partnership_inquiries FOR SELECT 
    USING (auth.jwt() ->> 'email' IN ('fulmin@nate.com', 'theonsil@gmail.com', 'admin@theonsil.co.kr', 'theonsilofficial@gmail.com', 'admin@onsil.com'));

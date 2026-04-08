
/**
 * Supabase Authentication Logic
 */

const SUPABASE_URL = 'https://fkmcanwlcigofjhbfkzs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9OyB7n3foIalMmDxq1-_PA_s3xYfcJS';

// Initialize Supabase Client
let _supabaseInstance = null;

console.log('Auth.js loading...');

function getSupabase() {
    if (_supabaseInstance) return _supabaseInstance;

    // Check window.supabase (standard for UMD builds)
    if (window.supabase && window.supabase.createClient) {
        console.log('Supabase SDK detected on window.supabase');
        _supabaseInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        return _supabaseInstance;
    }

    // Fallback: check if 'supabase' is available globally but not on window
    if (typeof supabase !== 'undefined' && supabase.createClient) {
        console.log('Supabase SDK detected on global scope');
        _supabaseInstance = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        return _supabaseInstance;
    }

    console.error('Supabase SDK not loaded. Please check if the CDN script is included correctly.');
    return null;
}


const Auth = {
    /**
     * Sync Auth Metadata to public.profiles table
     */
    syncProfile: async (user) => {
        try {
            const client = getSupabase();
            if (!client || !user) return;

            const metadata = user.user_metadata || {};
            const profileData = {
                id: user.id,
                email: user.email,
                name: metadata.name || user.email.split('@')[0],
                role: metadata.role || 'member', // 권한 명시적 저장
                facility: metadata.facility || null, // 업체명 명시적 저장
                phone: metadata.phone || null,
                updated_at: new Date().toISOString()
            };

            console.log('Syncing profile for:', user.id);
            const { error } = await client
                .from('profiles')
                .upsert(profileData, { onConflict: 'id' });

            if (error) {
                console.warn('Profile sync failed (Table might be missing):', error.message);
            } else {
                console.log('Profile synced successfully');
            }
        } catch (error) {
            console.error('syncProfile error:', error);
        }
    },

    /**
     * Signup a new user
     */
    signup: async (email, password, name, gender, birthYear, phone) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('시스템 오류: 서버 연결에 실패했습니다. (SDK 로드 실패)');

            const { data, error } = await client.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        name: name,
                        gender: gender,
                        birth_year: String(birthYear), // 서버 트리거가 읽을 필드
                        phone: phone,
                        role: 'member' // 기본 권한
                    }
                }
            });

            if (error) throw error;

            // Trigger sync as fallback (mostly handled by DB trigger now)
            if (data.user) {
                await Auth.syncProfile(data.user);
            }

            return { success: true, message: '회원가입 요청이 완료되었습니다.' };
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, message: error.message || '회원가입 실패' };
        }
    },

    /**
     * Signup a new partner (Pending Approval)
     */
    signupPartner: async (email, password, name, facility, phone) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('시스템 오류: 서버 연결에 실패했습니다.');

            const { data, error } = await client.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        name: name,
                        facility: facility,
                        phone: phone,
                        role: 'pending_partner' // 승인 대기 권한
                    }
                }
            });

            if (error) throw error;

            if (data.user) {
                await Auth.syncProfile(data.user);
            }

            return { success: true, message: '입점 신청이 완료되었습니다. 관리자 승인 후 이용 가능합니다.' };
        } catch (error) {
            console.error('signupPartner error:', error);
            return { success: false, message: error.message };
        }
    },

    /**
     * Login a user
     */
    login: async (email, password) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('시스템 오류: 서버 연결에 실패했습니다.');

            const { data, error } = await client.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

            if (data.user) {
                await Auth.syncProfile(data.user);
            }

            return { success: true, message: '로그인되었습니다.' };
        } catch (error) {
            console.error('Login error:', error);
            let msg = error.message;
            if (msg === 'Invalid login credentials') msg = '이메일 또는 비밀번호가 올바르지 않습니다.';
            return { success: false, message: msg };
        }
    },

    /**
     * Update Profile (Metadata + Table)
     */
    updateProfile: async (updates) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('서버 연결 실패');

            const { password, ...metadata } = updates;

            // 1. Update Auth Metadata (and Password if provided)
            const updatePayload = { data: metadata };
            if (password) updatePayload.password = password;

            const { data: authData, error: authError } = await client.auth.updateUser(updatePayload);
            if (authError) throw authError;

            // 2. Update profiles table (Exclude password from public table)
            const { error: dbError } = await client
                .from('profiles')
                .update({
                    ...metadata,
                    updated_at: new Date().toISOString()
                })
                .eq('id', authData.user.id);

            if (dbError) throw dbError;

            return { success: true, message: '정보가 수정되었습니다.' };
        } catch (error) {
            console.error('updateProfile error:', error);
            return { success: false, message: error.message };
        }
    },

    /**
     * Withdraw/Delete Account (Permanent Deletion via RPC)
     */
    withdrawAccount: async () => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('서버 연결 실패');

            const user = await Auth.getCurrentUser();
            if (!user) throw new Error('로그인 정보가 없습니다.');

            // 1. Delete associated data first
            await client.from('profiles').delete().eq('id', user.id);
            await client.from('reservations').delete().eq('user_id', user.id);

            // 2. Call RPC to delete the actual Auth user record
            // IMPORTANT: SQL function 'delete_own_user' must be created in Supabase first.
            const { error: rpcError } = await client.rpc('delete_own_user');
            
            if (rpcError) {
                console.error('RPC Error:', rpcError);
                // If RPC fails (e.g. not created), fallback to signout
                await client.auth.signOut();
                throw new Error('완전 삭제 실패: 서버 함수가 설정되지 않았습니다. 관리자에게 문의하세요.');
            }

            // 3. Clear session and sign out
            await client.auth.signOut();
            
            return { success: true, message: '회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.' };
        } catch (error) {
            console.error('withdrawAccount error:', error);
            return { success: false, message: error.message };
        }
    },

    /**
     * Logout
     */
    logout: async () => {
        try {
            const client = getSupabase();
            if (!client) return;

            const { error } = await client.auth.signOut();
            if (error) throw error;
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout error:', error);
        }
    },

    /**
     * Get Current Session User
     */
    getCurrentUser: async () => {
        const client = getSupabase();
        if (!client) return null;

        const { data: { session } } = await client.auth.getSession();
        if (session && session.user) {
            const metadata = session.user.user_metadata || {};
            // Role detection: Metadata role or hardcoded Admin List
            const adminEmails = ['theonsil@gmail.com', 'admin@theonsil.co.kr']; // Example admins
            const isSystemAdmin = adminEmails.includes(session.user.email) || metadata.role === 'admin';
            const isPartner = metadata.role === 'partner';

            return {
                id: session.user.id,
                email: session.user.email,
                name: metadata.name || session.user.email.split('@')[0],
                phone: metadata.phone || '',
                gender: metadata.gender || '',
                birth_year: metadata.birth_year || '',
                role: isSystemAdmin ? 'admin' : (isPartner ? 'partner' : (metadata.role === 'pending_partner' ? 'pending_partner' : 'member')),
                facility: metadata.facility || null
            };
        }
        return null;
    },

    /**
     * Update Header UI based on Auth State
     */
    updateHeaderUI: async () => {
        const authContainer = document.getElementById('auth-container');
        if (!authContainer) return;

        const user = await Auth.getCurrentUser();

        if (user) {
            const isAdmin = user.role === 'admin';
            const roleBadge = isAdmin ? '<span class="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-full ml-1 font-black">ADMIN</span>' : '';
            
            authContainer.innerHTML = `
                <div class="flex items-center gap-2">
                    <div class="relative group">
                        <button class="flex items-center gap-2 text-brand font-bold hover:text-brand-warm transition-colors py-2">
                            <div class="w-8 h-8 rounded-full bg-brand-sage/10 flex items-center justify-center text-brand-sage text-xs">
                                 <i class="fas fa-user-circle text-lg"></i>
                            </div>
                            <span class="hidden sm:inline">${user.name}님${roleBadge}</span>
                            <i class="fas fa-chevron-down text-[10px] opacity-50"></i>
                        </button>
                        <div class="absolute right-0 top-full pt-2 hidden group-hover:block w-52 z-50">
                            <div class="bg-white rounded-2xl shadow-xl border border-brand/5 p-2 flex flex-col gap-1 overflow-hidden">
                                <!-- 공통 메뉴 -->
                                <a href="mypage.html" class="w-full text-left px-4 py-2.5 hover:bg-brand-mist/30 rounded-xl text-brand text-sm font-medium transition-all flex items-center gap-3">
                                    <i class="fas fa-id-card text-brand-warm/80"></i> 마이페이지
                                </a>
                                <a href="mypage.html?tab=profile" class="w-full text-left px-4 py-2.5 hover:bg-brand-mist/30 rounded-xl text-brand text-sm font-medium transition-all flex items-center gap-3">
                                    <i class="fas fa-user-edit text-brand-sage/80"></i> 회원 정보 수정
                                </a>
                                
                                <!-- 관리자 전용 메뉴 -->
                                ${isAdmin ? `
                                    <div class="border-t border-brand/5 my-1"></div>
                                    <a href="admin_reservations.html" class="w-full text-left px-4 py-2.5 bg-red-50 hover:bg-red-100 rounded-xl text-red-600 text-sm font-bold transition-all flex items-center gap-3">
                                        <i class="fas fa-tasks"></i> 예약 현황 관리
                                    </a>
                                    <a href="admin_partners.html" class="w-full text-left px-4 py-2.5 bg-partner/5 hover:bg-partner/10 rounded-xl text-partner text-sm font-bold transition-all flex items-center gap-3">
                                        <i class="fas fa-user-check"></i> 업체 승인 관리
                                    </a>
                                ` : ''}

                                <div class="border-t border-brand/5 my-1"></div>
                                <button onclick="Auth.logout()" class="w-full text-left px-4 py-2.5 hover:bg-red-50 rounded-xl text-red-500 text-sm font-bold transition-all flex items-center gap-3">
                                    <i class="fas fa-sign-out-alt"></i> 로그아웃
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // 모바일 메뉴 처리 (mobile-nav 내부 내비게이션 업데이트용 로직이 필요할 수 있음)
            const mobileNav = document.querySelector('#mobile-nav nav');
            if (mobileNav && !document.getElementById('mobile-mypage-link')) {
                 const mpLink = document.createElement('a');
                 mpLink.id = 'mobile-mypage-link';
                 mpLink.href = 'mypage.html';
                 mpLink.className = 'flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-brand-cream transition-colors text-brand/70 hover:text-brand font-medium';
                 mpLink.innerHTML = '<i class="fas fa-id-card w-5 text-center text-brand-warm"></i><span>마이페이지</span>';
                 mobileNav.prepend(mpLink);
            }

        } else {
            authContainer.innerHTML = `
                <div class="flex items-center gap-1">
                    <a href="login.html" class="text-sm font-bold text-brand hover:text-brand-warm px-4 py-2 hover:bg-brand-mist/30 rounded-lg transition-all">
                        로그인
                    </a>
                    <a href="signup.html" class="bg-brand text-white hover:bg-brand-light px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95">
                        회원가입
                    </a>
                </div>
            `;
            // 로그아웃 시 모바일 링크 제거
            const mpLink = document.getElementById('mobile-mypage-link');
            if (mpLink) mpLink.remove();
        }
    },

    /**
     * Get Pending Partners List (Admin Only)
     */
    getPendingPartners: async () => {
        try {
            const client = getSupabase();
            if (!client) return [];

            const { data, error } = await client
                .from('profiles')
                .select('*')
                .eq('role', 'pending_partner')
                .order('updated_at', { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('getPendingPartners error:', error);
            return [];
        }
    },

    /**
     * Approve Partner via RPC (Admin Only)
     */
    approvePartner: async (userId) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('서버 연결 실패');

            const { error } = await client.rpc('approve_partner_request', { target_user_id: userId });
            if (error) throw error;

            return { success: true, message: '승인이 완료되었습니다.' };
        } catch (error) {
            console.error('approvePartner error:', error);
            return { success: false, message: error.message };
        }
    },

    /**
     * Get Supabase Client (Helper)
     */
    getSupabase: () => {
        return getSupabase();
    }
};

// Make Auth globally available
window.Auth = Auth;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    Auth.updateHeaderUI();

    // Check for session in case SDK didn't trigger immediately
    setTimeout(async () => {
        const client = getSupabase();
        if (client) {
            const { data: { user } } = await client.auth.getUser();
            if (user) {
                // Background sync
                Auth.syncProfile(user);
            }

            client.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
                    if (session?.user) Auth.syncProfile(session.user);
                    Auth.updateHeaderUI();
                } else if (event === 'SIGNED_OUT') {
                    Auth.updateHeaderUI();
                }
            });
        }
    }, 1000);
});

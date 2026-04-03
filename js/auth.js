
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
                gender: metadata.gender || null,
                birth_year: metadata.birth_year || null,
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
                        birth_year: birthYear,
                        phone: phone
                    }
                }
            });

            if (error) throw error;

            // Trigger sync if user created (though session might not be present yet)
            if (data.user) {
                await Auth.syncProfile(data.user);
            }

            return { success: true, message: '회원가입이 완료되었습니다. 로그인해주세요.' };
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, message: error.message || '회원가입 실패' };
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
     * Withdraw/Delete Account (Simulated)
     */
    withdrawAccount: async () => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('서버 연결 실패');

            const user = await Auth.getCurrentUser();
            if (!user) throw new Error('로그인 정보가 없습니다.');

            // Delete from profiles table first
            await client.from('profiles').delete().eq('id', user.id);
            
            // Delete reservations (optional but good for cleanup)
            await client.from('reservations').delete().eq('user_id', user.id);

            // Supabase client can't delete auth user.
            // We just sign out and inform user or use a specific RPC if available.
            await client.auth.signOut();
            
            return { success: true, message: '회원 탈퇴 요청이 처리되었습니다. 이용해 주셔서 감사합니다.' };
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

            return {
                id: session.user.id,
                email: session.user.email,
                name: metadata.name || session.user.email.split('@')[0],
                phone: metadata.phone || '',
                gender: metadata.gender || '',
                birth_year: metadata.birth_year || '',
                role: isSystemAdmin ? 'admin' : 'member'
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
                                        <i class="fas fa-tasks"></i> 관리자 대시보드
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

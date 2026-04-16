
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
                role: metadata.role || 'member',
                facility: metadata.facility || null,
                phone: metadata.phone || null,
                location: metadata.location || null,
                gender: metadata.gender || null,
                birth_year: metadata.birth_year || null,
                marketing_agree: metadata.marketing_agree === true
                // updated_at 제외
            };

            console.log('Syncing profile for:', user.id);
            const { error } = await client
                .from('profiles')
                .upsert(profileData, { onConflict: 'id' });

            if (error) {
                console.warn('Profile sync failed:', error.message);
                alert('[시스템 오류 진단] 프로필 테이블에 데이터를 복사할 수 없습니다!\n\n원인: ' + error.message + '\n디테일: ' + (error.details || '없음'));
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
    signup: async (email, password, name, gender, birthYear, phone, location, marketingAgree = false) => {
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
                        location: location, // 지역 정보 추가
                        marketing_agree: marketingAgree, // 마케팅 수신 동의 추가
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
    signupPartner: async (email, password, name, facility, phone, marketingAgree = false) => {
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
                        marketing_agree: marketingAgree, // 마케팅 수신 동의 추가
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
                    ...metadata
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
            const adminEmails = ['theonsil@gmail.com', 'admin@theonsil.co.kr', 'theonsilofficial@gmail.com']; // Example admins
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

            // 모바일 메뉴 처리
            const mobileNav = document.querySelector('#mobile-nav nav');
            if (mobileNav) {
                // 기존 모바일 인증 관련 요소 제거
                const existingAuth = document.getElementById('mobile-auth-section');
                if (existingAuth) existingAuth.remove();

                const authSection = document.createElement('div');
                authSection.id = 'mobile-auth-section';
                authSection.className = 'mb-6 pb-6 border-b border-brand/5';
                
                if (user) {
                    authSection.innerHTML = `
                        <div class="flex items-center gap-3 px-2 mb-4">
                            <div class="w-10 h-10 rounded-full bg-brand-sage/10 flex items-center justify-center text-brand-sage">
                                <i class="fas fa-user-circle text-xl"></i>
                            </div>
                            <div>
                                <p class="text-sm font-bold text-brand">${user.name}님 반가워요!</p>
                                <p class="text-[10px] text-brand/40">${user.email}</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <a href="mypage.html" class="flex items-center justify-center gap-2 py-2.5 bg-brand-cream rounded-xl text-xs font-bold text-brand">
                                <i class="fas fa-id-card text-brand-warm"></i> 마이페이지
                            </a>
                            <button onclick="Auth.logout()" class="flex items-center justify-center gap-2 py-2.5 bg-red-50 rounded-xl text-xs font-bold text-red-500">
                                <i class="fas fa-sign-out-alt"></i> 로그아웃
                            </button>
                        </div>
                    `;
                } else {
                    authSection.innerHTML = `
                        <div class="grid grid-cols-2 gap-2">
                            <a href="login.html" class="flex items-center justify-center gap-2 py-3 bg-brand-cream rounded-xl text-sm font-bold text-brand">
                                <i class="fas fa-sign-in-alt text-brand-warm"></i> 로그인
                            </a>
                            <a href="signup.html" class="flex items-center justify-center gap-2 py-3 bg-brand text-white rounded-xl text-sm font-bold shadow-md">
                                <i class="fas fa-user-plus"></i> 회원가입
                            </a>
                        </div>
                    `;
                }
                mobileNav.prepend(authSection);
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
            
            // 로그아웃 상태의 모바일 메뉴 처리
            const mobileNav = document.querySelector('#mobile-nav nav');
            if (mobileNav) {
                const existingAuth = document.getElementById('mobile-auth-section');
                if (existingAuth) existingAuth.remove();

                const authSection = document.createElement('div');
                authSection.id = 'mobile-auth-section';
                authSection.className = 'mb-6 pb-6 border-b border-brand/5';
                authSection.innerHTML = `
                    <div class="grid grid-cols-2 gap-2">
                        <a href="login.html" class="flex items-center justify-center gap-2 py-3 bg-brand-cream rounded-xl text-sm font-bold text-brand">
                            <i class="fas fa-sign-in-alt text-brand-warm"></i> 로그인
                        </a>
                        <a href="signup.html" class="flex items-center justify-center gap-2 py-3 bg-brand text-white rounded-xl text-sm font-bold shadow-md">
                            <i class="fas fa-user-plus"></i> 회원가입
                        </a>
                    </div>
                `;
                mobileNav.prepend(authSection);
            }
        }
    },

    /**
     * Get Pending Partners List (Admin Only)
     */
    /**
     * Get Pending Partners List (Admin Only) - Using Secure RPC
     */
    getPendingPartners: async () => {
        try {
            const client = getSupabase();
            if (!client) return [];

            // profiles 테이블 대신 auth.users를 직접 조회하는 RPC 호출
            const { data, error } = await client.rpc('get_pending_partners_list');

            if (error) throw error;
            return data || [];
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
     * Find Email by Name and Phone
     */
    findEmailByNameAndPhone: async (name, phone) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('서버 연결 실패');
            const { data, error } = await client
                .from('profiles')
                .select('email')
                .eq('name', name)
                .eq('phone', phone)
                .limit(1);
            if (error) throw error;
            if (!data || data.length === 0) throw new Error('일치하는 회원 정보가 없습니다.');
            
            let email = data[0].email;
            let parts = email.split('@');
            if (parts.length === 2 && parts[0].length >= 3) {
                let maskString = '*'.repeat(parts[0].length - 3);
                email = parts[0].substring(0, 3) + maskString + '@' + parts[1];
            } else if (parts.length === 2) {
                email = parts[0].substring(0, 1) + '***@' + parts[1];
            }
            return { success: true, email: email };
        } catch (error) {
            console.error('findEmail error:', error);
            return { success: false, message: error.message };
        }
    },

    /**
     * Send Password Reset Email
     */
    sendPasswordResetEmail: async (email) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('서버 연결 실패');
            const { error } = await client.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/reset-password.html'
            });
            if (error) throw error;
            return { success: true, message: '비밀번호 재설정 링크가 발송되었습니다. 이메일을 확인해 주세요.' };
        } catch (error) {
            console.error('resetPassword error:', error);
            let msg = error.message;
            if (msg.includes('not found') || msg.includes('User not found')) msg = '가입되지 않은 이메일입니다.';
            return { success: false, message: msg };
        }
    },

    /**
     * Update Password after Reset link clicked
     */
    updateNewPassword: async (newPassword) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('서버 연결 실패');
            const { error } = await client.auth.updateUser({ password: newPassword });
            if (error) throw error;
            return { success: true, message: '비밀번호가 성공적으로 변경되었습니다.' };
        } catch (error) {
            console.error('updateNewPassword error:', error);
            return { success: false, message: '링크가 만료되었거나 올바르지 않습니다.' };
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

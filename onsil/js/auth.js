
/**
 * Supabase Authentication Logic
 */

const SUPABASE_URL = 'https://fkmcanwlcigofjhbfkzs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9OyB7n3foIalMmDxq1-_PA_s3xYfcJS';

// PortOne Configuration (Danal Identity Verification V2)
const PORTONE_STORE_ID = "store-da73189c-c561-4ce0-8354-3de92abc40b9";
const PORTONE_CHANNEL_KEY = "channel-key-c871e7bc-cc63-4daf-a74f-2b8b80a9d29c";

// Initialize Supabase Client
let _supabaseInstance = null;

console.log('Auth.js loading...');

function getSupabase() {
    if (_supabaseInstance) return _supabaseInstance;

    if (typeof supabase === 'undefined') {
        console.error('Supabase SDK not loaded');
        return null;
    }

    _supabaseInstance = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    return _supabaseInstance;
}

const Auth = {
    PORTONE_STORE_ID: PORTONE_STORE_ID,
    PORTONE_CHANNEL_KEY: PORTONE_CHANNEL_KEY,

    /**
     * Signup a new user and create a profile
     */
    signup: async (email, password, name, gender, birthYear, phone, location, marketingAgree) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('인증 서비스 연결 실패');

            // 1. Sign up user via Supabase Auth
            const { data: authData, error: authError } = await client.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                        display_name: name,
                        phone: phone,
                    }
                }
            });

            if (authError) throw authError;
            if (!authData.user) throw new Error('회원가입 중 오류가 발생했습니다.');

            // 2. Insert profile metadata into 'profiles' table
            const { error: profileError } = await client
                .from('profiles')
                .upsert({
                    id: authData.user.id,
                    email: email,
                    name: name,
                    phone: phone,
                    gender: gender,
                    birth_year: birthYear,
                    location: location,
                    marketing_agree: marketingAgree,
                    updated_at: new Date()
                });

            if (profileError) {
                console.error('Profile creation error:', profileError);
                // Note: Auth user exists even if profile fails, but we want to know
            }

            return { success: true, user: authData.user };
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, message: error.message };
        }
    },

    /**
     * Login existing user
     */
    login: async (email, password) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('인증 서비스 연결 실패');

            const { data, error } = await client.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;
            return { success: true, user: data.user };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: error.message };
        }
    },

    /**
     * Logout current user
     */
    logout: async () => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('인증 서비스 연결 실패');

            const { error } = await client.auth.signOut();
            if (error) throw error;
            
            location.href = 'index.html';
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, message: error.message };
        }
    },

    /**
     * Get current logged-in user and profile
     */
    getCurrentUser: async () => {
        try {
            const client = getSupabase();
            if (!client) return null;

            const { data: { user } } = await client.auth.getUser();
            if (!user) return null;

            // Fetch extra profile data
            const { data: profile } = await client
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            return { ...user, ...profile };
        } catch (error) {
            return null;
        }
    },

    /**
     * Sync user profile to Supabase 'profiles' table
     */
    syncProfile: async (user) => {
        if (!user) return;
        try {
            const client = getSupabase();
            if (!client) return;

            const { error } = await client
                .from('profiles')
                .upsert({
                    id: user.id,
                    email: user.email,
                    name: user.user_metadata?.full_name || user.user_metadata?.name || '',
                    phone: user.user_metadata?.phone || '',
                    updated_at: new Date()
                }, { onConflict: 'id' });

            if (error) console.error('Profile sync error:', error);
        } catch (err) {
            console.error('syncProfile error:', err);
        }
    },

    /**
     * Update Header UI based on Auth state
     */
    updateHeaderUI: async () => {
        const user = await Auth.getCurrentUser();
        const authContainer = document.getElementById('auth-container');
        if (!authContainer) return;

        if (user) {
            const displayName = user.name || user.user_metadata?.full_name || user.email.split('@')[0];
            authContainer.innerHTML = `
                <div class="relative group">
                    <button class="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-all font-medium text-gray-700">
                        <i class="fas fa-user-circle text-lg text-[#1B2B48]"></i>
                        <span><span class="font-bold text-[#1B2B48]">${displayName}</span>님</span>
                        <i class="fas fa-chevron-down text-[10px] ml-1 opacity-50"></i>
                    </button>
                    <div class="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-50">
                        <div class="p-2 space-y-1">
                            <a href="mypage.html" class="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                                <i class="fas fa-id-card w-4"></i> 마이페이지
                            </a>
                            <button onclick="Auth.logout()" class="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors border-t border-gray-50 mt-1">
                                <i class="fas fa-sign-out-alt w-4"></i> 로그아웃
                            </button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            authContainer.innerHTML = `
                <div class="flex items-center gap-3">
                    <a href="login.html" class="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-[#1B2B48] transition-colors">로그인</a>
                    <a href="signup.html" class="px-6 py-2.5 bg-[#1B2B48] text-white rounded-full text-sm font-bold hover:bg-[#2a4269] shadow-md hover:shadow-lg transition-all">회원가입</a>
                </div>
            `;
        }
    },

    /**
     * Send Password Reset Email
     */
    sendPasswordReset: async (email) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('인증 서비스 연결 실패');

            const { error } = await client.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/reset-password.html'
            });

            if (error) throw error;
            return { success: true, message: '이메일로 비밀번호 재설정 링크가 발송되었습니다.' };
        } catch (error) {
            console.error('sendPasswordReset error:', error);
            return { success: false, message: error.message };
        }
    },

    /**
     * Update Password
     */
    updateNewPassword: async (newPassword) => {
        try {
            const client = getSupabase();
            if (!client) throw new Error('인증 서비스 연결 실패');

            const { error } = await client.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;
            return { success: true, message: '비밀번호가 성공적으로 변경되었습니다.' };
        } catch (error) {
            console.error('updateNewPassword error:', error);
            return { success: false, message: '링크가 만료되었거나 올바르지 않습니다.' };
        }
    },

    /**
     * Request PortOne Identity Verification (V2)
     */
    requestIdentityVerification: async (customerData = {}) => {
        try {
            if (typeof PortOne === 'undefined') {
                throw new Error('PortOne SDK가 로드되지 않았습니다.');
            }

            // Fallback for crypto.randomUUID()
            const getUUID = () => {
                if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            };

            const verificationId = `cert-${getUUID()}`;
            const response = await PortOne.requestIdentityVerification({
                storeId: PORTONE_STORE_ID,
                channelKey: PORTONE_CHANNEL_KEY,
                identityVerificationId: verificationId,
                customer: customerData
            });

            if (response.code !== undefined) {
                // Verification failed or canceled
                throw new Error(response.message || '본인인증을 취소하셨거나 실패했습니다.');
            }

            return { 
                success: true, 
                verificationId: response.identityVerificationId || verificationId,
                txId: response.txId
            };
        } catch (error) {
            console.error('Identity Verification Error:', error);
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

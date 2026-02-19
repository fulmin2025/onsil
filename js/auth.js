
/**
 * Simple Client-Side Authentication using localStorage
 */

const Auth = {
    // Keys for localStorage
    USERS_KEY: 'onsil_users',
    CURRENT_USER_KEY: 'onsil_current_user',

    /**
     * Register a new user
     * @param {string} email 
     * @param {string} password 
     * @param {string} name 
     * @returns {object} { success: boolean, message: string }
     */
    signup: (email, password, name) => {
        const users = JSON.parse(localStorage.getItem(Auth.USERS_KEY) || '[]');

        if (users.find(u => u.email === email)) {
            return { success: false, message: '이미 가입된 이메일입니다.' };
        }

        const newUser = { email, password, name };
        users.push(newUser);
        localStorage.setItem(Auth.USERS_KEY, JSON.stringify(users));

        return { success: true, message: '회원가입이 완료되었습니다.' };
    },

    /**
     * Login a user
     * @param {string} email 
     * @param {string} password 
     * @returns {object} { success: boolean, message: string }
     */
    login: (email, password) => {
        const users = JSON.parse(localStorage.getItem(Auth.USERS_KEY) || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Store only necessary info in session
            const sessionUser = { email: user.email, name: user.name };
            localStorage.setItem(Auth.CURRENT_USER_KEY, JSON.stringify(sessionUser));
            Auth.updateHeaderUI();
            return { success: true, message: '로그인되었습니다.' };
        }

        return { success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' };
    },

    /**
     * Logout the current user
     */
    logout: () => {
        localStorage.removeItem(Auth.CURRENT_USER_KEY);
        Auth.updateHeaderUI();
        window.location.href = 'index.html';
    },

    /**
     * Get current logged-in user
     * @returns {object|null}
     */
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem(Auth.CURRENT_USER_KEY));
    },

    /**
     * Update Header UI based on auth state
     * Expects a container with id="auth-container" in the header
     */
    updateHeaderUI: () => {
        const authContainer = document.getElementById('auth-container');
        if (!authContainer) return;

        const user = Auth.getCurrentUser();

        if (user) {
            authContainer.innerHTML = `
                <span class="text-sm font-medium text-gray-600 mr-2">${user.name}님</span>
                <button onclick="Auth.logout()" class="text-sm font-medium text-gray-500 hover:text-[#1B2B48]">로그아웃</button>
            `;
        } else {
            authContainer.innerHTML = `
                <a href="login.html" class="text-sm font-medium text-gray-600 hover:text-[#1B2B48]">로그인</a>
                <span class="text-gray-300 mx-2">|</span>
                <a href="signup.html" class="text-sm font-medium text-gray-600 hover:text-[#1B2B48]">회원가입</a>
            `;
        }
    }
};

// Initialize UI on load
document.addEventListener('DOMContentLoaded', () => {
    Auth.updateHeaderUI();
});

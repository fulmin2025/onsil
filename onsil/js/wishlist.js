/**
 * Wishlist Logic for Supabase
 */

const Wishlist = {
    /**
     * 특정 시설이 찜 되어있는지 확인
     */
    isFavorited: async (facilityName) => {
        try {
            const client = window.Auth.getSupabase();
            if (!client) return false;

            const user = await window.Auth.getCurrentUser();
            if (!user) return false;

            const { data, error } = await client
                .from('wishlist')
                .select('id')
                .eq('user_id', user.id)
                .eq('facility_name', facilityName);

            if (error) throw error;
            return data && data.length > 0;
        } catch (error) {
            console.error('isFavorited error:', error);
            return false;
        }
    },

    /**
     * 찜 토글 (추가/삭제)
     */
    toggle: async (facilityName) => {
        try {
            console.log(`Wishlist: Toggling ${facilityName}...`);
            const client = window.Auth.getSupabase();
            if (!client) throw new Error('서버 연결 실패');

            const user = await window.Auth.getCurrentUser();
            if (!user) {
                alert('찜 기능은 로그인 후 이용 가능합니다.');
                window.location.href = 'login.html';
                return { success: false, action: 'login_required' };
            }

            const favorited = await Wishlist.isFavorited(facilityName);
            console.log(`Wishlist: Currently favorited? ${favorited}`);

            if (favorited) {
                // 삭제
                const { error } = await client
                    .from('wishlist')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('facility_name', facilityName);

                if (error) throw error;
                console.log(`Wishlist: Removed ${facilityName}`);
                return { action: 'removed', success: true };
            } else {
                // 추가
                const { error } = await client
                    .from('wishlist')
                    .insert({
                        user_id: user.id,
                        facility_name: facilityName
                    });

                if (error) throw error;
                console.log(`Wishlist: Added ${facilityName}`);
                return { action: 'added', success: true };
            }
        } catch (error) {
            console.error('Wishlist toggle error:', error);
            alert('찜하기 처리 중 오류가 발생했습니다: ' + error.message);
            return { success: false, message: error.message };
        }
    },

    /**
     * 사용자의 모든 찜 목록 가져오기
     */
    getAll: async () => {
        try {
            const client = window.Auth.getSupabase();
            if (!client) return [];

            const user = await window.Auth.getCurrentUser();
            if (!user) return [];

            const { data, error } = await client
                .from('wishlist')
                .select('facility_name')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data.map(item => item.facility_name);
        } catch (error) {
            console.error('Wishlist getAll error:', error);
            return [];
        }
    }
};

window.Wishlist = Wishlist;

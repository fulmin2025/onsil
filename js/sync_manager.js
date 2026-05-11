
/**
 * Sync Manager for Funeral Home Data
 * Merges local static data and syncs it with Supabase
 */

const LOCAL_MASTER_DATA = [
    { name: "스냅플러그", region: "경기 부천", latitude: 37.518174, longitude: 126.779774, is_alliance: true, phone: "1551-5051", address: "부천시 도당동 121-2", prices: [{"category":"스냅플러그 장례 비용","items":[{"name":"기본 장례","price":"200,000원","desc":"개별 화장, 추모실 이용 등 포함"}]}] },
    { name: "펫포레스트 남양주점", region: "경기 남양주", latitude: 37.619511, longitude: 127.276363, is_alliance: true, phone: "0507-1308-3240", address: "경기 남양주시 일패동 산72-1" },
    { name: "21그램 경기광주점", region: "경기 광주", latitude: 37.349329, longitude: 127.264295, is_alliance: false, phone: "1544-2102", address: "경기 광주시 오포읍 매산리 613-1" },
    { name: "어게인", region: "인천 서구", latitude: 37.5960, longitude: 126.6575, is_alliance: false, phone: "1551-5052", address: "인천 서구 설원로 79" },
    { name: "씨엘로펫", region: "경기 용인", latitude: 37.170072, longitude: 127.374925, is_alliance: false, phone: "1551-5052", address: "경기 용인시 처인구 백암면 죽양대로 1206" },
    { name: "굿바이펫", region: "충북 제천", latitude: 37.106320, longitude: 128.272491, is_alliance: true, phone: "0507-1423-8215", address: "충북 제천시 봉양읍 제천북로 499" }
];

const SyncManager = {
    /**
     * Check for missing funeral homes and suggest syncing
     */
    getMissingHomes: async () => {
        try {
            console.log('[SyncManager] Fetching DB homes...');
            const dbHomes = await Auth.getAllFuneralHomes();
            console.log(`[SyncManager] Found ${dbHomes ? dbHomes.length : 0} homes in DB`);
            
            if (!Array.isArray(dbHomes)) {
                console.error('[SyncManager] dbHomes is not an array:', dbHomes);
                return [];
            }

            const dbNames = new Set(dbHomes.map(h => h.name));
            const missing = LOCAL_MASTER_DATA.filter(h => !dbNames.has(h.name));
            
            console.log(`[SyncManager] Missing homes: ${missing.length}`, missing);
            return missing;
        } catch (err) {
            console.error('[SyncManager] getMissingHomes Error:', err);
            return [];
        }
    },

    /**
     * Sync a single home to Supabase
     */
    syncHome: async (home) => {
        try {
            console.log(`[SyncManager] Syncing home: ${home.name}`);
            const res = await Auth.createFuneralHome(home);
            if (res.success) {
                console.log(`[SyncManager] Successfully synced: ${home.name}`);
            } else {
                console.error(`[SyncManager] Failed to sync ${home.name}:`, res.message);
            }
            return res;
        } catch (err) {
            console.error(`[SyncManager] syncHome Crash: ${home.name}`, err);
            return { success: false, message: err.message };
        }
    },

    /**
     * Bulk sync all missing homes
     */
    syncAllMissing: async () => {
        console.log('[SyncManager] Starting bulk sync...');
        const missing = await SyncManager.getMissingHomes();
        const results = { success: [], failed: [] };
        
        if (missing.length === 0) {
            console.log('[SyncManager] Nothing to sync.');
            return results;
        }

        for (const home of missing) {
            const res = await SyncManager.syncHome(home);
            if (res.success) {
                results.success.push(home.name);
            } else {
                results.failed.push({ name: home.name, error: res.message });
            }
        }
        
        return results;
    }
};

window.SyncManager = SyncManager;

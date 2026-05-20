const FOUR_PAWS_PRICES = [
            {
                category: "일반 동물 장례 패키지 (10kg 이하 기준)",
                items: [
                    { name: "기본 화장", price: "250,000원", desc: "염습, 단독추모, 개별화장, 임시유골함, 추모키트", longDesc: "염습, 단독 추모, 개별 화장 및 수/분골, 임시 유골함 제공. (추모키트: 장례 증명서, 사진 인화, 발도장, 인연의 실, 안내서)" },
                    { name: "관 장례 패키지", price: "550,000원", desc: "기본화장 + 오동나무 관 + 고급수의 + 꽃다발", longDesc: "기본 화장 + 오동나무 관 + 인견 수의/수의보 + 기본 유골함 + 작은 꽃다발", imageUrl: "./images/p_item01.webp" },
                    { name: "요람 장례 패키지", price: "600,000원", desc: "기본화장 + 요람관 + 고급수의 + 목화솜 이불", longDesc: "기본 화장 + 요람관 + 인견 수의 + 목화솜 이불 + 기본 유골함 + 작은 꽃다발", imageUrl: "./images/p_item02.webp" },
                    { name: "자연닮음 장례 패키지", price: "600,000원", desc: "기본화장 + 자연닮음 관/수의 + 한지 수목함", longDesc: "기본 화장 + 자연닮음 관 + 자연닮음 수의/수의보 + 한지 수목함 + 작은 꽃다발", imageUrl: "./images/p_item04.webp" },
                    { name: "ALL IN ONE 패키지", price: "1,360,000원", desc: "최고급관 + 블리스 스톤 전량 + 다담 스톤함", longDesc: "기본 화장 + 오동나무 관 + 면 수의/수의보 + 블리스 스톤(전량) + 호두나무 다담 스톤함 + 작은 꽃다발", imageUrl: "./images/p_item03.webp" }
                ]
            },
            {
                category: "소동물 장례 패키지 (1kg 이하 기준)",
                items: [
                    { name: "소동물 기본 화장", price: "200,000원", desc: "염습 시 특수 칫솔 사용 등 일반 기본 화장과 동일", longDesc: "일반 동물 기본 화장 서비스 구성 100% 동일" },
                    { name: "소동물 관 장례 패키지", price: "350,000원", desc: "기본화장 + 오동나무 관 + 소동물 수의보", longDesc: "기본 화장 + 오동나무 관 + 면 수의보 + 기본 유골함 + 작은 꽃다발", imageUrl: "./images/p_item01_ex_3.webp" }
                ]
            },
            {
                category: "추가 비용 (체중 초과 안내)",
                items: [
                    { name: "기초 체중 초과 (1kg 당)", price: "10,000원", desc: "기초 체중을 초과한 1kg 단위 가산 금액", longDesc: "기초 체중(일반동물 10kg, 소동물 1kg) 초과 시 1kg당 10,000원의 비용이 추가됩니다. 패키지 용품 사이즈 변경 시 추가 비용이 발생할 수 있습니다." }
                ]
            }
        ];

        // --- 포포즈 세종/김해(부산) 요금표 (서울/경기 대비 5만원 저렴) ---
        const FOUR_PAWS_PRICES_SEJONG_BUSAN = [
            {
                category: "일반 동물 장례 패키지 (10kg 이하 기준)",
                items: [
                    { name: "기본 화장", price: "200,000원", desc: "염습, 단독추모, 개별화장, 임시유골함, 추모키트", longDesc: "염습, 단독 추모, 개별 화장 및 수/분골, 임시 유골함 제공. (추모키트: 장례 증명서, 사진 인화, 발도장, 인연의 실, 안내서)" },
                    { name: "관 장례 패키지", price: "500,000원", desc: "기본화장 + 오동나무 관 + 고급수의 + 꽃다발", longDesc: "기본 화장 + 오동나무 관 + 인견 수의/수의보 + 기본 유골함 + 작은 꽃다발", imageUrl: "./images/p_item01.webp" },
                    { name: "요람 장례 패키지", price: "550,000원", desc: "기본화장 + 요람관 + 고급수의 + 목화솜 이불", longDesc: "기본 화장 + 요람관 + 인견 수의 + 목화솜 이불 + 기본 유골함 + 작은 꽃다발", imageUrl: "./images/p_item02.webp" },
                    { name: "자연닮음 장례 패키지", price: "550,000원", desc: "기본화장 + 자연닮음 관/수의 + 한지 수목함", longDesc: "기본 화장 + 자연닮음 관 + 자연닮음 수의/수의보 + 한지 수목함 + 작은 꽃다발", imageUrl: "./images/p_item04.webp" },
                    { name: "ALL IN ONE 패키지", price: "1,310,000원", desc: "최고급관 + 블리스 스톤 전량 + 다담 스톤함", longDesc: "기본 화장 + 오동나무 관 + 면 수의/수의보 + 블리스 스톤(전량) + 호두나무 다담 스톤함 + 작은 꽃다발", imageUrl: "./images/p_item03.webp" }
                ]
            },
            {
                category: "소동물 장례 패키지 (1kg 이하 기준)",
                items: [
                    { name: "소동물 기본 화장", price: "150,000원", desc: "염습 시 특수 칫솔 사용 등 일반 기본 화장과 동일", longDesc: "일반 동물 기본 화장 서비스 구성 100% 동일" },
                    { name: "소동물 관 장례 패키지", price: "300,000원", desc: "기본화장 + 오동나무 관 + 소동물 수의보", longDesc: "기본 화장 + 오동나무 관 + 면 수의보 + 기본 유골함 + 작은 꽃다발", imageUrl: "./images/p_item01_ex_3.webp" }
                ]
            },
            {
                category: "추가 비용 (체중 초과 안내)",
                items: [
                    { name: "기초 체중 초과 (1kg 당)", price: "10,000원", desc: "기초 체중을 초과한 1kg 단위 가산 금액", longDesc: "기초 체중(일반동물 10kg, 소동물 1kg) 초과 시 1kg당 10,000원의 비용이 추가됩니다. 패키지 용품 사이즈 변경 시 추가 비용이 발생할 수 있습니다." }
                ]
            }
        ];

        const STANDARD_PRICES = [
            {
                category: "기본 장례 비용",
                items: [
                    { name: "기본 화장 (5kg 미만)", price: "200,000원 ~" },
                    { name: "기본 화장 (5~15kg)", price: "250,000원 ~" }
                ]
            },
            {
                category: "필수 포함 내역",
                items: [
                    { name: "기본 영정사진", price: "무료" },
                    { name: "개별 추모실", price: "무료" },
                    { name: "기본 유골함", price: "무료" }
                ]
            },
            {
                category: "추가 선택 사항",
                items: [
                    { name: "수의/관", price: "별도 비용" },
                    { name: "메모리얼 스톤", price: "200,000원 ~" }
                ]
            }
        ];

        const TWENTYONE_GRAM_PRICES = [
            {
                "category": "21그램 장례 패키지",
                "items": [
                    { "name": "베이직 장례", "price": "15kg 미만 35만원 / 대형견 65만원", "desc": "가장 기본적인 장례 절차", "imageUrl": "./images/21gram_basic.jpg", "longDesc": "모든 서비스에 엽습, 단독추모실, 개별화장, 유골함, 보자기, 추모 예식 서비스(편지, 발도장, 본, 털 보관 등)가 포함된 기본 장례 서비스입니다." },
                    { "name": "21그램 장례 I", "price": "15kg 미만 70만원 / 대형견 111만원", "desc": "베이직 + 시그니처 요람 + 헌화 꽃다발", "imageUrl": "./images/21gram_type1.jpg", "longDesc": "베이직 구성에 21그램 시그니처 요람(M/L)과 헌화 꽃다발이 추가로 제공되는 패키지입니다." },
                    { "name": "21그램 장례 II", "price": "15kg 미만 75만원 / 대형견 120만원", "desc": "베이직 + 오동나무관 + 고급 수의 + 헌화 꽃다발", "imageUrl": "./images/21gram_type2.jpg", "longDesc": "베이직 구성에 오동나무관(M/L), 고급 수의, 헌화 꽃다발이 추가로 제공되는 패키지입니다. (1kg 미만 소동물 전용 65만원)" },
                    { "name": "프리미엄 소풍 장례", "price": "1,350,000원", "desc": "최상급 프리미엄 장례 (15kg 미만 전용)", "imageUrl": "./images/21gram_premium.jpg", "longDesc": "베이직 구성에 프리미엄 관 M, 최고급 수의, 무지개 다리 특별 예식, 소풍 가방, 들꽃 바구니가 모두 포함된 최고급 예우 패키지입니다." }
                ]
            },
            {
                "category": "부가 서비스 및 선택 용품",
                "items": [
                    { "name": "루세떼 (메모리얼 스톤)", "price": "별도 문의", "desc": "유골분을 보석 형태로 제작", "imageUrl": "./images/21gram_lucete.jpg", "longDesc": "유골분을 영원히 변치않는 아름다운 보석 형태의 메모리얼 스톤(루세떼)으로 가공하는 서비스입니다." },
                    { "name": "운구 서비스 / 비동행 장례", "price": "별도 문의", "desc": "상황에 따라 맞춤 진행", "longDesc": "보호자 참석이 어려운 경우 비동행 장례가 가능하며, 장례식장 이동을 위한 운송 서비스도 지원됩니다. 자세한 비용은 병원 문의바랍니다." }
                ]
            }
        ];

        const LOVEPET_PRICES = [
            {
                "category": "일반 반려견 장례 (5kg 이하 기준)",
                "items": [
                    { "name": "일반 장례", "price": "200,000원", "desc": "영정사진, 단독 추모실, 개별 화장, 기본 유골함 등", "longDesc": "영정사진, 단독 추모실, 개별 화장, 한지, 기본 유골함, 고급 보자기, 장례 확인서 발급이 포함됩니다. (5kg 초과 시 추가 비용 발생)" },
                    { "name": "러브펫 장례", "price": "550,000원", "desc": "일반 장례 + 염습, 삼베 수의, 오동나무 관 등", "longDesc": "일반 장례 서비스에 염습, 삼베 수의, 오동나무 관, 한지 수목장함, 추모 액자 제작이 추가됩니다." },
                    { "name": "프리미엄 장례", "price": "800,000원", "desc": "일반 장례 + 염습, 최고급 수의, 기능성 유골함 등", "longDesc": "일반 장례 서비스에 염습, 최고급 수의, 오동나무 관, 기능성 유골함, 추모 액자 제작이 추가됩니다." }
                ]
            },
            {
                "category": "스톤 장례",
                "items": [
                    { "name": "일반 스톤장례", "price": "550,000원", "desc": "일반 장례 + 메모리얼 스톤 + 아크릴 보관함 등", "longDesc": "일반 장례 서비스에 메모리얼 스톤 제작 + 아크릴 보관함 + 추모 액자가 포함됩니다." },
                    { "name": "러브펫 스톤장례", "price": "1,000,000원", "desc": "러브펫 장례 + 메모리얼 스톤 + 호두나무 보관함", "longDesc": "러브펫 장례 서비스에 메모리얼 스톤 제작 + 호두나무 보관함이 포함됩니다." },
                    { "name": "프리미엄 스톤장례", "price": "1,250,000원", "desc": "프리미엄 장례 + 메모리얼 스톤 + 최고급 보관함", "longDesc": "프리미엄 장례 서비스에 메모리얼 스톤 제작 + 최고급 호두나무 보관함이 포함됩니다." }
                ]
            },
            {
                "category": "소동물 및 안치 서비스",
                "items": [
                    { "name": "소동물 장례 (2kg 이하 기준)", "price": "150,000원", "desc": "영정사진, 단독 추모실, 개별 화장, 기본 유골함 등", "longDesc": "햄스터, 새 등 소동물을 대상으로 하며 영정사진, 단독 추모실, 개별 화장, 한지, 기본 유골함, 고급 보자기, 장례 확인서 발급이 포함됩니다." },
                    { "name": "봉안당 안치 (1년형)", "price": "300,000원 ~ 500,000원", "desc": "신규 계약 기준 (1년 단위 연장 가능)", "longDesc": "봉안당 1: 신규 300,000원 / 봉안당 2: 신규 500,000원. 1년 단위로 재계약 및 연장이 가능합니다." }
                ]
            }
        ];

        const MONGMONG_PRICES = [
            {
                "category": "일반 반려 동물 장례",
                "items": [
                    { "name": "소동물 (1kg 이하)", "price": "150,000원", "desc": "햄스터, 새, 기니피그 등 (개별 화장 및 추모)", "longDesc": "염습, 장례예식, 단독 추모실, 개별 화장, 기본 봉안함, 고급 보자기, 장례 확인서가 포함됩니다. (부가세 별도)" },
                    { "name": "기본 장례 (1kg ~ 5kg)", "price": "250,000원", "desc": "일반 소형견 및 고양이 (개별 화장 및 추모)", "longDesc": "염습, 장례예식, 단독 추모실, 개별 화장, 기본 봉안함, 고급 보자기, 장례 확인서가 포함됩니다. (부가세 별도)" },
                    { "name": "대형 동물 (5kg 초과)", "price": "250,000원 + 추가 비용", "desc": "기본 25만원에 1kg당 1만원 추가", "longDesc": "5kg 초과 시 1kg당 1만원이 추가 발생합니다. 40kg 이상 초대형은 전화 문의 바랍니다." }
                ]
            },
            {
                "category": "장례 패키지 (선택 사항)",
                "items": [
                    { "name": "프리미엄 장례", "price": "별도 문의", "desc": "한지 염습, 요람, 이불보, 무지개 이중함, 영상 등", "longDesc": "한지 염습, 화장, 요람, 이불보(나비/블랙&화이트), 무지개 이중함, 시네마 영상(USB 및 상영)이 포함된 고급 패키지입니다." },
                    { "name": "프리미엄 마블 패키지", "price": "별도 문의", "desc": "마블 스톤(100g), 요람, 이불보, 마블함, 영상 등", "longDesc": "한지 염습, 화장, 요람, 이불보, 마블 스톤(100g), 호두나무 팔각 마블함, 시네마 영상이 포함된 메모리얼 스톤 특화 패키지입니다." },
                    { "name": "VIP 봉안당 패키지", "price": "상담 후 결정", "desc": "VIP 봉안당 안치 + 시네마 영상", "longDesc": "최고급 VIP 봉안당 안치와 베이직 시네마 영상(돔 상영 무제한)이 포함됩니다." },
                    { "name": "수목장 패키지", "price": "상담 후 결정", "desc": "자연 수목장 안치 + 시네마 영상", "longDesc": "자연 친화적인 수목장 안치와 베이직 시네마 영상이 포함된 패키지입니다." }
                ]
            },
            {
                "category": "추가 서비스 및 용품",
                "items": [
                    { "name": "메모리얼 시네마 아이 추가", "price": "200,000원", "desc": "영상 내 다른 반려동물 추가 시 (1마리당)", "longDesc": "추억 영상에 다른 아이를 추가로 담고 싶으신 경우 마리당 20만원이 추가됩니다." },
                    { "name": "수의 (한복, 매듭, 삼베 등)", "price": "160,000원 ~ 380,000원", "desc": "다양한 디자인의 고급 수의", "longDesc": "원피스형, 투피스형 한복 수의, 매듭 수의, 삼베 수의 등 아이의 마지막 길을 따뜻하게 감싸주는 다양한 수의가 준비되어 있습니다." },
                    { "name": "관 & 요람", "price": "160,000원 ~ 450,000원", "desc": "오동나무관, 고급관, 요람관 등", "longDesc": "이별의 순간을 따뜻하게 감싸주는 미니관, 오동나무관(소/중/대), 및 요람관이 크기와 종류에 따라 준비되어 있습니다." },
                    { "name": "유골함 (봉안함)", "price": "130,000원 ~ 410,000원", "desc": "기본/기능성 도조함 및 디자인 봉안함", "longDesc": "기본 유골함부터 습기와 해충을 막아주는 기능성 도조함, 무지개 이중함, 호두나무 마루함 등 다양한 고급 봉안함이 마련되어 있습니다." }
                ]
            }
        ];

        const ARIUM_PRICES = [
            {
                "category": "기본 장례 비용 (부가세 포함)",
                "items": [
                    { "name": "소동물 1kg 미만", "price": "180,000원", "desc": "햄스터, 물고기, 애완조, 도마뱀, 고슴도치 등", "longDesc": "염습, 단독 추모실, 단독 화장, 백자 유골함, 보자기, 국화, 장례증명서가 포함됩니다." },
                    { "name": "15kg 미만", "price": "250,000원", "desc": "기본 장례 서비스", "longDesc": "염습, 단독 추모실, 단독 화장, 백자 유골함, 보자기, 국화, 장례증명서가 포함됩니다." },
                    { "name": "15kg 이상 ~ 30kg 미만", "price": "400,000원", "desc": "기본 장례 서비스", "longDesc": "염습, 단독 추모실, 단독 화장, 백자 유골함, 보자기, 국화, 장례증명서가 포함됩니다." },
                    { "name": "30kg 이상 ~ 50kg 미만", "price": "500,000원", "desc": "기본 장례 서비스", "longDesc": "염습, 단독 추모실, 단독 화장, 백자 유골함, 보자기, 국화, 장례증명서가 포함됩니다." },
                    { "name": "50kg 이상", "price": "1,000,000원", "desc": "기본 장례 서비스", "longDesc": "염습, 단독 추모실, 단독 화장, 백자 유골함, 보자기, 국화, 장례증명서가 포함됩니다." }
                ]
            },
            {
                "category": "패키지 서비스 (10kg 미만 적용)",
                "items": [
                    {
                        "name": "스탠다드 장례 패키지",
                        "price": "550,000원",
                        "desc": "염습, 오동나무관, 추모실, 개별화장, 아리움유골함, 발도장 등",
                        "longDesc": "염습 + 오동나무관 + 단독추모실 + 개별화장 + 아리움유골함 + 고급액자 + 발도장",
                        "imageUrl": "./images/arium_pkg_1.png"
                    },
                    {
                        "name": "프리미엄 장례 패키지",
                        "price": "850,000원",
                        "desc": "염습, 관, 수의, 생화장식, 호두나무유골함, 액자 등",
                        "longDesc": "염습 + 오동나무관 + 수의 + 생화장식 + 단독추모실 + 개별화장 + 호두나무유골함 + 고급액자 + 발도장",
                        "imageUrl": "./images/arium_pkg_2.png"
                    },
                    {
                        "name": "스탠다드 루세떼 패키지",
                        "price": "850,000원",
                        "desc": "기본 장례 + 루세떼 제작(1판) + 기본함 등",
                        "longDesc": "염습 + 단독추모실 + 개별화장 + 루세떼제작(1판) + 기본루세떼함 + 고급액자 + 발도장",
                        "imageUrl": "./images/arium_pkg_3.png"
                    },
                    {
                        "name": "프리미엄 루세떼 패키지",
                        "price": "1,600,000원",
                        "desc": "프리미엄 장례 + 루세떼 제작(1판) + 다담함 등",
                        "longDesc": "염습 + 오동나무관 + 수의 + 생화장식 + 단독추모실 + 개별화장 + 루세떼제작(1판) + 다담루세떼함 + 고급액자 + 발도장",
                        "imageUrl": "./images/arium_pkg_4.png"
                    }
                ]
            }
        ];

        const GENTLEPET_PRICES = [
            {
                "category": "기본 장례 비용",
                "items": [
                    { "name": "기본 장례", "price": "150,000원 ~ 200,000원", "desc": "체중에 따라 상이", "longDesc": "기본 장례 비용은 체중에 따라 15만원에서 20만원 사이로 적용됩니다. 염습, 추모, 개별 화장 등 필수적인 절차가 포함된 비용입니다." }
                ]
            },
            {
                "category": "장례 패키지 서비스",
                "items": [
                    { "name": "패키지 비용", "price": "별도 문의", "desc": "수의, 관 등 구성에 따라 상이함", "longDesc": "최고급 수의, 오동나무 관 등 다양한 장례용품이 포함된 패키지는 보호자님의 선택에 따라 비용이 별도로 책정됩니다. 자세한 비용은 상담 시 안내해 드립니다." }
                ]
            }
        ];

        const HANEUL_PRICES = [
            {
                "category": "일반 장례 패키지 (10kg 미만 기준)",
                "items": [
                    { "name": "기본 장례", "price": "200,000원", "desc": "개별화장, 단독 추모실, 기본 유골함 등 포함", "longDesc": "단독 추모실, 국화 헌화, 개별 화장, 보자기, 장례 확인서, 편지지, 붉은 실, 발 도장 키트, 털 간직 키트, 기본 유골함, 유골 주머니가 포함된 기본 장례 서비스입니다.", "imageUrl": "./images/haneul_basic.png" },
                    { "name": "스카이 장례", "price": "450,000원", "desc": "소동물 35만원 / 기본 장례 + 최고급 수의 및 관", "longDesc": "기본 장례 구성에 염습, 최고급 수의, 최고급 관, 도자기 유골함, 원목 액자가 추가로 제공됩니다.", "imageUrl": "https://cdn.imweb.me/thumbnail/20250810/6bece5aaa1b19.jpg" },
                    { "name": "요람 장례", "price": "700,000원", "desc": "최고급 요람 세트 및 무지개 유골함 등", "longDesc": "기본 장례 구성에 염습, 요람 침구 세트, 최고급 요람, 생화 꽃 장식(소량), 무지개 유골함, 원목 액자가 모두 포함된 품격 있는 서비스입니다.", "imageUrl": "https://cdn.imweb.me/thumbnail/20250810/12607cb830076.jpg" },
                    { "name": "프리미엄 장례", "price": "900,000원", "desc": "최상위 수의/관 세트 및 기능성 유골함 등", "longDesc": "기본 장례 구성에 염습, 최상위 수의 세트, 최상위 관, 생화 꽃 장식(소량), 기능성 유골함, 아크릴 액자가 포함된 프리미엄 서비스입니다.", "imageUrl": "https://cdn.imweb.me/thumbnail/20250810/0a5e1d569f503.jpg" },
                    { "name": "VIP 장례", "price": "1,300,000원", "desc": "VIP 수의/관 세트 및 VIP 생화 장식 등 최상급 예우", "longDesc": "최상의 예우를 위해 기본 장례 구성에 염습, VIP 수의 세트, VIP 관, VIP 생화 꽃 장식, 최고급 기능성 유골함, 아크릴 액자가 포함된 최고급 장례 서비스입니다.", "imageUrl": "https://cdn.imweb.me/thumbnail/20250810/4ba0908c5194f.jpg" }
                ]
            },
            {
                "category": "스톤 장례 패키지 (메모리얼 스톤 포함)",
                "items": [
                    { "name": "기본 스톤 장례", "price": "500,000원", "desc": "소동물 30만원 / 기본 장례 + 메모리얼 스톤", "longDesc": "기본 장례 패키지에 아이의 유골을 아름답게 간직할 수 있는 메모리얼 스톤 제작과 유리 스톤함이 포함됩니다.", "imageUrl": "./images/haneul_stone_basic.png" },
                    { "name": "스카이 스톤 장례", "price": "750,000원", "desc": "소동물 45만원 / 스카이 장례 + 메모리얼 스톤", "longDesc": "스카이 장례 패키지(최고급 수의/관 등)에 메모리얼 스톤 제작과 유리 스톤함이 포함됩니다.", "imageUrl": "./images/haneul_stone_sky.png" },
                    { "name": "요람 스톤 장례", "price": "1,000,000원", "desc": "요람 장례 + 메모리얼 스톤 및 원목 스톤함", "longDesc": "요람 장례(최고급 요람 등) 패키지에 더해 메모리얼 스톤 제작과 고급스러운 원목 스톤함이 제공됩니다.", "imageUrl": "./images/haneul_stone_cradle.png" },
                    { "name": "프리미엄 스톤 장례", "price": "1,300,000원", "desc": "프리미엄 장례 + 메모리얼 스톤 및 원목 스톤함", "longDesc": "프리미엄 장례(최상위 수의/관 등)에 메모리얼 스톤 제작과 고급 원목 스톤함이 함께 제공되는 고품격 패키지입니다.", "imageUrl": "./images/haneul_stone_premium.jpg" },
                    { "name": "VIP 스톤 장례", "price": "1,650,000원", "desc": "VIP 장례 + 상위 기능성 유골함 또는 원목 스톤함", "longDesc": "가장 고귀한 예우를 위한 VIP 장례 패키지에 메모리얼 스톤 제작과 상위 기능성 고도자 유골함(또는 원목 스톤함)이 포함된 최고급 옵션입니다.", "imageUrl": "./images/haneul_stone_vip.jpg" }
                ]
            },
            {
                "category": "체중별 추가 비용",
                "items": [
                    { "name": "10kg ~ 20kg", "price": "10,000원", "desc": "1kg당 추가 요금 1만원", "longDesc": "기본 제공 무게인 10kg을 초과하여 최대 20kg까지는 1kg 초과 시마다 10,000원이 추가로 청구됩니다." },
                    { "name": "20kg 초과", "price": "15,000원", "desc": "1kg당 추가 요금 1.5만원", "longDesc": "20kg 이상의 대형견/동물의 경우 기준 초과 1kg당 15,000원씩의 장례 추가 비용이 발생합니다." }
                ]
            }
        ];

        const HAENEULMARU_PRICES = [
            {
                "category": "일반 장례 패키지 안내",
                "items": [
                    { "name": "기본 장례서비스", "price": "별도 문의", "desc": "추모, 개별화장, 유골함 등 기본 절차", "longDesc": "보호자분 참관, 추모(종교별 제례상), 단독 추모실, 개별 화장, 유골함, 유골 보관함(종이상자) 등 장례의 가장 기본적인 절차와 필수 용품이 포함된 서비스입니다. (상세 요금은 전화 문의 부탁드립니다.)" },
                    { "name": "해늘마루 장례서비스", "price": "별도 문의", "desc": "기본 구성 + 삼베수의, 염습 등", "longDesc": "기본 장례서비스 구성에 아이를 정갈하게 닦고 갈무리하는 염습 과정과 전통 삼베 수의, 그리고 고급 유골함이 추가된 한 단계 높은 예우 서비스입니다." },
                    { "name": "해늘마루 고급 장례서비스", "price": "별도 문의", "desc": "해늘마루 장례 구성 + 명주수의, 관 등", "longDesc": "해늘마루 장례서비스 구성에서 한 단계 더 나아가 고급 명주수의와 안락한 목관, 그리고 영정 사진(액자)이 더해진 고급 장례 패키지입니다." },
                    { "name": "해늘마루 최고급 장례서비스", "price": "별도 문의", "desc": "고급 장례 구성 + 최고급 수의 및 생화 장식 등", "longDesc": "가장 품격 있는 예우를 위한 패키지로, 최고급 수의와 호두나무/최고급 유골함세트장식, 그리고 해늘마루 생화 장식과 위패가 포함된 최고급 장례 서비스입니다." }
                ]
            }
        ];

        const JEONJUHANEUL_PRICES = [
            {
                "category": "기본 장례 비용 (화장)",
                "items": [
                    { "name": "1kg 미만", "price": "100,000원", "desc": "관, 단독추모실, 단독화장, 유골함, 한지꽃 등", "longDesc": "관, 단독추모실, 단독화장, 유골함(목단 or 지기 중 선택), 한지꽃, 공단보자기, 장례증명서가 포함된 1kg 미만 기본 장례 (부가세 포함)" },
                    { "name": "5kg 미만", "price": "170,000원", "desc": "관, 단독추모실, 단독화장, 유골함, 한지꽃 등", "longDesc": "관, 단독추모실, 단독화장, 유골함(목단 or 지기 중 선택), 한지꽃, 공단보자기, 장례증명서가 포함된 5kg 미만 기본 장례 (부가세 포함)" },
                    { "name": "8kg 미만", "price": "200,000원", "desc": "관, 단독추모실, 단독화장, 유골함, 한지꽃 등", "longDesc": "관, 단독추모실, 단독화장, 유골함(목단 or 지기 중 선택), 한지꽃, 공단보자기, 장례증명서가 포함된 8kg 미만 기본 장례 (부가세 포함)" },
                    { "name": "10kg 미만", "price": "220,000원", "desc": "관, 단독추모실, 단독화장, 유골함, 한지꽃 등", "longDesc": "관, 단독추모실, 단독화장, 유골함(목단 or 지기 중 선택), 한지꽃, 공단보자기, 장례증명서가 포함된 10kg 미만 기본 장례 (부가세 포함)" },
                    { "name": "10kg 초과", "price": "상담문의", "desc": "10kg 초과 시 별도 문의", "longDesc": "10kg을 초과하는 대형동물의 경우 별도의 상담을 통해 요금 및 절차를 안내해 드립니다." }
                ]
            },
            {
                "category": "장례 패키지 (5kg 미만 / 10kg 미만)",
                "items": [
                    { "name": "일반장례장", "price": "430,000원 / 450,000원", "desc": "추모실2관, 소렴, 일반 십자 수의, 오픈관, 도자기 유골함 등", "longDesc": "(추모실2관) + 소렴 + 일반 십자 수의 + 오동나무 오픈관 + 화장 + 도자기 유골함이 포함된 패키지입니다.", "imageUrl": "http://www.xn--wh1bvxg8gidy9nwpbz80azjjca55g71f2w3d.com/img/p_ceremony02_4.jpg" },
                    { "name": "하늘장례장", "price": "500,000원 / 550,000원", "desc": "추모실2관, 소렴, 고급 십자 수의, 일반관, 무지개 유골함 등", "longDesc": "(추모실2관) + 소렴 + 고급 십자 수의 + 오동나무 일반관 + 화장 + 무지개 유골함이 포함된 패키지입니다.", "imageUrl": "http://www.xn--wh1bvxg8gidy9nwpbz80azjjca55g71f2w3d.com/img/p_ceremony02_3.jpg" },
                    { "name": "고급장례장", "price": "700,000원 / 750,000원", "desc": "추모실1관, 소렴, 고급 모시 수의, 고급관, 천사포, 고급 유골함 등", "longDesc": "(추모실1관) + 소렴 + 고급 모시 수의 + 오동나무 고급관 + 화장 + 천사포 + 고급 유골함이 포함된 고급 패키지입니다.", "imageUrl": "http://www.xn--wh1bvxg8gidy9nwpbz80azjjca55g71f2w3d.com/img/p_ceremony02_2.jpg" },
                    { "name": "최고급장례장", "price": "850,000원 / 900,000원", "desc": "추모실1관, 소렴, 최고급 모시 수의, 최고급관, 천사포, 최고급 유골함 등", "longDesc": "(추모실1관) + 소렴 + 최고급 모시 수의 + 오동나무 최고급관 + 화장 + 최고급 천사포 + 최고급 유골함이 포함된 최고급 패키지입니다.", "imageUrl": "http://www.xn--wh1bvxg8gidy9nwpbz80azjjca55g71f2w3d.com/img/p_ceremony02_1.jpg" }
                ]
            }
        ];

        const PETNOBLESSE_PRICES = [
            {
                "category": "기본 장례 비용",
                "items": [
                    { "name": "기본 화장 비용", "price": "250,000원", "desc": "5kg 미만 기준 기본 비용", "longDesc": "염습, 삼베수의, 개별화장, 추모실 헌화, 추모액자, 추모영상, 기본유골함이 포함된 기본 장례 비용입니다. (부가세 포함)" }
                ]
            },
            {
                "category": "장례 패키지 안내",
                "items": [
                    { "name": "기본 패키지", "price": "250,000원", "desc": "염습, 삼베수의, 개별화장, 추모실 등", "longDesc": "가장 기본이 되는 패키지로, 염습, 삼베수의 재질 선택, 개별 화장, 추모실 제공, 국화 생화 헌화, 추모 액자 및 영상, 기본 유골함이 포함됩니다." },
                    { "name": "일반 패키지", "price": "별도 문의", "desc": "기본 구성 + 오동나무관, 수제백자 유골함", "longDesc": "기본 패키지 구성에 안락한 오동나무관과 수제백자 유골함이 더해져 더욱 격식을 갖춘 장례 패키지입니다." },
                    { "name": "고급 패키지", "price": "별도 문의", "desc": "일반 구성 + 고급 수의 및 고급 유골함", "longDesc": "일반 패키지 구성에서 한 단계 높은 고급 수의(종류 선택 가능)와 고급 유골함이 제공되는 프리미엄 서비스입니다." },
                    { "name": "최고급 패키지", "price": "별도 문의", "desc": "고급 구성 + 최고급 수의 및 노블레스 스톤 등", "longDesc": "최상의 예우를 위한 패키지로 최고급 수의와 최고급 유골함(또는 노블레스 스톤)이 포함되어 있습니다." },
                    { "name": "VIP 패키지", "price": "별도 문의", "desc": "개별 맞춤형 최고급 서비스", "longDesc": "보호자님의 개별적인 요청과 가장 품격 있는 장례 절차를 맞춤형으로 제공하는 최고급 V.I.P 서비스 패키지입니다." }
                ]
            },
            {
                "category": "추가 요금 및 선택 옵션",
                "items": [
                    { "name": "체중 초과 비용", "price": "10,000원", "desc": "5kg 초과 시 1kg당 추가", "longDesc": "5kg을 초과하는 반려동물의 경우 1kg이 추가될 때마다 10,000원의 요금이 가산됩니다." },
                    { "name": "노블레스 스톤 / 해양장 등", "price": "별도 문의", "desc": "유골 보석화 및 해양장 안치비용", "longDesc": "유골을 아름다운 보석 형태로 남기는 노블레스 스톤 제작과 지정된 해양 안치 서비스 등의 상세 요금은 별도 문의 부탁드립니다." }
                ]
            }
        ];

        const SEORAEAN_PRICES = [
            {
                "category": "서래안펫타운 장례 비용 및 용품",
                "items": [
                    { "name": "염습", "price": "50,000원 ~", "desc": "장례지도사의 정갈한 수습" },
                    { "name": "수의", "price": "100,000원 ~", "desc": "아름다운 이별 준비를 위한 수의" },
                    { "name": "관", "price": "100,000원 ~", "desc": "편안한 안식을 위한 관" },
                    { "name": "수목장 유골함", "price": "50,000원 ~", "desc": "자연을 위한 수목장용 유골함" },
                    { "name": "기능성 유골함", "price": "150,000원 ~", "desc": "훼손 차단 및 보존용 기능성 유골함" },
                    { "name": "백자 유골함", "price": "200,000원 ~", "desc": "고급 백자 유골함" },
                    { "name": "부장품 처리", "price": "30,000원 ~", "desc": "아이의 소중한 부장품 처리 비용" },
                    { "name": "화장비", "price": "별도", "desc": "개별 화장 진행 비용 (상담 문의)" },
                    { "name": "차량운행비", "price": "별도", "desc": "왕복 운행 서비스 비용 (상담 문의)" }
                ]
            }
        ];

        const PETCOM_PRICES = [
            {
                "category": "일반 화장 비용",
                "items": [
                    { "name": "5kg 미만", "price": "220,000원", "desc": "추모 예절, 개별 화장, 기본 유골함 등" },
                    { "name": "5kg ~ 10kg 미만", "price": "270,000원", "desc": "추모 예절, 개별 화장, 기본 유골함 등" },
                    { "name": "10kg ~ 15kg 미만", "price": "330,000원", "desc": "추모 예절, 개별 화장, 기본 유골함 등" },
                    { "name": "15kg ~ 20kg 미만", "price": "380,000원", "desc": "추모 예절, 개별 화장, 기본 유골함 등" },
                    { "name": "20kg ~ 25kg 미만", "price": "500,000원", "desc": "추모 예절, 개별 화장, 기본 유골함 등" },
                    { "name": "25kg ~ 30kg 미만", "price": "600,000원", "desc": "추모 예절, 개별 화장, 기본 유골함 등" },
                    { "name": "30kg 이상", "price": "700,000원", "desc": "30kg 이상 (5kg 추가 시마다 추가 요금 발생)" }
                ]
            },
            {
                "category": "장례 용품 및 추가 서비스",
                "items": [
                    { "name": "관", "price": "50,000원 ~ 300,000원", "desc": "종이관, 오동나무관 등", "longDesc": "관의 재질(종이, 오동나무 등) 및 크기에 따라 가격이 상이합니다." },
                    { "name": "수의", "price": "30,000원 ~ 200,000원", "desc": "면수의, 인견수의 등", "longDesc": "아이의 마지막을 따뜻하게 안아줄 수의로 면, 인견 등 재질별로 다양한 가격대가 준비되어 있습니다." },
                    { "name": "유골함", "price": "30,000원 ~ 500,000원", "desc": "도자기 유골함, 기능성 유골함 등", "longDesc": "기본 유골함을 넘어서는 도자기, 기능성, 안치용 유골함 등 목적에 맞는 다양한 선택이 가능합니다." },
                    { "name": "메모리얼 스톤", "price": "별도 문의", "desc": "아이의 유골을 보석화하는 과정", "longDesc": "유골을 아름다운 보석의 형태로 온전하게 보관할 수 있는 메모리얼 스톤 제작 비용은 별도 문의 부탁드립니다." }
                ]
            }
        ];

        const HANBYUL_PRICES = [
            {
                "category": "기본 화장 비용",
                "items": [
                    { "name": "1kg 이하 (특수동물)", "price": "200,000원", "desc": "개별화장, 수시, 염, 습, 추모식, 기본 유골함" },
                    { "name": "5kg 이하", "price": "250,000원", "desc": "개별화장, 수시, 염, 습, 추모식, 기본 유골함", "longDesc": "5kg 초과 시 1kg당 10,000원의 추가 비용이 발생합니다." }
                ]
            },
            {
                "category": "장례 패키지 (5kg 이하 기준)",
                "items": [
                    { "name": "소동물장례", "price": "250,000원", "desc": "특수동물 전용. 전용관, 장식, 유골함 포함", "imageUrl": "https://9tsiiw6i9140.edge.naverncp.com/files/hanbyul/202506/ccab7b6c1bcd795752d3003652450e2f.png" },
                    { "name": "장례 기본", "price": "450,000원", "desc": "개별화장, 염습, 추모, 오픈관, 삼베이불", "imageUrl": "https://9tsiiw6i9140.edge.naverncp.com/files/hanbyul/202506/1eca71462d387b1d17ce674282f7fb41.jpg" },
                    { "name": "장례 A", "price": "550,000원", "desc": "개별화장, 염습, 추모, 오동관, 수의", "imageUrl": "https://9tsiiw6i9140.edge.naverncp.com/files/hanbyul/202506/bcf3ccdd826aa048b7d83615eb9ae8f4.jpg" },
                    { "name": "꽃장례", "price": "550,000원", "desc": "개별화장, 염습, 추모, 라탄관, 수국생화이불", "imageUrl": "https://9tsiiw6i9140.edge.naverncp.com/files/hanbyul/202506/41e310861baa22b29c072e2e52e20b87.jpg" },
                    { "name": "장례 B", "price": "650,000원", "desc": "개별화장, 염습, 추모, 천사관, 인견싸개(또는 수의)", "imageUrl": "https://9tsiiw6i9140.edge.naverncp.com/files/hanbyul/202506/da56ea15c05eaf68722c07ffad3f7a5b.png" },
                    { "name": "장례 C", "price": "900,000원", "desc": "개별화장, 염습, 추모, 한옥관, 고급 꿈나라싸개" }
                ]
            }
        ];

        const REAL_DATA = {
            "펫오케스트라": {
                "pricingType": "categorized",
                "address": "경기 화성시 비봉면 양노리 755-5",
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/petorchestra.webp",
                "prices": [
                    {
                        "category": "오케스트라 기본 장례 비용",
                        "items": [
                            { "name": "보호자님 동행", "price": "350,000원 (소형견 기준, 대형견 오십만원)", "desc": "염습, 단독추모실, 개별화장, 유골인도", "longDesc": "보호자님이 방문하여 진행하는 기본 장례 패키지입니다. (염습, 단독추모실, 산토이 전용로 개별화장, 기능성 유골함 및 보자기 인도 포함) VAT 별도 요금입니다." },
                            { "name": "보호자님 비동행", "price": "350,000원 (소형견 기준, 대형견 오십만원)", "desc": "동행 장례와 동일한 절차로 진행", "longDesc": "참석이 어려우신 보호자님을 위한 비동행 서비스로, 동행 장례와 동일한 기본 장례 절차가 진행됩니다. 모든 장례 절차는 실시간으로 사진 촬영하여 안심하실 수 있도록 보내드리고 있습니다. VAT 별도 요금입니다." }
                        ]
                    },
                    {
                        "category": "부가 서비스 내용",
                        "items": [
                            { "name": "리무진 서비스 (픽업/이동)", "price": "왕복 5~7만원", "desc": "지역에 따라 상이함", "longDesc": "장례식장에 직접 이동하시기 어려운 분들을 위해 리무진 서비스를 제공합니다. 지역에 따라 왕복 기준 5~7만원의 비용이 추가될 수 있습니다." }
                        ]
                    }
                ]
            },
            "리틀포즈": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "장례 구성 (기본 제공)",
                        "items": [
                            { "name": "기본 장례", "price": "기본 제공", "desc": "염습, 추모예식, 개별화장, 유골인도, 라운지 이용 등 포함" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/littlepaws.webp"}
                        ]
                    },
                    {
                        "category": "수의 및 관 (선택)",
                        "items": [
                            { "name": "수의", "price": "100,000 ~ 150,000원", "desc": "소 10만원 / 중 12만원 / 대 15만원" },
                            { "name": "오동나무 관", "price": "150,000 ~ 250,000원", "desc": "소 15만원 / 중 20만원 / 대 25만원" },
                            { "name": "편백나무 관", "price": "250,000 ~ 450,000원", "desc": "소 25만원 / 중 35만원 / 대 45만원" }
                        ]
                    },
                    {
                        "category": "유골함 (선택)",
                        "items": [
                            { "name": "기본 유골함", "price": "무료", "desc": "기본 제공" },
                            { "name": "도자기", "price": "60,000원" },
                            { "name": "기능성 도자기", "price": "100,000원" },
                            { "name": "옥, 대리석", "price": "250,000원" }
                        ]
                    },
                    {
                        "category": "메모리얼 스톤",
                        "items": [
                            { "name": "1kg 이하 (기본)", "price": "200,000원", "desc": "유골 일부만으로도 메모리얼 스톤 제작 가능" },
                            { "name": "초과 1kg당", "price": "50,000원" },
                            { "name": "스톤 공예품", "price": "별도 문의" }
                        ]
                    },
                    {
                        "category": "안치 및 기타 (선택)",
                        "items": [
                            { "name": "봉안당 (1년)", "price": "200,000 ~ 350,000원", "desc": "베이직 20~25만원 / 프리미엄 30~35만원 (2년 이상 20% 할인)" },
                            { "name": "잔디장 (1년)", "price": "300,000원", "desc": "큰반송, 목련, 단풍 등 (2년 이상 20% 할인)" },
                            { "name": "산골장", "price": "30,000원", "desc": "리틀포즈 정원의 바람과 햇살 속에 흩날려 보냅니다" },
                            { "name": "보관실 안치", "price": "무료 ~ 90,000원", "desc": "1일 무료 / 2일 5만원 / 3일 7만원 / 4일 9만원 (최대 7일)" },
                            { "name": "픽업 서비스 (편도)", "price": "60,000 ~ 100,000원", "desc": "대구/경산/구미 등 6만원 / 포항/경주 등 10만원" }
                        ]
                    }
                ],
                "address": "대구 군위군 부계면 창평리 812",
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/littlepaws.webp"
            },
            "포포즈 화성점": {
                "pricingType": "categorized",
                "prices": FOUR_PAWS_PRICES,
                "address": "경기 화성시 팔탄면 창곡리 925-6",
                "imageUrl": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
            },
            "스윗드림펫": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "스윗드림 장례예식 (개별화장)",
                        "items": [
                            { "name": "5kg 미만", "price": "240,000원", "desc": "단독추모, 개별화장, 종이관", "longDesc": "모든 장례는 개별적인 추모 시간과 단독 화장 절차가 포함되며 기본 종이관 안치가 제공됩니다." , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/sweetdreampet.webp"},
                            { "name": "10kg 미만", "price": "300,000원", "desc": "단독추모, 개별화장, 종이관", "longDesc": "모든 장례는 개별적인 추모 시간과 단독 화장 절차가 포함되며 기본 종이관 안치가 제공됩니다." },
                            { "name": "15kg 미만", "price": "380,000원", "desc": "단독추모, 개별화장, 종이관", "longDesc": "모든 장례는 개별적인 추모 시간과 단독 화장 절차가 포함되며 기본 종이관 안치가 제공됩니다." },
                            { "name": "20kg 미만", "price": "440,000원", "desc": "단독추모, 개별화장, 종이관", "longDesc": "20kg 이상 체중의 대형견은 예약 전 사전 별도 문의가 필요합니다. (정규근무시간 외 야간, 휴일 추가요금 발생 가능)" }
                        ]
                    },
                    {
                        "category": "장례용품 (선택 사항)",
                        "items": [
                            { "name": "염습", "price": "50,000원", "desc": "소,중형 기준 (대형은 별도문의)" },
                            { "name": "수의", "price": "110,000원 ~ 350,000원", "desc": "삼베, 무명, 모시(인견) 등 선택" },
                            { "name": "나무관", "price": "130,000원 ~ 400,000원", "desc": "오픈관, 천사관 등 선택" },
                            { "name": "유골함", "price": "40,000원 ~ 300,000원", "desc": "기본함, 지정 기능성 유골함 등 선택" }
                        ]
                    }
                ],
                "address": "경북 칠곡군 가산면 다부리 651",
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/sweetdreampet.webp"
            },
            "스타티스": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "부산 기장군 일광읍 동백리 383-2", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/statice.webp" },
            "씨엘로펫": {
                "address": "경기 용인시 처인구 백암면 죽양대로 1206",
                "pricingType": "categorized",
                "prices": [{ "category": "장례 패키지", "items": [{ "name": "베이직 장례 (5kg 미만)", "price": "200,000원" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/cielopet.webp"}, { "name": "프리미엄 장례", "price": "450,000원" }] }, { "category": "추가 옵션", "items": [{ "name": "염습", "price": "50,000원" }, { "name": "수의", "price": "30,000원~" }, { "name": "기능성 유골함", "price": "100,000원~" }] }],
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/cielopet.webp"
            },
            "해늘마루": { "pricingType": "categorized", "prices": HAENEULMARU_PRICES, "address": "전남 목포시 대양동 756-10" , "imageUrl": "http://www.merion.co.kr/img/sub02/02_01.jpg"},
            "메리온": {
                "pricingType": "categorized", "prices": [
                    {
                        "category": "장례 패키지 (5kg 기준)", "items": [
                            { "name": "기본장", "price": "200,000원", "desc": "기본 유골함, 예식실 사용, 염습", "longDesc": "가장 기본적인 절차로 구성된 실속형 장례 서비스입니다. 반려동물을 깨끗하게 닦고 갈무리하는 '염습' 과정과 기본 유골함이 제공됩니다. (5kg 기본)", "imageUrl": "http://www.merion.co.kr/img/sub02/02_01.jpg" },
                            { "name": "일반장", "price": "420,000원", "desc": "일반 수의, 오동나무 관, 일반 유골함 등", "longDesc": "수의와 관이 포함되어 보다 정중하게 격식을 갖춘 장례 서비스입니다. 오동나무 관에 일반 삼베 수의를 입혀 마지막을 예우합니다.", "imageUrl": "http://www.merion.co.kr/img/sub02/02_02.jpg" },
                            { "name": "고급장", "price": "별도 문의", "desc": "고급 수의, 오동나무 관, 고급 유골함 등", "longDesc": "소재가 업그레이드된 수의와 관, 유골함을 사용하여 품격을 높인 프리미엄 서비스입니다. 상세 비용은 지점 상담을 통해 확인 가능합니다.", "imageUrl": "http://www.merion.co.kr/img/sub02/02_03.jpg" },
                            { "name": "최고급장", "price": "별도 문의", "desc": "최고급 명주 수의, 최고급 관, 이중 유골함 등", "longDesc": "최고급 소재인 명주 수의와 이중 유골함 등 모든 구성품을 최상급으로 제공하는 메리온 최고의 예우 서비스입니다.", "imageUrl": "http://www.merion.co.kr/img/sub02/02_04.jpg" }
                        ]
                    },
                    {
                        "category": "안치 (추모관)", "items": [
                            { "name": "일반 추모관 (1년)", "price": "150,000원", "desc": "추가 관리비 없음", "longDesc": "안전하고 편안한 공간에 마련된 일반 추모관입니다. 안치 후 추가적으로 발생하는 별도 관리비가 없습니다." },
                            { "name": "고급 추모관 (1년)", "price": "250,000원", "desc": "추가 관리비 없음", "longDesc": "보다 쾌적하고 넓은 공간에 마련된 고급 추모관입니다. 일반 추모관과 마찬가지로 1년 단위 계약이며 별도 관리비가 없습니다." }
                        ]
                    }
                ], "address": "경남 양산시 상북면 외석리 462-1", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/merion.webp"
            },
            "한별소울펫": { "pricingType": "categorized", "prices": HANBYUL_PRICES, "address": "경북 구미시 옥성면 농소리 950-1", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/hanbyeolsoulpet.webp" },
            "전주아리움": { "pricingType": "categorized", "prices": ARIUM_PRICES, "address": "전북 전주시 완산구 효자동3가 1039-1", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/jeonjuarium.webp" },
            "전주하늘": { "pricingType": "categorized", "prices": JEONJUHANEUL_PRICES, "address": "전북 완주군 소양면 신원리 1-3", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/jeonjuhaneul.webp" },
            "펫포레스트 남양주점": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "장례 패키지",
                        "items": [
                            { "name": "스탠다드 장례", "price": "350,000원", "desc": "기본 유골함, 고급 보자기 등" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/petforest-namyangju_1762610155894.webp"},
                            { "name": "포레스트 장례", "price": "700,000원", "desc": "고급 수의, 고급 오동나무관, 포레스트 유골함, 액자, 발도장 클레이 등" },
                            { "name": "프리미엄 장례", "price": "1,400,000원", "desc": "최고급 수의, 최고급 오동나무관, 기능성 유골함, 꽃다발, 포레스트 하우징, 액자 등" },
                            { "name": "스탠다드 루세떼 장례", "price": "1,000,000원", "desc": "스탠다드 장례 + 루세떼 제작 + 유리병 + 보증서" },
                            { "name": "포레스트 루세떼 장례", "price": "1,350,000원", "desc": "포레스트 장례 + 루세떼 제작 + 유리병 + 보증서" },
                            { "name": "프리미엄 루세떼 장례", "price": "1,750,000원", "desc": "프리미엄 장례 + 루세떼 제작 + 유리병 + 보증서" }
                        ]
                    }
                ],
                "address": "경기 남양주시 일패동 461-1",
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/petforest-namyangju_1762610155894.webp"
            },
            "퍼스트펫": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "장례 패키지 (체중 무관)",
                        "items": [
                            {
                                "name": "기본 장례 서비스",
                                "price": "250,000원",
                                "desc": "염습·개별화장·추모 예식·유골함 등 기본 제공",
                                "longDesc": "퍼스트펫은 체중에 따른 kg당 추가금이 없습니다. 장례(염습ㆍ개별화장ㆍ단독추모실), 추모 예식 서비스(편지쓰기ㆍ인연의 끈ㆍ털 보관), 백자 유골함, 보자기가 모두 포함된 기본 서비스입니다.",
                                "imageUrl": "https://www.firstpet.co.kr/wp_data_file/1755568462_1.jpg"
                            },
                            {
                                "name": "베이직 장례 I",
                                "price": "450,000원",
                                "desc": "기본 장례 + 칠성판 소형 + 편백함 소형",
                                "longDesc": "기본 장례 구성에 더해 아이가 편안하게 안치될 수 있는 비단지 칠성판 소형과 베이직 편백함 소형이 추가로 제공되는 패키지입니다.",
                                "imageUrl": "https://www.firstpet.co.kr/wp_data_file/1755568247_1.jpg"
                            },
                            {
                                "name": "베이직 장례 II",
                                "price": "690,000원",
                                "desc": "수목장 또는 자연장을 염두에 둔 분해형 패키지",
                                "longDesc": "장례 구성과 추모 예식 서비스에 더하여 고급 인견 수의, 오동나무 관, 생화 꽃 장식과 수목장 안치 시 자연 분해되는 분해용 수목함이 제공됩니다.",
                                "imageUrl": "https://www.firstpet.co.kr/wp_data_file/1755568285_1.jpg"
                            },
                            {
                                "name": "프리미엄 장례",
                                "price": "770,000원",
                                "desc": "최고급 수의와 호두나무 목함이 포함된 패키지",
                                "longDesc": "보다 예우를 갖추기 위한 서비스로, 최고급 수의와 생화 꽃 장식이 된 오동나무 관, 그리고 호두나무 목함이 포함된 품격 있는 장례 패키지입니다.",
                                "imageUrl": "https://www.firstpet.co.kr/wp_data_file/1755568406_1.jpg"
                            },
                            {
                                "name": "퍼스트 장례",
                                "price": "990,000원",
                                "desc": "퍼스트펫 최고의 장례 패키지 (맞춤 수의 및 액자 세트)",
                                "longDesc": "가장 고귀한 예우를 갖추기 위한 최상위 옵션으로, 노블레스 맞춤 수의, 최고급 오동나무 관, 생화 조각 장식, 최고급 호두나무 목함과 받침&액자 세트가 포함되어 있습니다.",
                                "imageUrl": "https://www.firstpet.co.kr/wp_data_file/1755568375_1.jpg"
                            }
                        ]
                    }
                ],
                "address": "전남 나주시 다시면 신광리 911-4",
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/firstpet_1762224788154.webp"
            },

            "젠틀펫스타": { "pricingType": "categorized", "prices": GENTLEPET_PRICES, "address": "경북 문경시 문경읍 진안리 350-4", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/gentlepetstar.webp" },
            "위드엔젤": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "충남 예산군 대술면 화산리 465-1", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/withangel.webp" },
            "아이헤븐": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "일반 장례 (체중 5kg 이하 기준, 부가세 별도)",
                        "items": [
                            {
                                "name": "헤븐 장례",
                                "price": "250,000원",
                                "desc": "염습·단독추모실·개별화장·청자 유골함",
                                "longDesc": "염습, 단독추모실, 종교용품, 생화 국화 헌화, 개별화장, 기본 청자 유골함이 포함된 기본 장례 서비스입니다."
                            , "imageUrl": "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=1000&auto=format&fit=crop"},
                            {
                                "name": "헤븐 고급 장례",
                                "price": "450,000원",
                                "desc": "헤븐 장례 + 고급 수의 + 고급 오동나무관",
                                "longDesc": "염습, 단독추모실, 종교용품, 생화 국화 헌화, 개별화장, 청자 유골함에 더하여 고급 수의와 고급 오동나무관이 제공됩니다."
                            },
                            {
                                "name": "헤븐 최고급 장례",
                                "price": "1,000,000원",
                                "desc": "헤븐 고급 장례 + 무지개 유골함 + 헤븐 하우스 등",
                                "longDesc": "염습, 단독추모실, 종교용품, 생화 국화 헌화, 개별화장, 최고급 수의와 최고급 오동나무관, 무지개 유골함, 헤븐 하우스, 원목액자가 포함된 최고급 장례입니다."
                            }
                        ]
                    },
                    {
                        "category": "루세떼 장례 (체중 5kg 이하 기준, 부가세 별도)",
                        "items": [
                            {
                                "name": "루세떼 장례",
                                "price": "800,000원",
                                "desc": "헤븐 장례 서비스 + 루세떼 제작 + 유리 봉안함",
                                "longDesc": "기본 헤븐 장례 서비스에 루세떼 제작과 유리 봉안함이 추가된 패키지입니다."
                            },
                            {
                                "name": "루세떼 고급 장례",
                                "price": "1,000,000원",
                                "desc": "헤븐 고급 장례 서비스 + 루세떼 제작 + 유리 봉안함",
                                "longDesc": "헤븐 고급 장례 서비스에 더해 영원히 간직할 수 있는 명품 보석 루세떼를 제작해 드립니다."
                            },
                            {
                                "name": "루세떼 최고급 장례",
                                "price": "1,400,000원",
                                "desc": "헤븐 최고급 장례 서비스 + 최고급 호두나무 루세떼함",
                                "longDesc": "무지개 유골함과 헤븐 하우스를 제외한 헤븐 최고급 장례 서비스와 루세떼 제작, 최고급 호두나무 루세떼함이 제공됩니다."
                            }
                        ]
                    }
                ],
                "address": "경남 김해시 생림면 봉림리 872-1",
                "imageUrl": "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=1000&auto=format&fit=crop"
            },
            "한별리멤버파크": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "기본 장례 및 화장",
                        "items": [
                            { "name": "소형동물 기본장례 (1kg 미만)", "price": "200,000원", "desc": "염/습, 추모예식, 특수 개별화장", "longDesc": "새, 햄스터 등 1kg 미만 소형동물을 위한 장례 서비스" , "imageUrl": "./images/hanbyul_basic_custom.jpg"},
                            { "name": "기본장례 (5kg 미만)", "price": "250,000원", "desc": "염/습, 추모예식, 화장, 기본 목함", "longDesc": "5kg 미만 반려동물 기준. 5kg 초과 시 1kg당 10,000원의 무게 할증이 부과됩니다." }
                        ]
                    },
                    {
                        "category": "장례 패키지",
                        "items": [
                            { "name": "기본장례 45 (5kg 미만)", "price": "450,000원", "desc": "입관, 개방관, 삼베 이불, 꽃장식 등", "longDesc": "염/습, 추모식, 입관, 개방관, 삼베 이불 덮기, 입관 꽃장식, 화장, 기본 목함", "imageUrl": "./images/hanbyul_basic_custom.jpg" },
                            { "name": "장례A 55 (5kg 미만)", "price": "550,000원", "desc": "오동나무관, 삼베 수의, 수국 장식", "longDesc": "개방관 대비 오동나무관과 삼베 수의, 수국 덮기가 곁들여지는 패키지", "imageUrl": "./images/hanbyul_package_A55_new.png" },
                            { "name": "라탄꽃 장례 60 (5kg 미만)", "price": "600,000원", "desc": "라탄관 덮기, 삼베, 수국 장식", "longDesc": "라탄관과 삼베, 수국으로 아름답게 꾸며지는 꽃 장례 패키지", "imageUrl": "./images/hanbyul_package_60_rattan.jpg" },
                            { "name": "장례B 65 (5kg 미만)", "price": "650,000원", "desc": "천사관, 삼베 수의, 꽃장식", "longDesc": "천사관이 적용된 고급 장례 패키지", "imageUrl": "./images/hanbyul_package_65_angel.jpg" },
                            { "name": "장례C 95 (5kg 미만)", "price": "950,000원", "desc": "최고급관, 최고급 수의, 고급 꽃장식", "longDesc": "최고급 관과 최고급 수의가 적용된 VVIP 패키지", "imageUrl": "./images/hanbyul_package_95_premium.jpg" }
                        ]
                    },
                    {
                        "category": "추가 부가서비스",
                        "items": [
                            { "name": "한별 리멤버 스톤", "price": "350,000원", "desc": "순수 100% 유골 보석 제작", "longDesc": "불순물 없이 아이의 유골 100%로 제작하는 영구 보존 메모리얼 스톤 (5kg 유골 기준 약 25개 생성)" },
                            { "name": "납골당 (봉안실)", "price": "전화 문의", "desc": "한별리멤버파크 내 개별 안치", "longDesc": "층수 및 위치에 따라 상이하므로 1644-0042로 문의바랍니다." }
                        ]
                    }
                ],
                "address": "경남 함안군 산인면 송산로 441",
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/hanbyeolrememberpark.webp"
            },
            "별다만": {
                "pricingType": "categorized",
                "address": "전남 나주시 다도면 신동리 467-92",
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/byeoldaman.webp",
                "prices": [
                    {
                        "category": "화장 (기본)",
                        "items": [
                            { "name": "1kg 미만", "price": "150,000원", "desc": "개별화장, 장례증명서", "longDesc": "개별화장(단독), 장례증명서 발급 (부가세 포함)" },
                            { "name": "5kg 미만", "price": "200,000원", "desc": "개별화장, 장례증명서", "longDesc": "할인가 적용. 개별화장(단독), 장례증명서 발급 (부가세 포함)" },
                            { "name": "10kg 미만", "price": "250,000원", "desc": "개별화장, 장례증명서", "longDesc": "할인가 적용. 개별화장(단독), 장례증명서 발급 (부가세 포함)" }
                        ]
                    },
                    {
                        "category": "기본 장례",
                        "items": [
                            { "name": "1kg 미만", "price": "170,000원", "desc": "염습, 추모실, 개별화장, 유골함 등", "longDesc": "염습, 단독 추모실, 개별화장(단독), 백자유골함, 보자기, 장례증명서 발급 (부가세 포함)" },
                            { "name": "5kg 미만", "price": "230,000원", "desc": "염습, 추모실, 개별화장, 유골함 등", "longDesc": "할인가 적용. 염습, 단독 추모실, 개별화장(단독), 백자유골함, 보자기, 장례증명서 발급 (부가세 포함)" },
                            { "name": "10kg 미만", "price": "280,000원", "desc": "염습, 추모실, 개별화장, 유골함 등", "longDesc": "할인가 적용. 염습, 단독 추모실, 개별화장(단독), 백자유골함, 보자기, 장례증명서 발급 (부가세 포함)" }
                        ]
                    },
                    {
                        "category": "별다만 장례 패키지",
                        "items": [
                            { "name": "5kg 미만", "price": "550,000원", "desc": "고급수의, 오동나무관 등 포함", "longDesc": "염습, 단독 추모실, 개별화장(단독), 고급수의, 오동나무관, 백자유골함, 보자기, 발도장 액자, 장례증명서 발급 (부가세 포함)" },
                            { "name": "10kg 미만", "price": "650,000원", "desc": "고급수의, 오동나무관 등 포함", "longDesc": "할인가 적용. 염습, 단독 추모실, 개별화장(단독), 고급수의, 오동나무관, 백자유골함, 보자기, 발도장 액자, 장례증명서 발급 (부가세 포함)" }
                        ]
                    },
                    {
                        "category": "별다만 요람 장례 패키지",
                        "items": [
                            { "name": "5kg 미만", "price": "550,000원", "desc": "수의보, 요람장 등 포함", "longDesc": "염습, 단독 추모실, 개별화장(단독), 수의보, 요람장, 백자유골함, 보자기, 발도장 액자, 장례증명서 발급 (부가세 포함)" },
                            { "name": "10kg 미만", "price": "650,000원", "desc": "수의보, 요람장 등 포함", "longDesc": "할인가 적용. 염습, 단독 추모실, 개별화장(단독), 수의보, 요람장, 백자유골함, 보자기, 발도장 액자, 장례증명서 발급 (부가세 포함)" }
                        ]
                    }
                ]
            },
            "해피엔딩": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "경기 광주시 초월읍 지월리 134" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/petbaragi-namwon.webp"},

            "타임투": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "전남 함평군 학교면 월산리 259" , "imageUrl": "./images/pettoheaven_main.jpg"},
            "펫바라기 남원점": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "기본 화장 서비스",
                        "items": [
                            { "name": "소동물 화장비", "price": "150,000원", "desc": "햄스터, 새 등", "longDesc": "염습, 장례식장 이용, 도자기 유골함이 포함된 소동물 화장비용" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/petbaragi-namwon.webp"},
                            { "name": "기본 화장비 (10kg 미만)", "price": "220,000원", "desc": "염습, 단독추모실, 개별화장, 유골함", "longDesc": "염습, 장례식장 이용, 및 도자기 유골함 제공이 포함된 기본 화장 서비스 안내 사항" }
                        ]
                    },
                    {
                        "category": "맞춤 장례 패키지 (5kg 미만)",
                        "items": [
                            { "name": "천사장 Package", "price": "450,000원", "desc": "오동나무관, 최고급 수의, 한지, 꽃 유골함", "longDesc": "기본화장 포함, 최고의 오동나무관 및 특(8절) 수의 등을 제공하는 기본 풀 패키지" },
                            { "name": "스톤장 Package", "price": "600,000원", "desc": "기본화장 + 메모리얼 스톤 + 꽃 유골함", "longDesc": "메모리얼 스톤 제작을 위해 관/수의를 생략하고 실속적으로 준비된 패키지입니다." },
                            { "name": "국화장 Package", "price": "650,000원", "desc": "오동나무관, 최고급 수의, 꽃 장식, 고급 유골함", "longDesc": "천사장 구성안에 생생한 꽃장식 서비스와 고급 유골함으로 업그레이드 된 패키지" },
                            { "name": "VIP장 Package", "price": "1,150,000원", "desc": "최고급관, 스톤제작, 생화장식, 모두포함", "longDesc": "가장 품격있고 완벽한 장례를 위하여 최고급 관/수의와 함께 메모리얼 스톤 제작, 생화 장식까지 모두 더한 VIP 전용 패키지" }
                        ]
                    }
                ],
                "address": "전북 남원시 보절면 신파리 403",
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/petbaragi-namwon.webp"
            },
            "푸른솔": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "전남 여수시 율촌면 취적리 964-3", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/pureunsol.webp" },

            "러블리엔젤": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "충북 청주시 서원구 남이면 구미리 233-1", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/lovelyangel.webp" },
            "펫바라기 일산점": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "기본 화장 서비스",
                        "items": [
                            { "name": "소동물 화장비", "price": "150,000원", "desc": "햄스터, 새 등", "longDesc": "염습, 장례식장 이용, 도자기 유골함이 포함된 소동물 화장비용" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/petbaragi-ilsan.webp"},
                            { "name": "기본 화장비 (10kg 미만)", "price": "220,000원", "desc": "염습, 단독추모실, 개별화장, 유골함", "longDesc": "염습, 장례식장 이용, 및 도자기 유골함 제공이 포함된 기본 화장 서비스 안내 사항" }
                        ]
                    },
                    {
                        "category": "맞춤 장례 패키지 (5kg 미만)",
                        "items": [
                            { "name": "천사장 Package", "price": "450,000원", "desc": "오동나무관, 최고급 수의, 한지, 꽃 유골함", "longDesc": "기본화장 포함, 최고의 오동나무관 및 특(8절) 수의 등을 제공하는 기본 풀 패키지" },
                            { "name": "스톤장 Package", "price": "600,000원", "desc": "기본화장 + 메모리얼 스톤 + 꽃 유골함", "longDesc": "메모리얼 스톤 제작을 위해 관/수의를 생략하고 실속적으로 준비된 패키지입니다." },
                            { "name": "국화장 Package", "price": "650,000원", "desc": "오동나무관, 최고급 수의, 꽃 장식, 고급 유골함", "longDesc": "천사장 구성안에 생생한 꽃장식 서비스와 고급 유골함으로 업그레이드 된 패키지" },
                            { "name": "VIP장 Package", "price": "1,150,000원", "desc": "최고급관, 스톤제작, 생화장식, 모두포함", "longDesc": "가장 품격있고 완벽한 장례를 위하여 최고급 관/수의와 함께 메모리얼 스톤 제작, 생화 장식까지 모두 더한 VIP 전용 패키지" }
                        ]
                    }
                ],
                "address": "경기 고양시 일산동구 설문동 515-1",
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/petbaragi-ilsan.webp"
            },
            "포포즈 양주점": { "pricingType": "categorized", "prices": FOUR_PAWS_PRICES, "address": "경기 양주시 광적면 비암리 583-4", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/pofos-yangju.webp" },
            "엔젤스톤": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "기본 화장 비용 (체중별)",
                        "items": [
                            { "name": "1kg 미만", "price": "220,000원", "desc": "가장 작은 소형 반려동물 기본 화장", "longDesc": "1kg 미만 체급의 반려동물 기본 개별 화장 서비스 비용입니다." , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/pettoheaven.webp"},
                            { "name": "1kg ~ 5kg 미만", "price": "250,000원", "desc": "일반적인 소형 반려동물 화장", "longDesc": "가장 보편적인 1kg에서 5kg 미만 몸무게를 지닌 소형 반려동물의 기본 절차 화장 비용입니다." },
                            { "name": "5kg ~ 15kg 미만", "price": "280,000 ~ 300,000원", "desc": "10kg 미만 28만원, 15kg 미만 30만원", "longDesc": "체급이 어느 정도 있는 아이들을 위한 비용으로, 5~10kg 구간은 28만원, 10~15kg 구간은 30만원의 비용이 발생합니다." },
                            { "name": "15kg 이상 대형견", "price": "330,000원 부터", "desc": "이후 무게 5kg 증가시 마다 점진적 차등 요금 적용", "longDesc": "15~20kg 구간 33만원을 시작으로 이후 5kg 구간마다 점진적으로 요금이 가산되며, 65kg 이상의 초대형견은 별도로 센터에 문의하여야 합니다." }
                        ]
                    },
                    {
                        "category": "엔젤스톤(메모리얼 스톤) 제작",
                        "items": [
                            { "name": "수습 유골분 10g 이하", "price": "110,000원", "desc": "수습된 유골 무게 10g 기준 소형 체급 스톤화 기본 단위", "longDesc": "수습된 유골분의 무게가 10g 이하인 가장 작은 반려동물의 영구 보존용 결정체(스톤) 제작 비용입니다." },
                            { "name": "유골분 11g ~ 60g 이하", "price": "200,000 ~ 290,000원", "desc": "유골 무게 기준 30g 내외 20만원, 60g 내외 29만원 차등", "longDesc": "유골 무게 11~30g 구간은 20만원, 31~60g 구간은 29만원의 추가 비용으로 메모리얼 스톤이 제작됩니다." },
                            { "name": "유골분 60g 초과 시", "price": "380,000원 부터", "desc": "이후 유골 무게 약 30g 증가 시 마다 9만원 상당 가산", "longDesc": "60g를 초과하는 유골의 경우 약 30g 당 9만원 내외의 점진적인 수수료가 책정됩니다. 본인의 반려동물에 꼭 맞는 무게 단위 문의가 필요합니다." }
                        ]
                    },
                    {
                        "category": "장례 용품 (선택 옵션)",
                        "items": [
                            { "name": "인견 수의", "price": "80,000 ~ 200,000원", "desc": "소형(8만), 중형(10만), 대형(12만), 특대 이상 별도", "longDesc": "고급 인견 소재로 지어진 수의입니다. 체급 별로 소 8만원, 중 10만원, 대 12만원, 특 15만원, 특대 20만원으로 구성되어 있습니다." },
                            { "name": "오동나무 관", "price": "30,000 ~ 250,000원", "desc": "미니(3만) 부터 특대(25만) 까지 사이즈별 요금 차등", "longDesc": "오동나무 소재의 관입니다. 사이즈에 따라 미니 3~5만원, 소 9만원(고급 10만), 중 12만원, 대 15만원(고급 20만), 특대 25만원으로 나뉩니다." }
                        ]
                    }
                ],
                "address": "경기 김포시 하성면 양택리 251-6"
            },
            "패투헤븐": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "강원 원주시 소초면 평장리 1048-1", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/pettoheaven.webp" },
            "별이되다": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "경남 김해시 생림면 나전리 1065-8", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/byeolidweda.webp" },
            "굿바이펫": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "기본 장례 비용 (소형 반려동물 기준)",
                        "items": [
                            { "name": "기본 장례", "price": "350,000원", "desc": "염습+수의+오동나무관+백자단지+수목장 유골함", "longDesc": "염습, 한지 수의보, 오동나무관(소형), 백자 유골 단지, 수목장용 오동나무 유골함 두 종류 모두가 기본으로 제공되는 서비스입니다." , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/goodbyepet.webp"},
                            { "name": "특수동물 및 6개월 미만", "price": "300,000원", "desc": "기본 장례 비용에서 50,000원 차감", "longDesc": "햄스터, 고슴도치 등의 특수동물이나 6개월 미만의 어린 동물을 위한 장례 시 기본 비용에서 50,000원이 차감되어 진행됩니다." },
                            { "name": "셀프 장례", "price": "300,000원", "desc": "기본 장례 비용에서 50,000원 차감", "longDesc": "보호자가 직접 염습과 입관을 준비해오시는 경우 50,000원이 할인됩니다." }
                        ]
                    },
                    {
                        "category": "체중별 기본 화장 비용 (중형~대형견)",
                        "items": [
                            { "name": "중형견 (약 15kg 이내)", "price": "450,000원", "desc": "광목천+한지 입관", "longDesc": "중형견 이상의 체급은 규격상 오동나무관 대신 한지와 광목천으로 입관 절차가 진행됩니다." },
                            { "name": "중대형견 (약 25kg 이내)", "price": "550,000원", "desc": "광목천+한지 입관", "longDesc": "추정 체중 약 25kg 이내의 허스키 등의 중대형견 장례입니다." },
                            { "name": "대형견 (약 35kg 이내)", "price": "650,000원", "desc": "광목천+한지 입관", "longDesc": "추정 체중 약 35kg 이내의 리트리버 등의 대형견 장례입니다." },
                            { "name": "초대형견 (약 45kg 이내)", "price": "750,000원", "desc": "광목천+한지 입관", "longDesc": "추정 체중 약 45kg 이내의 말라뮤트, 세퍼트 등의 초대형견 장례입니다." }
                        ]
                    },
                    {
                        "category": "선택 옵션 및 추가 항목",
                        "items": [
                            { "name": "중소형관(60cm) 추가", "price": "50,000원", "desc": "골격이 커서 중소형관이 필요한 경우", "longDesc": "기본 소형관(35cm)을 초과하는 크기로, 중소형관(60cm)이 필요한 경우 발생하는 추가금입니다." },
                            { "name": "납골당 안치 (3개월)", "price": "60,000원", "desc": "연장 가능", "longDesc": "유골함을 자택으로 모시지 않고 장례식장 내 납골당에 안전하게 안치하는 비용입니다." },
                            { "name": "루세떼(메모리얼 스톤) 제작", "price": "별도 문의", "desc": "중부권 최초 루세떼 제작 시설", "longDesc": "아이의 유골분을 영원히 변치않는 아름다운 보석 형태의 스톤(루세떼)으로 가공하는 서비스입니다. 자세한 상담이 필요합니다." }
                        ]
                    }
                ],
                "address": "충북 제천시 봉양읍 장평리 37-1",
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/goodbyepet.webp"
            },
            "스마일어게인": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "기본 장례 비용 (소형 반려동물 기준)",
                        "items": [
                            { "name": "기본 장례", "price": "350,000원", "desc": "염습+수의+오동나무관+백자단지+수목장 유골함", "longDesc": "염습, 한지 수의보, 오동나무관(소형), 백자 유골 단지, 수목장용 오동나무 유골함 두 종류 모두가 기본으로 제공되는 서비스입니다." , "imageUrl": "https://www.goodbyepet.co.kr/PEG/gallery/gallery.16974555519550.jpg"},
                            { "name": "특수동물 및 6개월 미만", "price": "300,000원", "desc": "기본 장례 비용에서 50,000원 차감", "longDesc": "햄스터, 고슴도치 등의 특수동물이나 6개월 미만의 어린 동물을 위한 장례 시 기본 비용에서 50,000원이 차감되어 진행됩니다." },
                            { "name": "셀프 장례", "price": "300,000원", "desc": "기본 장례 비용에서 50,000원 차감", "longDesc": "보호자가 직접 염습과 입관을 준비해오시는 경우 50,000원이 할인됩니다." }
                        ]
                    },
                    {
                        "category": "체중별 기본 화장 비용 (중형~대형견)",
                        "items": [
                            { "name": "중형견 (약 15kg 이내)", "price": "450,000원", "desc": "광목천+한지 입관", "longDesc": "중형견 이상의 체급은 규격상 오동나무관 대신 한지와 광목천으로 입관 절차가 진행됩니다." },
                            { "name": "중대형견 (약 25kg 이내)", "price": "550,000원", "desc": "광목천+한지 입관", "longDesc": "추정 체중 약 25kg 이내의 허스키 등의 중대형견 장례입니다." },
                            { "name": "대형견 (약 35kg 이내)", "price": "650,000원", "desc": "광목천+한지 입관", "longDesc": "추정 체중 약 35kg 이내의 리트리버 등의 대형견 장례입니다." },
                            { "name": "초대형견 (약 45kg 이내)", "price": "750,000원", "desc": "광목천+한지 입관", "longDesc": "추정 체중 약 45kg 이내의 말라뮤트, 세퍼트 등의 초대형견 장례입니다." }
                        ]
                    },
                    {
                        "category": "선택 옵션 및 추가 항목",
                        "items": [
                            { "name": "중소형관(60cm) 추가", "price": "50,000원", "desc": "골격이 커서 중소형관이 필요한 경우", "longDesc": "기본 소형관(35cm)을 초과하는 크기로, 중소형관(60cm)이 필요한 경우 발생하는 추가금입니다." },
                            { "name": "납골당 안치 (3개월)", "price": "60,000원", "desc": "연장 가능", "longDesc": "유골함을 자택으로 모시지 않고 장례식장 내 납골당에 안전하게 안치하는 비용입니다." },
                            { "name": "루세떼(메모리얼 스톤) 제작", "price": "별도 문의", "desc": "중부권 최초 루세떼 제작 시설", "longDesc": "아이의 유골분을 영원히 변치않는 아름다운 보석 형태의 스톤(루세떼)으로 가공하는 서비스입니다. 자세한 상담이 필요합니다." }
                        ]
                    }
                ],
                "address": "충북 영동군 추풍령면 작점리 148",
                "imageUrl": "https://www.goodbyepet.co.kr/PEG/gallery/gallery.16974555519550.jpg"
            },
            "스토리펫": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "기본 장례 비용",
                        "items": [
                            {
                                "name": "1kg 이하",
                                "price": "180,000원",
                                "desc": "1kg 이하 소형 반려동물 기본 장례 비용",
                                "longDesc": "1kg 이하 무게의 반려견, 반려묘, 소동물을 위한 기본 개별 화장 서비스 비용입니다."
                            , "imageUrl": "./angelstone_thumbnail.png"},
                            {
                                "name": "5kg 이하",
                                "price": "250,000원",
                                "desc": "5kg 이하 반려동물 기본 장례 비용",
                                "longDesc": "5kg 이하 무게의 반려동물을 위한 기본 개별 화장 서비스 비용입니다."
                            },
                            {
                                "name": "무게 추가 비용",
                                "price": "10,000원",
                                "desc": "1kg 추가당 추가 요금 발생",
                                "longDesc": "기본 규정 무게를 초과할 경우, 초과된 1kg당 10,000원의 비용이 추가됩니다."
                            },
                            {
                                "name": "20kg 이상 대형견",
                                "price": "별도 문의",
                                "desc": "20kg 이상 대형견/동물을 위한 특수 장례",
                                "longDesc": "20kg 이상의 대형 반려동물은 화장로 및 장례 절차가 상이할 수 있으므로, 스토리펫 장례식장으로 별도 유선 상담을 부탁드립니다."
                            }
                        ]
                    },
                    {
                        "category": "장례 용품 안내",
                        "items": [
                            {
                                "name": "유골함 / 수의 / 관",
                                "price": "별도 문의",
                                "desc": "개별 맞춤형 용품 선택 후 결정됩니다",
                                "longDesc": "유골함, 수의, 관 등 아이의 마지막을 위한 장례 용품은 종류, 재질 및 크기별로 금액이 상이하므로 방문 상담 후 결정하실 수 있습니다."
                            }
                        ]
                    }
                ],
                "address": "경기 화성시 정남면 문학리 663"
            },
            "엔젤스톤": {
                "pricingType": "categorized",
                "prices": [
                    { "category": "기본 화장 비용 (체중별)", "items": [{ "name": "1kg 미만", "price": "220,000원", "desc": "가장 작은 소형 반려동물 기본 화장" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/pettoheaven.webp"}, { "name": "1kg ~ 5kg 미만", "price": "250,000원", "desc": "일반적인 소형 반려동물 화장" }, { "name": "5kg ~ 15kg 미만", "price": "280,000 ~ 300,000원", "desc": "10kg 미만 28만원, 15kg 미만 30만원" }, { "name": "15kg 이상 대형견", "price": "330,000원 부터", "desc": "이후 무게 5kg 증가시 마다 점진적 차등 요금 적용" }] },
                    { "category": "엔젤스톤(메모리얼 스톤) 제작", "items": [{ "name": "수습 유골분 10g 이하", "price": "110,000원", "desc": "수습된 유골 무게 10g 기준 소형 체급 스톤화 기본 단위" }, { "name": "유골분 11g ~ 60g 이하", "price": "200,000 ~ 290,000원", "desc": "유골 무게 기준 30g 내외 20만원, 60g 내외 29만원 차등" }, { "name": "유골분 60g 초과 시", "price": "380,000원 부터", "desc": "이후 유골 무게 약 30g 증가 시 마다 9만원 상당 가산" }] },
                    { "category": "장례 용품 (선택 옵션)", "items": [{ "name": "인견 수의", "price": "80,000 ~ 200,000원", "desc": "소형(8만), 중형(10만), 대형(12만), 특대 이상 별도" }, { "name": "오동나무 관", "price": "30,000 ~ 250,000원", "desc": "미니(3만) 부터 특대(25만) 까지 사이즈별 요금 차등" }] }
                ],
                "address": "경기 김포시 하성면 양택리 251-6",
                "imageUrl": "./angelstone_thumbnail.png"
            },
            "경북": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "기본 장례 및 화장",
                        "items": [
                            { "name": "기본 화장", "price": "150,000원~", "desc": "개별화장 진행 및 참관", "longDesc": "모든 장례는 개별화장으로 진행되며 마지막 순간까지 참관 가능합니다." , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/kyungbook.webp"},
                            { "name": "보통 장례", "price": "상담 후 결정", "desc": "소렴+보통수의+보통관+화장+도자기유골함", "longDesc": "염습(소렴), 보통 수의, 보통 나무관, 화장 진행 및 도자기 유골함 제공" },
                            { "name": "수목장", "price": "상담 후 결정", "desc": "기본장례+보통관+삼베수의+한지유골함", "longDesc": "수목 전용 기본장례: 기본관 입히는 수의(삼베), 자연 분해 한지유골함" }
                        ]
                    },
                    {
                        "category": "고급 맞춤 장례",
                        "items": [
                            { "name": "고급 장례", "price": "상담 후 결정", "desc": "소렴+고급수의+고급관+화장+천년포+고급유골함", "longDesc": "안치 염습(소렴), 고급 수의, 고급 나무관, 화장 진행 및 천년포, 고급 유골함 제공" },
                            { "name": "최고급 장례", "price": "상담 후 결정", "desc": "소렴+최고급수의+최고급관+화장+고급천년포+최고급유골함", "longDesc": "안치 염습(소렴), 최고급 수의, 최고급 나무관, 화장 진행 및 고급 천년포, 최고급 유골함 제공" },
                            { "name": "VIP 장례", "price": "상담 후 결정", "desc": "소렴+VIP수의+최고급관+화장+고급천년포+최고급유골함", "longDesc": "최고급 VIP 패키지: 소렴, VIP 전용 수의, 최고급 나무관, 화장, 고급 천년포, 최고급 유골함" }
                        ]
                    },
                    {
                        "category": "추가 부가서비스",
                        "items": [
                            { "name": "스톤 제작", "price": "150,000원~", "desc": "메모리얼 스톤 제작", "longDesc": "아이의 유골을 바탕으로 영구 보존 가능한 메모리얼 스톤 제작" },
                            { "name": "의전 픽업 서비스", "price": "상담 요망", "desc": "경단기, 픽업차량 지원", "longDesc": "차량이 없거나 운전이 어려우신 보호자를 위한 자택 왕복 픽업 서비스 운영 (문의: 1522-0912)" },
                            { "name": "봉안당 안치", "price": "1년 단위 계약", "desc": "일반형/확장형 개별 룸", "longDesc": "일반형 및 넓은 확장형 봉안당 운영 (1년 단위 계약, 형태에 따라 가격 상이)" }
                        ]
                    }
                ],
                "address": "경북 김천시 봉산면 신암리 396",
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/kyungbook.webp"
            },
            "러브펫 경기광주점": { "pricingType": "categorized", "prices": LOVEPET_PRICES, "address": "경기 광주시 초월읍 지월리 712-10", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/lovepet-kyungigwangju.webp" },
            "해피펫": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "기본 장례 및 화장",
                        "items": [
                            { "name": "반려동물 장례비용", "price": "110,000원", "desc": "장례, 화장, 유골수습 포함", "longDesc": "해피펫의 기본 장례 서비스로 장례 예식, 화장 진행 및 유골 수습 과정이 모두 포함된 통합 비용입니다." , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/happypet.webp"}
                        ]
                    }
                ],
                "address": "전북 완주군 이서면 은교리 508",
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/happypet.webp"
            },
            "펫로스케어": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "경남 김해시 상동면 우계리 112-1" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/21gram-namyangju.webp"},
            "21그램 남양주점": {
                "address": "경기 남양주시 화도읍 차산리 856-1",
                "pricingType": "categorized",
                "prices": TWENTYONE_GRAM_PRICES,
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/21gram-namyangju.webp"
            },
            "좋은친구들": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "충남 공주시 우성면 보흥리 759", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/joeunchingudeul.webp" },
            "포포즈 세종점": { "pricingType": "categorized", "prices": FOUR_PAWS_PRICES_SEJONG_BUSAN, "address": "세종 부강면 부강리 658-2", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/pofos-sejong.webp" },
            "펫포레스트 김포점": {
                "address": "경기 김포시 통진읍 고정로 308",
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "장례 패키지",
                        "items": [
                            { "name": "스탠다드 장례", "price": "350,000원", "desc": "기본 유골함, 고급 보자기 등" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/petforest-kyungigimpo.webp"},
                            { "name": "포레스트 장례", "price": "700,000원", "desc": "고급 수의, 고급 오동나무관, 포레스트 유골함, 액자, 발도장 클레이 등" },
                            { "name": "프리미엄 장례", "price": "1,400,000원", "desc": "최고급 수의, 최고급 오동나무관, 기능성 유골함, 꽃다발, 포레스트 하우징, 액자 등" },
                            { "name": "스탠다드 루세떼 장례", "price": "1,000,000원", "desc": "스탠다드 장례 + 루세떼 제작 + 유리병 + 보증서" },
                            { "name": "포레스트 루세떼 장례", "price": "1,350,000원", "desc": "포레스트 장례 + 루세떼 제작 + 유리병 + 보증서" },
                            { "name": "프리미엄 루세떼 장례", "price": "1,750,000원", "desc": "프리미엄 장례 + 루세떼 제작 + 유리병 + 보증서" }
                        ]
                    }
                ],
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/petforest-kyungigimpo.webp"
            },
            "더포에버": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "인천 서구 대곡동 361-2", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/theforever.webp" },
            "한별": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "경남 창원시 성산구 창원대로 11" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/mongmongiempark.webp"},
            "몽몽이엠파크": { "pricingType": "categorized", "prices": MONGMONG_PRICES, "address": "경기 남양주시 화도읍 구암리 305", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/mongmongiempark.webp" },
            "21그램 경기광주점": {
                "address": "경기 광주시 매산동 139",
                "pricingType": "categorized",
                "prices": TWENTYONE_GRAM_PRICES,
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/21gram-kyungigwangju.webp"
            },
            "백꽃사랑하이빛": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "장례 패키지 (10kg 미만 기준)",
                        "items": [
                            { "name": "01 기본장례", "price": "250,000원", "desc": "염습, 화장, 한지수의, 추모실, 보자기, 기본유골함", "longDesc": "염습, 화장, 한지수의, 국화 헌화, 기본 유골함, 단독추모실, 고급보자기, 고급액자 포함 (10kg 초과 시 추가 비용 문의)" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/baekkkotsaranghaibit.webp"},
                            { "name": "02 포에버장례", "price": "500,000원", "desc": "기본장례 + 오동나무관/요람장, 인견수의, 백자유골함", "longDesc": "기본장례 항목 포함 + 꽃다발, 인견 수의, 고급 오동나무관 또는 요람장 세트, 백자 유골함" },
                            { "name": "03 VIP장례", "price": "900,000원", "desc": "포에버장례 + 생화장식, 수의/수의보 세트, 기능성유골함", "longDesc": "포에버장례 항목 포함 + 생화장식, 고급 수의와 수의보 세트, 고급 오동나무관, 기능성 유골함" }
                        ]
                    },
                    {
                        "category": "기타 (선택 사항)",
                        "items": [
                            { "name": "유골 안치 및 보존", "price": "별도 문의", "desc": "산골, 메모리얼 스톤 제작 등", "longDesc": "화장 후 유골은 보호자에게 전달되며, 별도 요청 시 산골 또는 메모리얼 스톤 제작이 가능합니다." }
                        ]
                    }
                ],
                "address": "경기 광주시 곤지암읍 부항리 236",
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/baekkkotsaranghaibit.webp"
            },
            "어게인": {
                "address": "충북 옥천군 동이면 옥천동이로 439",
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/again.webp",
                "pricingType": "categorized",
                "prices": [
                    { "category": "기본 장례 비용", "items": [{ "name": "1kg 미만 (소동물)", "price": "180,000원", "desc": "염습, 단독 추모실, 개별 화장, 기본 유골함 등 포함" }, { "name": "5kg 미만", "price": "200,000원", "desc": "염습, 단독 추모실, 개별 화장, 기본 유골함 등 포함" }, { "name": "5kg ~ 10kg", "price": "230,000원", "desc": "염습, 단독 추모실, 개별 화장, 기본 유골함 등 포함" }, { "name": "10kg ~ 15kg", "price": "280,000원", "desc": "염습, 단독 추모실, 개별 화장, 기본 유골함 등 포함" }, { "name": "15kg ~ 20kg", "price": "350,000원", "desc": "염습, 단독 추모실, 개별 화장, 기본 유골함 등 포함" }] },
                    { "category": "선택 항목 및 장례용품", "items": [{ "name": "오동나무 관 (소동물)", "price": "30,000원~", "desc": "소동물 전용 규격 관" }, { "name": "오동나무 관", "price": "100,000원~", "desc": "일반 규격 오동나무 관 예약" }, { "name": "최고급 요람", "price": "200,000원~", "desc": "최고급 소재 요람으로 수습" }, { "name": "삼베 수의", "price": "80,000원~", "desc": "전통 삼베 수의 제공" }, { "name": "기능성 유골함", "price": "100,000원~", "desc": "반영구 훼손 방지용 보관함" }, { "name": "메모리얼 스톤 (소동물)", "price": "50,000원~", "desc": "소동물 유골 보석화 (스톤) 작업" }, { "name": "메모리얼 스톤 (일반)", "price": "200,000원~", "desc": "일반 동물 스톤 제작" }] }
                ]
            },
            "하늘강아지": { "pricingType": "categorized", "prices": HANEUL_PRICES, "address": "경기 광주시 초월읍 선동리 386-5", "imageUrl": "https://cdn.imweb.me/thumbnail/20250810/14567aedad916.jpg" },
            "아이별": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "부산 기장군 장안읍 기룡리 240" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/pofos-gimhae.webp"},
            "포포즈 김해점": { "pricingType": "categorized", "prices": FOUR_PAWS_PRICES_SEJONG_BUSAN, "address": "경상남도 김해시 한림면 안하로 102", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/pofos-gimhae.webp" },
            "하얀민들레": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "경북 청도군 화양읍 남성현로 852" , "imageUrl": "./images/petnoblesse_main.png"},
            "아이드림펫": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "경기 김포시 하성면 양택리 161-1" , "imageUrl": "./images/ibyeol_main.png"},
            "펫노블레스": { "pricingType": "categorized", "prices": PETNOBLESSE_PRICES, "address": "경남 양산시 상북면 상삼리 807", "imageUrl": "./images/petnoblesse_main.png" },
            "서래안펫타운": { "pricingType": "categorized", "prices": SEORAEAN_PRICES, "address": "전북 군산시 경암동 570-39" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/petforest-kyungigwangju.webp"},
            "하늘소풍": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "경남 고성군 회화면 봉동리 608-3" , "imageUrl": "./images/haneulsopoong_list_v2.png"},
            "리멤버": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "경기 용인시 처인구 남사읍 방아리 883-3" },
            "강아지펫헤븐": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "경북 성주군 선남면 오도리 91" , "imageUrl": "./images/petheaven_exterior.png"},
            "오수펫추모공원": {
                "address": "전북 임실군 오수면 춘향로 1554-95",
                "pricingType": "categorized",
                "prices": [
                    { "category": "기본 화장 비용 (일반/소동물)", "items": [{ "name": "일반동물 주간 화장 (5kg)", "price": "200,000원", "desc": "일반 반려동물 (오전 9시~오후 6시 전)" }, { "name": "일반동물 야간 화장 (할인가)", "price": "230,000원", "desc": "오후 6시 이후 도착 시 야간 적용" }, { "name": "체중 초과 화장 추가금", "price": "9,000원", "desc": "5kg 초과 시 1kg당 가산" }, { "name": "특수 및 소동물 (1kg 미만)", "price": "150,000원", "desc": "햄스터, 고슴도치, 토끼 등" }] },
                    { "category": "별도 선택 비용 (장례용품 및 스톤)", "items": [{ "name": "염습", "price": "50,000원~", "desc": "장례지도사의 정갈한 수습" }, { "name": "수의", "price": "90,900원~", "desc": "아름다운 이별 준비복" }, { "name": "관 / 수목장 유골함", "price": "109,000원~", "desc": "관(109,000~), 수목장 유골함(136,000~)" }, { "name": "기능성 유골함", "price": "126,500원~", "desc": "반영구 훼손 차단 보존" }, { "name": "로시오 스톤 제작", "price": "230,000원~", "desc": "고유 보석 스톤 제작" }] },
                    { "category": "추모관 (안치 비용, 1년)", "items": [{ "name": "봉안당 1단 특가", "price": "100,000원", "desc": "정상 30만 -> 할인가 10만" }, { "name": "봉안당 2단 / 6단", "price": "200,000원", "desc": "정상 40만 -> 할인가 20만" }, { "name": "로얄층 (3/4/5단)", "price": "400,000원", "desc": "정상 50만 -> 할인가 40만" }, { "name": "자연장지 (잔디 평장)", "price": "150,000원", "desc": "야외 잔디밭 안치" }, { "name": "자연장지 (수목장)", "price": "300,000원~", "desc": "수목 아래 자연 안치" }] }
                ]
            },
            "펫포레스트 경기광주점": {
                "address": "경기 광주시 오포안로 77",
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "장례 패키지",
                        "items": [
                            { "name": "스탠다드 장례", "price": "350,000원", "desc": "기본 유골함, 고급 보자기 등" , "imageUrl": "https://petforest.co.kr/images/funeral/funeral-expense-1.jpg"},
                            { "name": "포레스트 장례", "price": "700,000원", "desc": "고급 수의, 고급 오동나무관, 포레스트 유골함, 액자, 발도장 클레이 등" },
                            { "name": "프리미엄 장례", "price": "1,400,000원", "desc": "최고급 수의, 최고급 오동나무관, 기능성 유골함, 꽃다발, 포레스트 하우징, 액자 등" },
                            { "name": "스탠다드 루세떼 장례", "price": "1,000,000원", "desc": "스탠다드 장례 + 루세떼 제작 + 유리병 + 보증서" },
                            { "name": "포레스트 루세떼 장례", "price": "1,350,000원", "desc": "포레스트 장례 + 루세떼 제작 + 유리병 + 보증서" },
                            { "name": "프리미엄 루세떼 장례", "price": "1,750,000원", "desc": "프리미엄 장례 + 루세떼 제작 + 유리병 + 보증서" }
                        ]
                    }
                ],
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/petforest-kyungigwangju.webp"
            },
            "로이힐즈": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "경기 양평군 양동면 삼산리 18" , "imageUrl": "./images/petsalang_1.png"},
            "강릉펫사랑": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "장례 예식 안내 (5kg 기준)",
                        "items": [
                            { "name": "기본 예식", "price": "300,000원", "desc": "염습, 추모실, 단독화장, 목관함, 액자 제공", "longDesc": "모든 장례는 5kg 기준 초과 시 추가요금이 발생합니다. 포함 내역: 염습 + 단독 추모실 사용 + 단독화장 + 목관함 제공 + 액자 제공", "imageUrl": "./images/petsalang_1.png" },
                            { "name": "펫사랑 예식", "price": "350,000원", "desc": "기본 예식 + 오동나무관, 삼베이불, 생화 소량", "longDesc": "보호자의 필요와 상황에 맞춘 펫사랑의 기본 패키지 장례 서비스입니다. (공통예식 포함)", "imageUrl": "./images/petsalang_2.png" },
                            { "name": "품격 예식", "price": "450,000원", "desc": "기본 예식 + 오동나무관, 인견수의보/삼베수의 중 택 1, 생화", "longDesc": "반려동물의 품격을 더 높여드리기 위한 고급 수의 옵션이 포함된 품격 있는 장례 예식입니다.", "imageUrl": "./images/petsalang_3.png" },
                            { "name": "고급 예식", "price": "550,000원", "desc": "기본 예식 + 오동나무관, 삼베수의, 고급 린넨수의보 등", "longDesc": "최고급 린넨 수의보 등을 구성한 고급 예식 패키지입니다.", "imageUrl": "./images/petsalang_4.png" },
                            { "name": "최고급 예식", "price": "650,000원", "desc": "기본 예식 + 요람관, 최고급 목화솜수의보, 생화 등", "longDesc": "안락한 요람관과 최고급 목화솜 소재의 수의보를 제공하는 프리미엄 최고급 예식입니다.", "imageUrl": "./images/petsalang_5.png" }
                        ]
                    },
                    {
                        "category": "스톤 패키지 장례 (5kg 기준)",
                        "items": [
                            { "name": "기본 스톤 장례", "price": "650,000원", "desc": "펫사랑예식 + 기본 스톤함", "longDesc": "장례와 스톤 제작을 함께 이용하시는 분들을 위해 경제적으로 제공되는 패키지입니다. (초과 시 추가요금 발생)", "imageUrl": "./images/petsalang_stone_1.png" },
                            { "name": "품격 스톤 장례", "price": "1,000,000원", "desc": "품격예식 + 호두나무 액자 스톤함", "longDesc": "품격예식에 고급 호두나무 재질의 액자 스톤함이 포함된 패키지입니다.", "imageUrl": "./images/petsalang_stone_2.png" },
                            { "name": "고급 스톤 장례", "price": "1,200,000원", "desc": "고급예식 + 고급 원목 홈세트", "longDesc": "최상단 고급 예식과 원목 스톤함, 원목 액자, 플레이트가 결합된 원목 홈세트 장례입니다.", "imageUrl": "./images/petsalang_stone_3.png" }
                        ]
                    },
                    {
                        "category": "납골당 패키지 장례",
                        "items": [
                            { "name": "품격 납골당 장례", "price": "700,000원", "desc": "품격예식 + 기능성 유골함 + 납골당(전층) 1년", "longDesc": "가장 품격 있는 장례 후 기능성 유골함에 담아 납골당에 최초 1년 안치하는 패키지입니다. (기간 연장 시 비용 발생)", "imageUrl": "./images/petsalang_columbarium_1.png" },
                            { "name": "고급 납골당 장례", "price": "900,000원", "desc": "고급예식 + 호두나무 액자 안치함 + 납골당 1년", "longDesc": "고급 호두나무 액자가 결합된 안치함에 담아 납골당(전층)에 1년간 안치합니다.", "imageUrl": "./images/petsalang_columbarium_2.png" }
                        ]
                    }
                ],
                "address": "강원 강릉시 사천면 석교리 779",
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/gangneungpetsarang.webp"
            },
            "우바스": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "충북 청주시 상당구 남일면 가중리 309-1", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/ubas.webp" },
            "패투헤븐": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "패키지 장례",
                        "items": [
                            { "name": "레귤러 패키지", "price": "별도 문의", "desc": "관, 수의, 유골함이 포함된 장례입니다.", "longDesc": "우리 아이를 위한 관, 수의, 유골함이 포함된 장례입니다." , "imageUrl": "./images/pettoheaven_main.jpg"},
                            { "name": "스페셜 패키지", "price": "별도 문의", "desc": "관, 수의, 유골함이 포함된 장례입니다.", "longDesc": "우리 아이를 위한 관, 수의, 유골함이 포함된 장례입니다." },
                            { "name": "프리미엄 패키지", "price": "별도 문의", "desc": "관, 수의, 유골함이 포함된 장례입니다.", "longDesc": "우리 아이를 위한 관, 수의, 유골함이 포함된 장례입니다." },
                            { "name": "패투헤븐 패키지", "price": "별도 문의", "desc": "관, 수의, 유골함이 포함된 장례입니다.", "longDesc": "우리 아이를 위한 관, 수의, 유골함이 포함된 장례입니다." }
                        ]
                    },
                    {
                        "category": "메모리얼 스톤 장례 패키지",
                        "items": [
                            { "name": "레귤러 스톤 패키지", "price": "별도 문의", "desc": "패키지 장례 + 메모리얼 스톤", "longDesc": "패키지 장례 구성에 메모리얼 스톤이 더해진 장례입니다." },
                            { "name": "스페셜 스톤 패키지", "price": "별도 문의", "desc": "패키지 장례 + 메모리얼 스톤", "longDesc": "패키지 장례 구성에 메모리얼 스톤이 더해진 장례입니다." },
                            { "name": "프리미엄 스톤 패키지", "price": "별도 문의", "desc": "패키지 장례 + 메모리얼 스톤", "longDesc": "패키지 장례 구성에 메모리얼 스톤이 더해진 장례입니다." },
                            { "name": "패투헤븐 스톤 패키지", "price": "별도 문의", "desc": "패키지 장례 + 메모리얼 스톤", "longDesc": "패키지 장례 구성에 메모리얼 스톤이 더해진 장례입니다." }
                        ]
                    }
                ],
                "address": "강원 원주시 소초면 현촌길 90-3",
                "imageUrl": "./images/pettoheaven_main.jpg"
            },
            "포포즈 경기광주점": { "pricingType": "categorized", "prices": FOUR_PAWS_PRICES, "address": "경기 광주시 초월읍 신월리 592-19", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/pofos-kyungigwangju.webp" },
            "포포즈 김포점": { "pricingType": "categorized", "prices": FOUR_PAWS_PRICES, "address": "경기 김포시 월곶면 개곡리 810-1" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/ariapet.webp"},
            "아리아펫": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "경기 이천시 마장면 장암리 525-1", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/ariapet.webp" },
            "21그램 천안아산점": {
                "pricingType": "categorized",
                "prices": TWENTYONE_GRAM_PRICES,
                "address": "충청남도 천안시 동남구 광풍로 1668",
                "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/21gram-cheonanasan.webp"
            },
            "아이들랜드": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "경북 경산시 와촌면 신한리 570-2" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/rememberpark.webp"},
            "이별공간": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "울산 울주군 삼동면 조일리 906-4" , "imageUrl": "https://ebyulplace.com/wp-content/uploads/2025/02/공통장례1.webp"},
            "리멤버파크": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "충남 논산시 연산면 청동리 16", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/rememberpark.webp" },
            "펫콤": { "pricingType": "categorized", "prices": PETCOM_PRICES, "address": "경기 안산시 단원구 목내동 517-9", "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/petcom.webp" },
            "스타펫": { "pricingType": "categorized", "prices": STANDARD_PRICES, "address": "경기 포천시 내촌면 진목리 225" , "imageUrl": "./images/becomestars_1.jpg"},
            "별이되다": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "일반동물 (15kg 미만 기준)",
                        "items": [
                            { "name": "베이직 장례", "price": "250,000원", "desc": "장례 한지이불 국화 나무유골함 보자기", "longDesc": "장례를 위한 꼭 필요한 기본 장례 서비스로, 화장 이후 나무유골함과 보자기가 제공됩니다.", "imageUrl": "./images/becomestars_1.jpg" },
                            { "name": "별장례", "price": "500,000원", "desc": "베이직장례 인견덮는형 고급면수의 고급오동나무관 국화 나무유골함 보자기 사진액자 꽃장식", "longDesc": "반려동물 맞춤 화장용 관과 이불 / 덮는용 수의로 마지막 길을 따뜻하고 편안하게 보내줄 수 있는 장례서비스. 별장례의 경우 아이가 옷을 입히는 경우해서 총 2가지가 가능합니다.", "imageUrl": "./images/becomestars_3.jpg" },
                            { "name": "요람장례", "price": "600,000원", "desc": "장례 별이되다요람 국화 나무유골함 보자기 사진액자 꽃장식", "longDesc": "편안하게, 마치 신생아가 태어났을 때처럼, 포근하게 있을 수 있도록 자작나무로 자체개발한 요람 장례서비스", "imageUrl": "./images/becomestars_4.jpg" },
                            { "name": "천사장례", "price": "800,000원", "desc": "장례 최고급오동나무관 최고급린넨수의 국화 나무유골함 보자기 사진액자 꽃장식", "longDesc": "반려동물 맞춤 화장용 관과 이불 / 수의로 마지막 길을 따뜻하고 편안하게 보내줄 수 있는 장례서비스. 수의의 경우 흰색, 파랑색, 분홍색이 있습니다.", "imageUrl": "./images/becomestars_5.jpg" },
                            { "name": "꽃장식", "price": "80,000원", "desc": "베이직장례, 간소화장례 적용 가능", "longDesc": "아이의 마지막을 장식해주는 꽃 (베이직장례, 간소화장례 - 80,000원 추가)", "imageUrl": "./images/becomestars_6.jpg" }
                        ]
                    }
                ],
                "address": "경남 김해시 생림면 나전로 137번길 31",
                "imageUrl": "./images/becomestars_main.jpg"
            },
            "좋은친구들": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "일반 장례비용 (5kg 기준)",
                        "items": [
                            { "name": "기본 장례", "price": "150,000원", "desc": "예식실이용, 화장, 참관, 기본유골함", "longDesc": "모든 장례는 반려동물 체중 5kg을 기준으로 하며 초과시 1kg당 10,000원 추가비용이 발생합니다. (VAT별도)" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/joeunchingudeul.webp"},
                            { "name": "선택 사항", "price": "별도 문의", "desc": "수의, 관 별도 상담", "longDesc": "수의와 관 등 추가 선택사항은 보호자와의 별도 상담을 통해 결정됩니다." }
                        ]
                    }
                ],
                "address": "충청남도 공주시 우성면 보흥2길 36-61",
                "imageUrl": "./images/goodfriends_main.jpg"
            },
            "위드엔젤": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "일반 동물 장례 패키지 (5kg 미만 기준)",
                        "items": [
                            { "name": "기본 장례", "price": "250,000원", "desc": "기본 화장 등 필수 장례 절차 지원", "longDesc": "5kg 미만 기준의 가장 기본적인 장례 및 화장 절차입니다." , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/withangel.webp"},
                            { "name": "예식 용품", "price": "별도 문의", "desc": "선택 사항 및 세부 용품", "longDesc": "예식 용품이나 추가 선택 사항은 별도 문의 바랍니다." }
                        ]
                    }
                ],
                "address": "전북특별자치도 전주시 덕진구 쪽구름로 179-11",
                "imageUrl": "./images/withangel_main.png"
            },
            "더포에버": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "기본 장례식 (전과정 참관 및 단독추모실)",
                        "items": [
                            { "name": "소동물", "price": "150,000원", "desc": "기본장례", "longDesc": "부가세 별도" , "imageUrl": "https://d21ntoj848ohi.cloudfront.net/business-main-img/theforever.webp"},
                            { "name": "5kg 미만", "price": "200,000원", "desc": "기본장례", "longDesc": "부가세 별도" },
                            { "name": "10kg 미만", "price": "230,000원", "desc": "기본장례", "longDesc": "부가세 별도" },
                            { "name": "15kg 미만", "price": "250,000원", "desc": "기본장례", "longDesc": "부가세 별도" },
                            { "name": "20kg 미만", "price": "300,000원", "desc": "기본장례", "longDesc": "부가세 별도" },
                            { "name": "20kg 이상", "price": "300,000원~", "desc": "kg당 2만원 추가", "longDesc": "부가세 별도" }
                        ]
                    },
                    {
                        "category": "장례 용품 (선택 사항)",
                        "items": [
                            { "name": "수의", "price": "별도 문의", "desc": "상세 비용 보호자 상담", "longDesc": "부가 용품 선택에 따른 상세 비용은 장례식장으로 문의 바랍니다." },
                            { "name": "관", "price": "별도 문의", "desc": "상세 비용 보호자 상담", "longDesc": "부가 용품 선택에 따른 상세 비용은 장례식장으로 문의 바랍니다." },
                            { "name": "유골함", "price": "별도 문의", "desc": "상세 비용 보호자 상담", "longDesc": "부가 용품 선택에 따른 상세 비용은 장례식장으로 문의 바랍니다." },
                            { "name": "메모리얼스톤", "price": "별도 문의", "desc": "상세 비용 보호자 상담", "longDesc": "부가 용품 선택에 따른 상세 비용은 장례식장으로 문의 바랍니다." }
                        ]
                    }
                ],
                "address": "인천 서구 설원로 79",
                "imageUrl": "./images/theforever_main.png"
            },
            "스냅플러그": {
                "pricingType": "categorized",
                "prices": [
                    {
                        "category": "스냅플러그 장례 비용",
                        "items": [
                            { "name": "기본 장례", "price": "200,000원", "desc": "개별 화장, 추모실 이용 등 포함", "longDesc": "염습, 단독 추모실, 개별 화장, 기본 유골함, 보자기, 장례 확인서가 포함된 기본 장례 서비스입니다." }
                        ]
                    }
                ],
                "address": "부천시 도당동 121-2",
                "isAlliance": true
            }
        };

        // --- Data Enrichment Helper ---
        const PHONE_DATA = {
            "리틀포즈": "1551-5052", "포이리스": "1551-5052", "포포즈 화성점": "1551-5052", "스윗드림펫": "1551-5052", "스타티스": "1551-5052", "씨엘로펫": "1551-5052", "해늘마루": "1551-5052", "메리온": "05078718214", "펫오케스트라": "1551-5052", "전주아리움": "1551-5052", "전주하늘": "1551-5052", "펫포레스트 남양주점": "05078718324", "퍼스트펫": "05078718322", "젠틀펫스타": "1551-5052", "아이헤븐": "05078718213", "한별리멤버파크": "1551-5052", "별다만": "1551-5052", "해피엔딩": "1551-5052", "포포즈 김포점": "1551-5052", "타임투": "1551-5052", "펫바라기 남원점": "1551-5052", "푸른솔": "1551-5052", "러블리엔젤": "1551-5052", "오수펫추모공원": "05078718218", "펫바라기 일산점": "1551-5052", "포포즈 양주점": "1551-5052", "엔젤스톤": "05078718210", "패투헤븐": "1551-5052", "별이되다": "1551-5052", "스토리펫": "05078718320", "경북": "1551-5052", "러브펫 경기광주점": "1551-5052", "펫로스케어": "1551-5052", "21그램 남양주점": "1551-5052", "좋은친구들": "1551-5052", "하늘별": "1551-5052", "포포즈 세종점": "1551-5052", "펫포레스트 김포점": "05078718323", "더포에버": "1551-5052", "한별": "1551-5052", "몽몽이엠파크": "1551-5052", "21그램 천안아산점": "1551-5052", "스마일어게인": "05078718216", "21그램 경기광주점": "1551-5052", "백꽃사랑하이빛": "1551-5052", "어게인": "1551-5052", "하늘강아지": "1551-5052", "대전스카이펫": "1551-5052", "아이별": "1551-5052", "포포즈 김해점": "1551-5052", "하얀민들레": "1551-5052", "아이드림펫": "1551-5052", "펫노블레스": "1551-5052", "서래안펫타운": "1551-5052", "하늘소풍": "1551-5052", "리멤버": "1551-5052", "강아지펫헤븐": "1551-5052", "위드엔젤": "1551-5052", "펫포레스트 경기광주점": "05078718325", "굿바이펫": "05078718215", "로이힐즈": "1551-5052", "강릉펫사랑": "1551-5052", "우바스": "1551-5052", "포포즈 경기광주점": "1551-5052", "해피펫": "1551-5052", "아리아펫": "1551-5052", "아이들랜드": "1551-5052", "이별공간": "1551-5052", "리멤버파크": "1551-5052", "펫콤": "1551-5052", "스타펫": "1551-5052", "스냅플러그": "1551-5051"
        };
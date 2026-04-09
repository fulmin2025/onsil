import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// 솔라피 API KEY와 SECRET은 Supabase 대시보드의 Settings -> Edge Functions -> Secrets에서 설정해야 합니다.
// SOLAPI_API_KEY, SOLAPI_API_SECRET
const API_KEY = Deno.env.get("SOLAPI_API_KEY") || "";
const API_SECRET = Deno.env.get("SOLAPI_API_SECRET") || "";
const PFID = "KA01PF260408034734597Qg0MWoJwm6X";
const TEMPLATE_ID = "KA01TP260408034931311qxnv1nRriN5";
const SENDER = "01022921918";

console.log("Send Alimtalk function started");

serve(async (req) => {
  // CORS 처리
  if (req.method === "OPTIONS") {
    return new Response("ok", { 
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      }
    });
  }

  try {
    const { resData } = await req.json();
    
    // HMAC Signature 생성 (Solapi v4)
    const date = new Date().toISOString();
    const salt = Math.random().toString(36).substring(2, 12);
    
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(API_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(date + salt)
    );
    const signature = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const authHeader = `HMAC-SHA256 apiKey=${API_KEY}, date=${date}, salt=${salt}, signature=${signature}`;

    const response = await fetch("https://api.solapi.com/messages/v4/send-many", {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{
          to: resData.user_phone.replace(/-/g, ""),
          from: SENDER,
          text: `[The 온실] 장례 예약이 완료되었습니다.\n\n안녕하세요, ${resData.user_name} 보호자님. 아이의 마지막 길을 The 온실이 함께합니다.\n\n■ 상세 예약 정보\n\n예약자 성함: ${resData.user_name}\n예약일시: ${resData.reservation_date} ${resData.reservation_time}\n장례식장: ${resData.facility_name}\n아이 이름: ${resData.pet_name}\n결제금액: ${resData.service_price}\n\n■ 안내사항\n예약 시간에 맞춰 장례식장으로 방문해 주시면 정성을 다해 모시겠습니다.`,
          kakaoOptions: {
            pfId: PFID,
            templateId: TEMPLATE_ID,
            variables: {
              "#{reservation_datetime}": `${resData.reservation_date} ${resData.reservation_time}`,
              "#{funeral_home}": resData.facility_name,
              "#{user_name}": resData.user_name,
              "#{customer_name}": resData.user_name,
              "#{pet_name}": resData.pet_name,
              "#{total_amount}": resData.service_price.replace(/[^0-9]/g, ""),
            },
          },
        }],
      }),
    });

    const result = await response.json();
    console.log("Solapi Result:", result);

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      status: 200,
    });

  } catch (error) {
    console.error("Function Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      status: 500,
    });
  }
})

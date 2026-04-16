import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// 솔라피 API KEY와 SECRET은 Supabase 대시보드의 Settings -> Edge Functions -> Secrets에서 설정해야 합니다.
// SOLAPI_API_KEY, SOLAPI_API_SECRET
const API_KEY = Deno.env.get("SOLAPI_API_KEY") || "";
const API_SECRET = Deno.env.get("SOLAPI_API_SECRET") || "";
const PFID = "KA01PF260408034734597Qg0MWoJwm6X";
const TEMPLATE_ID = "KA01TP260408034931311qxnv1nRriN5";
const SENDER = "15515052";

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
          // text 필드를 제거하고 kakaoOptions만 사용하여 템플릿 일치 오류 방지
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
    if (!response.ok) {
        console.error("Solapi API Error Response:", JSON.stringify(result));
        throw new Error(result.errorMessage || "Solapi API 전송 실패");
    }
    console.log("Solapi Success Result:", JSON.stringify(result));

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

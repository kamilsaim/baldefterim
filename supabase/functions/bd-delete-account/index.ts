// bd-delete-account: kullanicinin Bal Defterim (bd_*) verilerini siler.
// DIKKAT: Bu Supabase projesi birden fazla uygulamayla PAYLASILIR (borc_*, hediye_*,
// brkt_*, user_data) ve hepsi ayni auth.users'i kullanir. Bu yuzden auth hesabini
// SADECE kullanicinin baska uygulamada verisi yoksa sileriz (akilli silme).
// Yeni uygulama eklenince onekini OTHER_APP_TABLES listesine ekle.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Bal Defterim disindaki uygulamalarin kullanici verisi tuttugu tablolar.
const OTHER_APP_TABLES = [
  "user_data",
  "brkt_data",
  "borc_ayarlar", "borc_people", "borc_debts", "borc_payments", "borc_cards",
  "hediye_persons", "hediye_records",
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Yetkilendirme yok" }), { status: 401, headers: { ...cors, "Content-Type": "application/json" } });
    }

    const url = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(url, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userErr } = await userClient.auth.getUser();
    if (userErr || !user) {
      return new Response(JSON.stringify({ error: "Gecersiz oturum" }), { status: 401, headers: { ...cors, "Content-Type": "application/json" } });
    }

    const uid = user.id;
    const admin = createClient(url, serviceKey);

    // 1) Her zaman: Bal Defterim verilerini sil (FK sirasi: once cocuklar, sonra sezonlar).
    await admin.from("bd_ayarlar").delete().eq("user_id", uid);
    await admin.from("bd_siparisler").delete().eq("user_id", uid);
    await admin.from("bd_hasatlar").delete().eq("user_id", uid);
    await admin.from("bd_zekatlar").delete().eq("user_id", uid);
    await admin.from("bd_sezonlar").delete().eq("user_id", uid);

    // 2) Kullanici baska bir uygulamada da veri tutuyor mu?
    let usesOtherApp = false;
    for (const t of OTHER_APP_TABLES) {
      const { count, error } = await admin.from(t).select("user_id", { count: "exact", head: true }).eq("user_id", uid);
      if (error) continue;
      if ((count ?? 0) > 0) { usesOtherApp = true; break; }
    }

    // 3) Baska verisi YOKSA auth hesabini tumuyle sil.
    if (!usesOtherApp) {
      const { error: delErr } = await admin.auth.admin.deleteUser(uid);
      if (delErr) throw delErr;
      return new Response(JSON.stringify({ success: true, account_deleted: true }), { headers: { ...cors, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ success: true, account_deleted: false, kept_for_other_apps: true }), { headers: { ...cors, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e?.message ?? e) }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });
  }
});

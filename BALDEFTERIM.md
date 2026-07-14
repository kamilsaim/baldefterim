# Bal Defterim 🍯 — Proje Devir Dokümanı

> Bu doküman, projeye terminalden (Claude Code) devam edebilmek için tüm bağlamı içerir.
> Repo: `https://github.com/kamilsaim/baldefterim` · Yayın: `https://kamilsaim.github.io/baldefterim/`

## 1. Proje Nedir?

Bal hasadı, ön sipariş, satış, stok, hediye ve zekat takibi yapan **tek dosyalık HTML PWA**.
Çok kullanıcılı: herkes Google ile giriş yapar, **yalnızca kendi kayıtlarını** görür (RLS).
Sahibi: Kamil. Dil: Türkçe (UI ve kod değişken adları Türkçe).

**Güncel sürüm: v2.1.8**

## 2. Dosyalar

| Dosya | Açıklama |
|---|---|
| `index.html` | Uygulamanın tamamı (~290 KB, logo base64 gömülü). CSS + HTML + JS tek dosyada |
| `manifest.json` | PWA manifest (`start_url: ./index.html`, standalone, portrait) |
| `sw.js` | Service worker. Kabuk: önce ağ, düşerse önbellek. **Supabase isteklerine dokunmaz** (origin farklı olduğu için pas geçer). Cache adı: `baldefterim-v2.1.8` |
| `ikon-192.png`, `ikon-512.png` | PWA ikonları (temiz/şeffaf sürüm, beyaz zemin, metin yok) |
| `README.md` | GitHub'da görünen tanıtım sayfası (yayına dahil) |
| `bal-defterim-kurulum.sql` | Supabase tablo + RLS kurulumu — **çalıştırıldı, `bd_` tabloları canlıda mevcut** |

Kaynak logo: `ballogo.png` (684×824, temizlenmiş/kararmış kenarları giderilmiş sürüm). `LOGO_TAM` bundan üretilir (320px), `LOGO_BASE64` ise `ikon-512.png`'den (140px, metinsiz amblem).

## 3. Altyapı

- **Supabase** (BeeBook projesiyle ORTAK veritabanı, tablolar `bd_` önekli):
  - URL: `https://pdxnpnlwrtswwifevlil.supabase.co`
  - Anon key: `index.html` içinde `SB_KEY` sabitinde (anon key public'tir, sorun değil; service_role ASLA client'a konmaz)
- **Google OAuth**: Supabase Auth üzerinden. `redirectTo: location.origin + location.pathname`
  - ⚠️ Bilinen konu: Dashboard → Authentication → URL Configuration → **Redirect URLs** listesine `https://kamilsaim.github.io/baldefterim/**` eklenmeli, yoksa giriş sonrası BeeBook'a (Site URL) yönlenir. Site URL'e dokunulmaz.
- **CDN**: `@supabase/supabase-js@2` (jsdelivr), SheetJS `xlsx 0.18.5` (cdnjs, Excel raporunda lazy-load)

## 4. Veritabanı Şeması (`bd_` tabloları)

Tümünde `user_id uuid default auth.uid()` + RLS: `user_id = auth.uid()` (for all, authenticated).
Ürün enum'u her yerde: `'suzme' | 'petek' | 'karakovan' | 'polen'`.

- **bd_sezonlar**: `id, user_id, ad, created_at`
- **bd_hasatlar**: `id, user_id, sezon_id (FK cascade), urun, miktar, tarih, aciklama, tip ('hasat'|'devir'), created_at`
- **bd_siparisler**: `id, user_id, sezon_id, musteri, tel, urun, miktar, fiyat, tarih, aciklama, hediye bool, teslim bool, teslim_tarih, odendi bool, odeme_tarih, created_at`
- **bd_zekatlar**: `id, user_id, sezon_id, urun, miktar, tarih, aciklama, created_at`
- **bd_ayarlar**: `user_id (PK), fiyatlar jsonb, aktif_sezon uuid, updated_at` — upsert ile yazılır
- **bd_surum**: `id=1 (tek satır), surum, notlar, updated_at` — herkes SELECT, kimse yazamaz (dashboard'dan elle güncellenir)

## 5. İş Kuralları (KRİTİK)

1. **Stok** = hasat + devir − teslim edilen siparişler − verilen zekat
   **Satılabilir** = stok − rezerve (teslim edilmemiş ön siparişler)
2. **Stok düşümü teslimatta olur**, sipariş girişinde değil. Teslim Edildi'ye her basışta uygulama içi onay popup'ı (`onaySor`) çıkar; stok yetersizse mesaj farklılaşır ama işlemi engellemez.
3. **ZEKAT: hasadın %10'u. `tip='devir'` kayıtları zekat hesabına ASLA dahil edilmez.** (Kamil'in özel isteği — sezon devrinde aktarılan stokun zekatı önceki sezonda zaten verilmiştir.) İlgili kod: `sezonVeri()` içinde `zekatHesap: hasatMik * 0.10` — `hasatMik` yalnızca `tip!=='devir'` toplamıdır.
4. **Hediye**: `hediye=true` → `fiyat=0`, satış/tahsilat/alacak hesaplarına girmez, ödeme rozeti gösterilmez, ama stoktan düşer.
5. **Alacak** = teslim edilmiş + ödenmemiş + hediye olmayan siparişlerin tutarı.
6. **Sezon devri**: Yeni sezon açılırken (opsiyonel anahtar) her ürünün kalan stoku yeni sezona `tip='devir'`, `aciklama='Önceki sezondan devir'` hasat kaydı olarak eklenir; aktif sezon `bd_ayarlar`a yazılır.
7. **Sürüm kontrolü**: Açılışta `bd_surum` okunur; sunucudaki sürüm gömülü `SURUM` sabitinden büyükse yeşil "Güncelle" bandı çıkar → `?v=timestamp` ile cache-bust reload. **Yeni sürüm yayınlama ritüeli**: (a) `index.html` içinde `SURUM`, (b) `sw.js` içinde `CACHE` adı, (c) dashboard'da `bd_surum.surum` — üçü birden güncellenir. `bd_surum` satırını kimse yazamadığı için **(c) her seferinde Kamil'in Supabase SQL editöründe elle çalıştırması gerekir** (`update bd_surum set surum='X.Y.Z' where id=1;`) — otomatikleştirilmedi, bilinçli tercih (bkz. §8).

## 6. index.html İç Yapısı

- Tek `<script>` bloğu, vanilla JS, framework yok. jQuery yok. Build yok.
- Global durum: `V = {sezonlar, aktifSezon, fiyatlar, hasatlar, siparisler, zekatlar}` — girişte tüm kullanıcı verisi `Promise.all` ile çekilir (`.range(0,9999)` — PostgREST 1000 satır limitine karşı).
- Her mutasyon: önce Supabase'e yaz, başarılıysa `V`'yi lokal güncelle + `localStorage('bd_cache')`'e yaz. Yeniden fetch yapılmaz.
- **Çevrimdışı**: fetch patlarsa `bd_cache`'ten salt-okunur açılır, kırmızı bant çıkar, yazma butonları `disabled`. `online` eventi → reload.
- Ekranlar (alt nav): Özet / Siparişler / Stok / Zekat. Modallar: sipariş (ekle+düzenle aynı form, `sipId` hidden), hasat, zekat, sezon, ayarlar, müşteri geçmişi.
- **Müşteri geçmişi**: sipariş kartında müşteri adına tıklayınca isim eşleşmesiyle (case-insensitive TR) tüm sezonlardaki siparişleri + toplam/alacak gösterir.
- Excel raporu: 4 sayfa (Stok Özeti, Siparişler, Hasatlar, Zekat), SheetJS lazy-load.
- Logo sabitleri: `LOGO_BASE64` (üst bar amblemi), `LOGO_TAM` (giriş ekranı + ayarlar modalı üstündeki tam logo, `#ayarLogo`).
- Adlandırma: fonksiyonlar/değişkenler Türkçe (`kaydetSiparis`, `sezonVeri`, `cizOzet`...). DB alanı `aciklama` (JS'te `not` kullanılmaz — SQL çakışması).
- **Modal sistemi**: Tüm `.modal-arka` ekran ortasında açılır (mobilde de — alttan kayan panel değil). `ac(id)`/`kapat(id)` ile aç/kapat. **Onay popup'ı**: native `confirm()` yerine `onaySor(mesaj, evetYazi, tehlikeli)` kullanılır — `Promise<boolean>` döner, `#modalOnay`'i gösterir; `tehlikeli!==false` ise buton kırmızı (`btn-tehlike`), aksi halde turuncu (`btn-bal`). Silme işlemleri ve "Teslim Edildi" onayı bunu kullanır.
- **Sipariş formu**: Ürün seçimi `<select>` değil buton grubu (`sipUrunButonlariCiz()` → `.urun-btn`, seçili olan `sipUrun` gizli input'a yazılır). Telefon ve Sipariş Tarihi yan yana (`satir-2`). Hasat/zekat modallarında ürün seçimi hâlâ dropdown (`urunSecenek()`).
- **iOS safe-area**: `header` içine `env(safe-area-inset-top)` padding'i eklendi — eklenmeden önce çentik/Dynamic Island header'ın bir kısmını (ayarlar/sezon butonlarının tıklama alanını) kapatıyordu. `nav` zaten `env(safe-area-inset-bottom)` kullanıyordu.
- **Ayarlar** artık header'da dişli ikonu değil, alt navigasyon çubuğunda (`#anaNav`) 5. buton — `gitSayfa()` akışına dahil değil, doğrudan `acAyarlar()` çağırır.
- **Sezon yönetimi** (`acSezonModal()`): her sezon satırında Düzenle (✏️, `sezonDuzenle` → `prompt()` ile yeniden adlandırır) ve — aktif sezon hariç — Sil (🗑️, `sezonSil` → `onaySor` ile, bağlı hasat/sipariş/zekat sayılarını göstererek) butonları var. **Sezon silme CASCADE'dir** (`bd_hasatlar/siparisler/zekatlar.sezon_id` → `ON DELETE CASCADE`) — aktif sezon ve tek kalan sezon silinemez, kod bunu engeller.
- **`baslat()` çift çalışma koruması**: `oturumKontrol()` ve `onAuthStateChange('SIGNED_IN')` aynı anda tetiklenebiliyordu (Supabase ilk yüklemede de bu event'i ateşliyor), bu da `veriYukle()`'nin iki kez çalışıp **varsayılan sezonun (`"YYYY Sezonu"`) veritabanında iki kez oluşmasına** yol açıyordu. `let baslatildi=false` bayrağı ile `baslat()` artık ilk çağrıdan sonra no-op. Bu bug canlıda **2026 Sezonu**'nun iki kez oluşmasına ve içine girilen 1 hasat + 1 siparişin yanlış (görünmeyen) kopyaya yazılmasına sebep olmuştu — 2026-07-14'te elle düzeltildi (kayıtlar doğru sezona taşındı, kopya silindi).
- **Teslim/ödeme geri alma**: Sipariş kartında teslim edilmişse "↩️ Teslimi Geri Al" (`teslimGeriAl` — `teslim=false`, stoğa geri eklenmiş olur çünkü stok formülü zaten `teslim=true` olanları düşer), ödemesi alınmışsa "↩️ Ödemeyi Geri Al" (`odemeGeriAl`) butonu çıkar. İkisi de `onaySor` ile onay ister.
- **Ana ekrana ekle uyarısı** (`kurUyarisiKontrol()`, `baslat()` sonunda çağrılır): `window.Capacitor` tanımlıysa (APK) veya zaten `display-mode: standalone` / `navigator.standalone` ise hiç göstermez. iOS'ta Safari paylaş menüsü, Android'de tarayıcı ⋮ menüsü metni ile `#modalKur` açılır; `localStorage.bd_kur_gosterildi` ile bir daha çıkmaz.
- **Özet ekranı**: `#ozetUrunSatis` kartı — ürün bazında teslim edilmiş siparişlerin toplam adet ve tutarını gösterir (stok kartının hemen üstünde).
- **Tarih inputları**: `input[type=date]` için ayrı CSS kuralı (`min-height:0`, native appearance kapalı) eklendi — önceden diğer form alanlarına göre taşacak kadar büyük görünüyordu.

## 7. Yol Haritası / Yapılacaklar

- [ ] Redirect URL ayarı doğrulanacak (BeeBook'a yönlenme sorunu — bkz. §3)
- [ ] **Capacitor ile APK** → **şimdilik ertelendi, ileride yapılacak.** Sıra gelince Kamil'in `CAPACITOR_APK_REHBERI.md` playbook'u aynen uygulanacak (Türbedar'da denenmiş akış). Kritik notlar: Google girişte `disallowed_useragent` hatasına karşı `@capacitor/browser` kullan; navigation bar rengi `MainActivity.java`'da programatik ayarlanıyor.
- [ ] Play Store yayını (ileride, APK'dan sonra)
- [ ] Olası fikirler: sezon karşılaştırma raporu, tahsilat hatırlatması, kısmi ödeme

## 8. Kamil'in Tercihleri (özet)

- Tek dosya HTML, Türkçe UI, framework'süz vanilla JS
- Windows'ta çalışır, GitHub Pages'e web arayüzünden dosya sürükleyerek deploy eder
- Supabase deneyimli (RLS, upsert, Realtime bilir) — hata mesajlarını konsoldan yapıştırır
- API anahtarları/tokenlar chat'te paylaşılmaz, push'u kendi yapar

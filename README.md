<div align="center">

<img src="ballogo.png" alt="Bal Defterim" width="240">

# Bal Defterim

**Kovandan kavanoza, tek ekrandan takip**

_Bal hasadı, ön sipariş, satış, stok, hediye ve zekat takibini tek yerde toplayan basit bir defter uygulaması._

[**▶ Uygulamayı Aç**](https://kamilsaim.github.io/baldefterim/)

</div>

---

## Bal Defterim nedir?

Arıcılık yapan ya da bal satan herkesin elinde dağınık defterler, WhatsApp mesajları ve akılda tutulan hesaplar birikir: kim ne kadar sipariş verdi, kime hediye gönderildi, sezonda ne kadar hasat alındı, zekatı verildi mi... Bal Defterim bu takibi tek bir yerde toplar.

Her kullanıcı Google hesabıyla giriş yapar ve yalnızca kendi kayıtlarını görür. Veriler buluta kaydedilir, telefon değişse veya uygulama silinse bile kaybolmaz.

## Nasıl çalışır?

1. **Google ile giriş yap** — kayıt formu yok, tek tıkla başla.
2. **Hasat gir** — sezon boyunca aldığın balı ürün ürün kaydet.
3. **Sipariş ekle** — müşteri, ürün, miktar ve fiyatı gir; hediye ise işaretle.
4. **Teslim et** — sipariş teslim edildiğinde stoktan otomatik düşer.
5. **Zekat ve raporları takip et** — hasadın öşürünü kaydet, sezon sonunda Excel raporu al.

## Öne çıkan özellikler

- 📦 **Stok takibi** — hasat, devir, teslimat ve zekat düşümüyle güncel stok ve rezerve miktar
- 🧾 **Sipariş yönetimi** — ön sipariş, teslimat ve ödeme durumu ayrı ayrı izlenir
- 🎁 **Hediye desteği** — hediye siparişler satış ve alacak hesaplarına girmez, ama stoktan düşer
- 🕌 **Zekat takibi** — hasadın %10'u otomatik hesaplanır, sezon devrindeki stok zekata dahil edilmez
- 🔄 **Sezon devri** — yeni sezon açılınca kalan stok otomatik olarak devredilir
- 👥 **Müşteri geçmişi** — bir müşterinin tüm sezonlardaki siparişleri ve alacağı tek ekranda
- 📊 **Excel raporu** — stok, sipariş, hasat ve zekat verileri dört sayfalık raporla dışa aktarılır
- 📡 **Çevrimdışı görüntüleme** — bağlantı yokken son senkronize veriler salt okunur açılır

## Teknoloji

Tek dosyalık HTML + vanilla JavaScript uygulaması; backend olarak [Supabase](https://supabase.com) (Postgres + satır bazlı güvenlik + Google OAuth) kullanır. GitHub Pages üzerinden yayınlanır ve PWA olarak ana ekrana eklenebilir; Android için Capacitor ile kabuk APK'sı da mevcuttur.

## Sürüm Geçmişi

| Sürüm | Öne çıkanlar |
|-------|--------------|
| **2.1.8** | Teslim edildi / ödeme alındı işaretlerini geri alma butonları, iOS/Android tarayıcıdan açanlara ilk açılışta "ana ekrana ekle" uyarısı (APK ve yüklü PWA'da gösterilmez) |
| **2.1.7** | Tarih kutuları diğer form alanlarıyla eşitlendi (taşma giderildi), özet ekranına ürün bazlı satış tutarları eklendi |
| **2.1.6** | Ayarlar alt menüye taşındı, çift sezon oluşturma hatası düzeltildi, sezon düzenleme/silme eklendi |
| **2.1.5** | Header'da iPhone çentik/güvenli alan düzeltmesi, sipariş modalında ürün seçimi butonlaştırıldı, tüm popuplar ekran ortasında açılıyor, teslim onayı popup'ı eklendi |
| **2.1.1** | Temizlenmiş logo ve uygulama ikonları |
| **2.0.0** | Supabase'e taşınan çok kullanıcılı sürüm (Google girişi, RLS) |

## Katkı

Fikir ve hata bildirimleri için uygulamaya gir, kendi sezonunla dene ve gördüğün eksikleri ilet.

---

<div align="center">
<sub>🍯 Kovandan kavanoza, hesabı Bal Defterim'de tutulur.</sub>
</div>

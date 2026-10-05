<div align="center">

<img src="ballogo.png" alt="Bal Defterim" width="220">

# 🍯 Bal Defterim

**Kovandan kavanoza, tek ekrandan takip**

_Bal hasadı, ön sipariş, satış, stok, hediye ve zekat takibini tek yerde toplayan basit bir defter uygulaması._

![Sürüm](https://img.shields.io/badge/sürüm-2.6.2-E8A013?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-ana%20ekrana%20eklenebilir-8B5E34?style=flat-square)
![Vanilla JS](https://img.shields.io/badge/vanilla-JS-F5C24B?style=flat-square)
![Supabase](https://img.shields.io/badge/backend-Supabase-3ECF8E?style=flat-square)
[![Google Play](https://img.shields.io/badge/Google%20Play-yayında-34A853?style=flat-square&logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=com.kamilsaim.baldefterim)

[**▶ Uygulamayı Aç**](https://kamilsaim.github.io/baldefterim/) &nbsp;·&nbsp; [**📱 Google Play'den İndir**](https://play.google.com/store/apps/details?id=com.kamilsaim.baldefterim)

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
5. **Zekat ve raporları takip et** — hasadın öşürünü kaydet, sezonun durumunu rapor ekranından gör, dilersen Excel'e aktar.

## Öne çıkan özellikler

| | |
|---|---|
| 📦 **Stok takibi** | Hasat, devir, teslimat ve zekat düşümüyle güncel stok ve rezerve miktar |
| 🧾 **Sipariş yönetimi** | Ön sipariş, teslimat ve ödeme durumu ayrı ayrı izlenir |
| 🎁 **Hediye desteği** | Hediye siparişler satış ve alacak hesaplarına girmez, ama stoktan düşer |
| 🐝 **Kendi ürünlerin** | Sabit listeyle sınırlı değilsin; kendi stok türünü ekle, her ürün için zekata tabilik ve çıta takibini ayrı ayrı seç |
| 🧱 **Çıta takibi** | Petek/karakovan gibi çıta bazlı satılan ürünlerde kg'a göre çıta adedi otomatik önerilir (elle düzeltilebilir); hasat, sipariş, stok, rapor ve Excel'de görünür |
| 🕌 **Zekat takibi** | Zekata tabi ürünlerde hasadın %10'u otomatik hesaplanır, sezon devrindeki stok zekata dahil edilmez |
| 🔄 **Sezon devri** | Yeni sezon açılınca kalan stok otomatik olarak devredilir |
| 👥 **Müşteri geçmişi** | Bir müşterinin tüm sezonlardaki siparişleri ve alacağı tek ekranda |
| 📊 **Sipariş raporu** | Satış, tahsilat, alacak, hediye ve zekat rakamları ürün bazında tek ekranda; tek dokunuşla metin olarak paylaş |
| 📥 **Excel raporu** | Stok, sipariş, hasat ve zekat verileri dört sayfalık raporla dışa aktarılır |
| 💾 **Yedek al / yükle** | Verilerini JSON olarak indir, gerektiğinde aynı dosyadan geri yükle |
| 📡 **Çevrimdışı görüntüleme** | Bağlantı yokken son senkronize veriler salt okunur açılır |

## Teknoloji

Tek dosyalık HTML + vanilla JavaScript uygulaması; backend olarak [Supabase](https://supabase.com) (Postgres + satır bazlı güvenlik + Google OAuth) kullanır. GitHub Pages üzerinden yayınlanır ve PWA olarak ana ekrana eklenebilir; Android sürümü Capacitor ile paketlenir ve [Google Play'de yayındadır](https://play.google.com/store/apps/details?id=com.kamilsaim.baldefterim).

## Sürüm Geçmişi

| Sürüm | Öne çıkanlar |
|-------|--------------|
| **2.6.2** | Hediyeler ve verilen zekatlar sipariş kartı görünümünde (ürün bazlı özet çipleri, Verilecek/Verildi grupları, doğrudan "Hediye Ekle"); Sezon Raporu yenilendi: özet kutuları + tahsilat çubuğu, bekleyen hediyeler, hasat ve devir ayrı ayrı kalanlarıyla "Stok Durumu" bölümü (metin kopyası ve Excel'de de) |
| **2.6.1** | Stok ekranında bu sezon hasadı ve eski sezondan devir ayrı ayrı (her biri kendi kalanıyla); yeni sezona yalnızca satılabilir stok devrediyor (ön siparişe ayrılan bal iki kez sayılmıyor); gece 00:00–03:00 arası girilen kayıtların bir önceki güne kayması düzeltildi; ayar kaydı başarısız olunca artık "kaydedildi" denmiyor; müşteri adı/notlarındaki özel karakterler ( ' < & ) ekranı bozmuyor; çıkışta çevrimdışı önbellek temizleniyor |
| **2.6.0** | Petek/karakovan gibi çıta bazlı satılan ürünlerde çıta (bar) adedi takibi: kg'a göre otomatik önerilir, elle düzeltilebilir; hasat, sipariş, stok, rapor ve Excel çıktısında görünür; sipariş formunda tutar/alınan-tutar ve eski sezon/hediye seçenekleri yan yana |
| **2.5.2** | iOS ana ekrana eklenen PWA'da alt menü ve üst bar konumlandırma düzeltmesi (viewport-fit=cover kaldırıldı); dikey elastic scroll (bounce) engellendi |
| **2.5.1** | Sipariş aramasına temizleme (✕) butonu; Zekat/Hediyeler/Hasat Kayıtları başlıklarında kısa özet (kayıt sayısı, giriş/kalan miktar); hasat kayıtlarında her girişin kendi kalanı (FIFO) ve ürün bazında özet; hediyeler listesinde teslim et/geri al; ana sayfa özetinde ürün bazlı sipariş adedi ve alacaklar kartından siparişe gitme |

<details>
<summary>Daha eski sürümler</summary>

| Sürüm | Öne çıkanlar |
|-------|--------------|
| **2.5.0** | Hediyeler artık Zekat ekranında ayrı bir liste; Ayarlar popup'tan tam sayfaya taşındı; eski sezondan kalan (devir) stok istenildiği an elle eklenebiliyor ve bir satışta "bu sezon / eski sezon" seçilebiliyor |
| **2.4.0** | Siparişlerde kısmi ödeme: 💰 butonu artık tutar soruyor, eksik ödeme "Kısmi" rozetiyle görünür ve alacak hesapları kalan borç üzerinden yapılır; sipariş kartları daha derli toplu (rozetler yan yana) |
| **2.3.2** | iPhone'da ana ekrana eklenen uygulamada soldan sağa kaydırınca çıkan beyaz ekran giderildi |
| **2.3.1** | Android geri tuşu artık uygulamada kalıyor: açık pencereyi kapatır, alt sekmeden Özet'e döner, çıkmak için iki kez basmak gerekir (oturum ekranına düşmez); müşteri adı yazarken baş harfler otomatik büyür |
| **2.3.0** | Ayarlar'dan kendi ürünlerini ekleme/düzenleme ve ürün bazında zekata tabilik seçimi, stok ekranında hasat/devir/teslim/hediye/zekat kırılımı, siparişler ekranında ürün bazlı sipariş raporu (metin olarak paylaşılabilir) |
| **2.2.1** | Google ile giriş yaparken oluşan hata giderildi (Android) |
| **2.2.0** | Müşteri adı otomatik tamamlama (+telefon otomatik dolar), özet ekranında tahsil edilmemiş alacaklar (WhatsApp hatırlatma), önceki sezonla karşılaştırma kartı, 30 günü geçen yedekler için Ayarlar'da uyarı, yatay kaydırılabilir alanlarda sekme swipe'ı devre dışı |
| **2.1.9** | Yedekten yükleme (JSON içe aktarma), sipariş toplamını elle düzeltme (indirim/yuvarlama), sipariş kartı buton düzeni yenilendi, uygulama içinden hesap silme + gizlilik politikası (Play Store hazırlığı) |
| **2.1.8** | Teslim edildi / ödeme alındı işaretlerini geri alma butonları, iOS/Android tarayıcıdan açanlara ilk açılışta "ana ekrana ekle" uyarısı (APK ve yüklü PWA'da gösterilmez) |
| **2.1.7** | Tarih kutuları diğer form alanlarıyla eşitlendi (taşma giderildi), özet ekranına ürün bazlı satış tutarları eklendi |
| **2.1.6** | Ayarlar alt menüye taşındı, çift sezon oluşturma hatası düzeltildi, sezon düzenleme/silme eklendi |
| **2.1.5** | Header'da iPhone çentik/güvenli alan düzeltmesi, sipariş modalında ürün seçimi butonlaştırıldı, tüm popuplar ekran ortasında açılıyor, teslim onayı popup'ı eklendi |
| **2.1.1** | Temizlenmiş logo ve uygulama ikonları |
| **2.0.0** | Supabase'e taşınan çok kullanıcılı sürüm (Google girişi, RLS) |

</details>

### Play Store sürümleri

Uygulama kabuğu canlı siteyi çektiği için her sürüm yeni AAB gerektirmez; yalnızca native/manifest değişikliklerinde yeniden derlenir.

| versionCode | versionName | Yayın notu |
|-------------|-------------|------------|
| 3 | 2.5.1 | Ürün yönetimi ve ürün bazlı stok takibi; sipariş raporu, kısmi ödeme (peşin/kapora) ve alacak özeti; hediyeler zekât sayfasına taşındı (teslim et/geri al); hasat girişlerinde kalan miktar takibi ve kayıt düzenleme; arama, özet başlıklar; Android geri tuşu ve iOS kaydırma jesti düzeltmeleri |
| 2 | 2.2.1 | Google ile giriş hatası düzeltmesi (deep-link OAuth akışı) |

## Katkı

Fikir ve hata bildirimleri için uygulamaya gir, kendi sezonunla dene ve gördüğün eksikleri ilet.

---

<div align="center">
<sub>🍯 Kovandan kavanoza, hesabı Bal Defterim'de tutulur.</sub>

<sub>Geliştirici: <a href="https://kamilsaim.web.app">kamilsaim.web.app</a></sub>
</div>

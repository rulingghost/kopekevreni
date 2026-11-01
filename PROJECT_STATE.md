# KÖPEK EVRENİ - PROJE DURUMU VE MİMARİ TAKİP DOKÜMANI (PROJECT_STATE.md)

> **Proje Kimliği:** Köpek İlanları & Cins Portalı (`kopekdunyasi.com` sade ve hızlı ilan arama/cins mimarisi ile Pawvelle lüks butik tasarımının Next.js 13 sentezi).  
> **Tasarım & Fonksiyon Felsefesi:** Boş ve gereksiz editoryal/rehber metinlerinden arındırılmış; doğrudan **İlan Arama, Cinsler, Vitrin İlanları ve Şehirlere Göre Filtreler** odaklı sade, hızlı ve kullanışlı yapı.  
> **Temel Şablon:** Envato Chisfis - Directory & Listing (Next.js 13+ App Router, TypeScript, Tailwind CSS).  
> **Geliştirme Protokolü:** 7 Fazlı Yol Haritası, Sıkı Token Koruması, Sıfır Ticari/Satış Fonksiyonu (Tamamen Ücretsiz & Can Güvenliği Odaklı).

---

## 🚫 KESİN KIRMIZI ÇİZGİLER VE PRENSİPLER
1. **SATIŞ VE TİCARİ MODÜL YOK:** Sistemde kesinlikle "Satılık", "Fiyat", "Sepet", "Ödeme Geçidi (Iyzico/Stripe)", "Doping", "Abonelik", "Kredi Kartı" modülleri bulunmamaktadır. Kırmızı çizgi sayfaları (`checkout`, `pay-done`, `subscription`, `account-billing`) tamamen kaldırılmıştır.
2. **DURUM ROZETLERİ:** Şablondaki tüm fiyat (`$ / ₺ / Price`) alanları "Ücretsiz Sahiplendirme", "Yuva Arıyor", "Eş Arıyor", "Kayıp / Aranıyor" durum rozetlerine dönüştürülmüştür.
3. **5199 SAYILI KANUN & CAN GÜVENLİĞİ:** Tüm ilan ve detay sayfalarında canlı hayvan satışı yasağı ve mikroçip devir zorunluluğu yasal bildirim kutuları ile güvence altına alınmıştır.

---

## 🗺️ TAMAMLANAN ŞABLON DÖNÜŞÜM HARİTASI

| Şablon Klasörü / Bileşeni | Eski Görevi | Köpek Evreni Dönüşümü | Durum |
| :--- | :--- | :--- | :--- |
| `src/app/(stay-listings)` | Otel / Konaklama Listeleme | **İlan Listeleme Sayfaları (`/listing-stay`)** (Gelişmiş Çok Kriterli Filtre, Çekmece & Harita) | Tamamlandı |
| `src/app/(listing-detail)/listing-stay-detail` | Otel Detay Sayfası | **İlan Detay Sayfası (`/listing-stay-detail`)** (Bento Galeri, Hayvan Kimlik Kartı, Sağlık Rozetleri, WhatsApp İletişim) | Tamamlandı |
| `src/app/(car-listings)` | Araç Kiralama Listeleme | **İnteraktif Irk Rehberi / Ansiklopedi (`/listing-car`)** (Boyut & Karakter Filtreli Irk Kataloğu) | Tamamlandı |
| `src/app/(listing-detail)/listing-car-detail` | Araç Detay Sayfası | **Irk Ansiklopedisi Detayı (`/listing-car-detail`)** (1-5 Puan Karakter Analizi, Fiziksel Metrikler, 4 Sekmeli İçerik, Çapraz İlanlar) | Tamamlandı |
| `src/app/add-listing` | 10 Adımlı Gayrimenkul İlan Verme | **4 Adımlı Evcil Hayvan İlan Sihirbazı (`/add-listing`)** (İlan Türü/Irk, Künye/Sağlık, Fotoğraf/Hikaye, Konum/İletişim & 5199 Taahhüdü) | Tamamlandı |
| `src/app/(account-pages)` | Kullanıcı Hesap Yönetimi | **Kullanıcı Paneli** (`/account`: Profil, `/account-savelists`: Yayındaki İlanlarım & Favorilerim, `/account-password`: Güvenlik) | Tamamlandı |
| `src/app/checkout` | Satın Alma & Ödeme | **KAPSAM DIŞI (KIRMIZI ÇİZGİ)** | Tamamen Silindi |
| `src/app/pay-done` | Ödeme Başarılı Ekranı | **KAPSAM DIŞI (KIRMIZI ÇİZGİ)** | Tamamen Silindi |
| `src/app/subscription` | Ücretli Abonelik | **KAPSAM DIŞI (KIRMIZI ÇİZGİ)** | Tamamen Silindi |
| `src/app/(account-pages)/account-billing` | Fatura Bilgileri | **KAPSAM DIŞI (KIRMIZI ÇİZGİ)** | Tamamen Silindi |

---

## 📊 FAZ TAKİP VE TAMAMLANMA TABLOSU (7/7 TAMAMLANDI)

- [x] **FAZ 1: Keşif, Temizlik Analizi ve `PROJECT_STATE.md` Kurulumu**
  - Envato Chisfis şablon mimarisi incelendi.
  - Ticari, ödeme ve gereksiz sayfalar tespit edilip kapsam dışı bırakıldı.
  - Sayfa/bileşen dönüşüm haritası ve hedef veri şeması oluşturuldu.
- [x] **FAZ 2: Veri Modelleri (TypeScript Interfaces) ve Zengin Türkçe Mock Data**
  - `src/types/pet.ts` ve `src/types/index.ts` oluşturuldu (`PetListing`, `DogBreed`, `DirectoryPlace`, `UserProfile`, `HealthBadges` vb.).
  - `src/data/mockBreeds.ts`: Türkiye'de en popüler 12 köpek ırkı (Golden, Kangal, Alman Kurdu, French Bulldog, Pomeranian, Rottweiler, Toy Poodle vb.) 1-5 karakter puanları, fiziksel metrikler ve 4 sekmeli Türkçe içerikle hazırlandı.
  - `src/data/mockPets.ts`: İstanbul, Ankara, İzmir, Bursa, Antalya, Muğla gibi illere yayılmış 15 detaylı ilan (`ADOPTION`, `MATING`, `LOST_FOUND`) sağlık rozetleri, WhatsApp ve aciliyet durumlarıyla hazırlandı.
  - `src/data/mockDirectory.ts`: 6 kurumsal merkez (7/24 Acil Hayvan Hastanesi, Pozitif Köpek Eğitim Akademisi, Pet Otel, Sivas Valiliği Resmi Kangal Çiftliği) konum ve hizmetleriyle hazırlandı.
- [x] **FAZ 3: Global Layout, Renk Paleti ve Navigasyon Dönüşümü**
  - Renk paleti sıcak evcil hayvan temasına (`#F59E0B` Sıcak Kehribar ana rengi, `#10B981` Doğa/Sağlık Yeşili, `#0F172A` Koyu Antrasit ve Yumuşak Slate) dönüştürüldü (`src/styles/__theme_colors.scss`).
  - `src/shared/Logo.tsx` modern pati ikonlu ve tipografik "🐾 KÖPEK EVRENİ" logosu ile güncellendi.
  - `src/data/navigation.ts` tamamen Türkçe; İlanlar, Irk Ansiklopedisi (Mega Menülü), Kurumsal Rehber ve Bilgi Kütüphanesi yapısına kavuşturuldu.
  - Header (`MainNav1.tsx` & `SiteHeader.tsx`) sadeleştirildi; gereksiz para birimi ve demo araçları arındırıldı, parlak **"🐾 Ücretsiz İlan Ver"** ve "Giriş Yap" butonları entegre edildi.
  - Mobil çekmece menüsü (`NavMobile.tsx`) ve mobil alt yapışkan bar (`FooterNav.tsx`) Türkçe, modern ve pati aksiyon butonlu hale getirildi.
  - `Footer.tsx` evcil hayvan kategorileri, kurumsal bağlantılar ve 5199 sayılı kanuna uygun **"Kesin Ticari Satış Yasağı ve Ücretsiz Sahiplendirme"** yasal uyarısıyla baştan inşa edildi.
  - `src/app/layout.tsx` Türkçe dil etiketi (`lang="tr"`), Türkçe meta başlıkları ve açıklaması ile güncellendi.
- [x] **FAZ 4: Anasayfa (Landing Page) İnşası**
  - Hero Bölümü: Degrade kehribar arka plan, etkileyici başlıklar, hızlı istatistikler ve `PetHeroSearchForm` (İlan Türü sekmeleri + Serbest Arama + Irk Seçimi + Şehir Seçimi) ile inşa edildi.
  - Bölüm 1: Popüler Köpek Irkları Ansiklopedisi (`BreedCard` bileşeni ile görsel kartlar, boyut etiketleri ve Apartman/Eğitilebilirlik puan barları).
  - Bölüm 2: Acil Yuva Arayanlar & Vitrin İlanları (`PetCard` bileşeni; fiyat kaldırıldı, yerine "🏡 Yuva Arıyor (Ücretsiz)", "❤️ Eş Arıyor", "🚨 Kayıp Can" rozetleri, yeşil onaylı sağlık durumları ve doğrudan WhatsApp iletişim butonu eklendi; Tümü/Yuva/Eş/Kayıp dinamik sekmeleri kuruldu).
  - Bölüm 3: "Nasıl Çalışır? 3 Kolay Adım" (İncele & İletişim, Sözleşme İmzala, Ömür Boyu Aile Ol) ve 🚫 "Satın Alma, Sahiplen! Canlı Hayvan Satışı Kesinlikle Yasaktır" özel bildirim kutusu.
  - Bölüm 4: Nöbetçi Veterinerler & Eğitim Merkezleri (`DirectoryCard` bileşeni ile 7/24 açık rozeti, hizmetler, puan/yorum ve doğrudan arama butonu).
- [x] **FAZ 5: İlan Listeleme (Gelişmiş Filtre) ve İlan Detay Sayfası**
  - Listeleme Sayfası (`/listing-stay`): Sol tarafta `PetListingFilter` (İlan Türü, Irk, Şehir, Cinsiyet, Yaş Grubu, Boyut, Sağlık Kriterleri: Aşı, Çip, Kısır, Apartman Uyumu vb. ve Acil İlanlar filtresi), mobilde çekmeceli modal, sağda `PetCard` gridi ve dinamik sıralama/sonuç sayacı tamamlandı.
  - Haritalı Listeleme (`/listing-stay-map`): `SectionGridHasMap` tamamen pet ilanlarına uyarlandı; interaktif şehir pinleri, mini ilan önizleme kartları ve liste görünümüne hızlı geçiş eklendi.
  - İlan Detay Sayfası (`/listing-stay-detail`): Üstte 5'li modern Bento fotoğraf galerisi (Lightbox modalı), solda Hayvan Kimlik Kartı tablosu, yeşil onaylı Sağlık Rozetleri, detaylı açıklama metni ve teslim bölgesi harita kutusu; sağda ise Sticky İlan Sahibi Profili, doğrudan **"WhatsApp ile Mesaj Gönder"**, güvenli **"Telefon Numarasını Göster"** ve **"Güvenli Sahiplenme & Kapora Dolandırıcılığı Uyarısı"** entegre edildi.
  - Mobil yapışkan alt rezervasyon/fiyat çubuğu (`MobileFooterSticky.tsx`) tamamen temizlenerek fiyatsız **"%100 Ücretsiz Sahiplendirme"** ve **"WhatsApp ile Ulaş"** aksiyonuna dönüştürüldü.
- [x] **FAZ 6: İnteraktif Irk Rehberi (Ansiklopedi)**
  - Irk Listeleme (`/listing-car`): Boyuta göre (Minyatür, Küçük, Orta, Büyük, Dev) ve niteliklere göre (Apartmana Uygun, Tüy Dökmeyen, Kolay Eğitilen, İyi Bekçi, Çocuk Dostu) filtrelenebilen arama motorlu zengin ırk kataloğu tamamlandı.
  - Irk Detay (`/listing-car-detail`): Seçili ırkın 5'li Bento fotoğraf galerisi, 1-5 arası görsel ilerleme çubuklarıyla (Apartman, Tüy Dökme, Eğitilebilirlik, Çocuk/Köpek Uyumu, Enerji, Bekçilik) karakter analiz grafiği, fiziksel metrikler (boy, kilo, yaşam süresi, köken, tüy yapısı), 4 sekmeli derin içerik (Mizaç, Bakım & Beslenme, Tarihçe, Yatkın Sağlık Sorunları) ve sayfanın altında otomatik çapraz ilişkili **"Bu Irka Ait Güncel İlanlar"** bileşeni inşa edildi.
- [x] **FAZ 7: Çok Adımlı İlan Verme Sihirbazı & Kullanıcı Paneli & Kırmızı Çizgi Temizliği**
  - 10 adımlı gayrimenkul formu, 4 adımlı pratik evcil hayvan sihirbazına dönüştürüldü (`/add-listing`):
    - **Adım 1:** İlan Türü (`ADOPTION` / `MATING` / `LOST_FOUND`), Pet Türü (`DOG` / `CAT` / `OTHER`), Irk Seçimi ve İlan Başlığı.
    - **Adım 2:** Hayvan Künyesi (Adı, Yaş Grubu, Net Yaş, Cinsiyet, Boyut) ve 8 adet sağlık/eğitim onay rozeti (Aşı, Çip, Kısır, Parazit, Tuvalet, Apartman, Secere, Acil).
    - **Adım 3:** Fotoğraf Yükleme Alanı (Sürükle-bırak / önizleme / kapak seçimi) ve Hikaye/Açıklama alanı.
    - **Adım 4:** Konum (İl/İlçe/Mahalle), İletişim Tercihleri (WhatsApp izni, telefon gizleme), 5199 Sayılı Kanun Ücretsiz Sahiplendirme Taahhüdü ve Başarılı Yayınlama Ekranı.
  - Kullanıcı Paneli (`/account`): Doğrulanmış Hayvansever Üye rozeti, profil bilgileri, bio ve gizlilik taahhüdü.
  - Kullanıcı İlan ve Favori Yönetimi (`/account-savelists`): "Yayındaki İlanlarım" (Yönetim aksiyonları ve 'Yuvalandı Olarak İşaretle'), "Favori Canlar" (`PetCard`), "Kaydettiğim Irklar" (`BreedCard`).
  - Şifre ve Güvenlik Sayfası (`/account-password`): Tamamen Türkçe güvenlik paneli.
  - Kırmızı Çizgi Temizliği: `src/app/checkout`, `src/app/pay-done`, `src/app/subscription` ve `src/app/(account-pages)/account-billing` dizinleri projeden kalıcı olarak silindi.
- [x] **FAZ 9: Platform Konsepti Güncellemesi & UI İyileştirmeleri**
  - **Logo Temizliği:** Logodaki "Sahiplendirme & Rehber" alt yazısı silindi, sadece logo ve temiz marka ismi bırakıldı.
  - **Irk Listesi Senkronizasyonu:** Kullanıcının ilettiği 3 ekran görüntüsündeki 48 ırk birebir sıra ve isimlerle (Poodle - Toy'dan German Pinscher'a) dropdown ve sol menüye işlendi; dropdown seçenekleri sade isim formatına getirildi.
  - **Platform Kimliği (Köpek Sahipleri & Arayanlar):** Sahiplendirme, eş arayan, yuva arayan ve kayıp canlar konseptleri/etiketleri kaldırıldı. Yerine doğrudan "Köpek İlanları" (Aktif İlan, Vitrin İlanı, Süper İlan, Doğrulanmış İlan) yapısına geçildi; üst çubuktan "🚨 Kayıp Canlar" sekmesi kaldırılıp yerine "Tüm İlanlar" eklendi.
  - **"+ YENİ İLAN VER" Buton Düzeltmesi:** Header'daki buton `whitespace-nowrap`, ferah dolgu (`px-6 py-2.5`), canlı degrade pembe rengi ve ikon hizalamasıyla yazının sıkışması/taşması sorunu kalıcı olarak giderildi.
  - **Tüm Filtre ve Formlara 48 Irkın Entegrasyonu:** `PetListingFilter.tsx`, `PetHeroSearchForm.tsx`, `PageAddListing1.tsx` ve `mockBreeds.ts` güncellendi. Kullanıcının ilettiği 48 ırk artık İlan Listeleme filtresi (`/listing-stay`), İlan Verme sihirbazı (`/add-listing`), Arama formu ve Irk Ansiklopedisi (`/listing-car`) dahil tüm sayfalarda eksiksiz ve aynı sırada yer almaktadır.
  - **Irk Rehberi (/listing-car) Dinamik Cins Arama & İlan Bağlantısı:** Kullanıcının talebi doğrultusunda "Boyuta Göre" ve "Karakter & Yaşam" filtreleri korunarak, üstteki arama kutusu dinamik hale getirildi. Kullanıcı arama kutusuna cins ismi yazdığında altına hemen o cinsin kartı ve "🐾 İlanları Gör" butonu çıkmakta; tıklandığında anında ilgili cinsin güncel ilanlarına (`/listing-stay?breed=...`) yönlendirmektedir. Ayrıca tüm ırk kartlarına doğrudan ilanları açan butonlar eklendi.
  - Kullanıcının ilettiği `kopekdunyasi.com` referans tasarımına (`media_1793563683915_55266d28.jpg`) göre anasayfa baştan kurgulandı.
  - Gereksiz editoryal ve otel tarzı metinler kaldırıldı; doğrudan **İlan Arama, Cinsler, Vitrin ve Güncel İlanlar** yapısına geçildi.
  - Sol Menü: 48 farklı köpek ırkı ve gerçek canlı ilan sayıları (Poodle - Toy: 402, Maltipoo: 171, Pomeranian Boo: 109, Maltese Terrier: 78, Cane Corso: 77, Golden Retriever: 66, Doberman: 40 vb.), anlık arama filtresi ve şehir kategorisi sekmeleri.
  - Üst Bant: Kategori sekmeleri (`Üyelerimiz`, `Yeni İlanlar`, `Popüler Cinsler`, `Kayıp Canlar`) ve hızlı dropdown arama konsolu (`Cins/Tür Seçin`, `Şehir`, `ARA`).
  - Sağ Alan: Öne çıkan üretici/çiftlik hikaye daireleri (`Vonalp Pet`, `KIF Üretim Çiftliği`, `Bursa Kangal Çiftliği` vb.), 5 sütunlu Vitrin İlanları gridi (`dog_1.png` - `dog_25.png`), Pembe başlıklı Yeni Eklenen İlanlar listesi (`dog_26.png` - `dog_35.png`), Yeşil başlıklı Günün Vitrin İlanları listesi (`dog_36.png` - `dog_45.png`).
  - `köpek resimleri` klasöründeki 46 fotoğrafın tamamı optimize edilip ilgili ırklarla eşleştirildi.
  - Footer alanına ISO 9001:2015, ISO 27001, Türk Patent ve Marka Kurumu Tescil No ve ETBİS resmi rozetleri eklendi.
  - 5199 Sayılı Hayvanları Koruma Kanunu yasal bilgilendirme kutusu ile ticari satış yasağı ve ücretsiz sahiplendirme güvencesi pekiştirildi.

---

## 📁 DEĞİŞTİRİLEN / OLUŞTURULAN DOSYALAR LİSTESİ
* `PROJECT_STATE.md` (Mimari takip ve oturum hafıza dokümanı)
* `src/types/pet.ts` (Temel TypeScript arayüzleri ve enum tipleri)
* `src/types/index.ts` (Tip dışa aktarım merkezi)
* `src/data/mockBreeds.ts` (12 Popüler Irk ve zengin ansiklopedi verisi)
* `src/data/mockPets.ts` (15 Gerçekçi Sahiplendirme / Eş Bulma / Kayıp ilanı)
* `src/data/mockDirectory.ts` (6 Veteriner, Eğitim Merkezi ve Pet Otel kaydı)
* `src/styles/__theme_colors.scss` (Kehribar, Zümrüt & Antrasit pet renk paleti)
* `src/shared/Logo.tsx` (Yeni KÖPEK EVRENİ logo bileşeni)
* `src/data/navigation.ts` (Türkçe navigasyon ve Irk Mega Menüsü)
* `src/app/(client-components)/(Header)/MainNav1.tsx` (Temiz header ve Ücretsiz İlan Ver butonu)
* `src/app/(client-components)/(Header)/SiteHeader.tsx` (Sadeleştirilmiş header kabuğu)
* `src/shared/Navigation/NavMobile.tsx` (Türkçe mobil drawer menü)
* `src/components/FooterNav.tsx` (Mobil yapışkan alt navigasyon barı)
* `src/components/Footer.tsx` (Kapsamlı Türkçe footer ve Yasal Satış Yasağı uyarısı)
* `src/app/layout.tsx` (Türkçe metadata ve HTML lang ayarı)
* `package.json` (Proje adı "kopek-evreni" olarak güncellendi)
* `src/components/PetHeroSearchForm.tsx` (Pet odaklı sekmeli arama motoru)
* `src/components/PetCard.tsx` (Fiyatsız, durum rozetli ve WhatsApp butonlu ilan kartı)
* `src/components/BreedCard.tsx` (Karakter puanlı ve boyut etiketli ırk ansiklopedisi kartı)
* `src/components/DirectoryCard.tsx` (7/24 veteriner ve eğitim merkezi kurumsal rehber kartı)
* `src/app/page.tsx` (5 bölümlü zengin ve modern Anasayfa)
* `src/components/PetListingFilter.tsx` (Çok kriterli filtreleme bileşeni)
* `src/app/(stay-listings)/listing-stay/page.tsx` (İlan listeleme ve dinamik filtreleme sayfası)
* `src/app/(stay-listings)/layout.tsx` (Temizlenmiş liste layout'u)
* `src/app/(stay-listings)/SectionGridHasMap.tsx` (Haritalı ilan arama bileşeni)
* `src/app/(listing-detail)/listing-stay-detail/page.tsx` (Bento galerili, kimlik kartlı ve WhatsApp'lı ilan detay sayfası)
* `src/app/(listing-detail)/layout.tsx` (Otel rezervasyonlarından arındırılmış detay layout'u)
* `src/app/(listing-detail)/(components)/MobileFooterSticky.tsx` (Fiyatsız, doğrudan WhatsApp mobil alt barı)
* `src/app/(car-listings)/layout.tsx` (Temizlenmiş ırk ansiklopedisi layout'u)
* `src/app/(car-listings)/listing-car/page.tsx` (Filtrelenebilir ve aranabilir Irk Ansiklopedisi Kataloğu)
* `src/app/(listing-detail)/listing-car-detail/page.tsx` (1-5 Karakter analizi puanlı, fiziksel metrikli, sekmeli ve ilgili ilan çapraz bağlantılı Irk Detay Ansiklopedisi)
* `src/app/add-listing/[[...stepIndex]]/layout.tsx` (4 adımlı, yüzdelik ilerleme barlı sihirbaz layout'u)
* `src/app/add-listing/[[...stepIndex]]/page.tsx` (4 adımlı dinamik router)
* `src/app/add-listing/[[...stepIndex]]/PageAddListing1.tsx` (İlan Türü ve Irk Seçimi)
* `src/app/add-listing/[[...stepIndex]]/PageAddListing2.tsx` (Hayvan Künyesi ve 8 Sağlık Rozeti)
* `src/app/add-listing/[[...stepIndex]]/PageAddListing3.tsx` (Fotoğraf Galerisi ve Hikaye)
* `src/app/add-listing/[[...stepIndex]]/PageAddListing4.tsx` (Konum, İletişim, 5199 Taahhüdü ve Yayınlama)
* `src/app/(account-pages)/(components)/Nav.tsx` (Faturasız, Türkçe üye navigasyonu)
* `src/app/(account-pages)/account/page.tsx` (Doğrulanmış Üye profili ve gizlilik taahhüdü)
* `src/app/(account-pages)/account-savelists/page.tsx` (Yayındaki İlanlarım, Favori Canlar, Takip Edilen Irklar)
* `src/app/(account-pages)/account-password/page.tsx` (Türkçe hesap güvenliği paneli)

---

## 🚀 ÇALIŞTIRMA TALİMATLARI
Proje geliştirme sunucusunu başlatmak için terminalde:
```bash
npm install
npm run dev
```
Tarayıcınızda `http://localhost:3000` adresini açarak:
- `/` -> Modern Anasayfa (Hero arama, Irklar, Vitrin ilanları, Rehber klinikler)
- `/listing-stay` -> İlanlar Arama & Filtreleme (Gelişmiş sol filtreler, fiyatsız ilan kartları, WhatsApp butonu)
- `/listing-stay-detail?id=pet-1` -> İlan Detayı (Bento galeri, hayvan künyesi, sağlık rozetleri, sticky iletişim kutusu)
- `/listing-car` -> İnteraktif Irk Ansiklopedisi (Boyut ve karakter filtreli katalog)
- `/listing-car-detail?id=breed-golden` -> Irk Detayı (1-5 Puan karakter analizi, fiziksel metrikler, sekmeli içerik, çapraz ilanlar)
- `/add-listing/1` -> 4 Adımlı Ücretsiz İlan Verme Sihirbazı
- `/account-savelists` -> Kullanıcı Paneli (Yayındaki İlanlarım ve Favorilerim)
sayfalarını test edebilirsiniz.

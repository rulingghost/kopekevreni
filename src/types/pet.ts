// ==========================================
// KÖPEK EVRENİ - CORE VERİ MODELLERİ & TİPLERİ
// ==========================================

export type ListingType = "ADOPTION" | "MATING" | "LOST_FOUND";

export type PetType = "DOG" | "CAT" | "OTHER";

export type Gender = "MALE" | "FEMALE";

export type AgeGroup = "PUPPY" | "YOUNG" | "ADULT" | "SENIOR";
// PUPPY: 0-6 Ay, YOUNG: 6 Ay - 2 Yaş, ADULT: 2-6 Yaş, SENIOR: 7+ Yaş

export type SizeGroup = "MINI" | "SMALL" | "MEDIUM" | "LARGE" | "GIANT";
// MINI: < 4kg, SMALL: 4-10kg, MEDIUM: 10-25kg, LARGE: 25-45kg, GIANT: 45kg+

export interface HealthBadges {
  vaccinated: boolean;        // Aşıları Tam
  microchipped: boolean;      // Mikroçipli
  neutered: boolean;          // Kısırlaştırılmış
  internalParasite: boolean;  // İç/Dış Parazit Yapıldı
  houseTrained: boolean;      // Tuvalet Eğitimli
  pedigree: boolean;          // Secereli (KIF / FCI Kayıtlı)
  apartmentFriendly: boolean; // Apartman Yaşamına Uygun
}

export interface PetLocation {
  city: string;               // İl (Örn: İstanbul)
  district: string;           // İlçe (Örn: Kadıköy)
  neighborhood?: string;      // Mahalle (Örn: Moda)
  address?: string;
  lat?: number;
  lng?: number;
}

export interface ContactInfo {
  phone: string;              // Telefon Numarası
  whatsapp: string;           // WhatsApp Doğrudan Hat Linki / Numara
  showPhone: boolean;         // Numarayı gizle/göster tercihi
  preferredContact: "ANY" | "WHATSAPP_ONLY" | "PHONE_ONLY";
}

export interface ListingAuthor {
  id: string;
  name: string;
  avatar: string;
  memberSince: string;
  badge?: "Bireysel" | "Gönüllü" | "Barınak" | "Resmi Kurum";
  verified: boolean;
  phone?: string;
  whatsapp?: string;
}

// 1. İLAN VERİ MODELİ (Sahiplendirme, Eş Bulma, Kayıp)
export interface PetListing {
  id: string;
  slug: string;
  title: string;
  description: string;
  listingType: ListingType;
  petType: PetType;
  breed: string;              // Irk adı (DogBreed.name ile eşleşir)
  breedSlug: string;          // DogBreed.slug ile çapraz ilişki
  gender: Gender;
  ageGroup: AgeGroup;
  exactAgeText: string;       // Örn: "4 Aylık", "1.5 Yaşında"
  size: SizeGroup;
  badges: HealthBadges;
  location: PetLocation;
  featuredImage: string;
  galleryImages: string[];
  contact: ContactInfo;
  author: ListingAuthor;
  publishedAt: string;        // ISO veya okunabilir tarih: "28 Ekim 2026"
  viewsCount: number;
  likesCount: number;
  isUrgent?: boolean;         // Acil Yuva Arayanlar için
  featured?: boolean;         // Vitrin ilanı
  lostDate?: string;          // Kayıp ilanları için kaybolma tarihi
  reward?: string;            // Kayıp ilanları için (İsteğe bağlı ödül notu - nakit satış değil)
}

// 2. İNTERAKTİF IRK ANSİKLOPEDİSİ VERİ MODELİ
export interface BreedRatings {
  apartmentSuitability: number; // Apartman Yaşamına Uygunluk (1-5)
  sheddingLevel: number;        // Tüy Dökme Oranı (1-5)
  trainability: number;         // Eğitilebilirlik (1-5)
  goodWithChildren: number;     // Çocuklarla Uyum (1-5)
  goodWithOtherDogs: number;    // Diğer Hayvanlarla Uyum (1-5)
  energyLevel: number;          // Enerji Seviyesi (1-5)
  watchdogAbility: number;      // Bekçilik & Koruma Yeteneği (1-5)
}

export interface BreedPhysical {
  lifeExpectancy: string;       // Örn: "10 - 12 Yıl"
  heightMale: string;           // Örn: "56 - 61 cm"
  heightFemale: string;         // Örn: "51 - 56 cm"
  weightMale: string;           // Örn: "30 - 34 kg"
  weightFemale: string;         // Örn: "25 - 32 kg"
  originCountry: string;        // Örn: "Birleşik Krallık", "Türkiye"
  coatType: string;             // Örn: "Çift katmanlı, yoğun ve su geçirmez"
  barkingTendency: "Düşük" | "Orta" | "Yüksek";
}

export interface BreedContentTabs {
  history: string;              // Irkın Tarihçesi ve Kökeni
  temperament: string;          // Mizaç ve Karakter Özellikleri
  careAndNutrition: string;     // Bakım, Egzersiz ve Beslenme İhtiyacı
  healthIssues: string;         // Genetik Yatkınlıklar ve Sağlık Dikkatleri
}

export interface DogBreed {
  id: string;
  slug: string;
  name: string;
  alternativeNames?: string[];  // Örn: ["Sivas Kangalı", "Kangal Çoban Köpeği"]
  shortDescription: string;
  sizeCategory: SizeGroup;
  ratings: BreedRatings;
  physical: BreedPhysical;
  tabs: BreedContentTabs;
  featuredImage: string;
  galleryImages: string[];
  highlights: string[];         // Örn: ["Aile Dostu", "Yüksek Zeka", "Sosyal"]
  popular: boolean;             // Anasayfa karuselinde gösterim için
}

// 3. KURUMSAL REHBER VERİ MODELİ
export type DirectoryCategory = "VET" | "TRAINER" | "HOTEL" | "KENNEL";

export interface DirectoryPlace {
  id: string;
  slug: string;
  name: string;
  category: DirectoryCategory;
  categoryLabel: string;        // "Veteriner Kliniği", "Köpek Eğitim Merkezi", vb.
  tagline: string;              // Kısa açıklama / slogan
  description: string;
  city: string;
  district: string;
  address: string;
  mapCoords: {
    lat: number;
    lng: number;
  };
  phone: string;
  emergencyPhone?: string;      // 7/24 Acil Çağrı
  whatsapp?: string;
  email?: string;
  website?: string;
  workingHours: string;         // "Hafta içi: 09:00 - 20:00 / 7/24 Acil Nöbetçi"
  services: string[];           // ["7/24 Acil Servis", "Röntgen & Ultrason", "Cerrahi Operasyon"]
  featuredImage: string;
  photos: string[];
  rating: number;               // 4.9
  reviewCount: number;          // 86
  is24Hours?: boolean;          // 7/24 Açık
  verified: boolean;
}

// 4. KULLANICI PROFİL VERİ MODELİ
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  district?: string;
  avatar: string;
  role: "USER" | "ADMIN" | "SHELTER_VOLUNTEER" | "VET";
  registeredDate: string;
  savedListingIds: string[];    // Favori ilan kimlikleri
  activeListingIds: string[];   // Kullanıcının yayındaki ilanları
  bio?: string;
}


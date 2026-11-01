export interface BreedCategory {
  name: string;
  slug: string;
  count: number;
  image?: string;
  isPopular?: boolean;
}

export interface CityCategory {
  name: string;
  slug: string;
  count: number;
}

export interface StoryBreeder {
  id: string;
  name: string;
  image: string;
  location: string;
  badge: string;
}

export interface VitrinListing {
  id: string;
  title: string;
  breed: string;
  breedSlug: string;
  ageText: string;
  city: string;
  image: string;
  status: "Aktif İlan" | "Vitrin İlanı" | "Süper İlan" | "Doğrulanmış";
  views: number;
  gender: "Erkek" | "Dişi";
  superIlan?: boolean;
}

export interface GuncelListing {
  id: string;
  title: string;
  breed: string;
  breedSlug: string;
  ageText: string;
  gender: "Erkek" | "Dişi";
  city: string;
  district: string;
  image: string;
  dateText: string;
  status: "Aktif İlan" | "Yeni İlan" | "Süper İlan" | "Doğrulanmış";
}

// 1. TÜM KÖPEK IRKLARI (KULLANICI LİSTESİ VE SIRASI BİREBİR 1'DEN 48'E)
export const ALL_BREEDS: BreedCategory[] = [
  { name: "Poodle - Toy", slug: "poodle-toy", count: 402, image: "/images/breeds/poodle-toy.png", isPopular: true },
  { name: "Maltipoo", slug: "maltipoo", count: 171, image: "/images/breeds/maltipoo.png", isPopular: true },
  { name: "Pomeranian Boo", slug: "pomeranian-Boo", count: 109, image: "/images/breeds/pomeranian-Boo.png", isPopular: true },
  { name: "Maltese Terrier", slug: "terrier-maltese", count: 78, image: "/images/breeds/terrier-maltese.png", isPopular: true },
  { name: "Cane Corso", slug: "cane-corsa", count: 77, image: "/images/breeds/cane-corsa.png", isPopular: true },
  { name: "Golden Retriever", slug: "golden-retriever", count: 66, image: "/images/breeds/golden-retriever.png", isPopular: true },
  { name: "Doberman", slug: "doberman", count: 40, image: "/images/breeds/doberman.png", isPopular: true },
  { name: "Border Collie", slug: "border-collie", count: 39, image: "/images/breeds/border-collie.png", isPopular: true },
  { name: "Belçika Kurdu (Malinois)", slug: "belcika-kurdu", count: 38, image: "/images/breeds/belcika-kurdu.png", isPopular: true },
  { name: "Labrador", slug: "labrador", count: 32, image: "/images/breeds/labrador.png", isPopular: true },
  { name: "Alman Kurdu", slug: "alman-kurdu", count: 36, image: "/images/breeds/alman-kurdu.png", isPopular: true },
  { name: "Chow Chow", slug: "chow-chow", count: 31, image: "/images/breeds/chow-chow.png", isPopular: true },
  { name: "French Bulldog", slug: "french-bulldog", count: 35, image: "/images/breeds/french-bulldog.png", isPopular: true },
  { name: "Kangal", slug: "kangal", count: 30, image: "/images/breeds/kangal.png", isPopular: true },
  { name: "Beagle", slug: "beagle", count: 31, image: "/images/breeds/beagle.png", isPopular: true },
  { name: "Rottweiler", slug: "rottweiler", count: 29, image: "/images/breeds/rottweiler.png" },
  { name: "Akita Inu", slug: "akita-inu", count: 26, image: "/images/breeds/akita-inu.png" },
  { name: "Chihuahua", slug: "chihuahua", count: 28, image: "/images/breeds/chihuahua.png" },
  { name: "Husky", slug: "husky", count: 27, image: "/images/breeds/husky.png" },
  { name: "Cavalier King Charles", slug: "cavalier-king-charles", count: 25, image: "/images/breeds/cavalier-king-charles.png", isPopular: true },
  { name: "Jack Russel", slug: "jack-russel", count: 23, image: "/images/breeds/jack-russel.png" },
  { name: "St Bernard", slug: "st-bernard", count: 24, image: "/images/breeds/st-bernard.png" },
  { name: "Pug", slug: "pug", count: 24, image: "/images/breeds/pug.png" },
  { name: "Bernese Mountain Dog", slug: "bernese-mountain-dog", count: 22, image: "/images/breeds/bernese-mountain-dog.png" },
  { name: "Yorkshire Terrier", slug: "yorkshire-terrier", count: 21, image: "/images/breeds/yorkshire-terrier.png" },
  { name: "Spitz", slug: "spitz", count: 20, image: "/images/breeds/spitz.png" },
  { name: "Diğer Irklar", slug: "diger-irklar", count: 95, image: "/images/breeds/diger-irklar.png" },
  { name: "Pekinez", slug: "pekinez", count: 19, image: "/images/breeds/pekinez.png" },
  { name: "Shih Tzu", slug: "shih-tzu", count: 17, image: "/images/breeds/shih-tzu.png" },
  { name: "Samoyed", slug: "samoyed", count: 18, image: "/images/breeds/samoyed.png" },
  { name: "American Cocker", slug: "american-cocker", count: 16, image: "/images/breeds/american-cocker.png" },
  { name: "İngiliz Bulldog", slug: "ingiliz-bulldog", count: 12, image: "/images/breeds/ingiliz-bulldog.png" },
  { name: "Terrier White", slug: "terrier-white", count: 14, image: "/images/breeds/terrier-white.png" },
  { name: "Morkie", slug: "morkie", count: 15, image: "/images/breeds/morkie.png" },
  { name: "Sosis Köpek (Dachshund)", slug: "sosis-kopek-dachshund", count: 9, image: "/images/breeds/sosis-kopek-dachshund.png" },
  { name: "Alabay (Alabai)", slug: "alabay-alabai", count: 13, image: "/images/breeds/alabay-alabai.png" },
  { name: "Doodle", slug: "doodle", count: 4, image: "/images/breeds/doodle.png" },
  { name: "Minyatür Pinscher", slug: "minyatur-pinscher", count: 11, image: "/images/breeds/minyatur-pinscher.png" },
  { name: "Corgi", slug: "corgi", count: 10, image: "/images/breeds/corgi.png" },
  { name: "Malamut", slug: "malamut", count: 8, image: "/images/breeds/malamut.png" },
  { name: "English Cocker", slug: "english-cocker", count: 8, image: "/images/breeds/english-cocker.png" },
  { name: "Boxer", slug: "boxer", count: 10, image: "/images/breeds/boxer.png" },
  { name: "Av Köpeği", slug: "av-kopegi", count: 5, image: "/images/breeds/av-kopegi.png" },
  { name: "Kafkas Çoban", slug: "kafkas-coban", count: 5, image: "/images/breeds/kafkas-coban.png" },
  { name: "Wolf Dog Hybrid", slug: "wolf-dog-hybrid", count: 3, image: "/images/breeds/wolf-dog-hybrid.png" },
  { name: "Bobtail", slug: "bobtail", count: 7, image: "/images/breeds/bobtail.png" },
  { name: "Dalmaçya", slug: "dalmacya", count: 6, image: "/images/breeds/dalmacya.png" },
  { name: "German Pinscher", slug: "german-pinscher", count: 3, image: "/images/breeds/german-pinscher.png" }
];

// 2. ŞEHİRLER KATEGORİSİ
export const CITIES_LIST: CityCategory[] = [
  { name: "İstanbul", slug: "istanbul", count: 538 },
  { name: "Bursa", slug: "bursa", count: 466 },
  { name: "İzmir", slug: "izmir", count: 137 },
  { name: "Ankara", slug: "ankara", count: 97 },
  { name: "Antalya", slug: "antalya", count: 96 },
  { name: "Denizli", slug: "denizli", count: 36 },
  { name: "Aydın", slug: "aydin", count: 22 },
  { name: "Adana", slug: "adana", count: 9 },
  { name: "Balıkesir", slug: "balikesir", count: 7 },
  { name: "Eskişehir", slug: "eskisehir", count: 5 },
  { name: "Konya", slug: "konya", count: 4 },
  { name: "Samsun", slug: "samsun", count: 4 },
  { name: "Gaziantep", slug: "gaziantep", count: 3 },
  { name: "Trabzon", slug: "trabzon", count: 3 },
  { name: "Diğer İller", slug: "diger", count: 82 }
];

// 3. ÖNE ÇIKAN ÇİFTLİKLER VE ÜYELER (6 KURUMSAL FİRMA)
export const FEATURED_BREEDERS: StoryBreeder[] = [
  {
    id: "breeder-1",
    name: "Vonalp Pet",
    image: "/images/breeds/poodle-toy.png",
    location: "İstanbul",
    badge: "Kurumsal Üye"
  },
  {
    id: "breeder-2",
    name: "Karatay Elit Çiftliği",
    image: "/images/breeds/golden-retriever.png",
    location: "Konya / Karatay",
    badge: "Doğrulanmış Firma"
  },
  {
    id: "breeder-3",
    name: "KIF Patiler Çiftliği",
    image: "/images/breeds/cane-corsa.png",
    location: "Bursa",
    badge: "Lisanslı Çiftlik"
  },
  {
    id: "breeder-4",
    name: "Anadolu Safkan Kulübü",
    image: "/images/breeds/alman-kurdu.png",
    location: "Ankara",
    badge: "Kurumsal Kulüp"
  },
  {
    id: "breeder-5",
    name: "Ege Elit Süs Köpekleri",
    image: "/images/breeds/terrier-maltese.png",
    location: "İzmir",
    badge: "Doğrulanmış Firma"
  },
  {
    id: "breeder-6",
    name: "Akdeniz Köpek Evi",
    image: "/images/breeds/border-collie.png",
    location: "Antalya",
    badge: "Kurumsal Üye"
  }
];

// 4. VİTRİN İLANLARI (HER İLAN KENDİ CİNSİNİN GERÇEK FOTOĞRAFIYLA EŞLEŞTİRİLDİ)
export const VITRIN_LISTINGS: VitrinListing[] = [
  {
    id: "v-1",
    title: "Mükemmel Yapılı Doberman Yavruları",
    breed: "Doberman",
    breedSlug: "doberman",
    ageText: "2 Aylık",
    city: "Bursa",
    image: "/images/breeds/doberman.png",
    status: "Süper İlan",
    views: 195,
    gender: "Erkek",
    superIlan: true
  },
  {
    id: "v-2",
    title: "Red Brown Toy Poodle Micro Boy Özel Yavru",
    breed: "Poodle - Toy",
    breedSlug: "poodle-toy",
    ageText: "2 Aylık",
    city: "İstanbul",
    image: "/images/breeds/poodle-toy.png",
    status: "Vitrin İlanı",
    views: 109,
    gender: "Dişi"
  },
  {
    id: "v-3",
    title: "Safkan Akita Inu Asil Japon Dostumuz",
    breed: "Akita Inu",
    breedSlug: "akita-inu",
    ageText: "3 Aylık",
    city: "Edirne",
    image: "/images/breeds/akita-inu.png",
    status: "Doğrulanmış",
    views: 253,
    gender: "Erkek"
  },
  {
    id: "v-4",
    title: "Vonalp Petten Safkan Pomeranian Boo",
    breed: "Pomeranian Boo",
    breedSlug: "pomeranian-Boo",
    ageText: "3 Aylık",
    city: "İstanbul",
    image: "/images/breeds/pomeranian-Boo.png",
    status: "Süper İlan",
    views: 151,
    gender: "Erkek",
    superIlan: true
  },
  {
    id: "v-5",
    title: "Maltipoo Teacup Boy Beyaz Renk Melek",
    breed: "Maltipoo",
    breedSlug: "maltipoo",
    ageText: "2.5 Aylık",
    city: "İzmir",
    image: "/images/breeds/maltipoo.png",
    status: "Vitrin İlanı",
    views: 312,
    gender: "Dişi"
  },
  {
    id: "v-6",
    title: "Golden Retriever Sevgi Dolu Oyuncu Can",
    breed: "Golden Retriever",
    breedSlug: "golden-retriever",
    ageText: "2 Aylık",
    city: "Ankara",
    image: "/images/breeds/golden-retriever.png",
    status: "Doğrulanmış",
    views: 420,
    gender: "Erkek"
  },
  {
    id: "v-7",
    title: "Cane Corso Gri Maskeli Dev Yavru",
    breed: "Cane Corso",
    breedSlug: "cane-corsa",
    ageText: "3 Aylık",
    city: "Bursa",
    image: "/images/breeds/cane-corsa.png",
    status: "Aktif İlan",
    views: 178,
    gender: "Erkek"
  },
  {
    id: "v-8",
    title: "Maltese Terrier Tüy Dökmeyen Küçük Prens",
    breed: "Maltese Terrier",
    breedSlug: "terrier-maltese",
    ageText: "2 Aylık",
    city: "İstanbul",
    image: "/images/breeds/terrier-maltese.png",
    status: "Vitrin İlanı",
    views: 265,
    gender: "Erkek"
  },
  {
    id: "v-9",
    title: "Border Collie Üstün Zekalı Eğitime Hazır",
    breed: "Border Collie",
    breedSlug: "border-collie",
    ageText: "3 Aylık",
    city: "Antalya",
    image: "/images/breeds/border-collie.png",
    status: "Aktif İlan",
    views: 388,
    gender: "Dişi"
  },
  {
    id: "v-10",
    title: "French Bulldog Uysal ve Sevecen Yavrumuz",
    breed: "French Bulldog",
    breedSlug: "french-bulldog",
    ageText: "2 Aylık",
    city: "İstanbul",
    image: "/images/breeds/french-bulldog.png",
    status: "Süper İlan",
    views: 512,
    gender: "Erkek",
    superIlan: true
  },
  {
    id: "v-11",
    title: "Alman Kurdu Safkan K9 Soyundan",
    breed: "Alman Kurdu",
    breedSlug: "alman-kurdu",
    ageText: "2.5 Aylık",
    city: "Ankara",
    image: "/images/breeds/alman-kurdu.png",
    status: "Doğrulanmış",
    views: 470,
    gender: "Erkek"
  },
  {
    id: "v-12",
    title: "Belçika Malinois Yüksek Enerjili Sadık Koruma",
    breed: "Belçika Kurdu (Malinois)",
    breedSlug: "belcika-kurdu",
    ageText: "3 Aylık",
    city: "Bursa",
    image: "/images/breeds/belcika-kurdu.png",
    status: "Vitrin İlanı",
    views: 219,
    gender: "Erkek"
  },
  {
    id: "v-13",
    title: "Chow Chow Çin Aslanı Asil ve Sakin",
    breed: "Chow Chow",
    breedSlug: "chow-chow",
    ageText: "2 Aylık",
    city: "İzmir",
    image: "/images/breeds/chow-chow.png",
    status: "Aktif İlan",
    views: 340,
    gender: "Dişi"
  },
  {
    id: "v-14",
    title: "Beagle Sevimli Tricolor Kulaklı Dost",
    breed: "Beagle",
    breedSlug: "beagle",
    ageText: "2 Aylık",
    city: "Denizli",
    image: "/images/breeds/beagle.png",
    status: "Aktif İlan",
    views: 184,
    gender: "Erkek"
  },
  {
    id: "v-15",
    title: "Labrador Uysal Aile Köpeği",
    breed: "Labrador",
    breedSlug: "labrador",
    ageText: "2 Aylık",
    city: "İstanbul",
    image: "/images/breeds/labrador.png",
    status: "Doğrulanmış",
    views: 620,
    gender: "Dişi"
  },
  {
    id: "v-16",
    title: "Kangal Asil Sivas Yavrusu Güçlü Kemik Yapısı",
    breed: "Kangal",
    breedSlug: "kangal",
    ageText: "3 Aylık",
    city: "Sivas",
    image: "/images/breeds/kangal.png",
    status: "Süper İlan",
    views: 580,
    gender: "Erkek",
    superIlan: true
  },
  {
    id: "v-17",
    title: "Cavalier King Charles Sevimli Blenheim",
    breed: "Cavalier King Charles",
    breedSlug: "cavalier-king-charles",
    ageText: "2.5 Aylık",
    city: "İstanbul",
    image: "/images/breeds/cavalier-king-charles.png",
    status: "Vitrin İlanı",
    views: 340,
    gender: "Dişi"
  },
  {
    id: "v-18",
    title: "Rottweiler Safkan Güçlü ve Sadık Yavru",
    breed: "Rottweiler",
    breedSlug: "rottweiler",
    ageText: "3 Aylık",
    city: "İzmir",
    image: "/images/breeds/rottweiler.png",
    status: "Vitrin İlanı",
    views: 799,
    gender: "Erkek"
  },
  {
    id: "v-19",
    title: "Pug Mops Maskeli Çocuk Dostu",
    breed: "Pug",
    breedSlug: "pug",
    ageText: "2 Aylık",
    city: "Bursa",
    image: "/images/breeds/pug.png",
    status: "Aktif İlan",
    views: 290,
    gender: "Erkek"
  },
  {
    id: "v-20",
    title: "Samoyed Kar Beyazı Gülen Yüz",
    breed: "Samoyed",
    breedSlug: "samoyed",
    ageText: "2 Aylık",
    city: "Ankara",
    image: "/images/breeds/samoyed.png",
    status: "Doğrulanmış",
    views: 410,
    gender: "Dişi"
  },
  {
    id: "v-21",
    title: "Yorkshire Terrier Mini Boy İpeksi Tüyler",
    breed: "Yorkshire Terrier",
    breedSlug: "yorkshire-terrier",
    ageText: "3 Aylık",
    city: "İstanbul",
    image: "/images/breeds/yorkshire-terrier.png",
    status: "Aktif İlan",
    views: 315,
    gender: "Erkek"
  },
  {
    id: "v-22",
    title: "Jack Russell Enerjik ve Zeki Afacan",
    breed: "Jack Russel",
    breedSlug: "jack-russel",
    ageText: "2 Aylık",
    city: "Antalya",
    image: "/images/breeds/jack-russel.png",
    status: "Aktif İlan",
    views: 220,
    gender: "Erkek"
  },
  {
    id: "v-23",
    title: "Chihuahua Mini Boy Cep Köpeği",
    breed: "Chihuahua",
    breedSlug: "chihuahua",
    ageText: "2 Aylık",
    city: "İzmir",
    image: "/images/breeds/chihuahua.png",
    status: "Doğrulanmış",
    views: 450,
    gender: "Dişi"
  },
  {
    id: "v-24",
    title: "Shih Tzu Asil Saray Köpeği",
    breed: "Shih Tzu",
    breedSlug: "shih-tzu",
    ageText: "2.5 Aylık",
    city: "Bursa",
    image: "/images/breeds/shih-tzu.png",
    status: "Vitrin İlanı",
    views: 180,
    gender: "Erkek"
  },
  {
    id: "v-25",
    title: "Husky Buz Mavisi Gözler Sibirya Kurdu",
    breed: "Husky",
    breedSlug: "husky",
    ageText: "3 Aylık",
    city: "Eskişehir",
    image: "/images/breeds/husky.png",
    status: "Süper İlan",
    views: 630,
    gender: "Erkek",
    superIlan: true
  }
];

// 5. YENİ EKLENEN İLANLAR (HER İLAN KENDİ CİNSİNİN GERÇEK FOTOĞRAFIYLA EŞLEŞTİRİLDİ)
export const YENI_EKLENEN_ILANLAR: GuncelListing[] = [
  {
    id: "yeni-1",
    title: "Aşıları Tam Red Poodle Yavrumuz",
    breed: "Poodle - Toy",
    breedSlug: "poodle-toy",
    ageText: "2 Aylık",
    gender: "Erkek",
    city: "İstanbul",
    district: "Şişli",
    image: "/images/breeds/poodle-toy.png",
    dateText: "Bugün 15:40",
    status: "Yeni İlan"
  },
  {
    id: "yeni-2",
    title: "Maltipoo F1 Kuşak Teacup Boy",
    breed: "Maltipoo",
    breedSlug: "maltipoo",
    ageText: "2.5 Aylık",
    gender: "Dişi",
    city: "Bursa",
    district: "Nilüfer",
    image: "/images/breeds/maltipoo.png",
    dateText: "Bugün 15:22",
    status: "Yeni İlan"
  },
  {
    id: "yeni-3",
    title: "Çankaya'da Bernese Mountain Dog Dostumuz",
    breed: "Bernese Mountain Dog",
    breedSlug: "bernese-mountain-dog",
    ageText: "3 Aylık",
    gender: "Erkek",
    city: "Ankara",
    district: "Çankaya",
    image: "/images/breeds/bernese-mountain-dog.png",
    dateText: "Bugün 14:50",
    status: "Doğrulanmış"
  },
  {
    id: "yeni-4",
    title: "Cane Corso Gri Maskeli İri Kemikli",
    breed: "Cane Corso",
    breedSlug: "cane-corsa",
    ageText: "3 Aylık",
    gender: "Erkek",
    city: "İzmir",
    district: "Bornova",
    image: "/images/breeds/cane-corsa.png",
    dateText: "Bugün 14:15",
    status: "Yeni İlan"
  },
  {
    id: "yeni-5",
    title: "Golden Retriever Tuvalet Eğitimli Paşa",
    breed: "Golden Retriever",
    breedSlug: "golden-retriever",
    ageText: "1.5 Yaşında",
    gender: "Erkek",
    city: "İstanbul",
    district: "Kadıköy",
    image: "/images/breeds/golden-retriever.png",
    dateText: "Bugün 13:40",
    status: "Doğrulanmış"
  },
  {
    id: "yeni-6",
    title: "Pomeranian Boo Ayı Surat Minik Kız",
    breed: "Pomeranian Boo",
    breedSlug: "pomeranian-Boo",
    ageText: "2 Aylık",
    gender: "Dişi",
    city: "Antalya",
    district: "Muratpaşa",
    image: "/images/breeds/pomeranian-Boo.png",
    dateText: "Bugün 13:10",
    status: "Yeni İlan"
  },
  {
    id: "yeni-7",
    title: "French Bulldog Cream Renk Aşı Takvimli",
    breed: "French Bulldog",
    breedSlug: "french-bulldog",
    ageText: "3 Aylık",
    gender: "Dişi",
    city: "Bursa",
    district: "Osmangazi",
    image: "/images/breeds/french-bulldog.png",
    dateText: "Bugün 12:45",
    status: "Yeni İlan"
  },
  {
    id: "yeni-8",
    title: "Doberman Siyah & Pas Renk Safkan",
    breed: "Doberman",
    breedSlug: "doberman",
    ageText: "2.5 Aylık",
    gender: "Erkek",
    city: "Denizli",
    district: "Merkezefendi",
    image: "/images/breeds/doberman.png",
    dateText: "Bugün 12:00",
    status: "Doğrulanmış"
  },
  {
    id: "yeni-9",
    title: "Alman Çoban Köpeği İş Köpeği Kanı",
    breed: "Alman Kurdu",
    breedSlug: "alman-kurdu",
    ageText: "3 Aylık",
    gender: "Erkek",
    city: "Kocaeli",
    district: "İzmit",
    image: "/images/breeds/alman-kurdu.png",
    dateText: "Bugün 11:30",
    status: "Yeni İlan"
  },
  {
    id: "yeni-10",
    title: "Sivas Kangalı Kurt Boğan Soyundan",
    breed: "Kangal",
    breedSlug: "kangal",
    ageText: "3 Aylık",
    gender: "Erkek",
    city: "Sivas",
    district: "Kangal",
    image: "/images/breeds/kangal.png",
    dateText: "Bugün 10:55",
    status: "Süper İlan"
  }
];

// 6. GÜNÜN VİTRİN İLANLARI (HER İLAN KENDİ CİNSİNİN GERÇEK FOTOĞRAFIYLA EŞLEŞTİRİLDİ)
export const GUNUN_VITRIN_ILANLARI: GuncelListing[] = [
  {
    id: "gunun-1",
    title: "St Bernard Dev Kalpli Aile Dostu",
    breed: "St Bernard",
    breedSlug: "st-bernard",
    ageText: "2 Aylık",
    gender: "Dişi",
    city: "İstanbul",
    district: "Beşiktaş",
    image: "/images/breeds/st-bernard.png",
    dateText: "Bugün 10:20",
    status: "Yeni İlan"
  },
  {
    id: "gunun-2",
    title: "Bembeyaz Pamuk Maltese Terrier",
    breed: "Maltese Terrier",
    breedSlug: "terrier-maltese",
    ageText: "2.5 Aylık",
    gender: "Erkek",
    city: "İzmir",
    district: "Karşıyaka",
    image: "/images/breeds/terrier-maltese.png",
    dateText: "Bugün 09:45",
    status: "Doğrulanmış"
  },
  {
    id: "gunun-3",
    title: "Chow Chow Aslan Başlı Kızımız",
    breed: "Chow Chow",
    breedSlug: "chow-chow",
    ageText: "2 Aylık",
    gender: "Dişi",
    city: "Ankara",
    district: "Yenimahalle",
    image: "/images/breeds/chow-chow.png",
    dateText: "Bugün 09:10",
    status: "Aktif İlan"
  },
  {
    id: "gunun-4",
    title: "Beagle Tricolor Çok Sevecen",
    breed: "Beagle",
    breedSlug: "beagle",
    ageText: "3 Aylık",
    gender: "Erkek",
    city: "Bursa",
    district: "Mudanya",
    image: "/images/breeds/beagle.png",
    dateText: "Bugün 08:30",
    status: "Doğrulanmış"
  },
  {
    id: "gunun-5",
    title: "Welsh Corgi Kısa Bacaklı Sevimli Dost",
    breed: "Corgi",
    breedSlug: "corgi",
    ageText: "2 Aylık",
    gender: "Erkek",
    city: "İstanbul",
    district: "Ataşehir",
    image: "/images/breeds/corgi.png",
    dateText: "Dün 22:15",
    status: "Aktif İlan"
  },
  {
    id: "gunun-6",
    title: "Samoyed Gülümseyen Melek",
    breed: "Samoyed",
    breedSlug: "samoyed",
    ageText: "3 Aylık",
    gender: "Dişi",
    city: "Eskişehir",
    district: "Tepebaşı",
    image: "/images/breeds/samoyed.png",
    dateText: "Dün 21:00",
    status: "Yeni İlan"
  },
  {
    id: "gunun-7",
    title: "Pug Mops Siyah Maskeli Fawn",
    breed: "Pug",
    breedSlug: "pug",
    ageText: "2.5 Aylık",
    gender: "Erkek",
    city: "Adana",
    district: "Seyhan",
    image: "/images/breeds/pug.png",
    dateText: "Dün 19:40",
    status: "Doğrulanmış"
  },
  {
    id: "gunun-8",
    title: "Jack Russell Çiftlikte Büyümüş Oyuncu",
    breed: "Jack Russel",
    breedSlug: "jack-russel",
    ageText: "2 Aylık",
    gender: "Erkek",
    city: "Balıkesir",
    district: "Ayvalık",
    image: "/images/breeds/jack-russel.png",
    dateText: "Dün 18:20",
    status: "Aktif İlan"
  },
  {
    id: "gunun-9",
    title: "Dalmaçya Benekli Enerjik Dostumuz",
    breed: "Dalmaçya",
    breedSlug: "dalmacya",
    ageText: "2.5 Aylık",
    gender: "Dişi",
    city: "İstanbul",
    district: "Bakırköy",
    image: "/images/breeds/dalmacya.png",
    dateText: "Dün 17:15",
    status: "Vitrin İlanı"
  },
  {
    id: "gunun-10",
    title: "Shih Tzu İki Renkli Sakin Ev Canı",
    breed: "Shih Tzu",
    breedSlug: "shih-tzu",
    ageText: "3 Aylık",
    gender: "Erkek",
    city: "İzmir",
    district: "Alsancak",
    image: "/images/breeds/shih-tzu.png",
    dateText: "Dün 16:00",
    status: "Doğrulanmış"
  }
];

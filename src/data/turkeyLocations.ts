export interface DistrictInfo {
  name: string;
  lat: number;
  lng: number;
  zoom?: number;
}

export interface CityInfo {
  name: string;
  lat: number;
  lng: number;
  zoom?: number;
  districts: DistrictInfo[];
}

export const TURKEY_LOCATIONS: Record<string, CityInfo> = {
  "Konya": {
    name: "Konya",
    lat: 37.8746,
    lng: 32.4932,
    zoom: 12,
    districts: [
      { name: "Karatay", lat: 37.8682, lng: 32.5350, zoom: 14 },
      { name: "Selçuklu", lat: 37.9044, lng: 32.4831, zoom: 14 },
      { name: "Meram", lat: 37.8341, lng: 32.4285, zoom: 14 },
      { name: "Akşehir", lat: 38.3582, lng: 31.4164, zoom: 13 },
      { name: "Ereğli", lat: 37.5133, lng: 34.0506, zoom: 13 },
      { name: "Beyşehir", lat: 37.6783, lng: 31.7225, zoom: 13 },
      { name: "Seydişehir", lat: 37.4206, lng: 31.8492, zoom: 13 },
      { name: "Cihanbeyli", lat: 38.6575, lng: 32.9261, zoom: 13 },
      { name: "Çumra", lat: 37.5739, lng: 32.7744, zoom: 13 },
      { name: "Ilgın", lat: 38.2800, lng: 31.9167, zoom: 13 },
      { name: "Kulu", lat: 39.0911, lng: 33.0800, zoom: 13 },
      { name: "Kadınhanı", lat: 38.2417, lng: 32.2167, zoom: 13 },
      { name: "Sarayönü", lat: 38.2667, lng: 32.4000, zoom: 13 },
      { name: "Bozkır", lat: 37.1889, lng: 32.2450, zoom: 13 },
      { name: "Karapınar", lat: 37.7144, lng: 33.5511, zoom: 13 },
      { name: "Hadim", lat: 36.9856, lng: 32.4567, zoom: 13 },
      { name: "Taşkent", lat: 36.9244, lng: 32.4933, zoom: 13 },
      { name: "Güneysınır", lat: 37.2711, lng: 32.7300, zoom: 13 },
      { name: "Doğanhisar", lat: 38.1461, lng: 31.6706, zoom: 13 },
      { name: "Hüyük", lat: 37.9556, lng: 31.5978, zoom: 13 },
      { name: "Yunak", lat: 38.8139, lng: 31.7389, zoom: 13 }
    ]
  },
  "İstanbul": {
    name: "İstanbul",
    lat: 41.0082,
    lng: 28.9784,
    zoom: 11,
    districts: [
      { name: "Kadıköy", lat: 40.9910, lng: 29.0270, zoom: 14 },
      { name: "Beşiktaş", lat: 41.0428, lng: 29.0077, zoom: 14 },
      { name: "Üsküdar", lat: 41.0267, lng: 29.0152, zoom: 14 },
      { name: "Şişli", lat: 41.0602, lng: 28.9877, zoom: 14 },
      { name: "Bakırköy", lat: 40.9792, lng: 28.8717, zoom: 14 },
      { name: "Beylikdüzü", lat: 41.0015, lng: 28.6419, zoom: 14 },
      { name: "Fatih", lat: 41.0186, lng: 28.9398, zoom: 14 },
      { name: "Maltepe", lat: 40.9250, lng: 29.1306, zoom: 14 },
      { name: "Ataşehir", lat: 40.9839, lng: 29.1278, zoom: 14 },
      { name: "Pendik", lat: 40.8797, lng: 29.2333, zoom: 14 },
      { name: "Sarıyer", lat: 41.1663, lng: 29.0502, zoom: 14 },
      { name: "Kartal", lat: 40.8986, lng: 29.1931, zoom: 14 },
      { name: "Ümraniye", lat: 41.0256, lng: 29.1172, zoom: 14 },
      { name: "Beykoz", lat: 41.1322, lng: 29.0997, zoom: 14 },
      { name: "Eyüpsultan", lat: 41.0483, lng: 28.9344, zoom: 14 },
      { name: "Zeytinburnu", lat: 40.9917, lng: 28.9039, zoom: 14 },
      { name: "Başakşehir", lat: 41.0967, lng: 28.8028, zoom: 14 },
      { name: "Beyoğlu", lat: 41.0369, lng: 28.9775, zoom: 14 },
      { name: "Küçükçekmece", lat: 40.9917, lng: 28.7719, zoom: 14 },
      { name: "Avcılar", lat: 40.9797, lng: 28.7214, zoom: 14 },
      { name: "Büyükçekmece", lat: 41.0222, lng: 28.5878, zoom: 14 },
      { name: "Çekmeköy", lat: 41.0350, lng: 29.1764, zoom: 14 },
      { name: "Sancaktepe", lat: 40.9886, lng: 29.2319, zoom: 14 },
      { name: "Sultanbeyli", lat: 40.9664, lng: 29.2667, zoom: 14 },
      { name: "Tuzla", lat: 40.8167, lng: 29.3000, zoom: 14 },
      { name: "Silivri", lat: 41.0744, lng: 28.2478, zoom: 13 },
      { name: "Şile", lat: 41.1764, lng: 29.6133, zoom: 13 },
      { name: "Arnavutköy", lat: 41.1850, lng: 28.7417, zoom: 13 }
    ]
  },
  "Ankara": {
    name: "Ankara",
    lat: 39.9334,
    lng: 32.8597,
    zoom: 11,
    districts: [
      { name: "Çankaya", lat: 39.9000, lng: 32.8600, zoom: 14 },
      { name: "Keçiören", lat: 39.9800, lng: 32.8600, zoom: 14 },
      { name: "Yenimahalle", lat: 39.9700, lng: 32.8100, zoom: 14 },
      { name: "Mamak", lat: 39.9300, lng: 32.9100, zoom: 14 },
      { name: "Etimesgut", lat: 39.9500, lng: 32.6800, zoom: 14 },
      { name: "Sincan", lat: 39.9600, lng: 32.5800, zoom: 14 },
      { name: "Altındağ", lat: 39.9400, lng: 32.8600, zoom: 14 },
      { name: "Pursaklar", lat: 40.0300, lng: 32.9000, zoom: 14 },
      { name: "Gölbaşı", lat: 39.7900, lng: 32.8100, zoom: 14 },
      { name: "Polatlı", lat: 39.5833, lng: 32.1400, zoom: 13 },
      { name: "Çubuk", lat: 40.2386, lng: 33.0322, zoom: 13 },
      { name: "Kahramankazan", lat: 40.1983, lng: 32.6842, zoom: 13 },
      { name: "Beypazarı", lat: 40.1683, lng: 31.9214, zoom: 13 }
    ]
  },
  "İzmir": {
    name: "İzmir",
    lat: 38.4237,
    lng: 27.1428,
    zoom: 11,
    districts: [
      { name: "Karşıyaka", lat: 38.4550, lng: 27.1120, zoom: 14 },
      { name: "Bornova", lat: 38.4650, lng: 27.2150, zoom: 14 },
      { name: "Konak", lat: 38.4192, lng: 27.1287, zoom: 14 },
      { name: "Buca", lat: 38.3850, lng: 27.1750, zoom: 14 },
      { name: "Çiğli", lat: 38.4900, lng: 27.0600, zoom: 14 },
      { name: "Balçova", lat: 38.3889, lng: 27.0500, zoom: 14 },
      { name: "Gaziemir", lat: 38.3180, lng: 27.1300, zoom: 14 },
      { name: "Bayraklı", lat: 38.4600, lng: 27.1700, zoom: 14 },
      { name: "Karabağlar", lat: 38.3700, lng: 27.1200, zoom: 14 },
      { name: "Urla", lat: 38.3220, lng: 26.7640, zoom: 13 },
      { name: "Çeşme", lat: 38.3236, lng: 26.3044, zoom: 13 },
      { name: "Menemen", lat: 38.6000, lng: 27.0667, zoom: 13 },
      { name: "Torbalı", lat: 38.1500, lng: 27.3600, zoom: 13 },
      { name: "Seferihisar", lat: 38.1969, lng: 26.8389, zoom: 13 },
      { name: "Foça", lat: 38.6694, lng: 26.7567, zoom: 13 }
    ]
  },
  "Bursa": {
    name: "Bursa",
    lat: 40.1885,
    lng: 29.0610,
    zoom: 12,
    districts: [
      { name: "Osmangazi", lat: 40.1900, lng: 29.0600, zoom: 14 },
      { name: "Nilüfer", lat: 40.2100, lng: 28.9800, zoom: 14 },
      { name: "Yıldırım", lat: 40.1800, lng: 29.1000, zoom: 14 },
      { name: "Mudanya", lat: 40.3700, lng: 28.8800, zoom: 14 },
      { name: "İnegöl", lat: 40.0800, lng: 29.5100, zoom: 13 },
      { name: "Gemlik", lat: 40.4300, lng: 29.1600, zoom: 13 },
      { name: "Gürsu", lat: 40.2000, lng: 29.1900, zoom: 14 },
      { name: "Kestel", lat: 40.2000, lng: 29.2100, zoom: 14 }
    ]
  },
  "Antalya": {
    name: "Antalya",
    lat: 36.8969,
    lng: 30.7133,
    zoom: 12,
    districts: [
      { name: "Muratpaşa", lat: 36.8850, lng: 30.7050, zoom: 14 },
      { name: "Kepez", lat: 36.9300, lng: 30.6900, zoom: 14 },
      { name: "Konyaaltı", lat: 36.8700, lng: 30.6200, zoom: 14 },
      { name: "Alanya", lat: 36.5438, lng: 31.9998, zoom: 13 },
      { name: "Manavgat", lat: 36.7867, lng: 31.4422, zoom: 13 },
      { name: "Serik", lat: 36.9167, lng: 31.1000, zoom: 13 },
      { name: "Kemer", lat: 36.6000, lng: 30.5600, zoom: 13 },
      { name: "Kaş", lat: 36.2000, lng: 29.6389, zoom: 13 }
    ]
  },
  "Adana": {
    name: "Adana",
    lat: 37.0000,
    lng: 35.3213,
    zoom: 12,
    districts: [
      { name: "Seyhan", lat: 36.9914, lng: 35.3308, zoom: 14 },
      { name: "Çukurova", lat: 37.0500, lng: 35.2800, zoom: 14 },
      { name: "Yüreğir", lat: 36.9800, lng: 35.3500, zoom: 14 },
      { name: "Sarıçam", lat: 37.0200, lng: 35.3900, zoom: 14 },
      { name: "Ceyhan", lat: 37.0294, lng: 35.8175, zoom: 13 }
    ]
  },
  "Eskişehir": {
    name: "Eskişehir",
    lat: 39.7767,
    lng: 30.5206,
    zoom: 12,
    districts: [
      { name: "Tepebaşı", lat: 39.7900, lng: 30.5100, zoom: 14 },
      { name: "Odunpazarı", lat: 39.7600, lng: 30.5300, zoom: 14 },
      { name: "Sivrihisar", lat: 39.4497, lng: 31.5369, zoom: 13 }
    ]
  },
  "Gaziantep": {
    name: "Gaziantep",
    lat: 37.0662,
    lng: 37.3833,
    zoom: 12,
    districts: [
      { name: "Şahinbey", lat: 37.0500, lng: 37.3700, zoom: 14 },
      { name: "Şehitkamil", lat: 37.0800, lng: 37.3800, zoom: 14 },
      { name: "Nizip", lat: 37.0100, lng: 37.7950, zoom: 13 }
    ]
  },
  "Mersin": {
    name: "Mersin",
    lat: 36.8121,
    lng: 34.6415,
    zoom: 12,
    districts: [
      { name: "Yenişehir", lat: 36.7900, lng: 34.5800, zoom: 14 },
      { name: "Mezitli", lat: 36.7500, lng: 34.5400, zoom: 14 },
      { name: "Akdeniz", lat: 36.8100, lng: 34.6300, zoom: 14 },
      { name: "Toroslar", lat: 36.8400, lng: 34.6000, zoom: 14 },
      { name: "Tarsus", lat: 36.9167, lng: 34.8950, zoom: 13 },
      { name: "Erdemli", lat: 36.6047, lng: 34.3078, zoom: 13 }
    ]
  },
  "Muğla": {
    name: "Muğla",
    lat: 37.2153,
    lng: 28.3636,
    zoom: 11,
    districts: [
      { name: "Bodrum", lat: 37.0344, lng: 27.4305, zoom: 13 },
      { name: "Fethiye", lat: 36.6500, lng: 29.1167, zoom: 13 },
      { name: "Marmaris", lat: 36.8550, lng: 28.2742, zoom: 13 },
      { name: "Menteşe", lat: 37.2153, lng: 28.3636, zoom: 14 },
      { name: "Milas", lat: 37.3167, lng: 27.7833, zoom: 13 },
      { name: "Datça", lat: 36.7264, lng: 27.6869, zoom: 13 }
    ]
  },
  "Kocaeli": {
    name: "Kocaeli",
    lat: 40.7654,
    lng: 29.9408,
    zoom: 12,
    districts: [
      { name: "İzmit", lat: 40.7654, lng: 29.9408, zoom: 14 },
      { name: "Gebze", lat: 40.8028, lng: 29.4306, zoom: 14 },
      { name: "Darıca", lat: 40.7739, lng: 29.4000, zoom: 14 },
      { name: "Gölcük", lat: 40.7167, lng: 29.8167, zoom: 14 },
      { name: "Körfez", lat: 40.7800, lng: 29.7300, zoom: 14 },
      { name: "Kartepe", lat: 40.7500, lng: 30.0200, zoom: 14 }
    ]
  },
  "Samsun": {
    name: "Samsun",
    lat: 41.2867,
    lng: 36.3300,
    zoom: 12,
    districts: [
      { name: "Atakum", lat: 41.3200, lng: 36.2700, zoom: 14 },
      { name: "İlkadım", lat: 41.2800, lng: 36.3300, zoom: 14 },
      { name: "Canik", lat: 41.2700, lng: 36.3600, zoom: 14 },
      { name: "Bafra", lat: 41.5678, lng: 35.9069, zoom: 13 }
    ]
  },
  "Trabzon": {
    name: "Trabzon",
    lat: 41.0027,
    lng: 39.7168,
    zoom: 12,
    districts: [
      { name: "Ortahisar", lat: 41.0027, lng: 39.7168, zoom: 14 },
      { name: "Akçaabat", lat: 41.0200, lng: 39.5700, zoom: 14 },
      { name: "Yomra", lat: 40.9572, lng: 39.8569, zoom: 14 }
    ]
  },
  "Diyarbakır": {
    name: "Diyarbakır",
    lat: 37.9144,
    lng: 40.2306,
    zoom: 12,
    districts: [
      { name: "Kayapınar", lat: 37.9400, lng: 40.1800, zoom: 14 },
      { name: "Bağlar", lat: 37.9100, lng: 40.2100, zoom: 14 },
      { name: "Yenişehir", lat: 37.9200, lng: 40.2300, zoom: 14 },
      { name: "Sur", lat: 37.9136, lng: 40.2372, zoom: 14 }
    ]
  },
  "Kayseri": {
    name: "Kayseri",
    lat: 38.7205,
    lng: 35.4826,
    zoom: 12,
    districts: [
      { name: "Melikgazi", lat: 38.7200, lng: 35.4900, zoom: 14 },
      { name: "Kocasinan", lat: 38.7400, lng: 35.4700, zoom: 14 },
      { name: "Talas", lat: 38.6900, lng: 35.5500, zoom: 14 }
    ]
  },
  "Sakarya": {
    name: "Sakarya",
    lat: 40.7569,
    lng: 30.3783,
    zoom: 12,
    districts: [
      { name: "Adapazarı", lat: 40.7731, lng: 30.4022, zoom: 14 },
      { name: "Serdivan", lat: 40.7500, lng: 30.3600, zoom: 14 },
      { name: "Erenler", lat: 40.7600, lng: 30.4100, zoom: 14 },
      { name: "Sapanca", lat: 40.6917, lng: 30.2667, zoom: 13 }
    ]
  },
  "Tekirdağ": {
    name: "Tekirdağ",
    lat: 40.9833,
    lng: 27.5167,
    zoom: 12,
    districts: [
      { name: "Süleymanpaşa", lat: 40.9800, lng: 27.5100, zoom: 14 },
      { name: "Çorlu", lat: 41.1600, lng: 27.8000, zoom: 14 },
      { name: "Çerkezköy", lat: 41.2800, lng: 28.0000, zoom: 14 }
    ]
  },
  "Balıkesir": {
    name: "Balıkesir",
    lat: 39.6484,
    lng: 27.8826,
    zoom: 12,
    districts: [
      { name: "Altıeylül", lat: 39.6400, lng: 27.8800, zoom: 14 },
      { name: "Karesi", lat: 39.6600, lng: 27.8900, zoom: 14 },
      { name: "Bandırma", lat: 40.3522, lng: 27.9767, zoom: 13 },
      { name: "Edremit", lat: 39.5936, lng: 27.0253, zoom: 13 },
      { name: "Ayvalık", lat: 39.3197, lng: 26.6967, zoom: 13 }
    ]
  },
  "Denizli": {
    name: "Denizli",
    lat: 37.7765,
    lng: 29.0864,
    zoom: 12,
    districts: [
      { name: "Pamukkale", lat: 37.7800, lng: 29.0900, zoom: 14 },
      { name: "Merkezefendi", lat: 37.7700, lng: 29.0600, zoom: 14 }
    ]
  },
  "Manisa": {
    name: "Manisa",
    lat: 38.6191,
    lng: 27.4289,
    zoom: 12,
    districts: [
      { name: "Yunusemre", lat: 38.6300, lng: 27.4100, zoom: 14 },
      { name: "Şehzadeler", lat: 38.6100, lng: 27.4300, zoom: 14 },
      { name: "Akhisar", lat: 38.9200, lng: 27.8400, zoom: 13 },
      { name: "Turgutlu", lat: 38.4950, lng: 27.7000, zoom: 13 }
    ]
  },
  "Hatay": {
    name: "Hatay",
    lat: 36.2023,
    lng: 36.1606,
    zoom: 12,
    districts: [
      { name: "Antakya", lat: 36.2023, lng: 36.1606, zoom: 14 },
      { name: "İskenderun", lat: 36.5872, lng: 36.1733, zoom: 14 },
      { name: "Defne", lat: 36.1600, lng: 36.1200, zoom: 14 }
    ]
  },
  "Sivas": {
    name: "Sivas",
    lat: 39.7477,
    lng: 37.0179,
    zoom: 12,
    districts: [
      { name: "Merkez", lat: 39.7477, lng: 37.0179, zoom: 14 },
      { name: "Şarkışla", lat: 39.3517, lng: 36.4086, zoom: 13 },
      { name: "Kangal", lat: 39.2333, lng: 37.2167, zoom: 13 }
    ]
  },
  "Şanlıurfa": {
    name: "Şanlıurfa",
    lat: 37.1674,
    lng: 38.7955,
    zoom: 12,
    districts: [
      { name: "Haliliye", lat: 37.1700, lng: 38.8100, zoom: 14 },
      { name: "Eyyübiye", lat: 37.1500, lng: 38.7800, zoom: 14 },
      { name: "Karaköprü", lat: 37.2100, lng: 38.8200, zoom: 14 }
    ]
  }
};

export const CITIES_LIST = Object.keys(TURKEY_LOCATIONS);

export function getDistrictsOfCity(cityName: string): DistrictInfo[] {
  const city = TURKEY_LOCATIONS[cityName];
  if (!city) return [{ name: "Merkez", lat: 39.0, lng: 35.0, zoom: 12 }];
  return city.districts;
}

export function getLocationCoordinates(cityName: string, districtName?: string): { lat: number; lng: number; zoom: number } {
  const city = TURKEY_LOCATIONS[cityName];
  if (!city) {
    return { lat: 39.0, lng: 35.0, zoom: 6 }; // Default Turkey center
  }

  if (districtName) {
    const district = city.districts.find(
      (d) => d.name.toLowerCase() === districtName.toLowerCase()
    );
    if (district) {
      return { lat: district.lat, lng: district.lng, zoom: district.zoom || 14 };
    }
  }

  return { lat: city.lat, lng: city.lng, zoom: city.zoom || 12 };
}


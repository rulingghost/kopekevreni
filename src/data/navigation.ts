import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import { Route } from "@/routers/types";
import { ALL_BREEDS } from "@/data/kopekDunyasiData";

// Tüm 48 Köpek Cinsi Dropdown Menüsü (Eksiksiz Liste + Yuvarlak Fotoğraflı)
const breedsDropdownMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/listing-car" as Route,
    name: "🐾 Tüm Köpek Cinsleri (48 Irk)",
  },
  ...ALL_BREEDS.map((b) => ({
    id: `nav-breed-${b.slug}`,
    href: `/listing-stay?breed=${encodeURIComponent(b.name)}` as Route,
    name: b.name,
    image: b.image || `/images/breeds/${b.slug}.png`,
  })),
];

// İlan Kategorileri Dropdown
const listingDropdownMenus: NavItemType[] = [
  { id: ncNanoId(), href: "/listing-stay" as Route, name: "Tüm İlanlar" },
  {
    id: ncNanoId(),
    href: "/listing-stay?sort=vitrin" as Route,
    name: "✨ Vitrin İlanları",
  },
  {
    id: ncNanoId(),
    href: "/listing-stay?sort=NEWEST" as Route,
    name: "⚡ Yeni Eklenen İlanlar",
  },
  {
    id: ncNanoId(),
    href: "/ilanlarim" as Route,
    name: "📋 İlanlarım",
  },
];

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/" as Route,
    name: "Ana Sayfa",
  },
  {
    id: ncNanoId(),
    href: "/listing-stay" as Route,
    name: "İlanlar",
    type: "dropdown",
    children: listingDropdownMenus,
  },
  {
    id: ncNanoId(),
    href: "/listing-car" as Route,
    name: "Köpek Cinsleri",
    type: "dropdown",
    children: breedsDropdownMenus,
  },
  {
    id: ncNanoId(),
    href: "/ilanlarim" as Route,
    name: "İlanlarım",
  },
  {
    id: ncNanoId(),
    href: "/uyeler" as Route,
    name: "Üyelerimiz",
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = NAVIGATION_DEMO;

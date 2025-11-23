import { Home, Map, Users } from "lucide-react";

export const sidebarMenu = [
  {
    title: "overview",
    url: "/",
    icon: <Home />,
  },
  {
    title: "users",
    url: "/users",
    icon: <Users />,
  },
  {
    title: "geo-map",
    url: "/geo-map",
    icon: <Map />,
  },
   {
    title: "geo-map-v2",
    url: "/geo-map-v2",
    icon: <Map />,
  },
];

export const langs = [
  {
    id: 1,
    title: "O'zbekcha",
    short: "O'zb",
    lang: "uz",
  },
  {
    id: 2,
    title: "English",
    short: "Eng",
    lang: "en",
  },
  {
    id: 3,
    title: "Русский",
    short: "Рус",
    lang: "ru",
  },
];
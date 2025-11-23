import { GeoMap, GeoMapV2 } from "@/pages/geo-map";
import { Overview } from "@/pages/overview";
import { Users } from "@/pages/users";

export const routes = [
  {
    path: "/",
    component: Overview,
  },
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/geo-map",
    component: GeoMap,
  },
  {
    path: "/geo-map-v2",
    component: GeoMapV2,
  },
];

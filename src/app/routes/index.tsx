import { GeoMap } from "@/pages/geo-map";
import { Overview } from "@/pages/overview";
import { Users } from "@/pages/users";

export const routes = [
    {
        path: "/",
        component: Overview
    },
    {
        path: "/users",
        component: Users
    },
    {
        path: "/geo-map",
        component: GeoMap
    }
]
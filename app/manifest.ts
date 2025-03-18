import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RoadMarker",
    short_name: "RoadMarker",
    description: "지도 위에 마커를 찍는 여행 다이어리",
    scope: "/",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "icon-72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "icon-128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "icon-144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

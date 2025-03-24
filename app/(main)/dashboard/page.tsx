import React from "react";
import { GoogleMapsEmbed } from "@next/third-parties/google";

const page = async () => {
  //   const t = useTranslations("HomePage");
  return (
    <div className="h-full">
      <GoogleMapsEmbed
        apiKey={process.env.GOOGLE_MAPS!}
        style="height: 50vh; width: 100%;"
        mode="place"
        q="Brooklyn+Bridge,New+York,NY"
      />
    </div>
  );
};

export default page;

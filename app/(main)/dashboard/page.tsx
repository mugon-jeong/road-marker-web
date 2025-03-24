import React from "react";
import { GoogleMapsEmbed } from "@next/third-parties/google";

const page = async () => {
  //   const t = useTranslations("HomePage");
  return (
    <div>
      <GoogleMapsEmbed
        apiKey={process.env.GOOGLE_MAPS!}
        height={200}
        width="100%"
        mode="place"
        q="Brooklyn+Bridge,New+York,NY"
      />
    </div>
  );
};

export default page;

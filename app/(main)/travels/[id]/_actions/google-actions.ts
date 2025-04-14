import ky from "ky";

type TimeZoneStatus =
  | "OK"
  | "INVALID_REQUEST"
  | "OVER_DAILY_LIMIT"
  | "OVER_QUERY_LIMIT"
  | "REQUEST_DENIED"
  | "UNKNOWN_ERROR"
  | "ZERO_RESULTS";

interface TimezoneResponse {
  status: TimeZoneStatus;
  dstOffset?: number;
  errorMessage?: string;
  rawOffset?: number;
  timeZoneId?: string;
  timeZoneName?: string;
}

export async function getTimezone(
  latitude: number,
  longitude: number,
  timestamp: number
): Promise<TimezoneResponse> {
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS;
  if (!GOOGLE_API_KEY) {
    throw new Error("Google Maps API key is not configured");
  }
  const response = await ky
    .get("https://maps.googleapis.com/maps/api/timezone/json", {
      searchParams: {
        location: `${latitude},${longitude}`,
        timestamp: timestamp.toString(),
        key: GOOGLE_API_KEY,
      },
    })
    .json<TimezoneResponse>();

  if (response.status !== "OK") {
    throw new Error(`Google Timezone API Error: ${response.status}`);
  }

  return response;
}

import { secrets } from "base44:runtime";

export default async function (req) {
  try {
    const apiKey = secrets.get("GOOGLE_MAPS_API_KEY");
    if (!apiKey) return Response.json({ error: "Google Maps API-nyckel saknas" }, { status: 500 });
    return Response.json({ apiKey });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
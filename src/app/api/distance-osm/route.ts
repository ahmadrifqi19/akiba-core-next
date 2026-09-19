import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { destinationAddress } = await req.json();

    if (!destinationAddress || destinationAddress.length < 3) {
      return NextResponse.json({ error: "Alamat tidak valid" }, { status: 400 });
    }

    // Koordinat Basecamp Akiba Core di Cilegon
    const baseLat = process.env.NEXT_PUBLIC_BASECAMP_LAT || "-6.0174";
    const baseLng = process.env.NEXT_PUBLIC_BASECAMP_LNG || "106.0538";

    // 1. Cari Koordinat Alamat Tujuan via OpenStreetMap Nominatim
    const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destinationAddress)}&limit=1`;
    const geoRes = await fetch(geoUrl, {
      headers: { "User-Agent": "AkibaCore-PlayboxApp" }
    });
    const geoData = await geoRes.json();

    if (!geoData || geoData.length === 0) {
      return NextResponse.json({ error: "Alamat tidak ditemukan" }, { status: 404 });
    }

    const destLat = geoData[0].lat;
    const destLng = geoData[0].lon;

    // 2. Hitung Jarak Jalan via OSRM
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${baseLng},${baseLat};${destLng},${destLat}?overview=false`;
    const osrmRes = await fetch(osrmUrl);
    const osrmData = await osrmRes.json();

    if (osrmData.code === "Ok" && osrmData.routes.length > 0) {
      const distanceInMeters = osrmData.routes[0].distance;
      const distanceKm = Math.ceil(distanceInMeters / 1000);

      return NextResponse.json({
        success: true,
        distanceKm,
        matchedAddress: geoData[0].display_name
      });
    }

    return NextResponse.json({ error: "Gagal menghitung rute" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan server peta" }, { status: 500 });
  }
}
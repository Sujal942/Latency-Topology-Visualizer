import { NextResponse } from "next/server";
import geoData from "../../../data/data.json";

export async function GET() {
  try {
    return NextResponse.json(geoData);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

import { API_KEY } from "@/app/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const pathArr = request.nextUrl.pathname.split("/");
  const order_id = pathArr[pathArr.length - 1];
  const res = await fetch(
    `https://plx-hiring-api.fly.dev/api/orders/${order_id}`,
    {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
      },
    }
  );
  
  const response = await res.json()
  return NextResponse.json(response);
}

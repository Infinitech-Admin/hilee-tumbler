// app/api/admin/partnership-inquiries/route.ts

import { NextRequest, NextResponse } from "next/server";

const LARAVEL_API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function getAuthToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  const cookieToken =
    request.cookies.get("token")?.value ||
    request.cookies.get("auth_token")?.value;
  return authHeader?.replace("Bearer ", "") || cookieToken || null;
}

export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken(request);

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const apiUrl = `${LARAVEL_API_BASE}/api/partnership-inquiries${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      return NextResponse.json(
        { message: errorData.message || "Failed to fetch inquiries." },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data.data ?? data);
  } catch (error) {
    console.error("Error fetching partnership inquiries:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}

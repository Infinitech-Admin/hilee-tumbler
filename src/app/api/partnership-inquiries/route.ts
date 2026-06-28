import { NextRequest, NextResponse } from "next/server";

const LARAVEL_API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ── POST /api/partnership-inquiries ──────────────────────────────────────────
// Public endpoint — no auth required.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Client-side guard (Laravel validates too, but fail fast)
    if (!body.name || !body.email || !body.type) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, and partnership type are required fields.",
          errors: {
            name: !body.name ? ["Name is required"] : [],
            email: !body.email ? ["Email is required"] : [],
            type: !body.type ? ["Partnership type is required"] : [],
          },
        },
        { status: 400 },
      );
    }

    const response = await fetch(
      `${LARAVEL_API_BASE}/api/partnership-inquiries`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          company: body.company || null,
          type: body.type, // retail | distributor | reseller | other
          message: body.message || null,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Partnership Inquiry API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit inquiry. Please try again later.",
      },
      { status: 500 },
    );
  }
}

// ── GET /api/partnership-inquiries ───────────────────────────────────────────
// Admin-only — requires Bearer token or auth_token cookie.
// Supports query params: ?type=retail&status=new&search=term&per_page=15
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

    // Support both paginated { data: { data: [...] } } and flat responses
    return NextResponse.json(data.data ?? data);
  } catch (error) {
    console.error("Error fetching partnership inquiries:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}

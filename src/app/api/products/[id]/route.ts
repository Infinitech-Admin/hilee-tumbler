import { type NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function getAuthToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "").trim();
    if (token && token !== "null" && token !== "undefined") return token;
  }
  const cookieToken =
    request.cookies.get("auth_token")?.value ||
    request.cookies.get("token")?.value;
  if (cookieToken && cookieToken !== "null" && cookieToken !== "undefined")
    return cookieToken;
  return null;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  try {
    const token = getAuthToken(request);
    const headers: Record<string, string> = { Accept: "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: "GET",
      headers,
      cache: "no-cache",
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to fetch product" },
        { status: response.status },
      );
    }
    return NextResponse.json(data.data ?? data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

async function handleUpdate(request: NextRequest, id: string) {
  try {
    const token = getAuthToken(request);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const laravelForm = new FormData();

    // Always include _method spoofing
    laravelForm.append("_method", "PUT");

    // Only append fields that were actually submitted (not empty)
    const stringFields = [
      "name",
      "description",
      "price",
      "stock",
      "category",
      "tiktok_url",
      "shopee_url",
      "lazada_url",
    ];

    for (const field of stringFields) {
      const value = formData.get(field) as string | null;
      if (value !== null && value !== "") {
        laravelForm.append(field, value);
      }
    }

    // is_active is a boolean toggle — always send it if present
    const is_active = formData.get("is_active") as string | null;
    if (is_active !== null) {
      laravelForm.append("is_active", is_active);
    }

    // Only attach image if one was actually selected
    const image = formData.get("image") as File | null;
    if (image && image.size > 0) {
      laravelForm.append("image", image);
    }

    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: laravelForm,
    });

    const text = await response.text();
    let responseData: any = {};
    try {
      responseData = JSON.parse(text);
    } catch {
      console.error("Non-JSON from Laravel:", text);
      return NextResponse.json(
        { message: "Invalid response from server" },
        { status: 500 },
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          message: responseData.message || "Failed to update product",
          errors: responseData.errors || null,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  return handleUpdate(request, id);
}

// POST handler — needed because browsers can't send FormData via PUT.
// The page sends POST with _method=PUT for Laravel method spoofing.
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  return handleUpdate(request, id);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  try {
    const token = getAuthToken(request);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to delete product" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

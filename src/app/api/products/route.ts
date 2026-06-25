import { type NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function getAuthToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  const cookieToken =
    request.cookies.get("token")?.value ||
    request.cookies.get("auth_token")?.value;
  return authHeader?.replace("Bearer ", "") || cookieToken || null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const apiUrl = `${API_BASE_URL}/api/products${queryString ? `?${queryString}` : ""}`;

    const token = getAuthToken(request);
    const headers: Record<string, string> = { Accept: "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers,
      cache: "no-cache",
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      return NextResponse.json(
        { message: errorData.message || "Failed to fetch products" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data.data ?? data);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = (formData.get("description") as string) ?? "";
    const price = formData.get("price") as string;
    const stock = formData.get("stock") as string;
    const image = formData.get("image") as File | null;
    const category = (formData.get("category") as string) ?? "";
    const tiktok_url = (formData.get("tiktok_url") as string) ?? "";
    const shopee_url = (formData.get("shopee_url") as string) ?? "";
    const lazada_url = (formData.get("lazada_url") as string) ?? "";

    if (!name || !price || stock === null || stock === "") {
      return NextResponse.json(
        { message: "name, price, and stock are required" },
        { status: 422 },
      );
    }

    const laravelForm = new FormData();
    laravelForm.append("name", name);
    laravelForm.append("description", description);
    laravelForm.append("price", price);
    laravelForm.append("stock", stock);
    if (category) laravelForm.append("category", category);
    if (tiktok_url) laravelForm.append("tiktok_url", tiktok_url);
    if (shopee_url) laravelForm.append("shopee_url", shopee_url);
    if (lazada_url) laravelForm.append("lazada_url", lazada_url);
    if (image && image.size > 0) laravelForm.append("image", image);

    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: laravelForm,
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: responseData.message || "Failed to create product",
          errors: responseData.errors || null,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

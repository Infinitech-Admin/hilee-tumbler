// lib/external-shop-links.ts
//
// 🔧 TODO: Replace these with your actual store URLs once you have them.
// These are the *fallback* links used when a product doesn't have its
// own specific tiktokUrl / shopeeUrl / lazadaUrl set.
export const SHOP_URLS = {
  tiktok: "https://www.tiktok.com/@your-shop-handle",
  shopee: "https://shopee.ph/your-shop-name",
  lazada: "https://www.lazada.com.ph/shop/your-shop-name",
};

// If you later want a SPECIFIC product to link to its own listing instead
// of the general storefront, just add tiktokUrl / shopeeUrl / lazadaUrl
// fields to that product's data (e.g. from your API/backend) — no code
// changes needed here, it'll just be picked up automatically.
type ShopLinkItem = {
  tiktokUrl?: string;
  shopeeUrl?: string;
  lazadaUrl?: string;
};

export function getProductShopLinks(item: ShopLinkItem) {
  return {
    tiktok: item.tiktokUrl || SHOP_URLS.tiktok,
    shopee: item.shopeeUrl || SHOP_URLS.shopee,
    lazada: item.lazadaUrl || SHOP_URLS.lazada,
  };
}

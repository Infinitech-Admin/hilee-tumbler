"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  Loader2,
  Upload,
  Save,
  ShoppingBag,
  Link,
  LayoutGrid,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAuthStore } from "@/store/authStore"
import Image from "next/image"

const purpleGrad = "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)"

const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return "/placeholder.svg"
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://"))
    return imagePath
  const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
  const fullPath = imagePath.startsWith("images/products/")
    ? imagePath
    : `images/products/${imagePath}`
  return `${BASE}/${fullPath}`
}

// ── Static Categories ────────────────────────────────────────────────────────
// Backend stores category as a plain string (validation rule:
// 'category' => 'nullable|string|max:100'), so this is just a curated,
// grouped list for the picker UI — no API call, no FK, no category table.

interface CategoryOption {
  name: string
  color: string
}

interface CategoryGroup {
  options: CategoryOption[]
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    options: [{ name: "Home Supplies", color: "#22c55e" }],
  },
  {
    options: [{ name: "Tea & Coffeeware", color: "#92400e" }],
  },
  {
    options: [{ name: "Bakeware", color: "#f59e0b" }],
  },
  {
    options: [{ name: "Cookware", color: "#ef4444" }],
  },
  {
    options: [{ name: "Cutlery & Tableware", color: "#3b82f6" }],
  },
  {
    options: [{ name: "Drinkware", color: "#06b6d4" }],
  },
]

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { toast } = useToast()
  const tokenFromStore = useAuthStore((state) => state.token)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "none",
    tiktok_url: "",
    shopee_url: "",
    lazada_url: "",
    is_active: true,
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState<string>("")

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    useAuthStore.getState().initializeAuth()
  }, [])

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const token =
        tokenFromStore ||
        localStorage.getItem("auth_token") ||
        localStorage.getItem("token")

      const response = await fetch(`/api/products/${id}`, {
        headers: {
          ...(token && token !== "null" && token !== "undefined"
            ? { Authorization: `Bearer ${token}` }
            : {}),
          Accept: "application/json",
        },
      })
      const data = await response.json()
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch product")

      const product = data.data ?? data
      setFormData({
        name: product.name ?? "",
        description: product.description ?? "",
        price: String(product.price ?? ""),
        stock: String(product.stock ?? ""),
        category: product.category ?? "none",
        tiktok_url: product.tiktok_url ?? "",
        shopee_url: product.shopee_url ?? "",
        lazada_url: product.lazada_url ?? "",
        is_active: product.is_active ?? true,
      })
      setCurrentImage(product.image ?? "")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to load product",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const token =
        tokenFromStore ||
        localStorage.getItem("auth_token") ||
        localStorage.getItem("token") ||
        useAuthStore.getState().token

      if (!token || token === "null" || token === "undefined") {
        toast({
          variant: "destructive",
          title: "Unauthenticated",
          description: "Your session expired. Please log in again.",
        })
        router.push("/admin/login")
        return
      }

      const data = new FormData()
      data.append("_method", "PUT")
      data.append("name", formData.name)
      data.append("description", formData.description)
      data.append("price", formData.price)
      data.append("stock", formData.stock)
      data.append("is_active", formData.is_active ? "1" : "0")
      data.append("tiktok_url", formData.tiktok_url)
      data.append("shopee_url", formData.shopee_url)
      data.append("lazada_url", formData.lazada_url)
      if (formData.category && formData.category !== "none")
        data.append("category", formData.category)

      if (selectedImage) data.append("image", selectedImage)

      const response = await fetch(`/api/products/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: data,
      })

      const result = await response.json()
      if (!response.ok)
        throw new Error(result.message || "Failed to update product")

      toast({ title: "Success", description: "Product updated successfully!" })
      router.push("/admin/product")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  if (loading) {
    return (
      <SidebarProvider defaultOpen={!isMobile}>
        <div
          className="flex min-h-screen w-full"
          style={{
            background:
              "linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 50%, #f3e8ff 100%)",
          }}
        >
          <AppSidebar />
          <div className={`flex-1 min-w-0 ${isMobile ? "ml-0" : "ml-64"}`}>
            <div className="flex items-center justify-center min-h-screen">
              <div className="flex items-center gap-3 bg-white/90 px-8 py-5 rounded-2xl shadow-xl border border-purple-100">
                <Loader2 className="h-6 w-6 animate-spin text-violet-600" />
                <span className="text-purple-800 font-semibold">
                  Loading product...
                </span>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div
        className="flex min-h-screen w-full"
        style={{
          background:
            "linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 50%, #f3e8ff 100%)",
        }}
      >
        <AppSidebar />
        <div className={`flex-1 min-w-0 ${isMobile ? "ml-0" : "ml-64"}`}>
          {isMobile && (
            <div
              className="sticky top-0 z-50 flex h-12 items-center gap-2 border-b px-4 shadow-sm"
              style={{
                background: "rgba(124,58,237,0.97)",
                borderColor: "rgba(168,85,247,0.3)",
              }}
            >
              <SidebarTrigger className="-ml-1 text-white" />
              <span className="text-sm font-bold text-white">Edit Product</span>
            </div>
          )}

          <main className="p-4 sm:p-6 md:p-8">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => router.push("/admin/product")}
                  className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <div
                  className="flex-1 rounded-2xl px-6 py-4 shadow-xl flex items-center gap-3"
                  style={{ background: purpleGrad }}
                >
                  <ShoppingBag className="w-6 h-6 text-white opacity-90" />
                  <div>
                    <h1 className="text-xl font-bold text-white">
                      Edit Product
                    </h1>
                    <p className="text-violet-200 text-xs mt-0.5">ID #{id}</p>
                  </div>
                </div>
              </div>

              {/* Form card */}
              <div
                className="rounded-2xl shadow-xl border bg-white/95 overflow-hidden"
                style={{ borderColor: "rgba(139,92,246,0.15)" }}
              >
                <form onSubmit={handleSubmit}>
                  {/* ── Basic Info ── */}
                  <div
                    className="px-6 py-4 border-b"
                    style={{
                      background: "rgba(245,243,255,0.6)",
                      borderColor: "rgba(139,92,246,0.1)",
                    }}
                  >
                    <p className="text-xs font-bold text-purple-600 uppercase tracking-widest">
                      Basic Info
                    </p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="name"
                        className="text-xs font-bold text-purple-600 uppercase tracking-widest"
                      >
                        Product Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={saving}
                        placeholder="e.g., Premium Tumbler 500ml"
                        className="border-purple-200 focus:border-purple-400 focus-visible:ring-purple-300 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="description"
                        className="text-xs font-bold text-purple-600 uppercase tracking-widest"
                      >
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        disabled={saving}
                        placeholder="Describe the product..."
                        className="resize-none border-purple-200 focus:border-purple-400 focus-visible:ring-purple-300 rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="price"
                          className="text-xs font-bold text-purple-600 uppercase tracking-widest"
                        >
                          Price (₱)
                        </Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.price}
                          onChange={handleChange}
                          required
                          disabled={saving}
                          placeholder="0.00"
                          className="border-purple-200 focus:border-purple-400 focus-visible:ring-purple-300 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="stock"
                          className="text-xs font-bold text-purple-600 uppercase tracking-widest"
                        >
                          Stock
                        </Label>
                        <Input
                          id="stock"
                          name="stock"
                          type="number"
                          min="0"
                          value={formData.stock}
                          onChange={handleChange}
                          required
                          disabled={saving}
                          placeholder="0"
                          className="border-purple-200 focus:border-purple-400 focus-visible:ring-purple-300 rounded-xl"
                        />
                      </div>
                    </div>

                    {/* ── Category (static, grouped, string-based) ── */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="category"
                        className="text-xs font-bold text-purple-600 uppercase tracking-widest flex items-center gap-1.5"
                      >
                        <LayoutGrid className="w-3.5 h-3.5" /> Category
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(v) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: v,
                          }))
                        }
                        disabled={saving}
                      >
                        <SelectTrigger
                          id="category"
                          className="border-purple-200 focus:border-purple-400 focus:ring-purple-300 rounded-xl"
                        >
                          <SelectValue placeholder="Select a category…" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">— No category —</SelectItem>

                          {CATEGORY_GROUPS.flatMap((group) =>
                            group.options.map((opt) => (
                              <SelectItem key={opt.name} value={opt.name}>
                                <span className="inline-flex items-center gap-2">
                                  <span
                                    className="w-2 h-2 rounded-full inline-block"
                                    style={{ background: opt.color }}
                                  />
                                  {opt.name}
                                </span>
                              </SelectItem>
                            )),
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div
                      className="flex items-center gap-3 p-4 rounded-xl border"
                      style={{
                        borderColor: "rgba(139,92,246,0.15)",
                        background: "rgba(245,243,255,0.4)",
                      }}
                    >
                      <Switch
                        id="is_active"
                        checked={formData.is_active}
                        onCheckedChange={(v) =>
                          setFormData((prev) => ({ ...prev, is_active: v }))
                        }
                        disabled={saving}
                      />
                      <div>
                        <Label
                          htmlFor="is_active"
                          className="text-sm font-semibold text-gray-700 cursor-pointer"
                        >
                          Active Product
                        </Label>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {formData.is_active
                            ? "Visible to customers"
                            : "Hidden from customers"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ── Shop Links ── */}
                  <div
                    className="px-6 py-4 border-t border-b"
                    style={{
                      background: "rgba(245,243,255,0.6)",
                      borderColor: "rgba(139,92,246,0.1)",
                    }}
                  >
                    <p className="text-xs font-bold text-purple-600 uppercase tracking-widest flex items-center gap-1.5">
                      <Link className="w-3.5 h-3.5" /> Shop Links
                    </p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="tiktok_url"
                        className="text-xs font-bold text-purple-600 uppercase tracking-widest flex items-center gap-2"
                      >
                        <span className="w-3 h-3 rounded-full bg-gray-900 inline-block" />{" "}
                        TikTok Shop URL
                      </Label>
                      <Input
                        id="tiktok_url"
                        name="tiktok_url"
                        value={formData.tiktok_url}
                        onChange={handleChange}
                        disabled={saving}
                        placeholder="https://www.tiktok.com/..."
                        className="border-purple-200 focus:border-purple-400 focus-visible:ring-purple-300 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="shopee_url"
                        className="text-xs font-bold text-purple-600 uppercase tracking-widest flex items-center gap-2"
                      >
                        <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />{" "}
                        Shopee URL
                      </Label>
                      <Input
                        id="shopee_url"
                        name="shopee_url"
                        value={formData.shopee_url}
                        onChange={handleChange}
                        disabled={saving}
                        placeholder="https://shopee.ph/..."
                        className="border-purple-200 focus:border-purple-400 focus-visible:ring-purple-300 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="lazada_url"
                        className="text-xs font-bold text-purple-600 uppercase tracking-widest flex items-center gap-2"
                      >
                        <span className="w-3 h-3 rounded-full bg-blue-900 inline-block" />{" "}
                        Lazada URL
                      </Label>
                      <Input
                        id="lazada_url"
                        name="lazada_url"
                        value={formData.lazada_url}
                        onChange={handleChange}
                        disabled={saving}
                        placeholder="https://www.lazada.com.ph/..."
                        className="border-purple-200 focus:border-purple-400 focus-visible:ring-purple-300 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* ── Image ── */}
                  <div
                    className="px-6 py-4 border-t border-b"
                    style={{
                      background: "rgba(245,243,255,0.6)",
                      borderColor: "rgba(139,92,246,0.1)",
                    }}
                  >
                    <p className="text-xs font-bold text-purple-600 uppercase tracking-widest">
                      Product Image
                    </p>
                  </div>
                  <div className="p-6 space-y-3">
                    {currentImage && !imagePreview && (
                      <div
                        className="flex items-center gap-4 p-3 rounded-xl border"
                        style={{
                          borderColor: "rgba(139,92,246,0.15)",
                          background: "rgba(245,243,255,0.4)",
                        }}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-purple-100 flex-shrink-0">
                          <Image
                            src={getImageUrl(currentImage)}
                            alt="Current"
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-purple-700">
                            Current Image
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Upload a new image to replace it
                          </p>
                        </div>
                      </div>
                    )}

                    <div
                      className="rounded-xl border-2 border-dashed border-purple-200 hover:border-purple-400 transition-colors cursor-pointer p-5 text-center"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {imagePreview ? (
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-purple-200 flex-shrink-0">
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-semibold text-purple-700">
                              {selectedImage?.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Click to change image
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="py-2">
                          <Upload className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                          <p className="text-sm font-medium text-purple-500">
                            Click to upload new image
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            PNG, JPG, WEBP up to 10MB
                          </p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      disabled={saving}
                      className="hidden"
                    />
                  </div>

                  {/* ── Footer ── */}
                  <div
                    className="px-6 py-4 border-t flex gap-3 justify-end"
                    style={{
                      borderColor: "rgba(139,92,246,0.1)",
                      background: "rgba(245,243,255,0.4)",
                    }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/admin/product")}
                      disabled={saving}
                      className="border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={saving}
                      className="text-white font-semibold shadow-lg rounded-xl px-6"
                      style={{ background: purpleGrad }}
                    >
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

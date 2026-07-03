"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type React from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  Search,
  Loader2,
  Handshake,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

const skyGrad = "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)";

interface PartnershipInquiry {
  id: number;
  name: string;
  email: string;
  company: string | null;
  type: string;
  message: string | null;
  created_at: string;
  updated_at: string;
}

const typeLabels: Record<string, string> = {
  retail: "Retail partnership",
  distributor: "Distributor partnership",
  reseller: "Reseller / online",
  other: "Other",
};

export default function PartnershipAdminPage() {
  const router = useRouter(); // ✅ moved inside
  const [inquiries, setInquiries] = useState<PartnershipInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [selectedInquiry, setSelectedInquiry] =
    useState<PartnershipInquiry | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("auth_token") || localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("/api/admin/partnership-inquiries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      const result = await response.json();
      if (response.ok) {
        setInquiries(result.data ?? result);
      } else {
        throw new Error(result.message || "Failed to fetch inquiries");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load partnership inquiries",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const columns: ColumnDef<PartnershipInquiry>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-semibold text-gray-900 text-sm">
          {row.original.name}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="text-sm text-gray-700">{row.original.email}</div>
      ),
    },
    {
      accessorKey: "company",
      header: "Company",
      cell: ({ row }) => (
        <div className="text-sm text-gray-700">
          {row.original.company || "-"}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Partnership type",
      cell: ({ row }) => {
        const value = row.original.type;
        const label = typeLabels[value] ?? value;
        const badgeClass: Record<string, string> = {
          retail: "bg-sky-100 text-sky-800",
          distributor: "bg-gray-900 text-sky-50",
          reseller: "bg-cyan-100 text-cyan-800",
          other: "bg-green-50 text-green-800",
        };
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass[value] ?? "bg-gray-100 text-gray-700"}`}
          >
            {label}
          </span>
        );
      },
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => (
        <div className="text-sm text-gray-700 truncate max-w-[200px]">
          {row.original.message || "-"}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created on",
      cell: ({ row }) => (
        <div className="text-xs text-gray-500">
          {new Date(row.original.created_at).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedInquiry(row.original);
              setIsViewDialogOpen(true);
            }}
          >
            <Eye className="w-4 h-4 mr-1" /> View
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: inquiries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { columnFilters, globalFilter, rowSelection, sorting },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
  });

  const filteredRows = table.getFilteredRowModel().rows;
  const totalItems = filteredRows.length;
  const totalPages =
    itemsPerPage === -1 ? 1 : Math.ceil(totalItems / itemsPerPage);
  const startIndex = itemsPerPage === -1 ? 0 : (currentPage - 1) * itemsPerPage;
  const endIndex = itemsPerPage === -1 ? totalItems : startIndex + itemsPerPage;
  const paginatedRows =
    itemsPerPage === -1
      ? filteredRows
      : filteredRows.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, globalFilter]);

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value === "all" ? -1 : parseInt(value));
  };

  if (loading) {
    return (
      <SidebarProvider defaultOpen={!isMobile}>
        <div className="flex min-h-screen w-full bg-gradient-to-br from-sky-50 to-cyan-50">
          <AppSidebar />
          <div className={`flex-1 min-w-0 ${isMobile ? "ml-0" : "ml-72"}`}>
            <div className="flex items-center justify-center min-h-screen w-full">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg">
                <Loader2 className="h-6 w-6 animate-spin text-sky-500" />
                <span className="text-gray-700 font-medium">
                  Loading inquiries...
                </span>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div
        className="flex min-h-screen w-full"
        style={{
          background:
            "linear-gradient(135deg, #eaf6ff 0%, #f0fbff 50%, #f7fbff 100%)",
        }}
      >
        <AppSidebar />
        <div className={`flex-1 min-w-0 ${isMobile ? "ml-0" : "ml-64"}`}>
          {isMobile && (
            <div
              className="sticky top-0 z-50 flex h-12 items-center gap-2 border-b px-4 shadow-sm"
              style={{
                background: "rgba(14,165,233,0.97)",
                borderColor: "rgba(56,189,248,0.3)",
              }}
            >
              <SidebarTrigger className="-ml-1 text-white" />
              <span className="text-sm font-bold text-white">Partnerships</span>
            </div>
          )}

          <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
            <div className="max-w-full space-y-4 sm:space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-stretch justify-between">
                <div
                  className="rounded-2xl px-7 py-6 shadow-xl relative overflow-hidden"
                  style={{ background: skyGrad }}
                >
                  <div
                    className="absolute right-4 top-4 w-20 h-20 rounded-full opacity-10 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle, white, transparent)",
                    }}
                  />
                  <div className="flex items-center gap-3">
                    <Handshake className="w-7 h-7 text-white opacity-90" />
                    <div>
                      <h1 className="text-2xl font-bold text-white tracking-tight">
                        Partnership inquiries
                      </h1>
                      <p className="text-sky-100 text-sm mt-0.5">
                        Manage retailer and distributor applications
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="gap-0 p-0 bg-white/70 backdrop-blur-sm shadow-xl border-sky-100">
                <CardHeader
                  className="pb-3 text-white rounded-t-lg"
                  style={{
                    background:
                      "linear-gradient(90deg, #0ea5e9 0%, #7dd3fc 100%)",
                  }}
                >
                  <div className="mt-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                      <Input
                        placeholder="Search inquiries..."
                        value={globalFilter || ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="pl-9 pr-3 py-2 w-full bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 focus:border-white/50 transition-all duration-200"
                      />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="bg-white p-0">
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between px-5 py-4 border-b border-gray-100">
                    <p className="text-sm text-gray-600 font-medium">
                      Showing{" "}
                      <span className="font-semibold text-gray-800">
                        {totalItems === 0 ? 0 : startIndex + 1} to{" "}
                        {Math.min(endIndex, totalItems)}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-gray-800">
                        {totalItems}
                      </span>{" "}
                      inquiries
                    </p>
                    <div className="flex items-center gap-2">
                      <Label className="text-sm text-gray-600 whitespace-nowrap">
                        Items per page:
                      </Label>
                      <Select
                        value={
                          itemsPerPage === -1 ? "all" : itemsPerPage.toString()
                        }
                        onValueChange={handleItemsPerPageChange}
                      >
                        <SelectTrigger className="w-24 h-9 border-gray-200 focus:border-sky-400 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                          <SelectItem value="all">All</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="bg-gradient-to-r from-sky-100 to-cyan-100 border-b border-sky-200">
                          {table.getHeaderGroups().map((headerGroup) =>
                            headerGroup.headers.map((header) => (
                              <th
                                key={header.id}
                                className="text-left px-4 py-3 text-sm font-semibold text-gray-700 tracking-wide"
                              >
                                {header.isPlaceholder
                                  ? null
                                  : typeof header.column.columnDef.header ===
                                      "function"
                                    ? header.column.columnDef.header(
                                        header.getContext(),
                                      )
                                    : header.column.columnDef.header}
                              </th>
                            )),
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedRows.length === 0 ? (
                          <tr>
                            <td
                              colSpan={columns.length}
                              className="px-4 py-16 text-center"
                            >
                              <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center">
                                  <Handshake className="w-8 h-8 text-sky-300" />
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-700">
                                    No inquiries found
                                  </p>
                                  {globalFilter && (
                                    <p className="text-sm text-gray-400 mt-0.5">
                                      No results for &quot;{globalFilter}&quot;
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          paginatedRows.map((row, index) => (
                            <tr
                              key={row.id}
                              className={`border-b border-sky-100 hover:bg-gradient-to-r hover:from-sky-50 hover:to-cyan-50 transition-all duration-200 ${index % 2 === 0 ? "bg-white" : "bg-sky-50/30"}`}
                            >
                              {row.getVisibleCells().map((cell) => (
                                <td
                                  key={cell.id}
                                  className="px-4 py-3.5 text-sm align-middle"
                                >
                                  {typeof cell.column.columnDef.cell ===
                                  "function"
                                    ? cell.column.columnDef.cell(
                                        cell.getContext(),
                                      )
                                    : (cell.getValue() as React.ReactNode)}
                                </td>
                              ))}
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50/50">
                      <p className="text-sm text-gray-500">
                        Page{" "}
                        <span className="font-semibold text-gray-700">
                          {currentPage}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-700">
                          {totalPages}
                        </span>
                      </p>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setCurrentPage(1)}
                          disabled={currentPage === 1}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-white hover:text-sky-600 hover:border hover:border-sky-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-semibold"
                        >
                          «
                        </button>
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-white hover:text-sky-600 hover:border hover:border-sky-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            let pg: number;
                            if (totalPages <= 5) pg = i + 1;
                            else if (currentPage <= 3) pg = i + 1;
                            else if (currentPage >= totalPages - 2)
                              pg = totalPages - 4 + i;
                            else pg = currentPage - 2 + i;
                            return (
                              <button
                                key={pg}
                                onClick={() => setCurrentPage(pg)}
                                style={
                                  currentPage === pg
                                    ? {
                                        background:
                                          "linear-gradient(90deg, #0ea5e9 0%, #06b6d4 100%)",
                                        color: "#ffffff",
                                        boxShadow:
                                          "0 4px 10px rgba(14,165,233,0.25)",
                                      }
                                    : undefined
                                }
                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${currentPage === pg ? "" : "text-gray-600 hover:bg-white hover:text-sky-600 hover:border hover:border-sky-200"}`}
                              >
                                {pg}
                              </button>
                            );
                          },
                        )}
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-white hover:text-sky-600 hover:border hover:border-sky-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          disabled={currentPage === totalPages}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-white hover:text-sky-600 hover:border hover:border-sky-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-semibold"
                        >
                          »
                        </button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>

        {/* View dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 sm:p-8">
            <DialogHeader className="text-center sm:text-left">
              <DialogTitle className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-600">
                Partnership details
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Quick overview of the selected inquiry.
              </DialogDescription>
            </DialogHeader>

            {selectedInquiry && (
              <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="font-semibold text-sky-600">Name:</span>
                  <span className="break-words">{selectedInquiry.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="font-semibold text-sky-600">Email:</span>
                  <span className="break-words">{selectedInquiry.email}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="font-semibold text-sky-600">Company:</span>
                  <span>{selectedInquiry.company || "-"}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="font-semibold text-sky-600">
                    Partnership type:
                  </span>
                  <span>
                    {typeLabels[selectedInquiry.type] ?? selectedInquiry.type}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-sky-600">Message:</span>
                  <p className="p-3 bg-sky-50 dark:bg-sky-900 rounded-lg text-gray-800 dark:text-gray-200 text-sm sm:text-base max-h-40 overflow-auto">
                    {selectedInquiry.message || "-"}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="font-semibold text-sky-600">
                    Created at:
                  </span>
                  <span>
                    {new Date(selectedInquiry.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            <DialogFooter className="mt-6 flex justify-center sm:justify-end">
              <Button
                variant="outline"
                className="bg-white dark:bg-gray-800 border-sky-400 text-sky-600 hover:bg-sky-50 hover:text-sky-700 transition-all"
                onClick={() => setIsViewDialogOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
}

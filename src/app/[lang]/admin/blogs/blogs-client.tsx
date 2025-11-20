"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  MoreVertical,
  FileText,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { DeleteConfirmationModal } from "@/components/admin/delete-confirmation-modal"

interface BlogCategory {
  id: string
  name: string
  slug: string
}

interface BlogAuthor {
  id: string
  name: string | null
  email: string
}

interface BlogPost {
  id: string
  slug: string
  title: string
  subtitle: string | null
  description: string | null
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  featured: boolean
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  author: BlogAuthor
  categories: BlogCategory[]
  language: string
}

interface SessionUser {
  id: string
  email: string
  name: string | null
  role: "USER" | "ADMIN"
}

interface BlogsClientProps {
  lang: string
  blogs: BlogPost[]
}

export function BlogsClient({ lang, blogs }: BlogsClientProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"ALL" | "DRAFT" | "PUBLISHED" | "ARCHIVED">("ALL")
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState<BlogPost | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Filter blogs based on search and status
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.slug.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "ALL" || blog.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const formatDate = (date: Date | null) => {
    if (!date) return "Not published"
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-800 border-green-200"
      case "DRAFT":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "ARCHIVED":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
  }

  const handleDeleteClick = (blog: BlogPost) => {
    setBlogToDelete(blog)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/blogs/${blogToDelete.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete blog post")
      }

      toast({
        title: "Success",
        description: "Blog post deleted successfully",
        variant: "success",
      })

      // Refresh the page to show updated list
      router.refresh()
      setDeleteModalOpen(false)
      setBlogToDelete(null)
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete blog post",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false)
    setBlogToDelete(null)
  }

  return (
    <>
      {/* Header */}
      <motion.header
        className="bg-white border-b border-gray-200"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-[#2c2b2b] mb-2">Blog Posts</h1>
              <p className="text-[#2c2b2b]/70">
                Manage and create blog posts for your website
              </p>
            </div>
            <motion.button
              onClick={() => router.push(`/${lang}/admin/blogs/new`)}
              className="flex items-center gap-2 bg-[#b92025] hover:bg-[#7d1416] text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-5 h-5" />
              Add New Blog
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Filters and Search */}
      <motion.div
        className="bg-white border-b border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blogs by title, description, or slug..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {(["ALL", "PUBLISHED", "DRAFT", "ARCHIVED"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    filterStatus === status
                      ? "bg-[#b92025] text-white"
                      : "bg-gray-100 text-[#2c2b2b] hover:bg-gray-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="text-sm text-[#2c2b2b]/70 mb-1">Total Blogs</div>
            <div className="text-2xl font-bold text-[#2c2b2b]">{blogs.length}</div>
          </motion.div>
          <motion.div
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
          >
            <div className="text-sm text-[#2c2b2b]/70 mb-1">Published</div>
            <div className="text-2xl font-bold text-green-600">
              {blogs.filter((b) => b.status === "PUBLISHED").length}
            </div>
          </motion.div>
          <motion.div
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <div className="text-sm text-[#2c2b2b]/70 mb-1">Drafts</div>
            <div className="text-2xl font-bold text-yellow-600">
              {blogs.filter((b) => b.status === "DRAFT").length}
            </div>
          </motion.div>
          <motion.div
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
          >
            <div className="text-sm text-[#2c2b2b]/70 mb-1">Featured</div>
            <div className="text-2xl font-bold text-[#b92025]">
              {blogs.filter((b) => b.featured).length}
            </div>
          </motion.div>
        </div>

        {/* Blogs List */}
        {filteredBlogs.length === 0 ? (
          <motion.div
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#2c2b2b] mb-2">No blogs found</h3>
            <p className="text-[#2c2b2b]/70 mb-6">
              {searchQuery || filterStatus !== "ALL"
                ? "Try adjusting your search or filters"
                : "Get started by creating your first blog post"}
            </p>
            {!searchQuery && filterStatus === "ALL" && (
              <motion.button
                onClick={() => router.push(`/${lang}/admin/blogs/new`)}
                className="inline-flex items-center gap-2 bg-[#b92025] hover:bg-[#7d1416] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                Create Your First Blog
              </motion.button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Title and Status */}
                      <div className="flex items-start gap-3 mb-3">
                        <h3 className="text-xl font-bold text-[#2c2b2b] flex-1">
                          {blog.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {blog.featured && (
                            <span className="px-2 py-1 bg-[#b92025] text-white text-xs font-semibold rounded">
                              Featured
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded border ${getStatusBadgeColor(
                              blog.status
                            )}`}
                          >
                            {blog.status}
                          </span>
                        </div>
                      </div>

                      {/* Subtitle */}
                      {blog.subtitle && (
                        <p className="text-[#2c2b2b]/70 mb-3 line-clamp-2">{blog.subtitle}</p>
                      )}

                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-[#2c2b2b]/60 mb-4">
                        <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          <span>{blog.author.name || blog.author.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="uppercase text-xs">{blog.language}</span>
                        </div>
                      </div>

                      {/* Categories */}
                      {blog.categories.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap mb-4">
                          <Tag className="w-4 h-4 text-[#2c2b2b]/60" />
                          {blog.categories.map((category) => (
                            <span
                              key={category.id}
                              className="px-2 py-1 bg-gray-100 text-[#2c2b2b] text-xs font-medium rounded"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Slug */}
                      <div className="text-xs text-[#2c2b2b]/50 font-mono">
                        /{blog.slug}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <motion.button
                        onClick={() => router.push(`/${lang}/blogs/${blog.slug}`)}
                        className="p-2 text-[#2c2b2b]/60 hover:text-[#2c2b2b] hover:bg-gray-100 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        onClick={() => router.push(`/${lang}/admin/blogs/${blog.id}/edit`)}
                        className="p-2 text-[#2c2b2b]/60 hover:text-[#b92025] hover:bg-red-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteClick(blog)}
                        className="p-2 text-[#2c2b2b]/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title={blogToDelete?.title || ""}
        message="This action cannot be undone. This will permanently delete the blog post and all its associated data."
        isLoading={isDeleting}
      />
    </>
  )
}


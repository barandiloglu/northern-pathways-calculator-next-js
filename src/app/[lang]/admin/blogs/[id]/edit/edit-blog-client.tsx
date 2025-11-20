"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Eye, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { BlogPreview } from "@/components/admin/blog-preview"
import { tipTapToContentBlocks, contentBlocksToTipTap, extractTextFromTipTap } from "@/utils/content-converter"

interface BlogCategory {
  id: string
  name: string
  slug: string
}

interface BlogPost {
  id: string
  slug: string
  title: string
  subtitle: string | null
  description: string | null
  content: any
  tableOfContents: any
  heroImage: string | null
  featuredImage: string | null
  readTime: string | null
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  featured: boolean
  metaTitle: string | null
  metaDescription: string | null
  metaKeywords: string | null
  language: string
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  author: {
    id: string
    name: string | null
    email: string
  }
  categories: BlogCategory[]
  tags: string[]
}

interface EditBlogClientProps {
  lang: string
  blogPost: BlogPost
  categories: BlogCategory[]
  authorName?: string | null
  authorEmail?: string
}

export function EditBlogClient({ lang, blogPost, categories, authorName, authorEmail }: EditBlogClientProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [metaTitleManuallyEdited, setMetaTitleManuallyEdited] = useState(
    !!blogPost.metaTitle && blogPost.metaTitle !== blogPost.title
  )
  const [tipTapContent, setTipTapContent] = useState<any>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const [formData, setFormData] = useState({
    slug: blogPost.slug,
    title: blogPost.title,
    subtitle: blogPost.subtitle || "",
    description: blogPost.description || "",
    content: blogPost.content || [{ type: "paragraph", content: "" }],
    tableOfContents: blogPost.tableOfContents,
    heroImage: blogPost.heroImage || "",
    featuredImage: blogPost.featuredImage || "",
    readTime: blogPost.readTime || "",
    status: blogPost.status,
    featured: blogPost.featured,
    metaTitle: blogPost.metaTitle || blogPost.title,
    metaDescription: blogPost.metaDescription || "",
    metaKeywords: blogPost.metaKeywords || "",
    language: blogPost.language,
    categoryIds: blogPost.categories.map((cat) => cat.id),
    tags: Array.isArray(blogPost.tags) ? blogPost.tags.join(", ") : "",
  })

  // Initialize TipTap content from existing content blocks
  useEffect(() => {
    if (!isInitialized && blogPost.content) {
      const contentBlocks = Array.isArray(blogPost.content) ? blogPost.content : []
      const hasContent = contentBlocks.some(
        (block: any) =>
          (block.type === "paragraph" && (block.content || block.text)) ||
          (block.type === "heading" && (block.text || block.content || block.title)) ||
          (block.type === "list" && block.items && block.items.length > 0)
      )
      
      if (hasContent) {
        try {
          const tipTapJSON = contentBlocksToTipTap(contentBlocks)
          setTipTapContent(tipTapJSON)
        } catch (error) {
          console.error("Error converting content blocks to TipTap JSON:", error)
          setTipTapContent({
            type: "doc",
            content: [],
          })
        }
      } else {
        setTipTapContent({
          type: "doc",
          content: [],
        })
      }
      setIsInitialized(true)
    } else if (!isInitialized && !blogPost.content) {
      // No content, initialize with empty doc
      setTipTapContent({
        type: "doc",
        content: [],
      })
      setIsInitialized(true)
    }
  }, [blogPost.content, isInitialized])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      // Track manual edits to metaTitle (slug is read-only)
      if (name === "metaTitle") {
        // If metaTitle is cleared, allow auto-generation again and regenerate from title
        if (value === "") {
          setMetaTitleManuallyEdited(false)
          setFormData((prev) => ({
            ...prev,
            metaTitle: prev.title,
          }))
          return
        } else {
          setMetaTitleManuallyEdited(true)
        }
      }
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter((id) => id !== categoryId)
        : [...prev.categoryIds, categoryId],
    }))
  }


  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  // Calculate word count from TipTap JSON or content blocks
  const calculateWordCount = (tipTapJSON: any): number => {
    if (!tipTapJSON) return 0

    // Extract plain text from TipTap JSON
    const text = extractTextFromTipTap(tipTapJSON)
    
    // Count words
    const words = text.trim().split(/\s+/).filter((word: string) => word.length > 0)
    return words.length
  }

  // Calculate read time in minutes (assuming 200 words per minute)
  const calculateReadTime = (wordCount: number): string => {
    if (wordCount === 0) return ""
    
    // Average reading speed: 200 words per minute
    const wordsPerMinute = 200
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    
    // Minimum 1 minute
    const readTime = Math.max(1, minutes)
    
    return `${readTime} min read`
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    
    setFormData((prev) => {
      // Always generate slug from title (slug is read-only)
      const newSlug = generateSlug(title)
      // Only auto-generate metaTitle if it hasn't been manually edited
      const newMetaTitle = metaTitleManuallyEdited ? prev.metaTitle : title
      
      return {
        ...prev,
        title,
        slug: newSlug,
        metaTitle: newMetaTitle,
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Ensure content is up to date from TipTap if it exists
      let finalContent = formData.content
      let finalReadTime = formData.readTime
      let finalTableOfContents = formData.tableOfContents
      
      if (tipTapContent) {
        const contentBlocks = tipTapToContentBlocks(tipTapContent)
        if (contentBlocks.length > 0) {
          finalContent = contentBlocks
          
          // Recalculate read time and table of contents
          const wordCount = calculateWordCount(tipTapContent)
          finalReadTime = calculateReadTime(wordCount)
          
          const headings = contentBlocks.filter(
            (block) => block.type === "heading" && (block.level === 1 || block.level === 2)
          )
          finalTableOfContents = headings.length > 0
            ? headings.map((heading, index) => ({
                id: heading.id || `heading-${index}`,
                title: heading.text || heading.content || heading.title || "",
                level: heading.level || 1,
              }))
            : null
        }
      }

      const response = await fetch(`/api/blogs/${blogPost.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          content: finalContent,
          readTime: finalReadTime,
          tableOfContents: finalTableOfContents,
          publishedAt: formData.status === "PUBLISHED" && !blogPost.publishedAt
            ? new Date().toISOString()
            : formData.status === "PUBLISHED"
            ? blogPost.publishedAt?.toISOString() || new Date().toISOString()
            : null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update blog post")
      }

      toast({
        variant: "success",
        title: "Blog Updated",
        description: "Your blog post has been updated successfully.",
      })

      setTimeout(() => {
        router.push(`/${lang}/admin/blogs`)
        router.refresh()
      }, 500)
    } catch (error) {
      console.error("Error updating blog:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update blog post",
      })
    } finally {
      setIsSubmitting(false)
    }
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
          <div className="flex items-center gap-4 mb-4">
            <motion.button
              onClick={() => router.push(`/${lang}/admin/blogs`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 text-[#2c2b2b]" />
            </motion.button>
            <div>
              <h1 className="text-3xl font-extrabold text-[#2c2b2b]">Edit Blog Post</h1>
              <p className="text-[#2c2b2b]/70 mt-1">Update your blog post information</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Form */}
      <div className="container mx-auto px-6 py-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Form Column */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-bold text-[#2c2b2b] mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="Enter blog post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    readOnly
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-[#2c2b2b]/70 font-mono text-sm cursor-not-allowed"
                    placeholder="blog-post-slug"
                  />
                  <p className="text-xs text-[#2c2b2b]/60 mt-1">
                    URL-friendly version of the title (auto-generated from title, cannot be edited)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="Optional subtitle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="Brief description of the blog post"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-xl font-bold text-[#2c2b2b] mb-4">Content</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <RichTextEditor
                    content={tipTapContent ? JSON.stringify(tipTapContent) : JSON.stringify({ type: "doc", content: [] })}
                    onChange={(tipTapJSON) => {
                      // Convert TipTap JSON to content blocks
                      const contentBlocks = tipTapToContentBlocks(tipTapJSON)
                      
                      // Calculate word count from TipTap JSON
                      const wordCount = calculateWordCount(tipTapJSON)
                      const readTime = calculateReadTime(wordCount)
                      
                      // Generate table of contents from headings (only H1 and H2)
                      const headings = contentBlocks.filter(
                        (block) => block.type === "heading" && (block.level === 1 || block.level === 2)
                      )
                      const tableOfContents = headings.length > 0
                        ? headings.map((heading, index) => ({
                            id: heading.id || `heading-${index}`,
                            title: heading.text || heading.content || heading.title || "",
                            level: heading.level || 1,
                          }))
                        : null
                      
                      // Update form data
                      setFormData((prev) => ({
                        ...prev,
                        content: contentBlocks.length > 0 ? contentBlocks : [{ type: "paragraph", content: "" }],
                        readTime,
                        tableOfContents,
                      }))
                      
                      // Update TipTap content state
                      setTipTapContent(tipTapJSON)
                    }}
                    placeholder="Start writing your blog post..."
                  />
                  <p className="text-xs text-[#2c2b2b]/60 mt-1">
                    Use the toolbar above to format your content. Headings, bold, italic, underline, lists, and links are supported.
                  </p>
                </div>
              </div>
            </div>

            {/* Media */}
            <div>
              <h2 className="text-xl font-bold text-[#2c2b2b] mb-4">Media</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Hero Image URL
                  </label>
                  <input
                    type="url"
                    name="heroImage"
                    value={formData.heroImage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Categories & Tags */}
            <div>
              <h2 className="text-xl font-bold text-[#2c2b2b] mb-4">Categories & Tags</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Categories
                  </label>
                  <div className="border border-gray-300 rounded-lg p-4 max-h-48 overflow-y-auto">
                    {categories.length === 0 ? (
                      <p className="text-sm text-[#2c2b2b]/60">No categories available</p>
                    ) : (
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <label
                            key={category.id}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={formData.categoryIds.includes(category.id)}
                              onChange={() => handleCategoryToggle(category.id)}
                              className="w-4 h-4 text-[#b92025] border-gray-300 rounded focus:ring-[#b92025]"
                            />
                            <span className="text-sm text-[#2c2b2b]">{category.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="tag1, tag2, tag3 (comma-separated)"
                  />
                  <p className="text-xs text-[#2c2b2b]/60 mt-1">
                    Enter tags separated by commas
                  </p>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div>
              <h2 className="text-xl font-bold text-[#2c2b2b] mb-4">Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                  >
                    <option value="en">English</option>
                    <option value="tr">Turkish</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-[#2c2b2b]/70 cursor-not-allowed"
                    placeholder="Auto-calculated from content"
                  />
                  <p className="text-xs text-[#2c2b2b]/60 mt-1">
                    Automatically calculated based on word count (200 words per minute)
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#b92025] border-gray-300 rounded focus:ring-[#b92025]"
                  />
                  <label className="text-sm font-semibold text-[#2c2b2b] cursor-pointer">
                    Featured Post
                  </label>
                </div>
              </div>
            </div>

            {/* SEO */}
            <div>
              <h2 className="text-xl font-bold text-[#2c2b2b] mb-4">SEO Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="SEO title (defaults to post title)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="SEO description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2c2b2b] mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    name="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92025] focus:border-transparent text-[#2c2b2b]"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <motion.button
                type="button"
                onClick={() => router.push(`/${lang}/admin/blogs`)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-[#2c2b2b] font-semibold hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2 bg-[#b92025] hover:bg-[#7d1416] text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update Blog Post
                  </>
                )}
              </motion.button>
            </div>
              </div>
            </form>
          </div>

          {/* Preview Column */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-4">
              <BlogPreview
                title={formData.title}
                subtitle={formData.subtitle}
                description={formData.description}
                content={formData.content}
                tipTapContent={tipTapContent}
                heroImage={formData.heroImage}
                categories={categories.filter((cat) => formData.categoryIds.includes(cat.id)).map((cat) => cat.name)}
                readTime={formData.readTime}
                tableOfContents={formData.tableOfContents}
                authorName={authorName || undefined}
                authorEmail={authorEmail}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


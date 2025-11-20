/**
 * Utility functions to convert between TipTap JSON format and content blocks format
 */

interface ContentBlock {
  type: string
  text?: string
  content?: string
  title?: string
  id?: string
  level?: number
  items?: string[]
}

interface TipTapJSON {
  type: string
  content?: TipTapJSON[]
  attrs?: Record<string, any>
  marks?: Array<{ type: string; attrs?: Record<string, any> }>
  text?: string
}

/**
 * Converts TipTap JSON (ProseMirror format) to content blocks format
 */
export function tipTapToContentBlocks(tipTapJSON: TipTapJSON): ContentBlock[] {
  if (!tipTapJSON || !tipTapJSON.content) {
    return []
  }

  const blocks: ContentBlock[] = []

  tipTapJSON.content.forEach((node) => {
    if (node.type === "paragraph") {
      const text = extractTextFromNode(node)
      if (text.trim()) {
        blocks.push({
          type: "paragraph",
          content: text,
          text: text,
        })
      }
    } else if (node.type === "heading") {
      const level = node.attrs?.level || 1
      const text = extractTextFromNode(node)
      if (text.trim()) {
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "")

        blocks.push({
          type: "heading",
          text: text,
          content: text,
          title: text,
          id: id,
          level: level,
        })
      }
    } else if (node.type === "bulletList" || node.type === "orderedList") {
      const items: string[] = []
      if (node.content) {
        node.content.forEach((listItem) => {
          if (listItem.type === "listItem" && listItem.content) {
            listItem.content.forEach((itemNode) => {
              if (itemNode.type === "paragraph") {
                const text = extractTextFromNode(itemNode)
                if (text.trim()) {
                  items.push(text)
                }
              }
            })
          }
        })
      }

      if (items.length > 0) {
        blocks.push({
          type: "list",
          items: items,
        })
      }
    }
  })

  return blocks
}

/**
 * Extracts plain text from a TipTap node, preserving inline formatting marks
 */
function extractTextFromNode(node: TipTapJSON): string {
  if (node.text) {
    return node.text
  }

  if (node.content) {
    return node.content.map((child) => extractTextFromNode(child)).join("")
  }

  return ""
}

/**
 * Converts content blocks format to TipTap JSON (ProseMirror format)
 */
export function contentBlocksToTipTap(
  blocks: ContentBlock[]
): TipTapJSON {
  const content: TipTapJSON[] = []

  blocks.forEach((block) => {
    if (block.type === "paragraph") {
      const text = block.content || block.text || ""
      if (text.trim()) {
        content.push({
          type: "paragraph",
          content: [
            {
              type: "text",
              text: text,
            },
          ],
        })
      }
    } else if (block.type === "heading") {
      const text = block.text || block.content || block.title || ""
      const level = block.level || 1
      if (text.trim()) {
        content.push({
          type: "heading",
          attrs: {
            level: Math.max(1, Math.min(6, level)),
          },
          content: [
            {
              type: "text",
              text: text,
            },
          ],
        })
      }
    } else if (block.type === "subheading") {
      const text = block.text || block.content || ""
      if (text.trim()) {
        content.push({
          type: "heading",
          attrs: {
            level: 3, // Subheadings as H3
          },
          content: [
            {
              type: "text",
              text: text,
            },
          ],
        })
      }
    } else if (block.type === "list") {
      const items = block.items || block.content || []
      if (Array.isArray(items) && items.length > 0) {
        const listItems: TipTapJSON[] = items.map((item) => ({
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: typeof item === "string" ? item : String(item),
                },
              ],
            },
          ],
        }))

        content.push({
          type: "bulletList", // Default to bullet list
          content: listItems,
        })
      }
    }
  })

  return {
    type: "doc",
    content: content,
  }
}

/**
 * Extracts plain text from TipTap JSON for word count calculation
 */
export function extractTextFromTipTap(tipTapJSON: TipTapJSON): string {
  let text = ""

  function traverse(node: TipTapJSON) {
    if (node.text) {
      text += node.text + " "
    }
    if (node.content) {
      node.content.forEach((child) => traverse(child))
    }
  }

  if (tipTapJSON) {
    traverse(tipTapJSON)
  }

  return text.trim()
}


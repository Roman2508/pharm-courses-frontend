"use client"

import {
  Bold,
  List,
  Italic,
  AlignLeft,
  AlignRight,
  ListOrdered,
  AlignCenter,
  AlignJustify,
  UnderlineIcon,
  Link as LinkIcon,
  ChevronDown,
} from "lucide-react"
import Link from "@tiptap/extension-link"
import StarterKit from "@tiptap/starter-kit"
import { useState, useRef, useEffect } from "react"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import FontFamily from "@tiptap/extension-font-family"
import { useEditor, EditorContent } from "@tiptap/react"
import { TextStyle } from "@tiptap/extension-text-style"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
}

// Dropdown for heading selection
function HeadingDropdown({ editor }: { editor: any; editorVersion: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const currentLabel = editor.isActive("heading", { level: 1 })
    ? "H1"
    : editor.isActive("heading", { level: 2 })
      ? "H2"
      : editor.isActive("heading", { level: 3 })
        ? "H3"
        : "¶"

  const options = [
    {
      label: "Paragraph",
      shortLabel: "¶",
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () =>
        !editor.isActive("heading", { level: 1 }) &&
        !editor.isActive("heading", { level: 2 }) &&
        !editor.isActive("heading", { level: 3 }),
      className: "text-sm",
    },
    {
      label: "Heading 1",
      shortLabel: "H1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
      className: "text-2xl font-bold",
    },
    {
      label: "Heading 2",
      shortLabel: "H2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
      className: "text-xl font-bold",
    },
    {
      label: "Heading 3",
      shortLabel: "H3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
      className: "text-lg font-semibold",
    },
  ]

  return (
    <div className="relative" ref={ref}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 min-w-[48px] font-mono text-xs"
        title="Text style"
      >
        <span className="font-semibold">{currentLabel}</span>
        <ChevronDown className="h-3 w-3 opacity-60" />
      </Button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 z-50 border border-border rounded-lg shadow-lg overflow-hidden min-w-[160px]"
          style={{ backgroundColor: "var(--color-surface, white)" }}
        >
          {options.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                opt.action()
                setOpen(false)
              }}
              style={{ backgroundColor: opt.isActive() ? undefined : "var(--color-surface, white)" }}
              className={cn(
                "w-full text-left px-3 py-2 hover:bg-surface-hover transition-colors text-text-primary",
                opt.isActive() && "bg-primary/10 text-primary",
                opt.className,
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function RichTextEditor({ content, onChange, placeholder, className = "" }: RichTextEditorProps) {
  // Force re-render whenever editor state changes (selection, marks, nodes)
  const [editorVersion, forceUpdate] = useState(0)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: "rich-bullet-list",
          },
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: "rich-ordered-list",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "rich-list-item",
          },
        },
        heading: {
          HTMLAttributes: {},
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline cursor-pointer",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      TextStyle,
      FontFamily,
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[300px] px-4 py-3 rounded-b-xl border-0 bg-input text-text-primary rich-editor-content",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
      forceUpdate((n) => n + 1)
    },
    onSelectionUpdate: () => {
      forceUpdate((n) => n + 1)
    },
    onTransaction: () => {
      forceUpdate((n) => n + 1)
    },
  })

  if (!editor) {
    return null
  }

  // Toggle list only for the current paragraph (or existing selection).
  // If the selection is collapsed (no text selected), we first select the
  // entire current block so Tiptap wraps only that node into a list,
  // not the whole document.
  const toggleList = (type: "bulletList" | "orderedList") => {
    const { state } = editor
    const { selection } = state
    const { $from, empty } = selection

    if (empty) {
      // Select the entire current block node
      const from = $from.start($from.depth)
      const to = $from.end($from.depth)
      editor
        .chain()
        .focus()
        .setTextSelection({ from, to })
        [type === "bulletList" ? "toggleBulletList" : "toggleOrderedList"]()
        .run()
    } else {
      editor.chain().focus()[type === "bulletList" ? "toggleBulletList" : "toggleOrderedList"]().run()
    }
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt("URL", previousUrl)

    if (url === null) return

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  return (
    <>
      {/* Scoped styles for the editor content */}
      <style>{`
        .rich-editor-content {
          line-height: 1.7;
        }

        /* Headings — override prose defaults */
        .rich-editor-content h1 {
          font-size: 2rem !important;
          font-weight: 700 !important;
          line-height: 1.2 !important;
          margin: 1.25rem 0 0.5rem !important;
          letter-spacing: -0.02em !important;
        }
        .rich-editor-content h2 {
          font-size: 1.5rem !important;
          font-weight: 700 !important;
          line-height: 1.3 !important;
          margin: 1rem 0 0.4rem !important;
          letter-spacing: -0.01em !important;
        }
        .rich-editor-content h3 {
          font-size: 1.2rem !important;
          font-weight: 600 !important;
          line-height: 1.4 !important;
          margin: 0.75rem 0 0.35rem !important;
        }

        /* Paragraphs */
        .rich-editor-content p {
          margin: 0.25rem 0;
        }

        /* Bullet lists — override prose list-style:none */
        .rich-editor-content ul {
          list-style-type: disc !important;
          padding-left: 1.6rem !important;
          margin: 0.5rem 0 !important;
        }
        .rich-editor-content ul li {
          display: list-item !important;
          margin: 0.15rem 0 !important;
        }
        .rich-editor-content ul ul {
          list-style-type: circle !important;
          margin: 0 !important;
        }

        /* Ordered lists */
        .rich-editor-content ol {
          list-style-type: decimal !important;
          padding-left: 1.6rem !important;
          margin: 0.5rem 0 !important;
        }
        .rich-editor-content ol li {
          display: list-item !important;
          margin: 0.15rem 0 !important;
        }

        /* Tiptap wraps list item text in <p> — flatten it */
        .rich-editor-content li > p {
          margin: 0 !important;
          display: inline !important;
        }

        /* Placeholder */
        .rich-editor-content p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: var(--color-text-muted, #9ca3af);
          pointer-events: none;
          height: 0;
        }
      `}</style>

      <div className={cn("border border-border rounded-xl overflow-hidden bg-surface", className)}>
        {/* Toolbar */}
        <div className="bg-surface-hover p-2 flex items-center flex-wrap gap-1 sticky top-0 z-10 border-b border-border">
          {/* Heading dropdown */}
          <HeadingDropdown editor={editor} editorVersion={editorVersion} />

          <div className="w-px h-6 bg-border mx-1" />

          {/* Text formatting */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "!bg-primary/10 text-primary" : ""}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "!bg-primary/10 text-primary" : ""}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "!bg-primary/10 text-primary" : ""}
            title="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={setLink}
            className={editor.isActive("link") ? "!bg-primary/10 text-primary" : ""}
            title="Link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Lists */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => toggleList("bulletList")}
            className={editor.isActive("bulletList") ? "!bg-primary/10 text-primary" : ""}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => toggleList("orderedList")}
            className={editor.isActive("orderedList") ? "!bg-primary/10 text-primary" : ""}
            title="Ordered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Alignment */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={editor.isActive({ textAlign: "left" }) ? "!bg-primary/10 text-primary" : ""}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={editor.isActive({ textAlign: "center" }) ? "!bg-primary/10 text-primary" : ""}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={editor.isActive({ textAlign: "right" }) ? "!bg-primary/10 text-primary" : ""}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={editor.isActive({ textAlign: "justify" }) ? "!bg-primary/10 text-primary" : ""}
            title="Justify"
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>

        {/* Editor content */}
        <EditorContent editor={editor} className="[&>div]:!rounded-none [&>div]:!border-0" placeholder={placeholder} />
      </div>
    </>
  )
}

'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { Image } from '@tiptap/extension-image'
import { 
  Bold, 
  Italic, 
  Strikethrough,
  List, 
  ListOrdered,
  Link as LinkIcon,
  Table as TableIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Quote,
  Code
} from 'lucide-react'
import { useCallback } from 'react'

interface RichTextEditorProps {
  content: any
  onChange: (content: any) => void
  placeholder?: string
  editable?: boolean
  minimal?: boolean
  className?: string
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Start typing...",
  editable = true,
  minimal = false,
  className = ""
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer hover:text-blue-800'
        }
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-2'
        }
      })
    ],
    content,
    editable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[120px] px-3 py-2'
      }
    }
  })

  const addLink = useCallback(() => {
    const url = window.prompt('Enter URL:')
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }, [editor])

  const removeLink = useCallback(() => {
    if (editor) {
      editor.chain().focus().unsetLink().run()
    }
  }, [editor])

  const addTable = useCallback(() => {
    if (editor) {
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    }
  }, [editor])

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL:')
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) {
    return <div className={`border border-gray-300 rounded-lg ${className}`}>Loading editor...</div>
  }

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    disabled = false, 
    children, 
    title 
  }: {
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    children: React.ReactNode
    title?: string
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded hover:bg-gray-200 transition-colors ${
        isActive ? 'bg-gray-300 text-gray-900' : 'text-gray-600'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      type="button"
    >
      {children}
    </button>
  )

  const Divider = () => <div className="w-px bg-gray-300 mx-1" />

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden bg-white ${className}`}>
      {editable && (
        <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1 items-center">
          {/* Text Formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </ToolbarButton>

          {!minimal && (
            <>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                isActive={editor.isActive('code')}
                title="Inline Code"
              >
                <Code className="w-4 h-4" />
              </ToolbarButton>

              <Divider />

              {/* Headings */}
              <select
                value={
                  editor.isActive('heading', { level: 1 }) ? '1' :
                  editor.isActive('heading', { level: 2 }) ? '2' :
                  editor.isActive('heading', { level: 3 }) ? '3' :
                  'paragraph'
                }
                onChange={(e) => {
                  const value = e.target.value
                  if (value === 'paragraph') {
                    editor.chain().focus().setParagraph().run()
                  } else {
                    editor.chain().focus().toggleHeading({ level: parseInt(value) as any }).run()
                  }
                }}
                className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
              >
                <option value="paragraph">Paragraph</option>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
              </select>

              <Divider />
            </>
          )}

          {/* Lists */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>

          {!minimal && (
            <>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive('blockquote')}
                title="Quote"
              >
                <Quote className="w-4 h-4" />
              </ToolbarButton>

              <Divider />

              {/* Links */}
              <ToolbarButton
                onClick={editor.isActive('link') ? removeLink : addLink}
                isActive={editor.isActive('link')}
                title={editor.isActive('link') ? 'Remove Link' : 'Add Link'}
              >
                <LinkIcon className="w-4 h-4" />
              </ToolbarButton>

              {/* Table */}
              <ToolbarButton
                onClick={addTable}
                title="Insert Table"
              >
                <TableIcon className="w-4 h-4" />
              </ToolbarButton>

              {/* Image */}
              <ToolbarButton
                onClick={addImage}
                title="Insert Image"
              >
                <ImageIcon className="w-4 h-4" />
              </ToolbarButton>

              <Divider />
            </>
          )}

          {/* Undo/Redo */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </ToolbarButton>
        </div>
      )}

      <div className="relative">
        <EditorContent 
          editor={editor}
          className={`
            ${!editable ? 'cursor-default' : ''}
            [&_.ProseMirror]:focus-visible:outline-none
            [&_.ProseMirror]:min-h-[120px]
            [&_.ProseMirror]:p-3
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-400
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left
            [&_.ProseMirror_table]:border-collapse-collapse
            [&_.ProseMirror_table]:table-layout-fixed
            [&_.ProseMirror_table]:w-full
            [&_.ProseMirror_table]:margin-1
            [&_.ProseMirror_table]:overflow-hidden
            [&_.ProseMirror_td]:min-w-4
            [&_.ProseMirror_th]:min-w-4
            [&_.ProseMirror_td]:border-2
            [&_.ProseMirror_th]:border-2
            [&_.ProseMirror_td]:border-gray-300
            [&_.ProseMirror_th]:border-gray-300
            [&_.ProseMirror_td]:p-2
            [&_.ProseMirror_th]:p-2
            [&_.ProseMirror_td]:vertical-align-top
            [&_.ProseMirror_th]:vertical-align-top
            [&_.ProseMirror_th]:font-bold
            [&_.ProseMirror_th]:text-left
            [&_.ProseMirror_th]:bg-gray-50
          `}
        />
      </div>
    </div>
  )
} 
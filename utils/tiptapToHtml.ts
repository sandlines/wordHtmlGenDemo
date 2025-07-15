/**
 * Convert TipTap content to clean HTML for PDF generation
 */

interface TipTapContent {
  type: string
  content?: TipTapContent[]
  attrs?: Record<string, any>
  text?: string
  marks?: Array<{ type: string; attrs?: Record<string, any> }>
}

export function tiptapToHtml(content: TipTapContent | string): string {
  // If content is already a string (HTML), return it directly
  if (typeof content === 'string') {
    return content
  }

  // If content is a TipTap JSON object, convert it
  if (content && content.type === 'doc' && content.content) {
    return content.content.map(node => convertNode(node)).join('')
  }

  return ''
}

function convertNode(node: TipTapContent): string {
  if (!node) return ''

  switch (node.type) {
    case 'paragraph':
      const pClass = node.attrs?.textAlign ? ` class="text-${node.attrs.textAlign}"` : ''
      return `<p${pClass}>${convertContent(node.content)}</p>`

    case 'dublinParagraph':
      let dublinParagraphAttrs = ''
      const attrs = node.attrs || {}
      
      // Add data attributes for styling
      if (attrs.align && attrs.align !== 'left') {
        dublinParagraphAttrs += ` data-align="${attrs.align}"`
      }
      if (attrs.spacing && attrs.spacing !== 'normal') {
        dublinParagraphAttrs += ` data-spacing="${attrs.spacing}"`
      }
      if (attrs.variant && attrs.variant !== 'body') {
        dublinParagraphAttrs += ` data-variant="${attrs.variant}"`
      }
      if (attrs.color) {
        dublinParagraphAttrs += ` data-color="${attrs.color}"`
      }
      
      return `<p${dublinParagraphAttrs}>${convertContent(node.content)}</p>`

    case 'locationBlock':
      return `<div data-type="location-block" class="location-block">
        ${convertContent(node.content)}
      </div>`

    case 'councilList':
      return `<div data-type="council-list" class="council-list">
        <h3 class="council-title">COUNCILMEMBERS</h3>
        <div class="council-members-content">
          ${convertContent(node.content)}
        </div>
      </div>`

    case 'coverHeader':
      return `<div data-type="cover-header" class="cover-header">
        ${convertContent(node.content)}
      </div>`

    case 'noticeBox':
      const title = node.attrs?.title || 'Additional Meeting Procedures'
      return `<div data-type="notice-box" class="notice-box">
        <div class="notice-box-title">${title}</div>
        <div class="notice-box-content">${convertContent(node.content)}</div>
      </div>`

    case 'sectionBreak':
      const text = node.attrs?.text || 'REGULAR MEETING 7:00 PM'
      return `<div data-type="section-break" class="section-break">${text}</div>`

    case 'dublinLogo':
      return `<div data-type="dublin-logo" class="dublin-logo-container">
        <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='%232e8b57'/><text x='50' y='65' text-anchor='middle' fill='white' font-size='36'>☘</text></svg>" alt="Dublin City Logo" class="dublin-logo" width="80" height="80" />
      </div>`

    case 'dublinTitle':
      const titleLevel = node.attrs?.level || 'main'
      return `<h1 data-type="dublin-title" class="dublin-title dublin-title-${titleLevel}">${convertContent(node.content)}</h1>`

    case 'heading':
      const level = node.attrs?.level || 1
      const hClass = node.attrs?.textAlign ? ` class="text-${node.attrs.textAlign}"` : ''
      return `<h${level}${hClass}>${convertContent(node.content)}</h${level}>`

    case 'bulletList':
      return `<ul>${convertContent(node.content)}</ul>`

    case 'orderedList':
      return `<ol>${convertContent(node.content)}</ol>`

    case 'listItem':
      return `<li>${convertContent(node.content)}</li>`

    case 'hardBreak':
      return '<br>'

    case 'horizontalRule':
      return '<hr>'

    case 'image':
      const src = node.attrs?.src || ''
      const alt = node.attrs?.alt || ''
      const width = node.attrs?.width ? ` width="${node.attrs.width}"` : ''
      const height = node.attrs?.height ? ` height="${node.attrs.height}"` : ''
      const className = node.attrs?.class ? ` class="${node.attrs.class}"` : ''
      return `<img src="${src}" alt="${alt}"${width}${height}${className}>`

    case 'text':
      return applyMarks(node.text || '', node.marks || [])

    default:
      // For any unhandled nodes, try to convert their content
      return convertContent(node.content)
  }
}

function convertContent(content?: TipTapContent[]): string {
  if (!content) return ''
  return content.map(node => convertNode(node)).join('')
}

function applyMarks(text: string, marks: Array<{ type: string; attrs?: Record<string, any> }>): string {
  let result = text

  marks.forEach(mark => {
    switch (mark.type) {
      case 'bold':
        result = `<strong>${result}</strong>`
        break
      case 'italic':
        result = `<em>${result}</em>`
        break
      case 'underline':
        result = `<u>${result}</u>`
        break
      case 'strike':
        result = `<s>${result}</s>`
        break
      case 'code':
        result = `<code>${result}</code>`
        break
      case 'link':
        const href = mark.attrs?.href || '#'
        const target = mark.attrs?.target ? ` target="${mark.attrs.target}"` : ''
        result = `<a href="${href}"${target}>${result}</a>`
        break
      case 'textStyle':
        if (mark.attrs?.color) {
          result = `<span style="color: ${mark.attrs.color}">${result}</span>`
        }
        break
    }
  })

  return result
}

/**
 * Generate complete HTML document for Dublin agenda cover page
 */
export function generateDublinCoverHTML(tiptapContent: any, additionalData?: any): string {
  const bodyHTML = tiptapToHtml(tiptapContent)
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dublin City Council Agenda</title>
        <style>
            @page {
                size: letter;
                margin: 0.75in;
            }
            
            body {
                font-family: 'Times New Roman', Times, serif;
                font-size: 12pt;
                line-height: 1.3;
                color: #000;
                margin: 0;
                padding: 0;
                background: white;
            }

            /* Dublin Cover Page Styles */
            .dublin-cover-page {
                font-family: 'Times New Roman', Times, serif;
                font-size: 12pt;
                line-height: 1.3;
                color: #000;
                max-width: 8.5in;
                margin: 0 auto;
                padding: 0;
                background: white;
            }

            .cover-header {
                display: grid;
                grid-template-columns: 1fr auto 1fr;
                gap: 2rem;
                margin-bottom: 2rem;
                align-items: start;
            }

            .council-list {
                text-align: left;
            }

            .council-list h3,
            .council-title {
                font-size: 11pt;
                color: #666;
                font-weight: 500;
                margin-bottom: 8px;
                text-transform: uppercase;
                font-family: 'Times New Roman', Times, serif;
            }

            .council-member {
                font-size: 10pt;
                color: #333;
                margin-bottom: 2px;
                line-height: 1.3;
                font-family: 'Times New Roman', Times, serif;
            }

            .dublin-logo-container {
                text-align: center;
                margin: 1rem 0;
            }

            .dublin-logo {
                display: block;
                margin: 0 auto;
                width: 80px;
                height: 80px;
            }

            .location-block {
                text-align: right;
                font-size: 10pt;
                color: #666;
                line-height: 1.2;
            }

            .location-block div {
                margin-bottom: 2px;
            }

            .notice-box {
                border: 2px solid #000;
                padding: 20px;
                margin: 25px 0;
                page-break-inside: avoid;
            }

            .notice-box-title {
                text-align: center;
                font-size: 14pt;
                font-weight: bold;
                text-decoration: underline;
                margin-bottom: 15px;
                font-family: 'Times New Roman', Times, serif;
            }

            .notice-box-content {
                font-size: 10pt;
                line-height: 1.4;
                text-align: left;
            }

            .notice-box-content p {
                margin-bottom: 12px;
                font-family: 'Times New Roman', Times, serif;
            }

            .notice-box-content ul {
                margin-left: 20px;
                margin-bottom: 12px;
            }

            .notice-box-content li {
                margin-bottom: 10px;
                font-family: 'Times New Roman', Times, serif;
            }

            .section-break {
                text-align: center;
                font-size: 14pt;
                font-weight: bold;
                margin: 25px 0;
                font-family: 'Times New Roman', Times, serif;
            }

            /* Attribute-based paragraph styling */
            p[data-align="left"] {
                text-align: left;
            }

            p[data-align="center"] {
                text-align: center;
            }

            p[data-align="right"] {
                text-align: right;
            }

            p[data-spacing="tight"] {
                line-height: 1.15;
                margin-bottom: 4pt;
            }

            p[data-spacing="normal"] {
                line-height: 1.3;
                margin-bottom: 12pt;
            }

            p[data-spacing="loose"] {
                line-height: 1.5;
                margin-bottom: 20pt;
            }

            p[data-variant="fine-print"] {
                font-size: 9pt;
                color: #666;
            }

            p[data-variant="heading"] {
                font-size: 14pt;
                font-weight: bold;
            }

            p[data-variant="subtitle"] {
                font-size: 11pt;
                color: #666;
            }

            p[data-color] {
                color: attr(data-color);
            }

            /* Dublin Branding Colors */
            .dublin-title {
                font-size: 28pt;
                font-weight: bold;
                color: #2e8b57;
                text-align: center;
                margin: 1rem 0;
                font-family: 'Times New Roman', Times, serif;
            }

            .dublin-title-main {
                font-size: 28pt;
                font-weight: bold;
                color: #2e8b57;
                text-align: center;
                margin: 1rem 0;
                font-family: 'Times New Roman', Times, serif;
            }

            .dublin-title-sub {
                font-size: 14pt;
                color: #666;
                text-align: center;
                margin-bottom: 25px;
                font-family: 'Times New Roman', Times, serif;
            }

            .dublin-subtitle {
                font-size: 14pt;
                color: #666;
                text-align: center;
                margin-bottom: 25px;
                font-family: 'Times New Roman', Times, serif;
            }

            /* Center alignment classes */
            .text-center {
                text-align: center;
            }

            .text-left {
                text-align: left;
            }

            .text-right {
                text-align: right;
            }

            /* Heading styles */
            h1 {
                font-size: 28pt;
                font-weight: bold;
                color: #2e8b57;
                text-align: center;
                margin: 1rem 0;
                font-family: 'Times New Roman', Times, serif;
            }

            h2 {
                font-size: 18pt;
                font-weight: bold;
                margin: 1rem 0;
                font-family: 'Times New Roman', Times, serif;
            }

            h3 {
                font-size: 14pt;
                font-weight: bold;
                margin: 0.5rem 0;
                font-family: 'Times New Roman', Times, serif;
            }

            p {
                margin-bottom: 0.5rem;
                font-family: 'Times New Roman', Times, serif;
            }

            ul, ol {
                margin-bottom: 1rem;
            }

            li {
                margin-bottom: 0.25rem;
                font-family: 'Times New Roman', Times, serif;
            }

            strong {
                font-weight: bold;
            }

            em {
                font-style: italic;
            }

            /* Print optimization */
            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }
                
                .cover-header {
                    page-break-inside: avoid;
                }
                
                .notice-box {
                    page-break-inside: avoid;
                }
            }
        </style>
    </head>
    <body>
        ${bodyHTML}
    </body>
    </html>
  `
} 
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    dublinParagraph: {
      setParagraphAlign: (align: string) => ReturnType
      setParagraphSpacing: (spacing: string) => ReturnType
      setParagraphVariant: (variant: string) => ReturnType
      setParagraphColor: (color: string) => ReturnType
    }
    locationBlock: {
      insertLocationBlock: () => ReturnType
      updateLocationBlock: (lines: string[]) => ReturnType
    }
    councilList: {
      insertCouncilList: () => ReturnType
    }
    coverHeader: {
      insertCoverHeader: () => ReturnType
    }
    noticeBox: {
      insertNoticeBox: () => ReturnType
    }
    sectionBreak: {
      insertSectionBreak: (text?: string) => ReturnType
    }
    dublinLogo: {
      insertDublinLogo: () => ReturnType
    }
    dublinTitle: {
      insertDublinTitle: (text: string, level?: string) => ReturnType
    }
  }
}

// Custom paragraph extension with Dublin-specific attributes
export const DublinParagraph = Node.create({
  name: 'dublinParagraph',
  group: 'block',
  content: 'inline*',
  
  addAttributes() {
    return {
      align: {
        default: 'left',
        parseHTML: element => element.getAttribute('data-align') || 'left',
        renderHTML: attributes => {
          if (attributes.align === 'left') return {}
          return { 'data-align': attributes.align }
        }
      },
      spacing: {
        default: 'normal',
        parseHTML: element => element.getAttribute('data-spacing') || 'normal',
        renderHTML: attributes => {
          if (attributes.spacing === 'normal') return {}
          return { 'data-spacing': attributes.spacing }
        }
      },
      variant: {
        default: 'body',
        parseHTML: element => element.getAttribute('data-variant') || 'body',
        renderHTML: attributes => {
          if (attributes.variant === 'body') return {}
          return { 'data-variant': attributes.variant }
        }
      },
      color: {
        default: null,
        parseHTML: element => element.getAttribute('data-color'),
        renderHTML: attributes => {
          if (!attributes.color) return {}
          return { 'data-color': attributes.color }
        }
      }
    }
  },

  parseHTML() {
    return [{ tag: 'p' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setParagraphAlign: (align: string) => ({ commands }: any) => {
        return commands.updateAttributes('dublinParagraph', { align })
      },
      setParagraphSpacing: (spacing: string) => ({ commands }: any) => {
        return commands.updateAttributes('dublinParagraph', { spacing })
      },
      setParagraphVariant: (variant: string) => ({ commands }: any) => {
        return commands.updateAttributes('dublinParagraph', { variant })
      },
      setParagraphColor: (color: string) => ({ commands }: any) => {
        return commands.updateAttributes('dublinParagraph', { color })
      }
    }
  }
})

// Location Block component (right column) - now editable
export const LocationBlock = Node.create({
  name: 'locationBlock',
  group: 'block',
  content: 'block+', // Allow editable content
  
  addAttributes() {
    return {
      heading: {
        default: 'Meeting Location'
      }
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="location-block"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 
        'data-type': 'location-block',
        'class': 'location-block'
      }),
      0 // Content will be rendered here
    ]
  },

  addCommands() {
    return {
      insertLocationBlock: () => ({ commands }: any) => {
        return commands.insertContent({
          type: 'locationBlock',
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'location-line' },
              content: [{ type: 'text', text: 'Peter W. Snyder Council Chamber' }]
            },
            {
              type: 'paragraph', 
              attrs: { class: 'location-line' },
              content: [{ type: 'text', text: 'Dublin Civic Center' }]
            },
            {
              type: 'paragraph',
              attrs: { class: 'location-line' },
              content: [{ type: 'text', text: '100 Civic Plaza' }]
            },
            {
              type: 'paragraph',
              attrs: { class: 'location-line' },
              content: [{ type: 'text', text: 'Dublin, CA 94568' }]
            },
            {
              type: 'paragraph',
              attrs: { class: 'location-line' },
              content: [{ type: 'text', text: 'www.dublin.ca.gov' }]
            }
          ]
        })
      },
      updateLocationBlock: (lines: string[]) => ({ commands }: any) => {
        // Find and update the location block
        return commands.updateAttributes('locationBlock', { lines })
      }
    }
  }
})

// Council List component (left column) - now editable
export const CouncilList = Node.create({
  name: 'councilList',
  group: 'block',
  content: 'block+', // Allow editable content
  
  parseHTML() {
    return [{ tag: 'div[data-type="council-list"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 
        'data-type': 'council-list',
        'class': 'council-list'
      }),
      [
        'h3',
        { class: 'council-title' },
        'COUNCILMEMBERS'
      ],
      [
        'div',
        { class: 'council-members-content' },
        0 // Editable content will be rendered here
      ]
    ]
  },

  addCommands() {
    return {
      insertCouncilList: () => ({ commands }: any) => {
        return commands.insertContent({
          type: 'councilList',
          content: [
            {
              type: 'paragraph',
              attrs: { class: 'council-member' },
              content: [{ type: 'text', text: 'Dr. Sherry Hu, Mayor' }]
            },
            {
              type: 'paragraph',
              attrs: { class: 'council-member' },
              content: [{ type: 'text', text: 'Kashef Qaadri, Vice Mayor' }]
            },
            {
              type: 'paragraph',
              attrs: { class: 'council-member' },
              content: [{ type: 'text', text: 'Jean Josey, Councilmember' }]
            },
            {
              type: 'paragraph',
              attrs: { class: 'council-member' },
              content: [{ type: 'text', text: 'Michael McCorriston, Councilmember' }]
            },
            {
              type: 'paragraph',
              attrs: { class: 'council-member' },
              content: [{ type: 'text', text: 'John Morada, Councilmember' }]
            }
          ]
        })
      }
    }
  }
})

// Cover Header component (handles 3-column layout)
export const CoverHeader = Node.create({
  name: 'coverHeader',
  group: 'block',
  content: 'block{3}', // Expects exactly 3 blocks: council list, logo/title, location
  
  parseHTML() {
    return [{ tag: 'div[data-type="cover-header"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 
        'data-type': 'cover-header',
        'class': 'cover-header'
      }),
      0
    ]
  },

  addCommands() {
    return {
      insertCoverHeader: () => ({ commands }: any) => {
        return commands.insertContent({
          type: 'coverHeader',
          content: [
            { type: 'councilList' },
            { 
              type: 'dublinLogo'
            },
            { type: 'locationBlock' }
          ]
        })
      }
    }
  }
})

// Notice Box component
export const NoticeBox = Node.create({
  name: 'noticeBox',
  group: 'block',
  content: 'block+',
  
  addAttributes() {
    return {
      title: {
        default: 'Additional Meeting Procedures'
      }
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="notice-box"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 
        'data-type': 'notice-box',
        'class': 'notice-box'
      }),
      [
        'div',
        { class: 'notice-box-title' },
        HTMLAttributes.title
      ],
      [
        'div',
        { class: 'notice-box-content' },
        0
      ]
    ]
  },

  addCommands() {
    return {
      insertNoticeBox: () => ({ commands }: any) => {
        return commands.insertContent({
          type: 'noticeBox',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'This City Council meeting will be broadcast live on Comcast T.V. channel 28 beginning at 7:00 p.m. This meeting will also be livestreamed at www.tv30.org and on the City\'s website at: https://dublin.ca.gov/ccmeetings'
                }
              ]
            }
          ]
        })
      }
    }
  }
})

// Section Break component
export const SectionBreak = Node.create({
  name: 'sectionBreak',
  group: 'block',
  
  addAttributes() {
    return {
      text: {
        default: 'REGULAR MEETING 7:00 PM'
      }
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="section-break"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 
        'data-type': 'section-break',
        'class': 'section-break'
      }),
      HTMLAttributes.text
    ]
  },

  addCommands() {
    return {
      insertSectionBreak: (text?: string) => ({ commands }: any) => {
        return commands.insertContent({
          type: 'sectionBreak',
          attrs: { text: text || 'REGULAR MEETING 7:00 PM' }
        })
      }
    }
  }
})

// Dublin Logo component
export const DublinLogo = Node.create({
  name: 'dublinLogo',
  group: 'block',
  
  addAttributes() {
    return {
      size: {
        default: 'large'
      }
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="dublin-logo"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 
        'data-type': 'dublin-logo',
        'class': 'dublin-logo-container'
      }),
      [
        'img',
        {
          src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='%232e8b57'/><text x='50' y='65' text-anchor='middle' fill='white' font-size='36'>☘</text></svg>",
          alt: 'Dublin City Logo',
          class: 'dublin-logo',
          width: '80',
          height: '80'
        }
      ]
    ]
  },

  addCommands() {
    return {
      insertDublinLogo: () => ({ commands }: any) => {
        return commands.insertContent({
          type: 'dublinLogo'
        })
      }
    }
  }
})

// Dublin Title component
export const DublinTitle = Node.create({
  name: 'dublinTitle',
  group: 'block',
  content: 'inline*',
  
  addAttributes() {
    return {
      level: {
        default: 'main'
      }
    }
  },

  parseHTML() {
    return [{ tag: 'h1[data-type="dublin-title"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'h1',
      mergeAttributes(HTMLAttributes, { 
        'data-type': 'dublin-title',
        'class': `dublin-title dublin-title-${HTMLAttributes.level}`
      }),
      0
    ]
  },

  addCommands() {
    return {
      insertDublinTitle: (text: string, level: string = 'main') => ({ commands }: any) => {
        return commands.insertContent({
          type: 'dublinTitle',
          attrs: { level },
          content: [{ type: 'text', text }]
        })
      }
    }
  }
}) 
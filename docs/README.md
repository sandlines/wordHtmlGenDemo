# Word Document Generator with HTML Preview

A comprehensive Python application for generating professional city meeting agendas with embedded images and HTML preview capabilities.

## Features

✅ **Image Support**: Embeds placeholder images (city logos) directly into Word documents  
✅ **HTML Preview**: Automatic conversion from Word to styled HTML for web viewing  
✅ **Professional Templates**: Clean, professional agenda layouts with proper formatting  
✅ **Comprehensive Content**: Full agenda sections, contact info, staff listings, and zoom details  
✅ **Easy Customization**: Simple Python data structures for easy content modification  

## Generated Files

### Main Output Files
- `Comprehensive_City_Agenda.docx` - Professional Word document with embedded city logo
- `Comprehensive_City_Agenda.html` - Styled HTML preview of the agenda
- `city_logo_placeholder.png` - Sample city logo image (400x200px)

### Templates
- `comprehensive_agenda_template.docx` - Master template with placeholders

### Scripts
- `final_agenda_generator.py` - Complete generator with all features
- `test.py` - Alternative implementation (for reference)

## Installation

Required packages are already installed:
```bash
pip install docxtpl python-docx mammoth pillow
```

## Usage

### Quick Start
```bash
python final_agenda_generator.py
```

This will generate:
1. A Word document with embedded city logo
2. An HTML preview with professional styling
3. Complete agenda with multiple sections

### Customization

Edit the data structures in `final_agenda_generator.py`:

```python
# City Information
context = {
    "city_name": "Your City Name",
    "meeting_type": "Regular Council",
    "location": {"address": "Your Address"},
    # ... more customization options
}

# Agenda Sections
sections = [
    {
        "number": "I",
        "title": "Your Section Title",
        "items": [
            {
                "title": "Your Agenda Item",
                "attachments": ["document.pdf"]
            }
        ]
    }
]
```

## Features Included

### 🖼️ Image Integration
- Automatic image embedding in Word documents
- Placeholder city logo (customizable)
- Professional image sizing and positioning

### 📄 Word Document Features
- Professional formatting with proper margins
- Bold headings and section dividers
- Centered alignment for headers
- Consistent spacing and typography

### 🌐 HTML Preview Features
- Responsive design for all screen sizes
- Professional color scheme and typography
- Styled sections with visual hierarchy
- Enhanced readability with proper contrast

### 📋 Agenda Content
- **Meeting Information**: Date, time, location, Zoom details
- **Complete Agenda**: Multiple sections with numbered items
- **Contact Information**: Department details and contact info
- **Staff Listings**: City council members and staff directory
- **Attachments**: Document references for each agenda item

## Technical Details

### Libraries Used
- `docxtpl`: Word document templating with Jinja2 syntax
- `python-docx`: Word document manipulation
- `mammoth`: Word to HTML conversion
- `pillow`: Image processing for placeholder generation

### Template System
The system uses a two-step process:
1. Create Word template with placeholders (`{{variable_name}}`)
2. Render template with actual data to generate final document

### HTML Conversion
Uses `mammoth` library to convert Word documents to clean HTML with:
- Preserved formatting and structure
- Custom CSS styling for professional appearance
- Responsive design principles

## File Structure

```
wordHtmlGenDemo/
├── final_agenda_generator.py          # Main generator script
├── test.py                           # Alternative implementation
├── city_logo_placeholder.png         # Sample city logo
├── comprehensive_agenda_template.docx # Master template
├── Comprehensive_City_Agenda.docx    # Generated Word document
├── Comprehensive_City_Agenda.html    # Generated HTML preview
└── README.md                         # This documentation
```

## Customization Guide

### Changing City Information
```python
context = {
    "city_name": "Your City Name",
    "meeting_type": "Special Session",
    "location": {"address": "Your Meeting Location"},
    "meeting_date": datetime.date(2024, 12, 17),
    "special_time": "6:00 PM",
    "regular_time": "7:00 PM",
}
```

### Adding Agenda Items
```python
sections = [
    {
        "number": "I",
        "title": "OPENING PROCEDURES",
        "items": [
            {
                "prefix": "A.",
                "number": "1",
                "title": "Call to Order",
                "attachments": []
            }
        ]
    }
]
```

### Customizing Staff Lists
```python
staff_list = [
    {"title": "City Manager", "name": "John Doe"},
    {"title": "City Attorney", "name": "Jane Smith"},
    {"title": "City Clerk", "name": "Bob Johnson"},
]
```

## Output Examples

### Word Document Features
- Professional header with city logo
- Centered city name and meeting type
- Detailed meeting information (date, time, location)
- Zoom connection details
- Complete agenda with numbered sections
- Contact information for questions
- Staff and council member listings

### HTML Preview Features
- Clean, modern design
- Professional color scheme
- Responsive layout
- Easy navigation
- Print-friendly styling

## Browser Preview

The generated HTML file can be opened in any modern web browser for:
- Quick preview of the agenda
- Sharing via web links
- Printing with preserved formatting
- Mobile-friendly viewing

## Future Enhancements

Potential improvements:
- Custom logo upload functionality
- Multiple template styles
- PDF export capability
- Email integration
- Calendar integration
- Multi-language support

---

**Generated on**: July 4, 2024  
**Python Version**: 3.12+  
**Dependencies**: docxtpl, python-docx, mammoth, pillow 
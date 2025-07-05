from flask import Flask, request, jsonify, send_file, render_template_string
from flask_cors import CORS
from docxtpl import DocxTemplate, InlineImage
from docx.shared import Mm, Pt
from docx import Document
import os
import subprocess
import json
import tempfile
import uuid
from datetime import datetime
import threading
import time

app = Flask(__name__)
CORS(app)

# Store active sessions and their state
sessions = {}

def format_agenda_sections(sections_data):
    """Format agenda sections from form data"""
    formatted_sections = []
    for section in sections_data:
        if section.get('type') == 'break':
            # Handle section breaks with enhanced formatting
            break_title = section.get('title', '────────────────────────────────────────')
            # Add centered section break with visual separators
            formatted_sections.append("") # Empty line before
            formatted_sections.append("═" * 60) # Top border
            formatted_sections.append(f"{'═' * 10} {break_title.center(36)} {'═' * 10}")
            formatted_sections.append("═" * 60) # Bottom border
            formatted_sections.append("") # Empty line after
        else:
            # Handle regular sections
            section_number = section.get('number', '')
            section_title = section.get('title', '')
            if section_number:
                section_text = f"{section_number}. {section_title}"
            else:
                section_text = section_title
            formatted_sections.append(section_text)
            formatted_sections.append("")
            
            for item in section.get('items', []):
                if item.get('prefix') or item.get('number'):
                    item_text = f"     {item.get('prefix', '')}{item.get('number', '')} {item['title']}"
                else:
                    item_text = f"     {item['title']}"
                formatted_sections.append(item_text)
                
                if item.get('attachments'):
                    for attachment in item['attachments']:
                        formatted_sections.append(f"          Attachment: {attachment}")
            
            formatted_sections.append("")
    
    return "\n".join(formatted_sections)

def apply_section_break_formatting(doc, agenda_content):
    """Apply enhanced formatting to section breaks in the document"""
    try:
        from docx.shared import Pt
        from docx.enum.text import WD_ALIGN_PARAGRAPH
        
        for paragraph in doc.paragraphs:
            text = paragraph.text.strip()
            
            # Check if this is a section break line
            if text.startswith('═') and len(text) >= 60:
                # Center the section break
                paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
                
                # Apply formatting to the section break
                for run in paragraph.runs:
                    run.font.bold = True
                    run.font.size = Pt(12)
                    
                    # If this is the title line (middle line with text), make it larger
                    if len(text) > 60 and '═' in text and not text.replace('═', '').replace(' ', '').isdigit():
                        run.font.size = Pt(14)
                        run.font.bold = True
        
        return True
        
    except Exception as e:
        print(f"Section break formatting failed: {e}")
        return False

def apply_font_customization(docx_filename, font_settings):
    """Apply font customization and margins to the generated Word document"""
    try:
        # Open the document
        doc = Document(docx_filename)
        
        # Get font settings with defaults
        document_font = font_settings.get('document_font', 'Times New Roman')
        heading_font = font_settings.get('heading_font', 'Times New Roman')
        font_size = font_settings.get('font_size', 12)
        heading_size = font_settings.get('heading_size', 18)
        
        # Get margin settings with defaults (in inches)
        margin_top = font_settings.get('margin_top', 1)
        margin_bottom = font_settings.get('margin_bottom', 1)
        margin_left = font_settings.get('margin_left', 1)
        margin_right = font_settings.get('margin_right', 1)
        
        # Apply margins to all sections
        from docx.shared import Inches
        for section in doc.sections:
            section.top_margin = Inches(margin_top)
            section.bottom_margin = Inches(margin_bottom)
            section.left_margin = Inches(margin_left)
            section.right_margin = Inches(margin_right)
        
        # Apply fonts to all paragraphs
        for paragraph in doc.paragraphs:
            if paragraph.text.strip():  # Only modify non-empty paragraphs
                for run in paragraph.runs:
                    if run.font.size and run.font.size >= Pt(16):
                        # This is likely a heading
                        run.font.name = heading_font
                        run.font.size = Pt(heading_size)
                    else:
                        # This is regular text
                        run.font.name = document_font
                        run.font.size = Pt(font_size)
        
        # Apply fonts to tables
        for table in doc.tables:
            for row in table.rows:
                for cell in row.cells:
                    for paragraph in cell.paragraphs:
                        for run in paragraph.runs:
                            if run.font.size and run.font.size >= Pt(16):
                                # This is likely a heading
                                run.font.name = heading_font
                                run.font.size = Pt(heading_size)
                            else:
                                # This is regular text
                                run.font.name = document_font
                                run.font.size = Pt(font_size)
        
        # Save the modified document
        doc.save(docx_filename)
        
        return True
        
    except Exception as e:
        print(f"Font customization failed: {e}")
        return False

def generate_word_document(template_data):
    """Generate Word document from template data"""
    template_path = "templates/comprehensive_agenda_template.docx"
    logo_path = "assets/sausalito.jpeg"
    
    if not os.path.exists(template_path):
        raise FileNotFoundError(f"Template not found: {template_path}")
    if not os.path.exists(logo_path):
        raise FileNotFoundError(f"Logo not found: {logo_path}")
    
    tpl = DocxTemplate(template_path)
    city_logo = InlineImage(tpl, logo_path, width=Mm(30), height=Mm(30))
    
    # Process the template data
    context = {
        "city_name": template_data.get("city_name", "City Name"),
        "city_logo": city_logo,
        "meeting_type": template_data.get("meeting_type", "Regular Meeting"),
        "location": {"address": template_data.get("address", "City Hall")},
        "meeting_date": template_data.get("meeting_date", "Date TBD"),
        "special_time": template_data.get("special_time", "6:00 PM"),
        "regular_time": template_data.get("regular_time", "7:00 PM"),
        "zoom": {
            "url": template_data.get("zoom_url", "https://zoom.us/j/123456789"),
            "passcode": template_data.get("zoom_passcode", "123456"),
            "phone_list": template_data.get("zoom_phone", "+1 669 900 6833")
        },
        "agenda_content": format_agenda_sections(template_data.get("agenda_sections", [])),
        "lead_department": {
            "name": template_data.get("department_name", "Administration Department"),
            "address": template_data.get("address", "City Hall"),
            "phone": template_data.get("department_phone", "(555) 123-4567"),
            "email": template_data.get("department_email", "admin@city.gov")
        },
        "council_list": template_data.get("council_members", ""),
        "staff_list": template_data.get("staff_list", ""),
    }
    
    tpl.render(context)
    
    # Create temporary file
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.docx')
    tpl.save(temp_file.name)
    
    # Apply font customization if provided
    font_settings = template_data.get('font_settings', {})
    if font_settings:
        apply_font_customization(temp_file.name, font_settings)
    
    # Apply section break formatting
    try:
        doc = Document(temp_file.name)
        apply_section_break_formatting(doc, context["agenda_content"])
        doc.save(temp_file.name)
    except Exception as e:
        print(f"Section break formatting failed: {e}")
    
    return temp_file.name

def convert_to_pdf(docx_filename):
    """Convert Word to PDF using LibreOffice"""
    try:
        output_dir = os.path.dirname(docx_filename)
        result = subprocess.run([
            'soffice', '--headless', '--convert-to', 'pdf',
            '--outdir', output_dir, docx_filename
        ], capture_output=True, text=True, timeout=30)
        
        if result.returncode == 0:
            pdf_filename = docx_filename.replace('.docx', '.pdf')
            if os.path.exists(pdf_filename):
                return pdf_filename
        
        raise Exception(f"LibreOffice conversion failed: {result.stderr}")
        
    except Exception as e:
        raise Exception(f"PDF conversion failed: {str(e)}")

@app.route('/')
def index():
    """Serve the main template editor interface"""
    try:
        with open('demo_frontend.html', 'r') as f:
            return f.read()
    except FileNotFoundError:
        return "Template Editor Demo - Frontend file not found"

@app.route('/api/generate-pdf', methods=['POST'])
def generate_pdf():
    """Generate PDF from template data"""
    try:
        data = request.json
        
        # Generate Word document
        docx_file = generate_word_document(data)
        
        # Convert to PDF
        pdf_file = convert_to_pdf(docx_file)
        
        # Clean up Word file
        os.unlink(docx_file)
        
        # Return PDF file
        return send_file(pdf_file, as_attachment=True, download_name='agenda.pdf')
        
    except Exception as e:
        return f"PDF generation failed: {str(e)}", 500

if __name__ == '__main__':
    # Get port from environment variable or default to 8000
    port = int(os.environ.get('FLASK_PORT', 8000))
    
    # Check if running in standalone mode (no Next.js frontend)
    standalone_mode = not os.path.exists('package.json')
    
    print("🚀 Starting Template Editor Demo Server")
    print("=" * 50)
    if standalone_mode:
        print(f"📍 Open your browser to: http://localhost:{port}")
        print("📝 Edit templates in real-time")
        print("👁️  See instant HTML preview")
        print("📄 Generate PDF on demand")
    else:
        print(f"🔧 Backend API running on port {port}")
        print("📄 PDF generation service ready")
        print("🔗 Frontend will connect automatically")
    print("=" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=port) 
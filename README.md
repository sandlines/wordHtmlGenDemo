
**JUST RUN `./walfred`**

That's it. It does everything for you.

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

## 😤 Manual Instructions (For Those Who Don't Trust Magic)

### Prerequisites (You Probably Already Have These)
- Python 3.8+ 
- Node.js 18+
- LibreOffice (install with `brew install libreoffice` on macOS)

### The Hard Way
```bash
# Clone the repo
git clone https://github.com/sandlines/wordHtmlGenDemo.git
cd wordHtmlGenDemo

# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies  
npm install

# Start the Flask backend
python demo_server.py

# In another terminal, start the Next.js frontend
npm run dev
```

### 🤔 If Something Breaks

**Port conflicts?** 
- Walfred automatically finds available ports (8000-8010)
- Or kill whatever's using port 8000: `lsof -ti:8000 | xargs kill`

**LibreOffice missing?**
- macOS: `brew install libreoffice`
- Ubuntu: `sudo apt install libreoffice`
- Windows: Download from https://libreoffice.org

**Python dependencies missing?**
- Run `pip install -r requirements.txt`
- Try `pip3` if `pip` doesn't work

**Node.js issues?**
- Run `npm install`
- Delete `node_modules` and `package-lock.json`, then `npm install` again

### 🏛️ What This Thing Actually Does

Professional city council agenda editor with:
- ✨ Three view modes: Web, PDF, Side-by-Side
- 🎨 Font and margin customization
- ⚡ Real-time PDF generation and caching
- 🖊️ Inline editing for everything
- 📱 Professional municipal interface

Built with Next.js + TypeScript + Flask + LibreOffice because we're fancy like that.

---

**Still confused?** Just run `./walfred` and follow the pretty colored output. 🌈

### Prerequisites
- Python 3.8+ with pip
- Node.js 18+ with npm
- LibreOffice (for PDF generation)

### Installation & Running

1. **Clone the repository:**
```bash
git clone https://github.com/sandlines/wordHtmlGenDemo.git
cd wordHtmlGenDemo
```

2. **Run the application:**
```bash
./walfred
```

That's it! The `walfred` command will:
- ✅ Check and install all Python dependencies
- ✅ Verify LibreOffice installation
- ✅ Install Node.js dependencies
- ✅ Start both backend (Flask) and frontend (Next.js) servers
- ✅ Open your browser to the application

### Manual Installation (if needed)

If you prefer to install dependencies manually:

```bash
# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies
npm install

# Install LibreOffice (macOS)
brew install libreoffice

# Install LibreOffice (Ubuntu/Debian)
sudo apt-get install libreoffice

# Install LibreOffice (Windows)
# Download from https://www.libreoffice.org/download/download/
```

## 🏛️ Features

### Core Functionality
- **Real-time Agenda Editing**: Edit meeting details, agenda sections, and items with live preview
- **PDF Generation**: Professional PDF output with customizable fonts and margins
- **Three View Modes**:
  - **Web View**: Full editing interface
  - **PDF View**: Complete PDF preview
  - **Side-by-Side**: 50% editing + 50% PDF preview with real-time sync

### Advanced Features
- **Font Customization**: Choose from 10 professional fonts for document body and headings
- **Font Size Control**: Adjustable font sizes (10-24pt body, 14-36pt headings)
- **Margin Control**: Precise margin settings (0.5-3.0 inches) for all sides
- **Section Management**: Add, remove, and reorder agenda sections
- **Item Management**: Full CRUD operations for agenda items
- **Document Linking**: Attach supporting documents to agenda items
- **Auto-Save**: Automatic persistence of all changes
- **Smart Caching**: Instant PDF switching with intelligent cache invalidation

### Professional Output
- **Meeting Headers**: City name, meeting type, date, time, and location
- **Agenda Structure**: Proper numbering with Roman numerals and letter sequences
- **Item Types**: Discussion, Presentation, Hearing, and Action items
- **Supporting Documents**: Document attachment and display
- **Section Breaks**: Visual separators between major agenda sections

## 📁 Project Structure

```
wordHtmlGenDemo/
├── walfred                    # Main launcher script
├── install.sh                 # Global installation script
├── requirements.txt            # Python dependencies
├── demo_server.py             # Flask backend server
├── app/                       # Next.js frontend application
│   ├── page.tsx              # Main application page
│   ├── components/           # React components
│   │   └── AgendaContent.tsx # Reusable agenda content component
│   ├── api/                  # Next.js API routes
│   │   └── generate-pdf/     # PDF generation endpoint
│   └── globals.css           # Global styles
├── templates/                # Word document templates
│   ├── comprehensive_agenda_template.docx
│   └── preview_optimized_template.docx
├── assets/                   # Static assets
└── docs/                     # Documentation
```

## 🔧 Technical Architecture

### Backend (Flask - Port 8000)
- **Template Processing**: Handles Word document template population
- **PDF Generation**: Uses LibreOffice for Word-to-PDF conversion
- **Font Management**: Applies custom fonts and formatting
- **API Endpoints**: RESTful endpoints for document generation

### Frontend (Next.js - Port 3000)
- **React Components**: Modern component-based UI
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Real-time Updates**: Live preview and editing

### Data Flow
1. User edits agenda in React frontend
2. Changes auto-save to localStorage
3. PDF generation requests sent to Flask backend
4. LibreOffice converts Word documents to PDF
5. Smart caching prevents unnecessary regeneration

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Error: Port 5000/8000 is in use
# Solution: walfred automatically finds next available port (8000-8010)
```

#### 2. LibreOffice Not Found
```bash
# Error: LibreOffice not found
# macOS Solution:
brew install libreoffice

# Ubuntu/Debian Solution:
sudo apt-get install libreoffice

# Windows Solution:
# Download and install from https://www.libreoffice.org/download/download/
```

#### 3. Python Dependencies Missing
```bash
# Error: ModuleNotFoundError
# Solution: Install dependencies manually
pip install -r requirements.txt

# Or use Python 3 specifically:
pip3 install -r requirements.txt
```

#### 4. Node.js Dependencies Missing
```bash
# Error: Module not found
# Solution: Install Node dependencies
npm install

# Or clean install:
rm -rf node_modules package-lock.json
npm install
```

#### 5. Permission Denied on walfred
```bash
# Error: Permission denied
# Solution: Make executable
chmod +x walfred
```

### Advanced Debugging

#### Enable Debug Mode
```bash
# Set debug environment variable
export DEBUG=1
./walfred
```

#### Check System Requirements
```bash
# Check Python version
python --version
python3 --version

# Check Node.js version
node --version
npm --version

# Check LibreOffice installation
soffice --version
```

#### Manual Server Startup
```bash
# Start Flask backend manually
python demo_server.py

# Start Next.js frontend manually (in another terminal)
npm run dev
```

#### PDF Generation Testing
```bash
# Test LibreOffice conversion manually
soffice --headless --convert-to pdf --outdir /tmp test.docx
```

#### Port Debugging
```bash
# Check what's using a port
lsof -i :8000
lsof -i :3000

# Kill process using port
kill -9 $(lsof -ti :8000)
```

### Environment-Specific Issues

#### macOS
- **AirPlay Receiver**: Disable in System Preferences > General > AirDrop & Handoff
- **Homebrew**: Ensure `/opt/homebrew/bin` is in PATH
- **Python**: Use `python3` and `pip3` if `python` not found

#### Windows
- **LibreOffice Path**: May need to add to PATH manually
- **Python**: Use `py` command instead of `python`
- **Permissions**: Run as Administrator if needed

#### Linux
- **LibreOffice**: Install with package manager
- **Python**: May need `python3-dev` package
- **Permissions**: Use `sudo` for system-wide installation

## 🔄 Development Workflow

### Making Changes

1. **Edit Components**: Modify React components in `app/components/`
2. **Update Backend**: Edit Flask routes in `demo_server.py`
3. **Test Changes**: Use `./walfred` to restart both servers
4. **View Updates**: Changes auto-reload in development mode

### Template Modifications

1. **Edit Templates**: Modify `.docx` files in `templates/`
2. **Update Variables**: Check template variables in `demo_server.py`
3. **Test Output**: Generate PDF to verify changes

### Adding Features

1. **Frontend**: Add React components and update `page.tsx`
2. **Backend**: Add API endpoints in `demo_server.py`
3. **Styling**: Use Tailwind CSS classes for consistent design
4. **Testing**: Verify in all three view modes

## 📝 API Documentation

### PDF Generation Endpoint
```
POST /api/generate-pdf
Content-Type: application/json

{
  "meeting_data": {
    "city_name": "City of Example",
    "meeting_type": "City Council Meeting",
    // ... other meeting data
  },
  "font_settings": {
    "body_font": "Times New Roman",
    "heading_font": "Arial",
    // ... other font settings
  }
}
```

### Response
```json
{
  "success": true,
  "pdf_path": "/path/to/generated.pdf",
  "cache_key": "unique_cache_identifier"
}
```
# 🏷️ Word HTML Generator - Naming Convention System

## 📋 **File Naming Convention**

### **Format:** `{method}_{approach}_{accuracy}_{version}.py`

### **Components:**
- **Method**: What the code does
- **Approach**: How it solves the problem  
- **Accuracy**: Expected quality level
- **Version**: Iteration number

---

## 🔧 **Method Types**

| Method | Description | Purpose |
|--------|-------------|---------|
| `word_to_html` | Convert Word documents to HTML | Basic conversion |
| `preview_generator` | Generate HTML previews | UI preview creation |
| `document_converter` | Full document conversion | Complete document processing |
| `template_renderer` | Template-based generation | Using docx templates |
| `accuracy_matcher` | Precision matching system | High-accuracy previews |

---

## 🎯 **Approach Types**

| Approach | Description | When to Use |
|----------|-------------|-------------|
| `mammoth` | Uses Mammoth library | Quick conversions |
| `precision_css` | Exact CSS measurements | High accuracy needed |
| `pdf_first` | PDF-based preview | 100% accuracy required |
| `metrics_extraction` | Extract Word metrics | Custom styling |
| `browser_rendering` | Server-side rendering | Consistent output |

---

## 📊 **Accuracy Levels**

| Level | Percentage | Description | Use Case |
|-------|------------|-------------|----------|
| `basic` | 60-70% | Quick and dirty | Prototyping |
| `good` | 75-85% | Acceptable quality | Development |
| `high` | 90-95% | Production ready | Most applications |
| `perfect` | 100% | Pixel-perfect | Legal documents |

---

## 🔢 **Version Numbers**

| Version | Meaning |
|---------|---------|
| `v1` | Initial implementation |
| `v2` | Major improvements |
| `v3` | Significant refactoring |
| `v4+` | Continued iterations |

---

## 📁 **File Organization**

```
wordHtmlGenDemo/
├── src/
│   ├── generators/
│   │   ├── template_renderer_mammoth_basic_v1.py
│   │   ├── template_renderer_precision_css_high_v1.py
│   │   └── template_renderer_pdf_first_perfect_v1.py
│   ├── solutions/
│   │   ├── accuracy_matcher_precision_css_high_v1.py
│   │   ├── accuracy_matcher_pdf_first_perfect_v1.py
│   │   └── preview_generator_metrics_extraction_high_v1.py
│   └── utils/
│       ├── document_metrics_extractor_v1.py
│       ├── css_precision_generator_v1.py
│       └── pdf_converter_v1.py
├── docs/
│   ├── methods/
│   │   ├── template_renderer_mammoth_basic_v1.md
│   │   ├── template_renderer_precision_css_high_v1.md
│   │   └── template_renderer_pdf_first_perfect_v1.md
│   ├── approaches/
│   │   ├── mammoth_approach.md
│   │   ├── precision_css_approach.md
│   │   └── pdf_first_approach.md
│   └── guides/
│       ├── QUICK_START.md
│       ├── ACCURACY_COMPARISON.md
│       └── TROUBLESHOOTING.md
├── templates/
│   ├── city_agenda_template_v1.docx
│   ├── city_agenda_template_v2.docx
│   └── simple_document_template_v1.docx
├── assets/
│   ├── logos/
│   │   ├── city_logo_placeholder.png
│   │   └── sausalito_official.jpeg
│   └── images/
├── outputs/
│   ├── word/
│   │   ├── {timestamp}_document_name.docx
│   │   └── {timestamp}_document_name_v2.docx
│   ├── html/
│   │   ├── {timestamp}_document_name_preview.html
│   │   └── {timestamp}_document_name_accurate.html
│   └── pdf/
│       ├── {timestamp}_document_name.pdf
│       └── {timestamp}_document_name_compressed.pdf
├── examples/
│   ├── basic_usage_example.py
│   ├── high_accuracy_example.py
│   └── perfect_match_example.py
└── tests/
    ├── test_accuracy_levels.py
    ├── test_template_rendering.py
    └── test_cross_browser_compatibility.py
```

---

## 🎯 **Method Naming Examples**

### **Current Files → New Names:**

| Current File | New Name | Documentation |
|-------------|----------|---------------|
| `enhanced_accuracy_solution.py` | `accuracy_matcher_precision_css_high_v1.py` | `accuracy_matcher_precision_css_high_v1.md` |
| `pdf_first_approach.py` | `preview_generator_pdf_first_perfect_v1.py` | `preview_generator_pdf_first_perfect_v1.md` |
| `enhanced_preview_generator.py` | `template_renderer_precision_css_high_v1.py` | `template_renderer_precision_css_high_v1.md` |
| `final_agenda_generator.py` | `template_renderer_mammoth_good_v1.py` | `template_renderer_mammoth_good_v1.md` |
| `test.py` | `template_renderer_mammoth_basic_v1.py` | `template_renderer_mammoth_basic_v1.md` |

---

## 📚 **Documentation Structure**

### **Each Method Gets:**
1. **Method Doc**: `{method_name}.md`
2. **Usage Example**: `{method_name}_example.py`
3. **Test File**: `test_{method_name}.py`

### **Documentation Template:**
```markdown
# {Method Name} Documentation

## Overview
- **Accuracy**: {accuracy}%
- **Approach**: {approach}
- **Use Case**: {when to use}

## Quick Start
```python
# Code example
```

## Features
- Feature 1
- Feature 2

## Requirements
- Dependency 1
- Dependency 2

## Output Files
- file1.docx
- file2.html

## Troubleshooting
- Common issue 1
- Common issue 2
```

---

## 🚀 **Usage Examples**

### **Finding the Right Method:**
```python
# Need basic HTML preview?
from src.generators.template_renderer_mammoth_basic_v1 import generate_preview

# Need high accuracy?
from src.solutions.accuracy_matcher_precision_css_high_v1 import generate_accurate_preview

# Need perfect match?
from src.solutions.preview_generator_pdf_first_perfect_v1 import generate_perfect_preview
```

### **Documentation Lookup:**
```bash
# Find method documentation
ls docs/methods/template_renderer_*

# Find approach documentation  
ls docs/approaches/precision_css_*

# Find examples
ls examples/*_example.py
```

---

## 🔍 **Quick Reference Guide**

### **By Accuracy Need:**
- **60-70%**: `template_renderer_mammoth_basic_v1.py`
- **90-95%**: `accuracy_matcher_precision_css_high_v1.py`
- **100%**: `preview_generator_pdf_first_perfect_v1.py`

### **By Use Case:**
- **Prototyping**: `mammoth_basic`
- **Development**: `precision_css_high`
- **Production**: `pdf_first_perfect`

### **By Setup Complexity:**
- **No Setup**: `mammoth_basic`
- **Python Only**: `precision_css_high`
- **Requires LibreOffice**: `pdf_first_perfect`

---

## 🛠️ **Implementation Guidelines**

### **Creating New Methods:**
1. Follow naming convention: `{method}_{approach}_{accuracy}_{version}.py`
2. Create corresponding documentation: `{method}_{approach}_{accuracy}_{version}.md`
3. Add usage example: `{method}_{approach}_{accuracy}_{version}_example.py`
4. Include in quick reference guide
5. Add to accuracy comparison table

### **Updating Existing Methods:**
1. Increment version number
2. Update documentation
3. Keep previous version for compatibility
4. Add changelog entry

---

## 🔄 **Migration Path**

### **Step 1: Rename Files**
```bash
# Rename files to follow new convention
mv old_file.py new_convention_name.py
```

### **Step 2: Create Documentation**
```bash
# Create matching documentation
touch docs/methods/new_convention_name.md
```

### **Step 3: Update Imports**
```python
# Update all import statements
from src.solutions.accuracy_matcher_precision_css_high_v1 import generate_accurate_preview
```

### **Step 4: Test Everything**
```bash
# Run tests with new naming
python -m pytest tests/
```

This naming convention makes it immediately clear what each method does, how accurate it is, and where to find the documentation! 
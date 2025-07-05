# 🚀 Quick Start Guide - Word HTML Generator

## Choose Your Method (30 seconds)

### 🎯 **By Accuracy Need**
```
Need 100% accuracy? → preview_generator_pdf_first_perfect_v1
Need 95% accuracy?  → accuracy_matcher_precision_css_high_v1
Need 70% accuracy?  → template_renderer_mammoth_basic_v1
```

### 🛠️ **By Setup Complexity**
```
No setup required?     → template_renderer_mammoth_basic_v1
Python packages only?  → accuracy_matcher_precision_css_high_v1
Can install software?  → preview_generator_pdf_first_perfect_v1
```

### ⚡ **By Speed Need**
```
Fastest generation?    → template_renderer_mammoth_basic_v1
Balanced speed/quality? → accuracy_matcher_precision_css_high_v1
Quality over speed?    → preview_generator_pdf_first_perfect_v1
```

---

## 1-Minute Setup

### **Basic Method (Mammoth)**
```bash
pip install docxtpl mammoth
```
```python
from src.utils.template_renderer_mammoth_basic_v1 import generate_basic_preview
docx_file, html_file = generate_basic_preview()
```

### **High Accuracy Method (Precision CSS)**
```bash
pip install docxtpl python-docx mammoth
```
```python
from src.solutions.accuracy_matcher_precision_css_high_v1 import generate_accurate_preview
docx_file, html_file, metrics = generate_accurate_preview()
```

### **Perfect Method (PDF First)**
```bash
pip install docxtpl mammoth
brew install libreoffice  # macOS
```
```python
from src.solutions.preview_generator_pdf_first_perfect_v1 import generate_pdf_first_preview
docx_file, pdf_file, html_file = generate_pdf_first_preview()
```

---

## 🔍 **Method Comparison**

| Feature | Basic | High Accuracy | Perfect |
|---------|-------|---------------|---------|
| **Accuracy** | 70% | 95% | 100% |
| **Setup Time** | 30 seconds | 1 minute | 5 minutes |
| **Generation Speed** | Fast | Medium | Slow |
| **File Size** | Small | Small | Large |
| **Print Quality** | Poor | Excellent | Perfect |
| **Use Case** | Prototyping | Production | Legal docs |

---

## 🎨 **File Structure**

```
wordHtmlGenDemo/
├── src/
│   ├── utils/template_renderer_mammoth_basic_v1.py     # 70% accuracy
│   ├── solutions/accuracy_matcher_precision_css_high_v1.py  # 95% accuracy
│   └── solutions/preview_generator_pdf_first_perfect_v1.py  # 100% accuracy
├── docs/methods/
│   ├── {method_name}.md                               # Documentation
│   └── ...
├── templates/
│   ├── comprehensive_agenda_template.docx             # Main template
│   └── ...
└── assets/
    ├── sausalito.jpeg                                 # City logo
    └── ...
```

---

## 🔧 **Common Tasks**

### **Generate Basic Preview**
```python
# For quick prototyping
from src.utils.template_renderer_mammoth_basic_v1 import generate_basic_preview
docx_file, html_file = generate_basic_preview()
```

### **Generate High-Accuracy Preview**
```python
# For production apps
from src.solutions.accuracy_matcher_precision_css_high_v1 import generate_accurate_preview
docx_file, html_file, metrics = generate_accurate_preview()
```

### **Generate Perfect Preview**
```python
# For legal/official documents
from src.solutions.preview_generator_pdf_first_perfect_v1 import generate_pdf_first_preview
docx_file, pdf_file, html_file = generate_pdf_first_preview()
```

### **Open Preview in Browser**
```python
import webbrowser
import os
webbrowser.open(f"file://{os.path.abspath(html_file)}")
```

---

## 🎯 **Decision Matrix**

### **I need...**
- **Quick prototype** → `template_renderer_mammoth_basic_v1`
- **Production app** → `accuracy_matcher_precision_css_high_v1`
- **Legal document** → `preview_generator_pdf_first_perfect_v1`
- **Mobile-friendly** → `accuracy_matcher_precision_css_high_v1`
- **Batch processing** → `template_renderer_mammoth_basic_v1`
- **Print-perfect** → `preview_generator_pdf_first_perfect_v1`

### **I have...**
- **No setup time** → `template_renderer_mammoth_basic_v1`
- **5 minutes setup** → `accuracy_matcher_precision_css_high_v1`
- **Admin access** → `preview_generator_pdf_first_perfect_v1`
- **Bandwidth limits** → `accuracy_matcher_precision_css_high_v1`
- **High volume** → `template_renderer_mammoth_basic_v1`

---

## 🆘 **Troubleshooting**

### **Import Errors**
```python
# Wrong import
from old_file import function  # ❌

# Correct import
from src.solutions.accuracy_matcher_precision_css_high_v1 import generate_accurate_preview  # ✅
```

### **File Not Found**
```python
# Check file location
import os
print(os.path.exists("templates/comprehensive_agenda_template.docx"))
```

### **Low Accuracy**
```python
# Upgrade method
from src.utils.template_renderer_mammoth_basic_v1 import generate_basic_preview  # 70%
# to
from src.solutions.accuracy_matcher_precision_css_high_v1 import generate_accurate_preview  # 95%
```

---

## 📚 **Next Steps**

1. **Choose method** based on your needs
2. **Read documentation** at `docs/methods/{method_name}.md`
3. **Run example** to test
4. **Customize template** in `templates/`
5. **Deploy** to your application

---

## 🔗 **Quick Links**

- [Naming Convention](../NAMING_CONVENTION.md)
- [Method Documentation](../methods/)
- [Accuracy Comparison](../ACCURACY_COMPARISON.md)
- [Troubleshooting](../TROUBLESHOOTING.md)

---

**💡 Still confused?** 
- For most use cases: **Start with `accuracy_matcher_precision_css_high_v1`**
- It gives 95% accuracy with minimal setup
- You can always upgrade to PDF-first later if needed 
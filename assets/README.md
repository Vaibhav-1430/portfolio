# Assets Folder

## Resume Setup Instructions

1. **Add your resume file** to this folder with the name `resume.pdf`
2. **Supported formats**: PDF (recommended), DOC, DOCX
3. **File path**: The code is currently set to look for `./assets/resume.pdf`

## To change the resume file path:

1. Open `script.js`
2. Find the line: `const RESUME_PATH = './assets/resume.pdf';`
3. Update it to your resume file path

## Example file paths:
- `./assets/resume.pdf` (current setting)
- `./resume/my-resume.pdf`
- `./documents/Vaibhav_Resume.pdf`

## Features:
- ✅ Resume preview in modal
- ✅ Download functionality
- ✅ Error handling if file not found
- ✅ Loading states
- ✅ Mobile responsive
- ✅ Keyboard shortcuts (ESC to close)

## Note:
Make sure your resume file is accessible via web browser. PDF files work best for preview functionality.
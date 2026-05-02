const fs = require('fs');
const path = require('path');

const files = [
  './src/components/ui/tubes-background.tsx',
  './src/components/ui/scroll-progress.tsx',
  './src/components/Services.tsx',
  './src/components/Navbar.tsx',
  './src/app/globals.css'
];

const replacements = [
  { regex: /#D4AF37/gi, replace: '#0A2342' },
  { regex: /#F5E6A0/gi, replace: '#2B4C7E' },
  { regex: /#A07C18/gi, replace: '#343A40' },
  { regex: /#6B5010/gi, replace: '#6C757D' },
  { regex: /#0F4C5C/gi, replace: '#2B4C7E' },
  { regex: /#0A0A0A/gi, replace: '#F4F4F6' },
  { regex: /#1A1A1A/gi, replace: '#EAECEF' },
];

files.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    replacements.forEach(r => {
      content = content.replace(r.regex, r.replace);
    });
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated hex in ${filePath}`);
    }
  }
});

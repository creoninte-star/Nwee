const fs = require('fs');
const path = require('path');

const dir = './src';
const exts = ['.tsx', '.ts', '.css'];

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const replacements = [
  { regex: /gold/g, replace: 'navy' },
  { regex: /teal/g, replace: 'navy-light' },
  { regex: /text-white/g, replace: 'text-navy' },
  { regex: /border-white/g, replace: 'border-navy' },
  { regex: /bg-white\/([0-9]+)/g, replace: 'bg-navy/$1' },
  { regex: /bg-black\/([0-9]+)/g, replace: 'bg-white/$1' },
  { regex: /from-\[\#1a1708\]/g, replace: 'from-white' },
  { regex: /to-\[\#0c0c0c\]/g, replace: 'to-[#f8f9fa]' },
  { regex: /hover:from-\[\#26200a\]/g, replace: 'hover:from-[#f0f4f8]' },
  { regex: /hover:to-\[\#111\]/g, replace: 'hover:to-[#e9ecef]' },
  { regex: /rgba\(212,175,55/g, replace: 'rgba(10,35,66' },
  { regex: /bg-\[\#0c0c0c\]/g, replace: 'bg-white' },
  { regex: /bg-\[\#111\]/g, replace: 'bg-[#f0f4f8]' },
  { regex: /text-\[\#D4AF37\]/gi, replace: 'text-navy' },
  { regex: /text-white\/([0-9]+)/g, replace: 'text-navy/$1' },
  { regex: /text-text-muted/g, replace: 'text-text-muted' },
  { regex: /text-text/g, replace: 'text-text' },
];

walk(dir, function(filePath) {
  if (exts.includes(path.extname(filePath))) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    replacements.forEach(r => {
      content = content.replace(r.regex, r.replace);
    });
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});

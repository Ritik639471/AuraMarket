const fs = require('fs');
const path = require('path');

function replaceUnsplash(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
        replaceUnsplash(fullPath);
      }
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;
      // Match unsplash photo URLs that don't already have query params
      content = content.replace(/(https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+)(?![\?&])/g, '$1?auto=format&fit=crop&q=80');
      if (original !== content) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed ' + fullPath);
      }
    }
  }
}
replaceUnsplash(path.join(__dirname, 'backend'));
replaceUnsplash(path.join(__dirname, 'frontend/src'));
console.log('Done!');

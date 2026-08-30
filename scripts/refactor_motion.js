const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const srcDir = path.join(__dirname, '../src');
const files = walkSync(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.match(/<motion\.[a-z0-9]+/g) || content.match(/<\/motion\.[a-z0-9]+/g)) {
    // Replace opening tags: <motion.div ...> -> <Motion as="div" ...>
    content = content.replace(/<motion\.([a-z0-9]+)/g, '<Motion as="$1"');
    
    // Replace closing tags: </motion.div> -> </Motion>
    content = content.replace(/<\/motion\.([a-z0-9]+)>/g, '</Motion>');

    // Make sure Motion is imported
    if (!content.includes('import { Motion }')) {
       // Find depth for relative import
       const relPath = path.relative(path.dirname(file), path.join(srcDir, 'animations', 'AnimatedComponents'));
       const importPath = relPath.replace(/\\/g, '/').replace('.tsx', '');
       const finalImportPath = importPath.startsWith('.') ? importPath : './' + importPath;
       
       content = `import { Motion } from '${finalImportPath}';\n` + content;
    }

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});

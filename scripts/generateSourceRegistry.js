const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/components');
const outputRegistryPath = path.join(__dirname, '../src/themes/IDE/sourceRegistry.json');

const filesToRead = {
  'home': 'Home.tsx',
  'projects': 'Projects.tsx',
  'experience': 'Experience.tsx',
  'skills': 'Skills.tsx',
  'contact': 'Contact.tsx'
};

const registry = {};

for (const [key, filename] of Object.entries(filesToRead)) {
  const filePath = path.join(componentsDir, filename);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    registry[key] = content;
  } else {
    registry[key] = `// File not found: ${filename}`;
  }
}

fs.writeFileSync(outputRegistryPath, JSON.stringify(registry, null, 2), 'utf8');
console.log('Successfully generated sourceRegistry.json with real source code!');

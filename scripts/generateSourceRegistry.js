const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const outputRegistryPath = path.join(__dirname, '../src/themes/IDE/sourceRegistry.json');

const filesToRead = {
  'App.tsx': 'App.tsx',
  'data.json': 'data.json',
  'ZenEditor.tsx': 'themes/IDE/ZenEditor.tsx',
  'HeroDashboard.tsx': 'themes/SaaS/components/HeroDashboard.tsx',
  'TerminalTheme.tsx': 'themes/Terminal/index.tsx'
};

const registry = {};

for (const [key, filename] of Object.entries(filesToRead)) {
  const filePath = path.join(srcDir, filename);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    registry[key] = content;
  } else {
    registry[key] = `// File not found: ${filename}`;
  }
}

fs.writeFileSync(outputRegistryPath, JSON.stringify(registry, null, 2), 'utf8');
console.log('Successfully generated sourceRegistry.json with real source code!');

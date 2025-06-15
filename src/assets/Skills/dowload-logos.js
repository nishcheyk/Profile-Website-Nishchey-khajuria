const fs = require('fs');
const path = require('path');
const axios = require('axios');

const logos = [
  { name: 'bcrypt', slug: 'shield' },
  { name: 'multer', slug: 'upload' },
  { name: 'pdf2table', slug: 'file-pdf' },
  { name: 'reactquill', slug: 'quill' },
  { name: 'tinymce', slug: 'tinymce' },
  { name: 'vscode', slug: 'visualstudiocode' },
];

const outputDir = path.join(__dirname, 'assets', 'Skills');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const baseUrl = 'https://cdn.simpleicons.org';

logos.forEach(async ({ name, slug }) => {
  const url = `${baseUrl}/${slug}`;
  const filePath = path.join(outputDir, `${name}.svg`);
  try {
    const response = await axios.get(url, { responseType: 'stream' });
    response.data.pipe(fs.createWriteStream(filePath));
    console.log(`✔️ Downloaded ${name}`);
  } catch (err) {
    console.error(`❌ Failed to download ${name}: ${err.message}`);
  }
});

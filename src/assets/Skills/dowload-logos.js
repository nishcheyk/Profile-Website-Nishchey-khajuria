const fs = require('fs');
const path = require('path');
const axios = require('axios');

const logos = {
  ReactJS: "react",
  NodeJS: "nodedotjs",
  ExpressJS: "express",
  Django: "django",
  HTML: "html5",
  CSS: "css3",
  TailwindCSS: "tailwindcss",
  Axios: "axios",
  JWT: "jsonwebtokens",
  Bcrypt: "bcrypt",
  Redux: "redux",
  Multer: "multer",
  Pdf2Table: "pdf",
  ReactQuill: "quill",
  TinyMCE: "tinymce",
  OpenCV: "opencv",
  MediaPipe: "mediapipe",
  MySQL: "mysql",
  MongoDB: "mongodb",
  Python: "python",
  JQuery: "jquery",
  C: "c",
  Cpp: "cplusplus",
  JavaScript: "javascript",
  Postman: "postman",
  VSCode: "visualstudiocode",
  Render: "render",
  Vercel: "vercel",
  GitHub: "github"
};

const outputDir = path.join(__dirname, 'assets', 'Skills');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const baseURL = "https://cdn.simpleicons.org/";

const downloadLogos = async () => {
  for (const [name, slug] of Object.entries(logos)) {
    const url = `${baseURL}${slug}`;
    const filePath = path.join(outputDir, `${name.toLowerCase()}.svg`);

    try {
      const response = await axios.get(url, { responseType: 'stream' });
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);
      console.log(`✔ Downloaded ${name}`);
    } catch (error) {
      console.error(`✖ Failed to download ${name} from ${url}`);
    }
  }
};

downloadLogos();

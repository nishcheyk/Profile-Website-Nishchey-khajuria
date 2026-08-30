const fs = require('fs');
const code = fs.readFileSync('./src/constants.ts', 'utf8');

const regexMap = {
  name: /export const name: string = '(.*?)';/,
  summary: /export const summary: string =([\s\S]*?);/,
  seo: /export const seo = ([\s\S]*?);/,
  jsonLd: /export const jsonLd = ([\s\S]*?);/,
  experiences: /export const experiences: Experience\[\] = ([\s\S]*?\]);/,
  projects: /export const projects: Project\[\] = ([\s\S]*?\]);/,
  skills: /export const skills: Skill\[\] = ([\s\S]*?\]);/
};

// We will just let the user's bundler compile a unified data.ts file instead of json if JSON is too hard to regex parse correctly (because of the CDN string vars).
// Wait, I can just replace `constants.ts` completely.

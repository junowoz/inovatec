// lib/markdown.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import remarkHtml from 'remark-html';
import remarkReact from 'remark-react';
import React from 'react';

export async function getManualContent() {
  const markdownPath = path.join(process.cwd(), 'pages/manual', 'manual.md');
  const fileContents = fs.readFileSync(markdownPath, 'utf8');

  const { content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkHtml)
    .use(remarkReact, { createElement: React.createElement })
    .process(content);

  return {
    content: processedContent.result,
  };
}

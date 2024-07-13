/** @import { Post } from '../types.d.ts' */

import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { parse } from "yaml";
import { html, template } from "./template.js";

const __dirname = import.meta.dirname;
const postsPath = resolve(__dirname, "../src/posts.yml");
const buildDir = resolve(__dirname, "../dist");

/**
 * Extract posts from `posts.yml`
 * @returns {Promise<Post[]>}
 */
async function getPosts() {
  const contents = await readFile(postsPath, "utf-8");
  const posts = parse(contents);

  return posts;
}

/**
 * Create HTML content from posts
 * @param {Post[]} posts
 * @returns {Promise<string>}
 */
async function getHtml(posts) {
  const content = html`<h1>Posts</h1>
    ${posts
      .map(
        (post) => html`<article>
          <h2><a href="${post.url}">${post.title}</a></h2>
          <p>${post.date} – ${post.author}</p>
          <p>${post.abstract}</p>
        </article>`
      )
      .join("")}`;
  const contents = template(content);

  return contents;
}

/**
 * Generate HTML content and write it to `dist/index.html`
 */
async function build() {
  const posts = await getPosts();
  const html = await getHtml(posts);

  await mkdir(buildDir, { recursive: true });
  await writeFile(resolve(buildDir, "index.html"), html);
}

build();

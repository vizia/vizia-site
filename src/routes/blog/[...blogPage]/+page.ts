export const prerender = 'auto'

import type { PostMeta } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const META_GROUP_REGEX = /---\n([\s\S]+)\n---/gm;
const META_REGEX = /(.+?): (.+?)$/gm;

function get_meta(markdown: string): PostMeta | undefined {
  let meta_group = markdown.match(META_GROUP_REGEX)
  if (meta_group == null) {
    return undefined;
  }

  let meta = meta_group[0].matchAll(META_REGEX);

  let markdown_meta: PostMeta = { date: "", landing_image: "", title: "" };
  for (const match of meta) {
    let element = match[1];
    let data = match[2];

    switch (element) {
      case "date":
        markdown_meta.date = data;
        break;

      case "title":
        markdown_meta.title = data;
        break;

      case "landing_image":
        markdown_meta.landing_image = data;
        break;

      default:
        break;
    }
  }


  return markdown_meta;
}

function parse_markdown(markdown: string): [string, PostMeta | undefined] {
  let meta_group = markdown.match(META_GROUP_REGEX)
  if (meta_group == null) {
    return [markdown, undefined];
  }

  let markdown_meta = get_meta(markdown)
  markdown = markdown.replace(meta_group[0], "")

  return [markdown, markdown_meta];
}


export const load = (async ({ params, url, fetch }) => {

  const response = await fetch(`/blog/${params.blogPage}/index.md`);
  if (response.ok) {
    let markdown_text = await response.text();
    let parsed = parse_markdown(markdown_text)
    return {
      blogPage: params.blogPage,
      markdown: parsed[0],
      meta: parsed[1]
    };
  }

  throw error(404, "Not found")

}) satisfies PageLoad;



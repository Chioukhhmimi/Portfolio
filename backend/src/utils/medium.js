/**
 * Medium RSS content normalization utilities.
 * Fixes images that use data-src (lazy-load), <picture>, and <noscript> fallbacks.
 */

/**
 * Normalize Medium HTML content so all images render without client JS.
 * - Converts data-src → src on <img> tags
 * - Extracts <img> from <noscript> and injects them into content
 * - Replaces <picture> blocks with a single <img> fallback
 * - Removes tracking pixels (medium.com/_/stat)
 */
export function normalizeMediumContent(content) {
  if (!content) return '';

  let html = content;

  // 1. Convert data-src → src on all <img> tags that lack a real src
  html = html.replace(
    /<img([^>]*?)(?:\s+src="[^"]*")?([^>]*?)>/gi,
    (match, before, after) => {
      // If already has a valid src (not empty), keep it
      if (/\ssrc="https?:\/\//i.test(match)) return match;

      // Try data-src
      const dataSrcMatch = before.match(/data-src="([^"]+)"/i) ||
                           after.match(/data-src="([^"]+)"/i);
      if (dataSrcMatch) {
        return `<img${before}${after} src="${dataSrcMatch[1]}">`;
      }
      return match;
    }
  );

  // 2. Also handle bare data-src → src when img tag has no src at all
  html = html.replace(
    /<img([^>]*?)data-src="([^"]+)"([^>]*?)>/gi,
    (match, before, url, after) => {
      if (/src="/i.test(match)) return match;
      return `<img${before}src="${url}"${after}>`;
    }
  );

  // 3. Extract images from <noscript> tags and inject them
  const noscriptBlocks = html.match(/<noscript>([\s\S]*?)<\/noscript>/gi) || [];
  for (const block of noscriptBlocks) {
    const inner = block.replace(/<\/?noscript>/gi, '');
    const imgs = inner.match(/<img[^>]+>/gi) || [];
    for (const img of imgs) {
      // Only inject if not already present (deduplicate)
      const srcMatch = img.match(/src="([^"]+)"/i);
      if (srcMatch && !html.includes(srcMatch[1])) {
        // Insert after the closing </noscript> tag
        html = html.replace(
          /<\/noscript>/i,
          `</noscript>${img}`
        );
      }
    }
  }

  // 4. Replace <picture> blocks with the best available <img>
  html = html.replace(
    /<picture[\s\S]*?<\/picture>/gi,
    (pictureBlock) => {
      // Prefer <img> inside picture, fallback to largest <source>
      const img = pictureBlock.match(/<img[^>]+>/i);
      if (img) return img[0];

      const sources = pictureBlock.match(/<source[^>]+srcset="([^"]+)"/gi) || [];
      if (sources.length > 0) {
        // Grab last source (usually largest/resolution)
        const lastSrc = sources[sources.length - 1].match(/srcset="([^"]+)"/i);
        if (lastSrc) {
          // srcset can be "url 1x, url 2x" — take the first URL
          const url = lastSrc[1].split(',')[0].trim().split(/\s+/)[0];
          return `<img src="${url}" alt="">`;
        }
      }
      return '';
    }
  );

  // 5. Remove Medium tracking pixels
  html = html.replace(/<img[^>]*?medium\.com\/_\/stat[^>]*>/gi, '');

  // 6. Clean up empty <noscript> tags left behind
  html = html.replace(/<noscript>\s*<\/noscript>/gi, '');

  // 7. Fix relative URLs → absolute Medium URLs
  html = html.replace(
    /src="\/_/gi,
    'src="https://miro.medium.com'
  );
  html = html.replace(
    /src="(https?:\/\/mirotone\.medium\.com)/gi,
    'src="https://miro.medium.com'
  );

  return html;
}

/**
 * Extract the first image URL from Medium content.
 * Checks <img src>, <noscript><img>, <picture>, and data-src in order.
 */
export function extractImageUrl(content) {
  if (!content) return null;

  // 1. Standard <img src>
  const imgMatch = content.match(/<img[^>]+src="(https?:\/\/[^"]+)"/i);
  if (imgMatch && !imgMatch[1].includes('medium.com/_/stat')) {
    return imgMatch[1];
  }

  // 2. data-src on <img>
  const dataSrcMatch = content.match(/<img[^>]+data-src="(https?:\/\/[^"]+)"/i);
  if (dataSrcMatch) return dataSrcMatch[1];

  // 3. Image inside <noscript>
  const noscriptMatch = content.match(/<noscript>\s*<img[^>]+src="(https?:\/\/[^"]+)"/i);
  if (noscriptMatch) return noscriptMatch[1];

  // 4. <source srcset> inside <picture>
  const sourceMatch = content.match(/<source[^>]+srcset="(https?:\/\/[^"]+)/i);
  if (sourceMatch) {
    return sourceMatch[1].split(',')[0].trim().split(/\s+/)[0];
  }

  // 5. Any <img> with relative URL (Medium CDN)
  const relImg = content.match(/<img[^>]+src="(\/[^"]+)"/i);
  if (relImg) return `https://medium.com${relImg[1]}`;

  // 6. url("...") in style attributes
  const styleMatch = content.match(/url\("(https?:\/\/[^"]+\.(jpg|jpeg|png|gif|webp))"\)/i);
  if (styleMatch) return styleMatch[1];

  return null;
}

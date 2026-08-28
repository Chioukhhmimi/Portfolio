import Parser from 'rss-parser';

const parser = new Parser();
const feed = await parser.parseURL('https://medium.com/feed/@hmimichiouukh');

for (const item of feed.items) {
  const content = item['content:encoded'] || '';
  const imgs = content.match(/<img[^>]+>/g) || [];
  const pictures = content.match(/<picture[\s\S]*?<\/picture>/g) || [];
  const noscripts = content.match(/<noscript[\s\S]*?<\/noscript>/g) || [];
  const dataSrcs = content.match(/data-src="[^"]+"/g) || [];

  const contentImgs = imgs.filter(i => !i.includes('medium.com/_/stat'));

  console.log(`--- ${item.title} ---`);
  console.log(`  Content: ${content.length} chars`);
  console.log(`  <img> total: ${imgs.length} (content: ${contentImgs.length}, tracking: ${imgs.length - contentImgs.length})`);
  console.log(`  <picture>: ${pictures.length}`);
  console.log(`  <noscript>: ${noscripts.length}`);
  console.log(`  data-src: ${dataSrcs.length}`);

  if (pictures.length > 0) {
    console.log('  PICTURE tags found:');
    for (const p of pictures) {
      const src = p.match(/src="([^"]+)"/);
      if (src) console.log(`    ${src[1].substring(0, 80)}`);
    }
  }
  if (noscripts.length > 0) {
    for (const n of noscripts) {
      const innerImgs = n.match(/<img[^>]+src="([^"]+)"/g) || [];
      if (innerImgs.length > 0) console.log(`  noscript imgs: ${innerImgs.length}`);
    }
  }
}

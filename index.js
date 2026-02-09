// Node file system and buffer needed to save images.
import { Buffer } from 'node:buffer';
import fs from 'node:fs';
// Document query selector not allowed by eslint, therefore using cheerio to select images
import * as cheerio from 'cheerio';

async function getImageLinks() {
  const linkMemeGen = 'https://memegen-link-examples-upleveled.netlify.app/';
  const response = await fetch(linkMemeGen);
  const htmlData = await response.text();
  const $ = cheerio.load(htmlData);
  const imgObjects = $('img');
  const imgLinks = [];
  for (let i = 0; i < 10; i++) {
    imgLinks.push($(imgObjects[i]).attr('src'));
  }
  return imgLinks;
}

async function saveImages() {
  const tenImgLinks = await getImageLinks();
  for (let i = 1; i <= 10; i++) {
    const response = await fetch(tenImgLinks[i - 1]);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let fileNumber = '';
    if (i < 10) {
      fileNumber = '0' + i;
    } else {
      fileNumber = '10';
    }
    const folderMemes = 'memes';
    // Check if folderMemes exists; if not, create it
    if (!fs.existsSync(folderMemes)) {
      fs.mkdirSync(folderMemes, { recursive: true });
    }
    fs.writeFileSync(`${folderMemes}/${fileNumber}.jpg`, buffer);
  }
}

saveImages()
  .then(() => {
    console.log('Successfully saved 10 memes!');
  })
  .catch((err) => {
    console.error('An error occurred:', err);
  });

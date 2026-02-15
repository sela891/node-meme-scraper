// Node file system and buffer needed to save images.
import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import * as cheerio from 'cheerio';

const folderMemes = 'memes';
// Check if folderMemes exists; if not, create it
if (!fs.existsSync(folderMemes)) {
  fs.mkdirSync(folderMemes, { recursive: true }); // if the recursive option is set to true,it allows the creation of nested directories
  console.log(`Folder '${folderMemes}' created.`);
} else {
  console.log(`Folder'${folderMemes}' already exists.`);
}
// Fetching the URLs from memegen and saving it as text; extracting the img URLs from the HTML Data and saving 10 URLs in an array

const linkMemeGen = 'https://memegen-link-examples-upleveled.netlify.app';

try {
  const response = await fetch(linkMemeGen);
  const htmlData = await response.text();
  const $ = cheerio.load(htmlData);
  const imgUrls = $('img').slice(0, 10).get();

  for (let i = 0; i < imgUrls.length; i++) {
    const tenImgUrls = $(imgUrls[i]).attr('src');
    const imgResponse = await fetch(tenImgUrls);
    const arrayBuffer = await imgResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let fileNumber = '';
    if (i + 1 < 10) {
      fileNumber = '0' + (i + 1);
    } else {
      fileNumber = '10';
    }
    fs.writeFileSync(`${folderMemes}/${fileNumber}.jpg`, buffer);
  }

  console.log('Successfully saved 10 memes!');
} catch (err) {
  console.error('An error occurred:', err);
}

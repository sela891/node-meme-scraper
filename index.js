// Node file system and buffer needed to save images.
import { Buffer } from 'node:buffer';
import fs from 'node:fs';
// Parse HTML and create document object to be able to use query selector.
import { JSDOM } from 'jsdom';

async function getImageLinks() {
  const linkMemegen = 'https://memegen-link-examples-upleveled.netlify.app/';
  const response = await fetch(linkMemegen);
  const htmlData = await response.text();
  const jsdom = new JSDOM(htmlData);
  const document = jsdom.window.document;
  const imgObjects = document.querySelectorAll('img');
  const imgLinks = [];
  for (let i = 0; i < 10; i++) {
    imgLinks.push(imgObjects[i].src);
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
    fs.writeFileSync(`memes/${fileNumber}.jpg`, buffer);
  }
}

saveImages();

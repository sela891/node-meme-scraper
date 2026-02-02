# node-meme-scraper
This application scrapes the current version of this website https://memegen-link-examples-upleveled.netlify.app/
and downloads the first 10 images into a folder called "memes". 

## TODOs:
-[] Figure out how to make 'memes' ignored in git
-[] Create a memes directory
-[] Investigate how to access the website
-[] HTTP request or fetching 
-[] Retrieve the HTML string data and store it in a variable
-[] Extract the image 'src' strings (URLs) in the HTML string (<img> elements) to an array of image URLs
-[] Seperate out the first 10 image URLs from the array 
-[] Loop over the first 10 image URLs and for each of them: 
  -[] Access the image URL
  -[] HTTP request or fetching
  -[] Retrieve the image data and store it in a variable
  -[] Save the image data to a file
  -[] Create a new file with a name containing a 2-digit number
  -[] Add the data
-[] Test program to make sure it can run multiple times

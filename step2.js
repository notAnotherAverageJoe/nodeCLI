const fs = require('fs');
const process = require('process');
const axios = require('axios');

/** Read file at path and print it out. */
function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

/** Fetch content from URL and print it out. */
async function webCat(url) {
  try {
    let resp = await axios.get(url);
    console.log(resp.data);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

// Get the command line argument for path or URL
let path = process.argv[2];

if (!path) {
  console.error('Error: No path or URL provided');
  process.exit(1);
}

if (path.startsWith('http')) {
  webCat(path);
} else {
  cat(path);
}

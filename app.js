// This should change the text when the page is loaded
window.onload = getText();

// Calls API using async/await
// Async - Function always returns a promise
async function getText() {
  let passageParam = randomPassage();

  let params = {
    "include-passage-references": "false",
    "include-verse-numbers": "false",
    "include-first-verse-numbers": "false",
    "include-footnotes": "false",
    "include-footnote-body": "false",
    "include-headings": "false",
    "include-short-copyright": "false",
    "include-copyright": "false",
    "include-passage-horizontal-lines": "false",
    "include-heading-horizontal-lines": "false",
    //'horizontal-line-length': 55,
    "include-selahs": "true",
    "indent-using": "space", //tab
    "indent-paragraphs": 2,
    "indent-poetry": "true",
    "indent-poetry-lines": 4,
    "indent-declares": 40,
    "indent-psalm-doxology": 30,
    "line-length": 0,
  };

  // API credit
  let Url =
    "https://api.esv.org/v3/passage/text?q=" +
    passageParam +
    "&" +
    new URLSearchParams(params).toString();
  console.log(Url);
  // Await - Used with Async
  // Suspend function exeeuction until the Async promise settles and returns its result
  let response = await fetch(Url, {
    method: "GET",
    headers: {
      Authorization: "null",
    },
  });

  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body
    let passage = await response.json();

    populateUI(passageParam, passage.passages[0]);
    // console.log(passage);
  } else {
    alert("HTTP-Error: " + response.status);
  }

  // Function to input json response to HTML
  function populateUI(ref, verse) {
    // strip verse
    document.getElementById("reference").innerHTML = ref;
    document.getElementById("verse").innerHTML = verse;
  }
}

// Get a random passage from Proverbs
// API needs to pass a passage with chapter and verse
// Is there a way to dynamically get books, chapters and verses?
function randomPassage() {
  // Chapter lengths of each chapter in Proverbs
  const chapterLengths = [
    33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29,
    30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31,
  ];

  let min = 0;
  // console.log(`min ${min}`);

  // Get max number of chapters (31)
  let max = chapterLengths.length;
  // console.log(`maximum ${max}`);

  // Get random chapter
  // max is exclusive and the min is inclusive
  let chapter = Math.floor(Math.random() * (max - min) + min);
  // console.log(`chapter ${chapter}`);

  // index range between 0 and 30
  let verseMax = chapterLengths[chapter];
  // console.log(`verseMax ${verseMax}`);

  // Get random verse
  let verse = Math.floor(Math.random() * (verseMax - min + 1) + min);
  // console.log(`verse ${verse}`);

  // chapter and verse cannot be 0
  return `Proverbs ${chapter + 1}:${verse + 1}`;
}

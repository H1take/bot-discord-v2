// createId() can be called with no arguments to make a 20 character id

// prefix places a string at the front of the id
// suffix places a string at the end of the id
// Not included in idLength
// Must be a string, should help find type or location of data
// Encouraged to use a character like - or _ at the end of your prefix and beginning of your suffix
// You can split id `id.split("-")` to get your prefix or suffix

// length is how long random generated portion is
// 20 is default
// Must be a number

// chars is the characters used for the random generated portion
// Default characters are upper and lower case alphabet and numbers
// Must be a string, not an array

// createId() => "x8HZPoiMRUhQzygXegAK"
// createId("myPrefix-", "_mySuffix", 10, "1234567890") => "myPrefix-1217738484_mySuffix"
// createId("game-") + createId("_", "#import", 6) => "game-z6QFnS3wr21dt8pe66J6_XIySVz#import"

// If returned id is an empty string the default method occurs

module.exports = createId;

function createId(prefix, suffix, length, chars) {
  var idLength = 20;
  var characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  if (typeof chars !== "string" || !chars || chars.length === 0) {
    chars = characters;
  }

  if (typeof length !== "number" || length < 0) {
    length = idLength;
  }

  function randomNum(len) {
    return Math.floor(Math.random() * len);
  }

  function addCharsToId(leng, chrs) {
    var newId = "";

    for (var i = 0; i < leng; i++) {
      newId += chrs[randomNum(chrs.length)];
    }

    return newId;
  }

  var id = addCharsToId(length, chars);

  if (typeof prefix === "string" && prefix.length > 0) {
    id = prefix + id;
  }

  if (typeof suffix === "string" && suffix.length > 0) {
    id = id + suffix;
  }

  if (id === "") {
    id = addCharsToId(idLength, characters);
  }

  return id;
}

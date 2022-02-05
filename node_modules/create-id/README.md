# Create Id

## Install

`npm install create-id`<br>
or<br>
`yarn add create-id`

## Usage

```javascript
import createId from "create-id";
const createId = require("create-id");
```

createId can be called with no arguments to make a 20 character id<br>

```javascript
createId() => "x8HZPoiMRUhQzygXegAK"
```

### Arguments

```javascript
createId(prefix, suffix, length, chars);
```

**prefix** places a string at the front of the id<br>
**suffix** places a string at the end of the id<br>
Neither are counted against length.<br>
Must be a string, suggested to be something to help find type or location of data.

```javascript
createId("myPrefix-", "_mySuffix") => "myPrefix-qsZGSjYRAmiJRt1s7v1h_mySuffix"
```

Encouraged to use a character like - or \_ at the end of your prefix and beginning of your suffix
You can split id `id.split("-")` to get your prefix or suffix

**length** is how long the random generated portion is<br>
20 is the default and must be a number

```javascript
createId(null, null, 6) => "ojZESh"
createId(null, null, 16) => "3hgV848o9KBXrpqf"
```

**chars** is the characters used for the random generated portion.<br>
Must be a string, not an array<br>
Default characters are upper and lower case alphabet and numbers

- "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

```javascript
createId(null, null, null, "01") => "11110011000100100011"
createId(null, null, null, "1234567890ABCDEF") => "01B5E21371E9DB262996"
```

If returned id is an empty string the default method occurs

```javascript
createId(null, null, 0, "!@#$") => "q8jOrZIXaKjJU5wnCvUX"
```

### Examples

```javascript
createId("myPrefix-", "_mySuffix", 10, "1234567890") => "myPrefix-1217738484_mySuffix"
createId("game-", "_2019", 32, "1234567890ABCDEF") =>"game-71BE363570E799222CABE7C5D94BC444_2019"
createId("game-") + createId("_", "#import", 6) => "game-z6QFnS3wr21dt8pe66J6_XIySVz#import"
```

Create random hexadecimal colors

```javascript
createId("#", null, 6, "1234567890abcdef") => "#6482d1"
createId("#", null, 6, "1234567890abcdef") => "#f14a87"
```

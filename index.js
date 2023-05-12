var spsave = require("spsave").spsave;
var fs = require("fs");

function trimSlashes(string) {
  return string.replace(new RegExp("/", "g"), "_");
}

var coreOptions = {
  siteUrl: process.env.SITE_URL,
};
var creds = {
  username: process.env.USER,
  password: process.env.PASSWD,
};

var now = new Date()
  .toISOString()
  .replace(/[-.:TZ]/g, "")
  .slice(2, 12);

var ref = "";
if (process.env.GITHUB_REF) {
  ref = process.env.GITHUB_REF.substr(
    process.env.GITHUB_REF.lastIndexOf("/") + 1
  );
}
var fileOptions = {};
if (process.env.APK_NAME != "" && process.env.APK_URL != "") {
  console.log("upload file");

  fileOptions.folder = process.env.LIB_FOLDER;
  fileOptions.fileName = `${trimSlashes(process.env.APK_NAME)}_${now}.apk`;
  fileOptions.fileContent = fs.readFileSync(process.env.APK_URL);
} else if (process.env.GLOB_URL != "") {
  console.log("upload glob");
  fileOptions.folder = process.env.LIB_FOLDER;
  fileOptions.glob = process.env.GLOB_URL;
}

if (Object.keys(fileOptions).length == 0) {
  console.log("nothing to upload");
  return;
}

spsave(coreOptions, creds, fileOptions)
  .then(function () {
    console.log("Success");
  })
  .catch(function (err) {
    process.exit(1);
  });

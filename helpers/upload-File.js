const path = require("path");
const { v4: uuidv4 } = require("uuid");

const validExtension = [
  "png",
  "jpg",
  "jpeg",
  "gif",
  "PNG",
  "JPG",
  "JPEG",
  "GIF",
];

const uploadFile = (files, extArr = validExtension, folder = "") => {
  return new Promise((resolve, reject) => {
    const { file } = files;

    const nameSlipted = file.name.split(".");

    const fileExtension = nameSlipted[nameSlipted.length - 1];

    //Validate extension

    if (!validExtension.includes(fileExtension)) {
      return reject("Invalid file formaty!");
    }

    const tempName = `${uuidv4()}.${fileExtension}`;

    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    file.mv(uploadPath, function (err) {
      if (err) {
        reject(err);
      }

      resolve(tempName);
    });
  });
};

module.exports = { uploadFile };

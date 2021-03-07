/* eslint-disable arrow-body-style */
function replaceImg(str) {
  console.log(str);
  const re = /https:\/\/i.imgur.com\/\w+\.[jpg|png|gif]+/g;

  const a = str.replace(re, (x) => {
    return `<div style="width: 500px;height:auto; max-width: 100%">
                  <img src='${x}' alt="image" style="object-fit: contain; max-width: 100%; max-height:100%" />
              </div>`;
  });
  const doc = new DOMParser();
  const parseHTML = doc.parseFromString(a, 'text/html');

  return parseHTML.body.innerHTML;
}

export default replaceImg;

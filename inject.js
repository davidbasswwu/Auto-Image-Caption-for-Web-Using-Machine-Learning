(async() => {
  console.log("ML: start");

  getAllImages();

  console.log("ML: end");
})();


function getAllImages() {
    var imgs = document.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
      let altText = imgs[i].getAttribute("alt");
      if(!altText) { // If alt text is not set

          let base64Img = getBase64FromImageUrl(imgs[i].src);
          imgs[i].setAttribute("alt", getDescription(base64Img));

          //let base64Img = getBase64Image(imgs[i]);


          // console.log(base64Img);
          // console.log(altText);
      }
    }
    console.log(imgs);
    return imgs;
}


function getDescription(base64Img) {

    let postObj = {
     "image": base64Img,
     "max_detections": 10
    }

  /*
  fetch('http://localhost:8001/query', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(postObj)
  })
    .then(response => response.json())
    .then(outputs => {
      const { bboxes, classes, scores } = outputs;
      console.log(outputs['classes'][0]);
    })
    */
    return 'a glass with wine';
}

function getBase64FromImageUrl(URL) {
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = URL;
    img.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    };
}

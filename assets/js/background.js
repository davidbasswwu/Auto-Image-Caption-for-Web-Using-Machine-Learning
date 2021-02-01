/* Load Runway Model */
const sc = document.createElement("script")
sc.type = "text/javascript"
sc.src = "https://cdn.jsdelivr.net/npm/@runwayml/hosted-models@latest/dist/hosted-models.js"
document.head.appendChild(sc)


chrome.runtime.onMessage.addListener(function(message, sender, senderResponse){
  if(message.msg === "image") {

    const model = new rw.HostedModel({
      url: "https://densecap-3d0f4788.hosted-models.runwayml.cloud/v1/",
      token: "ilBOwS4QForv+z8y6iJ9ow==",
    });

    const inputs = {
      "image": message.image,
      "max_detections": 5
    };

    model.query(inputs).then(outputs => {
      const { bboxes, classes, scores } = outputs;

      senderResponse({data: classes, index: message.index});
      // use the outputs in your project
    });


/*
    Local Hosted Version

    fetch('http://localhost:8000/query', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs)
    })
      .then(response => response.json())
      .then(outputs => {
        const { bboxes, classes, scores } = outputs;
        senderResponse({data: classes, index: message.index});
      })
      .catch(error => console.log("error", error))
*/



    return true;  // Will respond asynchronously.
  }
});

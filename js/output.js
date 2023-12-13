// let myData;
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.action === "send_myVal") {
//     console.log(request.data); // Outputs: the value of myVal
//     myData = request.data;
//     document.getElementById("demo").innerHTML = myData;
//     document.getElementById("url").innerHTML = request.windowLocation;
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  console.log("ready");
  document.querySelector("#deleteBtn").addEventListener("click", function () {
    const isDelete = confirm("DELETE ALL DATA?");
    if (isDelete) {
      chrome.storage.local.remove(["inputValues"], function () {});

      window.location.reload();
    }
  });
  //
  document
    .querySelector("#pageSpecificBtn")
    .addEventListener("click", function () {
      const isDelete = confirm("DELETE PAGE SPECIFIC DATA?");
      if (isDelete) {
        chrome.storage.local.remove(["localFinalValue"], function () {});
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              message: "deleteAll",
            });
          }
        );
        window.location.reload();
      }
    });
  chrome.storage.local.get(["inputValue"], function (result) {
    document.getElementById("currentText").innerHTML = result.inputValue
      ? result.inputValue
      : "No text found";
  });
  //
  chrome.storage.local.get(["windowLocation"], function (result) {
    document.getElementById("pageURL").innerHTML = result.windowLocation;
  });

  //
  chrome.storage.local.get(["localFinalValue"], function (result) {
    // document.getElementById("contentSpecific").innerHTML =
    //   result.localFinalValue;
    if (result.localFinalValue) {
      for (let i = 0; i < result.localFinalValue.length; i++) {
        let node = document.createElement("div");
        node.classList.add("localText");

        node.innerHTML = result.localFinalValue[i];

        document.getElementById("contentSpecific").appendChild(node);
      }
    }
  });
  chrome.storage.local.get(["inputValues"], function (result) {
    // document.getElementById("inputHistoryText").innerHTML = result.inputValues
    //   ? result.inputValues
    //   : "No text found";
    if (result.inputValues) {
      for (let i = 0; i < result.inputValues.length; i++) {
        let node = document.createElement("div");
        node.classList.add("inputText");

        node.innerHTML = result.inputValues[i];

        document.getElementById("inputHistoryText").appendChild(node);
      }
    }
  });
});

// Listen for messages

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log(`Message from the background script:  ${request.message}`);
//   if (request.message === "Tab changed") {
//     console.log("Tab changed");
//     // Set new data
//     // chrome.storage.local.set(
//     //   { currentString: currentString, windowLocation: windowLocation },
//     //   function () {
//     //     console.log("Value is set to " + currentString + windowLocation);
//     //   }
//     // );
//   }
// });

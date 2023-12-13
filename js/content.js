console.log(window);
// let currentString = localStorage.getItem("currentString");
// let windowLocation = localStorage.getItem("windowLocation");

// let lastClickTime;
// let timeStamp;
// let globalInputValues;

// let globalInputValuesArray = [];

document.addEventListener("input", (e) => {
  if (
    e.target instanceof HTMLInputElement ||
    e.target instanceof HTMLTextAreaElement
  ) {
    const inputValue = e.target.value;
    globalInputValues = inputValue;

    chrome.storage.local.set({ inputValue: inputValue }, function () {
      console.log("Input value saved:", inputValue);
    });

    localStorage.setItem("inputValue", inputValue);
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "deleteAll") {
    localStorage.removeItem("inputArray");
  }
});

document.addEventListener(
  "blur",
  (e) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      let windowLocation = window.location.href;
      let localValue = localStorage.getItem("inputValue");
      let localArray = localStorage.getItem("inputArray");
      localArray = localArray ? JSON.parse(localArray) : [];
      localArray.push(localValue);
      console.log(`LOCAL ARRAYhere ${localArray}`);

      console.log("Input field lost focus");
      localStorage.setItem("inputArray", JSON.stringify(localArray));
      console.log(`typeof ARRRAY HERE ${typeof localArray}`);
      chrome.runtime.sendMessage({ data: localArray });
      chrome.runtime.sendMessage({ windowLocation: windowLocation });

      chrome.storage.local.get(["inputValues"], function (result) {
        let array = result.inputValues ? result.inputValues : [];

        // Check if inputValue already exists in array
        if (!array.includes(globalInputValues) || !globalInputValues === null) {
          // Add new inputValue to array
          array.push(globalInputValues);

          // Store updated inputValues in chrome.storage
          chrome.storage.local.set({ inputValues: array }, function () {
            console.log("Input values saved:", array);
          });
        }
      });

      // Send data to output.js
      // chrome.runtime.sendMessage({ data: data });
    }
  },
  true
); // Use capture to catch the event as it bubbles up
// document.addEventListener("keydown", (e) => {
//   let currentTime = new Date();
//   let timeStamp =
//     currentTime.getHours() +
//     ":" +
//     currentTime.getMinutes() +
//     ":" +
//     currentTime.getSeconds();

//   if (lastClickTime) {
//     let timeDifference = currentTime - lastClickTime;
//     let timeDifferenceSeconds = timeDifference / 1000;
//     console.log(`Time since last click: ${timeDifference} ms`);

//     if (timeDifferenceSeconds >= 2) {
//       let timeStamp =
//         currentTime.getHours() +
//         ":" +
//         currentTime.getMinutes() +
//         ":" +
//         currentTime.getSeconds();
//       currentString += "<br>" + timeStamp + " ";
//     }
//   }

//   lastClickTime = currentTime;

//   if (/^[a-zA-Z0-9\s]$/.test(e.key)) {
//     console.log(e.key);

//     let myString = currentString + e.key;
//     myString = myString.replace("null", "");
//     let replacedString = myString.replace("Backspace", "");
//     let replacedString2 = replacedString.replace("F2", "");

//     currentString = replacedString2;
//     console.log(currentString);
//     localStorage.setItem("currentString", currentString);
//     localStorage.setItem("windowLocation", window.location.href);
//     chrome.storage.local.set(
//       {
//         currentString: currentString,
//         windowLocation: windowLocation,
//       },
//       function () {
//         console.log("WINDOWLOCAtioN " + windowLocation);
//       }
//     );
//   }

// chrome.runtime.sendMessage({
//   action: "setWindowLocation",
//   windowLocation: windowLocation,
//   currentString: currentString,
// });
//
// chrome.runtime.onMessage.addListener(function (
//   request,
//   sender,
//   sendResponse
// ) {
//   if (request.message === "Tab activated") {
//     console.log("Tab activated");
//     // Your code here...#
//   }
// });
//
// window.onload = function () {
//   chrome.runtime.sendMessage({
//     action: "setWindowLocation",
//     windowLocation: windowLocation,
//     currentString: currentString,
//   });
// };
// chrome.runtime.sendMessage({
//   action: "setWindowLocation",
//   windowLocation: windowLocation,
//   currentString: currentString,
// });
//
// });

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.message === "Tab activated") {
//     console.log("Tab activated:", request.url);
//     // TEST START
//     // TEST END
//     // Your code here...
//     chrome.runtime.sendMessage({
//       action: "setWindowLocation",
//       windowLocation: windowLocation,
//       currentString: currentString,
//     });
//   }
// });
// window.onload = function () {
//   chrome.runtime.sendMessage({
//     action: "setWindowLocation",
//     windowLocation: windowLocation,
//     currentString: currentString,
//   });
// };

// if (!localStorage.getItem("currentString")) {
//   localStorage.setItem("currentString", "");
// }
// document.addEventListener("keydown", (e) => {
//   if (e.key === "F2") {
//     localStorage.setItem("windowLocation", window.location.href);
//     let value = localStorage.getItem("currentString");
//     let windowLocation = localStorage.getItem("windowLocation");
//     // window
//     //   .open("", "_blank", "width=400,height=400")
//     //   .document.write(`<p style= "width:300px"> ${value}</p>`);
//     chrome.runtime.sendMessage({
//       action: "open_tab",
//       value: value,
//       windowLocation: windowLocation,
//       currentString: currentString,
//     });
//   }
// });

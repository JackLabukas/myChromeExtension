// let myVal;

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log(chrome.action);
//   if (request.action === "open_tab") {
//     chrome.tabs.create({ url: "output.html" }, function (tab) {
//       myVal = request.value;
//       chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
//         if (info.status === "complete" && tabId === tab.id) {
//           chrome.tabs.onUpdated.removeListener(listener);
//           chrome.tabs.sendMessage(tab.id, {
//             action: "send_myVal",
//             data: myVal,
//             windowLocation: request.windowLocation,
//           });
//         }
//       });
//     });
//   }
// });


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Check if data is in the message

  console.log("Data from content.js:", request.data);
  chrome.storage.local.set({ localFinalValue: request.data }, function () {
    // Your code to handle the data...
  });
  chrome.storage.local.set(
    { windowLocation: request.windowLocation },
    function () {
      // Your code to handle the data...
    }
  );
});
// background.js
// background.js
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.message === "setWindowLocation") {
//     chrome.storage.local.set(
//       {
//         windowLocation: request.windowLocation,
//         currentString: request.currentString,
//         timeStamp: request.timeStamp,
//       },
//       function () {
//         console.log(
//           "CHROME STORAGE VALUE IS SET TO  " +
//             request.windowLocation +
//             request.currentString +
//             request.timeStamp
//         );
//       }
//     );
//   }
// });

// chrome.tabs.onActivated.addListener(function (activeInfo) {
//   chrome.tabs.get(activeInfo.tabId, function (tab) {
//     chrome.tabs.sendMessage(activeInfo.tabId, {
//       message: "Tab activated",
//       url: tab.url,
//     });
//   });
// });

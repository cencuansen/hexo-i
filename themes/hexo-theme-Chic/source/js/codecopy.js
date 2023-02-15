document.ready(() => {
  // ref: https://github.com/zenorocha/codecopy/blob/master/src/scripts/main.js
  var snippets = document.querySelectorAll("figure.highlight");
  var copyHtml = `
      <span style class="codecopy-btn tooltipped-sw" aria-label="copy">copy</span>`;

  function createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
  }

  snippets?.forEach((snippet) => {
    snippet.style["position"] = "relative";
    // var table = snippet.querySelector("table");
    // var thead = table.querySelector("thead");
    // if (!thead) {
    //   thead = document.createElement("thead");
    //   table.tHead = thead;
    // }
    var spanElement = createElementFromHTML(copyHtml);
    snippet.appendChild(spanElement);
  });

  // Add copy to clipboard functionality and user feedback
  var tempDiv;
  var clipboard = new ClipboardJS(".codecopy-btn", {
    target: (trigger) => {
      tempDiv = document.createElement("div");
      tempDiv.classList.add("temp-div");
      tempDiv.innerHTML = trigger.parentNode.querySelector(".code").innerHTML;
      tempDiv.style["position"] = "absolute";
      tempDiv.style["top"] = "-9999px";
      tempDiv.style["left"] = "-9999px";
      document.body.appendChild(tempDiv);
      return tempDiv;
    },
  });
  var timer;
  clipboard.on("success", (e) => {
    e.clearSelection();
    e.trigger.innerHTML = "copied";
    if (tempDiv) {
      document.body.removeChild(tempDiv);
      tempDiv = null;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      e.trigger.innerHTML = "copy";
    }, 1000);
  });

  // // Replace tooltip message when mouse leaves button
  // // and prevent page refresh after click button
  // var btns = document.querySelectorAll('.codecopy-btn');

  // btns.forEach(btn => {
  //     btn.addEventListener('mouseleave', e => {
  //         e.target.innerHTML = "copy";
  //         e.target.blur();
  //     });

  //     btn.addEventListener('click', e => {
  //         e.preventDefault();
  //     });
  // });
});

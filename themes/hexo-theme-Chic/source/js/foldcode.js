document.ready(() => {
  function createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }

  var isFold = true;
  var foleCodeName = () => (isFold ? "unfold" : "fold");
  var foldHtml = `<span style class="fold-btn" aria-label="${foleCodeName()}">${foleCodeName()}</span>`;
  var snippets = document.querySelectorAll("figure.highlight");

  snippets.forEach((snippet) => {
    snippet.style["position"] = "relative";
    if (isFold) {
      snippet.classList.add("foldcode");
    }
    // var table = snippet.querySelector("table");
    // var thead = table.querySelector("thead");
    // if (!thead) {
    //   thead = document.createElement("thead");
    //   table.tHead = thead;
    // }
    var spanElement = createElementFromHTML(foldHtml);
    snippet.appendChild(spanElement);
  });

  var foldBtns = document.querySelectorAll(".fold-btn");
  foldBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.innerHTML === "unfold") {
        // 展开
        isFold = false;
        e.target.parentNode.classList.remove("foldcode");
        e.target.innerHTML = foleCodeName();
      } else {
        // 折叠
        isFold = true;
        e.target.parentNode.classList.add("foldcode");
        e.target.innerHTML = foleCodeName();
      }
    });
  });
});

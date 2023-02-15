document.ready(() => {
  function createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }

  var isFold = true;
  var foleCodeName = () => (isFold ? "unfold" : "fold");

  var snippets = document.querySelectorAll("figure.highlight");
  snippets.forEach((snippet) => {
    var table = snippet.querySelector("table");
    if (isFold) {
      table.classList.add("foldcode");
    }
    var foldHtml = `<span style class="fold-btn" aria-label="${foleCodeName()}">${foleCodeName()}</span>`;
    var thead = table.querySelector("thead");
    if (!thead) {
      thead = document.createElement("thead");
      table.tHead = thead;
    }
    thead.style["position"] = "relative";
    var spanElement = createElementFromHTML(foldHtml);
    thead.appendChild(spanElement);
  });

  var foldBtns = document.querySelectorAll(".fold-btn");
  foldBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.innerHTML === "unfold") {
        // 展开
        isFold = false;
        e.target.parentNode.parentNode.classList.remove("foldcode");
        e.target.innerHTML = foleCodeName();
      } else {
        // 折叠
        isFold = true;
        e.target.parentNode.parentNode.classList.add("foldcode");
        e.target.innerHTML = foleCodeName();
      }
    });
  });
});

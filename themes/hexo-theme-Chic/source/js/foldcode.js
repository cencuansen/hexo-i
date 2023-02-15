document.ready(() => {
    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        // Change this to div.childNodes to support multiple top-level nodes.
        return div.firstChild;
    }

    var snippets = document.querySelectorAll('figure.highlight');
    snippets.forEach(snippet => {
        var tr = snippet.querySelector("tr");
        // tr.classList.add("foldcode");
        var foldHtml = `<span style class="fold-btn" aria-label="fold">fold</span>`;
        var table = snippet.querySelector("table");
        var thead = document.createElement('thead');
        table.tHead = thead;
        thead.style["position"] = "relative";
        // var spanElement = createElementFromHTML(foldHtml);
        // thead.appendChild(spanElement);
    });

    var foldBtns = document.querySelectorAll(".fold-btn");
    foldBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            if (e.target.innerHTML === "unfold") {
                e.target.innerHTML = "fold";
            } else {
                e.target.innerHTML = "unfold";
            }
        })
    });
});
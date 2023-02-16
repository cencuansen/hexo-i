const fold = "折叠";
const unfold = "展开";
const copy = "复制";
const copied = "已复制";

var isFold = true;
var foldCodeName = () => (isFold ? unfold : fold);

function elementParse(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function copyHandle() {
    var tempDiv;
    var clipboard = new ClipboardJS(".copy-btn", {
        target: (trigger) => {
            tempDiv = document.createElement("div");
            tempDiv.classList.add("copy-code-temp");
            tempDiv.innerHTML = trigger.parentNode.nextElementSibling.querySelector(".code").innerHTML;
            document.body.appendChild(tempDiv);
            return tempDiv;
        },
    });
    var timer;
    clipboard.on("success", (e) => {
        e.clearSelection();
        e.trigger.innerHTML = copied;
        if (tempDiv) {
            document.body.removeChild(tempDiv);
            tempDiv = null;
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            e.trigger.innerHTML = copy;
        }, 1000);
    });
}

function foldHandle() {
    var foldButtons = document.querySelectorAll(".fold-btn");
    foldButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            if (e.target.innerHTML === unfold) {
                // 展开
                isFold = false;
                e.target.parentNode.nextElementSibling.classList.remove("code-fold");
                e.target.innerHTML = foldCodeName();
            } else {
                // 折叠
                isFold = true;
                e.target.parentNode.nextElementSibling.classList.add("code-fold");
                e.target.innerHTML = foldCodeName();
            }
        });
    });
}


document.ready(() => {
    var codeOpsDivs = document.querySelectorAll(".code-ops");
    var snippets = document.querySelectorAll("figure.highlight");

    var copyHtml = `<div style class="copy-btn code-op" aria-label="${copy}">${copy}</div>`;

    var foldHtml = `<div style class="fold-btn code-op" aria-label="${foldCodeName()}">${foldCodeName()}</div>`;

    codeOpsDivs?.forEach(codeOpsDiv => {
        // 复制
        codeOpsDiv.appendChild(elementParse(copyHtml));

        // 折叠
        codeOpsDiv.appendChild(elementParse(foldHtml));

        // 折叠初始状态
        if (isFold) {
            codeOpsDiv.nextElementSibling.classList.add("code-fold");
        }
    });

    copyHandle();
    foldHandle();
});



// 复制


// 折叠
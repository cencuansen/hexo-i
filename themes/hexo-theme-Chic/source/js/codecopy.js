document.ready(() => {
    // ref: https://github.com/zenorocha/codecopy/blob/master/src/scripts/main.js
    var snippets = document.querySelectorAll('figure.highlight');
    var copyHtml = `
      <span style class="codecopy-btn tooltipped-sw" aria-label="copy">copy</span>`;

    snippets?.forEach(snippet => {
        var table = snippet.querySelector("table");
        var thead = document.createElement('thead');
        table.tHead = thead;
        thead.style["position"] = "relative";
        thead.innerHTML = copyHtml;
    });

    // Add copy to clipboard functionality and user feedback
    var clipboard = new ClipboardJS('.codecopy-btn', {
        target: trigger => trigger.parentNode.parentNode.querySelector(".code"),
    });
    var timer;
    clipboard.on('success', e => {
        e.clearSelection();
        e.trigger.innerHTML = "copied";
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
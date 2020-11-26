var path = require("path");
var urlJoin = require("url-join");
var BugReporter = require("./BugReporter");
var findAllPositions = require("position-map-text-to-markdown").findAllPositions;

function quoteText(text) {
    return text.split("\n").map(function(line) {
        return "> " + line;
    }).join("\n");
}

function getContentAsync(apiURL) {
    // https://github.com/jser/jser.info/edit/gh-pages/data/2015/08/index.json
    // => https://api.github.com/repos/jser/jser.info/contents/data/2015/08/index.json
    return fetch(apiURL).then(function(response) {
        return response.json();
    }).then(function(response) {
        return decodeURIComponent(escape(atob(response.content)));
    });
}

function getResourceURL(config, filePath, branch) {
    if (config["markdownBaseURL"]) {
        return urlJoin(config["markdownBaseURL"], filePath);
    }
    return urlJoin(`https://github.com/`, config.repo, `blob`, branch, filePath);
}

function getEditURL(config, filePath, branch) {
    return urlJoin(`https://github.com/`, config.repo, `edit`, branch, filePath);
}
function getAPIURL(config, filePath) {
    if (config["githubAPIBaseURL"]) {
        return urlJoin(config["githubAPIBaseURL"], filePath);
    }
    return urlJoin(`https://api.github.com/repos/`, config.repo, `contents`, filePath) + `?ref=${config.branch}`;
}

function getIssueURL(config) {
    if (config["newIssueURL"]) {
        return config["newIssueURL"];
    }
    return urlJoin(`https://github.com/`, config.repo, `/issues/new`);
}
window.require(["gitbook"], function(gitbook) {
    // plugin config
    gitbook.events.bind("start", function(e, pluginConfig) {
        // fix: the "Feedback" button is put on the "next" (>) button on smartphone
        if (document.body.offsetHeight * 9 >= document.body.offsetWidth * 12) {
            return;
        }

        var config = pluginConfig["github-issue-feedback-language-custom"];
        var reportElement = document.createElement("button");
        reportElement.textContent = "Have Feedback?";

        // custom Chinese button support
        var isChinese = (gitbook.state.config.language.substring(0,2) == "zh");
        if (isChinese) {
            reportElement.textContent = "提交反馈";
        }
        
        reportElement.className = "gitbook-plugin-github-issue-feedback-language-custom";
        reportElement.setAttribute("style", "position:fixed; right:20px;bottom:20px;height:30px");
        var clickEvent = ("ontouchstart" in window) ? "touchend" : "click";
        reportElement.addEventListener(clickEvent, function(event) {
            var languagePath = gitbook.state.config.language;
            
            // language config maybe "zh" or "zh-hans", but folder is always "zh"
            if (isChinese) {
                languagePath = "zh";
            }
            var pathname = path.join(gitbook.state.config.root || "./", languagePath, gitbook.state.filepath);
            var apiURL = getAPIURL(config, pathname);
            var resourceURL = getResourceURL(config, pathname, config.branch);
            var editURL = getEditURL(config, pathname, config.branch);
            var chapterTitle = gitbook.state.chapterTitle;
            var bug = new BugReporter(getIssueURL(config));
            var selectedText = bug.getSelectedText().trim();
            bug.setTitle(chapterTitle);
            getContentAsync(apiURL).then(function(markdown) {
                let body = 'URL : ' + resourceURL + "\n\n";
                if (selectedText && selectedText.length > 0) {
                    var matches = findAllPositions({
                        text: selectedText,
                        markdown: markdown
                    });
                    console.log(matches);
                    matches.forEach(function(match) {
                        var editLink = `[:memo:](${editURL}#L${match.loc.start.line} "Edit")`;
                        body += quoteText(match.markdown + "\n" +
                                `${editLink} <${resourceURL}#L${match.loc.start.line}>`) + "\n\n";
                    });
                }
                bug.setBody(body);
                bug.report();
            });
        });
        document.body.appendChild(reportElement);
    });

});
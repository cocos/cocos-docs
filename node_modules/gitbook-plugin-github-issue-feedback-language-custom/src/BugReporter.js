// MIT © 2017 azu
"use strict";
function BugReporter(issueURL) {
    this.github_issue_point = issueURL;
    this.github_issue_title = "";
    this.github_issue_body = "";
    this.github_issue_labels = "BugReport";
}
BugReporter.prototype.getSelectedText = function() {
    var sel, text = "";
    if (window.getSelection) {
        text = "" + window.getSelection();
    } else if ((sel = document.selection) && sel.type === "Text") {
        text = sel.createRange().text;
    }
    return text;
};
BugReporter.prototype.setTitle = function(title) {
    this.github_issue_title = title;
};
BugReporter.prototype.setBody = function(body) {
    this.github_issue_body = body;
};
BugReporter.prototype.report = function() {
    var url = this.github_issue_point
        + "?title=" + encodeURIComponent(this.github_issue_title)
        + "&body=" + encodeURIComponent(this.github_issue_body);
    location.href = url;
};
module.exports = BugReporter;
// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
    var html = '';
    var node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return html;
}

// Returns a list of URLs separated by ;
function GetUrls(document_root) {
  var html = '';
  var doc = DOMtoString(document_root);

  var first = doc.indexOf('<div id="stories">');
  //html = html + 'first=' + first;

  var ia = doc.indexOf('<a class="listen btn"', first);
  //html = html + 'ia=' + ia;

  while (ia > 0){

      ihttp = doc.indexOf('http:', ia + 1);
      //html = html + 'ihttp=' + ihttp;
      imp3 = doc.indexOf('.mp3', ihttp) + 4;
      //html = html + 'imp3=' + imp3;
      url = doc.substring(ihttp, imp3);
      //html = 'url=' + url;
      url2 = url.replace(/\\\//g, '/');
      html = html + '' + url2 + ';';

      ia = doc.indexOf('<a class="listen btn"', ia + 1);

}
  return html;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: GetUrls(document)
});
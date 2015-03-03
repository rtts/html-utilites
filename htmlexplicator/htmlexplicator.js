/*
HTML5 Explicator
================

Created by Return to the Source  
http://www.returntothesource.nl/

The HTML5 Explicator changes (part of) an HTML document to use explicit
`<section>` elements, as recommended by the W3C's [HTML5 standard] [1].
It depends on Marc Hoyois' [HTML Outliner] [2], that provides a complete
implementation of the outlining algorithm described in the section
[Creating an outline] [3] of the HTML5 standard.  It provides a single
function `explicate(body)`, which returns an `<article>` element
containing the document's body (or any other DOM node), converted to
explicit html5 sections.

[1]: http://dev.w3.org/html5/spec/
[2]: http://github.com/hoyois/html5outliner
[3]: http://www.w3.org/html/wg/drafts/html/master/sections.html#outlines
*/

function explicate(body) {
    if (typeof(HTMLOutline) === 'function') {
        HTMLOutline(body);
    } else {
        alert('Please include HTMLOutliner.js from github.com/hoyois/html5outliner to make this work.');
    }

    var article = document.createElement('article');
    article.associatedSection = body.associatedSection
    // TODO: copy other attributes of the body node to the article node
    body.associatedSection.explicit = article;

    function process(node) {
        var newnode;
        if (node.depth) {
            newnode = document.createElement('h' + (node.depth > 6 ? 6 : node.depth));
            var child = node.firstChild;
            while(child) {
                newnode.appendChild(child.cloneNode(true));
                child = child.nextSibling;
            } 
        } else {
            newnode = node.cloneNode(true);
        }
        if (node.associatedSection.explicit) {
            node.associatedSection.explicit.appendChild(newnode);
        } else {
            var section = document.createElement('section');
            node.associatedSection.explicit = section;
            section.appendChild(newnode);
            node.associatedSection.parentSection.explicit.appendChild(section);
        }
    }

    function is_section(node) {
        switch (node.nodeName) {
        case "ARTICLE": case "ASIDE": case "NAV": case "SECTION": return true;
        default: return false;
        }
    }
    
    var node = body.firstChild;
    start: while(node) {
        if (is_section(node) && node.firstChild) {
            node = node.firstChild;
            continue start;
        } else {
            process(node);
        }
            
        while(node) {
            if(node === body) break start;
            if(node.nextSibling) {
                node = node.nextSibling;
                continue start;
            }
            node = node.parentNode;
        }
    }

    return article;
}

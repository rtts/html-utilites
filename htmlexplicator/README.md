HTML Explicator
===============

Created by Return to the Source  
http://www.returntothesource.nl/

The HTML Explicator changes (part of) an HTML document to use explicit
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

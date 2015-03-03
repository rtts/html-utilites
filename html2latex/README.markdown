Html2LaTeX
==========

This program  extracts the **actual content** of a webpage and  converts it to
[LaTeX](http://www.latex-project.org/) source code, which can be compiled to a
PDF  document. This produces readable  and  neatly typeset  PDFs  without  the
clutter of  banners, sidebars  and footers. All hyperlinks are preserved using
LaTeX's hyperref package.

Instead  of  software like [Readability](https://www.readability.com/),  there
are no arbitrary rules to filter out actual content,  except for one: the part
of the html file that has  the lowest **tag-to-text ratio**  is the part where
the interesting content is. This  simple  algorithm performs surprisingly well
on the wild variety of webpages on the world wide web.

I run this program on my server so I can surf the web in  a pdf-viewer instead
of a real browser when I'm at work. It's less obtrusive to customers :-)

Copyright J.J. Vens, 2011.

Feel free to modify and redistribute  this program under the latest version of
the GNU General Public License.

Usage
-----

Simply pipe some html code into it and it will produce a LaTeX document on its
standard output.

If you have  pdflatex installed, you can compile the LaTeX file to  a PDF file
by piping the output to pdflatex, like so:

    html2latex < input.html > pdflatex

This will write to the current directory a new file called texput.pdf.

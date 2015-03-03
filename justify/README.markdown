Align and Justify
=================

These   two   [awk](http://en.wikipedia.org/wiki/Awk)   scripts   handle   the
formatting of  monospaced  text. Ever wondered  how those  RFC  documents  are
aligned so neatly?

**Justify** aligns  text to both margins. It takes text line-by-line from  the
standard input,  distributes extra  whitespace to  each line appropiately, and
prints  the  justified lines to the standard output.  For decent  results, the
input should come  from  **align**,  which  rearranges lines so  they  are  of
roughly equal length. The original justify performed this task as well, but by
separating  these  tasks  the user  has  more freedom in text-formatting.  For
instance, could redirect the output of an  hyphenation-tool to justify without
it messing up the lines.

Created: J.J. Vens, 2009

License: GPL

Usage
-----

`cat file.txt | align | justify > aligned_and_justified_file.txt`

Or just pipe text into these utilities from your favorite editor.

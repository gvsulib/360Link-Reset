# 360Link Reset

## A tool to radically improve Serials Solutions 360Link Link Resolver

---

This tool was developed by Matthew Reidsma in Javascript to modify the SerialsSolutions 360Link link resolver. It was modified by Kyle Felker.

INSTALLATION 

Upload the linkresolver.css and 360Link-reset.2.0.min.js files to your server and note the paths.

You'll need to add a few lines to your 360Link Administration Console. Under branding options, click "Edit" and then add the following to the very bottom of the header field:
---

<link href="/PATH/TO/linkresolver.css" rel="stylesheet" type="text/css" />
<div id="360link-reset">

---
Then in the footer section, add the following as the first lines:
---

</div>
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="http://cdn.jquerytools.org/1.2.6/jquery.tools.min.js"></script>
<script src="PATH/TO/360link-reset.2.0.min.js"></script>

---

That's it! 

WHAT IT DOES:

360Link Reset runs through the crummy default 360Link page and grabs all of the important bits: URLs, citation information, database names, and then clears away all the cruft Serials Solutions adds to your page (except scripts) and starts fresh with a new batch of clean, simple semantic HTML. It then makes it look pretty, simplifying the citation into a single line and showing only the first result in a list, hiding the rest until the user clicks "Show More Results." The number one problem we found in our monthly usability tests of our link resolver was that multiple results confused everyone who used the site. This solution attempts to remedy the problem.

More questions? Feel free to contact Matthew Reidsma on Twitter at @mreidsma or via email at reidsmam@gvsu.edu.

COPYRIGHT

This tool is copyright 2011 Grand Valley State University Libraries. 

This tool is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This tool is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this tool. If not, see <http://www.gnu.org/licenses/>.
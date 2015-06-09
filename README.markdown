# 360Link Reset

A tool to radically improve Serials Solutions 360Link Link Resolver, developed by Matthew Reidsma and Kyle Felker for Grand Valley State University Libraries.

----

360Link is a great tool for helping your patrons connect to full-text articles through a variety of research databases. Unfortunately, the UI hasn't been updated in years, and introduces a number of difficulties for patrons trying to access research articles and books. At GVSU, we noticed patrons were unable to determine which link to click in the results, or which result was the best one for them. Since we do a lot of user testing here at GVSU, we wanted a way to quickly make changes to the resolver on the fly, testing design hypotheses that might improve the patron's experience. This is how 360Link Reset was born, a JavaScript file that grabs the important bits of data from the standard 360Link page, and then rewrites the HTML to make a better experience.

[![Sample images of 360Link before and 360Link after installing the script](http://matthew.reidsrow.com/img/360linkresults.png)](http://matthew.reidsrow.com/img/360linkresults.png)

After grabbing the citation information, URLs, and database links, 360Link reset rewrites the page in semantic HTML, simplifying the citation into a single line and showing only the first result in a list, hiding the rest until the user clicks "Show More Results." It also adds a few "Next steps" links, like searching the catalog for a journal without print holdings in Client Center, requesting an article from Document Delivery/ILL, or reporting a bad link or problem to your Electronic Resources Management team (ERMS).

### INSTALLATION 

First, you should customize the two main files for your system. linkresolver.css conatins styles for the stock and rewritten link resolver, and 360link-reset.js is the JavaScript that alters the page.

#### linkresolver.css

There is no need to make changes to this CSS file unless you want to change the colors and look and feel of the rewritten page. The styles at the top will work even if JavaScript fails or is turned off. The styles in the last half of the document affect the rewritten page.

#### 360link-reset.js

Open this file in a text editor (not Word!) and update the variables in this section to match your institution's URLs and phrasing.

Lines 18-57 contain customization options for 360Link Reset. You can choose how certain labels read and set the default URLs for your OPAC (Millennium/Sierra), consortial catalog (Millennium/Sierra), and Interlibrary Loan software (Illiad). If you use a different OPAC or Ill software, you'll need to modify the script to form the correct URLs for your system.

Once you have customized the script, you may want to minimize it to improve performance. You can use a site like [jscompress.com](http://jscompress.com) to minimize your JavaScript file.

#### Tracking views by Format

This branch includes code to track page views by format in a simple MySQL database. To use this functionality, you'll need to do a few additional steps.

1. **Create the MySQL database:** Using the file formats.sql, create a table in your server's MySQL to store the data. Make a note of the database name, the user and password, and the server name.
2. **Set up config.php:** Open up config.sample.php in a text editor and add the database connection details from step one. Save the file as config.php, and upload it to the server in the same directory as the script and the itemrecord.php script.
3. Set the correct path for the item tracker in 360Link-reset.js, [line 93](https://github.com/gvsulib/360Link-Reset/blob/master/360link-reset.js#L93). 

Now you'll have a database that tracks each view and records the timestamp along with the format of the record. Adding additional metrics is trivial, but you'll have to add the code to pass the information through the image URL in 360Link-reset.js and update the itemrecord.php script and database structure to reflect your new changes. 

A dashboard to see comparative stats in coming soon.

#### Serials Solutions Customization Manager

Now you need the 360link-reset.js, linkresolver.css, and img/ files to live on a server. Upload them to a directory and make a note of the path. For instance, if I uploded the files to http://mywebsite.com/360link, I'd replace "/PATH/TO/" below with "http://mywebsite.com/360link/". 

Now you'll need to add a few lines to your 360Link Administration Console. Under branding options, click "Edit" and then add the following to the very bottom of the header field:

	<link href="/PATH/TO/linkresolver.css" rel="stylesheet" type="text/css" />

Then in the footer section, add the following as the first lines:

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
	<script src="PATH/TO/360link-reset.js"></script>

Customization Manager will take 24 hours to push these changes live, you can preview what your site will look like using the Preview button after editing.

---

More questions? Feel free to contact Matthew Reidsma on Twitter at [@mreidsma](http://twitter.com/mreidsma) or via email at [reidsmam@gvsu.edu](mailto:reidsmam@gvsu.edu).

COPYRIGHT

This tool is copyright 2011-2014 Grand Valley State University Libraries. 

This tool is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This tool is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this tool. If not, see <http://www.gnu.org/licenses/>.
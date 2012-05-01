
jQuery(document).ready(function() {


// Since 360Link loads Prototype, need to use the jQuery prefix instead of $ 
// to avoid conflicts with Prototype.

jQuery("head link").remove(); // Remove existing styles

var results = ""; 
var articleLinksdata = "";
var journalLinksdata = "";
var dateRangedata = "";
var DatabaseNamedata = "";
var DatabaseLinkdata = "";
var clicks = 0;
var refinerlink = jQuery("#RefinerLink0 a").attr("href");
var hasPrint = false;

//define variables for capturing faulty URLs

var link = "";
var DBname = "";
var ts = 0;	
var datastring = "";

// The following are special links created by Serials Solutions for us. These can guide you in adding your own
var illiadLink = jQuery("table.CandyWrapper:last a.AnchorButton:contains('Document Delivery')").attr("href");
var refworksLink = jQuery("table.CandyWrapper:last a.AnchorButton:last").attr("href");
var melLink = jQuery("table.CandyWrapper:last a.AnchorButton:contains('MeLCat')").attr("href"); // Currently not used, but we *could* use it

// Build the citation

var authorName = jQuery("span.fn").text();
authorName = jQuery.trim(authorName); // Trim leading white space form author name

// Journals

if (format === "Journal" || format === "JournalFormat") {

	var journalName = jQuery("td#CitationJournalTitleValue").text();
	journalName = jQuery.trim(journalName); // Trim leading white space form journal name
	var articleName = jQuery("td#CitationJournalArticleValue").text();
	articleName = jQuery.trim(articleName); // Trim leading white space form article name
	var journalVol = jQuery("td#CitationJournalVolumeValue").text();
	journalVol = jQuery.trim(journalVol); // Trim leading white space form journal volume
	if (journalVol !== "") { journalVol = ', <span id="CitationJournalVolumeValue">&nbsp;' + journalVol + '</span>'; } // Add context so if var is blank, it won't display
	var journalIssue = jQuery("td#CitationJournalIssueValue").text();
	journalIssue = jQuery.trim(journalIssue); // Trim leading white space form journal issue #
	if (journalIssue !== "") {journalIssue = '<span id="CitationJournalIssueValue">&nbsp;(' + journalIssue + '),</span>'; } // Add context so if var is blank, it won't display
	var journalDate = jQuery("td#CitationJournalDateValue").text();
	journalDate = jQuery.trim(journalDate); // Trim leading white space form journal date
	var journalPages = jQuery("td#CitationJournalPageValue").text();
	journalPages = jQuery.trim(journalPages); // Trim leading white space form journal pages
	if (journalPages !== "") {journalPages = '<span id="CitationJournalPageValue">&nbsp;p. ' + journalPages + '.</span>'; } // Add context so if var is blank, it won't display
	var journalissn = jQuery("td#CitationJournalIssnValue").text();
	journalissn = jQuery.trim(journalissn); // Trim leading white space form journal issn
	if (journalissn !== "") { journalissn = '<span id="CitationJournalIssnValue">&nbsp;(ISSN:&nbsp;' + journalissn + ')</span>'; } // Add context so if var is blank, it won't display 
	
	// Ok, let's get rid of that table and replace it with a semantic div for our citation

	var citationDiv = '<span id="CitationJournalAuthorValue">' + authorName + '</span>&nbsp; <span id="CitationJournalDateValue">(' + journalDate + ')</span>.&nbsp; <span id="CitationJournalArticleValue">' + articleName + '.</span>&nbsp; <span id="CitationJournalTitleValue">' + journalName + '.</span>&nbsp;' + journalVol +  journalIssue + journalPages;

	// Replace the final table with semantic HTML, along with the dynamic links
	// Remove the line above and uncomment the line below to add items to the bottom of your link resolver
var journalTitleEncode = encodeURI(journalName);	

var nextstepsLink = '<li>Not Available Online? <a href="' + illiadLink + '">Order a copy from Document Delivery</a></li><li>Found a problem? <a href="mailto:erms@gvsu.edu">Let our crack team of link fixers know</a>!</li>';



}

// Books

if (format === "BookFormat") {
	
	var bookTitle = jQuery("td#CitationBookTitleValue").text();
	bookTitle = jQuery.trim(bookTitle); // Trim leading white space form book title
	var bookDate = jQuery("td#CitationBookDateValue").text();
	bookDate = jQuery.trim(bookDate); // Trim leading white space form journal name
	var bookisbn = jQuery("td#CitationBookISBNValue").text();
	bookisbn = jQuery.trim(bookisbn); // Trim leading white space form journal name
	if (bookisbn !== "") { bookisbn = '&nbsp;<span id="CitationBookISBNValue">(ISBN:&nbsp;' + bookisbn + ')</span>&nbsp;'; } // Add context so if var is blank it will not display
	
	// Ok, let's get rid of that table and replace it with a semantic div for our citation

	var citationDiv = '<span id="CitationBookAuthorValue">' + authorName + '</span>&nbsp; <span id="CitationBookDateValue">(' + bookDate + ')</span>.&nbsp; <span id="CitationBookTitleValue"><em>' + bookTitle + '</em></span>' + bookisbn;
	
	// Replace the final table with semantic HTML, along with the dynamic links

	
	// Remove the line above and uncomment the line below to add items to the bottom of your link resolver
var bookTitleLink = encodeURI(bookTitle); // Encode the white space in the URL
var nextstepsLink = '<li><a href="http://library.catalog.gvsu.edu/search/t' + bookTitleLink + '">Search the GVSU Catalog for this book</a></li><li><a href="' + melLink + '">Order from another Michigan library</a></li><li>Not Available Online? <a href="' + illiadLink + '">Order a copy from Interlibrary Loan</a></li><li>Found a problem? <a href="mailto:erms@gvsu.edu">Let our crack team of link fixers know</a>!</li>';
	
}

// Unknown format - treat as book?

if (format === "UnknownFormat") {
	
	var bookTitle = jQuery("td#CitationUnknownPublicationValue").text();
	bookTitle = jQuery.trim(bookTitle); // Trim leading white space form book title
	var bookDate = jQuery("td#CitationUnknownDateValue").text();
	bookDate = jQuery.trim(bookDate); // Trim leading white space form journal name
	var bookisbn = jQuery("td#CitationBookISBNValue").text();
	bookisbn = jQuery.trim(bookisbn); // Trim leading white space form journal name
	if (bookisbn !== "") { bookisbn = '&nbsp;<span id="CitationBookISBNValue">(ISBN:&nbsp;' + bookisbn + ')</span>&nbsp;'; } // Add context so if var is blank it will not display
	
	// Ok, let's get rid of that table and replace it with a semantic div for our citation

	var citationDiv = '<span id="CitationBookAuthorValue">' + authorName + '</span>&nbsp; <span id="CitationBookDateValue">(' + bookDate + ')</span>.&nbsp; <span id="CitationBookTitleValue"><em>' + bookTitle + '</em></span>&nbsp; <span id="CitationBookISBNValue">&nbsp; </span>';
	
	// Replace the final table with semantic HTML, along with the dynamic links

	
	// Remove the line above and uncomment the line below to add items to the bottom of your link resolver
var bookTitleLink = encodeURI(bookTitle); // Encode the white space in the URL
var nextstepsLink = '<li><a href="http://library.catalog.gvsu.edu/search/t' + bookTitleLink + '">Search the GVSU Catalog for this book</a></li><li>Not Available Online? <a href="' + illiadLink + '">Order a copy from Interlibrary Loan</a></li><li>Found a problem? <a href="mailto:erms@gvsu.edu">Let our crack team of link fixers know</a>!</li>';
	
}

// Get information about displayed results and build results list

jQuery("table#JournalLinkTable").find("tr").each(function(index) { // Grab values from the results table
	
	if(index !== 0) { 
				
		// Get the article link, if available
		
		if(jQuery(this).find("#ArticleCL a").length > 0) { // There is an article link
			
			var newHref = jQuery(this).find("#ArticleCL a").attr("href");
			
			articleLinksdata = articleLinksdata + newHref + "|||";
			
		} else { // No article length
			
			articleLinksdata = articleLinksdata + "NA|||";
			
		}
		
		// Get the journal link, if available
		
		if(jQuery(this).find("#JournalCL a").length > 0) { // There is a journal link

			var newHref = jQuery(this).find("#JournalCL a").attr("href");

			journalLinksdata = journalLinksdata + newHref + "|||";

		} else { // No article length

			journalLinksdata = journalLinksdata + "NA|||";

		}
		
		// Get the date range
		
		var newDates = jQuery(this).find("#DateCL").text();
		
		dateRangedata = dateRangedata + newDates + "|||";
		
		// Get the database name
		
		var newDBName = jQuery(this).find("#DatabaseCL").text();
		
		DatabaseNamedata = DatabaseNamedata + newDBName + "|||";
		
		// Get the database link
		
		var newDBLink = jQuery(this).find("#DatabaseCL a").attr("href");
		
		DatabaseLinkdata = DatabaseLinkdata + newDBLink + "|||";
					
	}
	
	results = index; // Get total number of results
		
});

// Bust apart arrays into variabls we can call

var articleLinks = articleLinksdata.split("|||");
var journalLinks = journalLinksdata.split("|||");
var dateRange = dateRangedata.split("|||");
var DatabaseNames = DatabaseNamedata.split("|||");
var DatabaseLinks = DatabaseLinkdata.split("|||");

var additionalLinksnum = results - 1; // Number of links in the additional results list

if((articleLinks[0] === "NA") && (journalLinks[0] !== "NA")) { // There was no article link, but there is a journal link
	
TopDatabaseName = jQuery.trim(DatabaseNames[0]);
	
// Check to see if top result is a print journal

if(TopDatabaseName === "Print at GVSU Libraries") {
	
var topResultdiv = '<ul id="top-result"><li><a href="' + journalLinks[0] + '" class="article-button" target="_blank">Find a Copy</a> in <a href="' + DatabaseLinks[0] + '" class="SS_DatabaseHyperLink">' + jQuery.trim(DatabaseNames[0]) + '</a></li></ul>';
var hasPrint = true;	
} else {

var topResultdiv = '<ul id="top-result"><li><a href="' + journalLinks[0] + '" class="article-button" target="_blank">Browse the Journal Online</a> in <a href="' + DatabaseLinks[0] + '" class="SS_DatabaseHyperLink">' + jQuery.trim(DatabaseNames[0]) + '</a></li></ul>';

}} else { // There is an article link
		
var topResultdiv = '<ul id="top-result"><li><a href="' + articleLinks[0] + '" class="article-button" target="_blank">Full Text Online</a> from <a href="' + DatabaseLinks[0] + '" class="SS_DatabaseHyperLink">' + jQuery.trim(DatabaseNames[0]) + '</a> <a class="holding-details"><img src="http://gvsu.edu/icon/help.png" alt="" /></a><div class="tooltip"><p><a href="' + journalLinks[0] + '" style="text-decoration: none;">Browse Journal</a></p><p style="font-size: 1em;"><i>Dates covered:</i><br />' + dateRange[0] + '</p></div></li></ul>';
	
}


// Additional results

if(additionalLinksnum > 0) { // There are additional results
		
if(additionalLinksnum === 1) { // Only 1 additional result
	var showResultsLabel = "Show 1 More Result"; 
} else { // More than one result
	var showResultsLabel = "Show " + additionalLinksnum + " More Results";
}

// Now build the results div by iterating through the additional results the correct number of times starting with [1]

var onlineAdditionalResults = "";
var printAdditionalResults = "";

var i = 1;
while(i < results) {

// Check for an article link

if(articleLinks[i] !== "NA") { // Article link - article has to be online
	
	if(onlineAdditionalResults === "") { // First online article listed, add the header
		
		onlineAdditionalResults = onlineAdditionalResults + "<h4>Online</h4><ul>";
		
	}
	
	onlineAdditionalResults = onlineAdditionalResults + '<li><a href="' + articleLinks[i] + '" target="_blank">Full Text Online</a> from <a href="' + DatabaseLinks[i] + '" class="SS_DatabaseHyperLink">' + DatabaseNames[i] + '</a><a class="holding-details"><img src="http://gvsu.edu/icon/help.png" alt="" /></a><div class="tooltip"><p><a href="' + journalLinks[i] + '" style="text-decoration: none;">Browse Journal</a></p><p style="font-size: 1em;"><i>Dates covered:</i><br />' + dateRange[i] + '</p></div></li>';
	
	
} else { // No article link
	
	// Check to see if it is available in print only and save it as a separate variable to be broken out in another list
	
	
	if(jQuery.trim(DatabaseNames[i]) === "Print at GVSU Libraries") { // Item is in print
		var hasPrint = true;
		if(printAdditionalResults === "") { // First online article listed, add the header

			printAdditionalResults = printAdditionalResults + "<h4>Print</h4><ul>";
			

		}
		
		printAdditionalResults = printAdditionalResults + '<li><a href="' + journalLinks[i] + '" target="_blank">Available in Print</a> at the <abbr title="Grand Valley State University">GVSU</abbr> University Libraries</li>';
		
	} else { // Item is online
		
		if(onlineAdditionalResults === "") { // First online article listed, add the header

			onlineAdditionalResults = onlineAdditionalResults + "<h4>Online</h4><ul>";

		}
		
		onlineAdditionalResults = onlineAdditionalResults + '<li><a href="' + journalLinks[i] + '" target="_blank">Browse the Journal Online</a> in <a href="' + DatabaseLinks[i] + '" class="SS_DatabaseHyperLink">' + DatabaseNames[i] + '</a><a class="holding-details"><img src="http://gvsu.edu/icon/help.png" alt="" /></a><div class="tooltip"><p style="font-size: 1em;"><i>Dates covered:</i><br />' + dateRange[i] + '</p></div></li>';
		
	}
}

i = i + 1;
	
}

if(onlineAdditionalResults !== "") { // There are online results, close the list
	onlineAdditionalResults = onlineAdditionalResults + '</ul>';
}

if(printAdditionalResults !== "") { // There are online results, close the list
	printAdditionalResults = printAdditionalResults + '</ul>';
}

var moreResultsdiv = '<div class="event-head">' + showResultsLabel + '</div><div class="event-body">' + onlineAdditionalResults + printAdditionalResults + '</div>';

Resultdiv = topResultdiv + moreResultsdiv;
	
} else {
	
var Resultdiv = topResultdiv;

}

// No results. Serials Solutions page isn't very clear about this problem. Let's make it more clear.



if(results === "") { // Item is not available online or in print
	
	var Resultdiv = '<div id="ContentNotAvailableTable"><p class="lib-big-text">We&#8217;re sorry, but this item is not available online.</p><p>Think this is an error? Let our eResources team know at <a href="mailto:erms@gvsu.edu">erms@gvsu.edu</a>.</p></div>';
	

}

// Idiot div

var idiotDiv = jQuery(".SS_HoldingText a").attr("href");

if(typeof(idiotDiv) !== 'undefined') { // There is a choice between two different citations

var whichCitationLink = "";
var whichCitationJournal = "";
var whichCitationIssn = "";
var idiotResults = "";

jQuery(".SS_HoldingText").each(function(n) {
	
	var newwhichCitationLink = jQuery(this).find("a").attr("href");
	whichCitationLink = whichCitationLink + newwhichCitationLink + "|||";
	
	var newwhichCitationJournal = jQuery(this).find(".SS_JournalTitle").text();
	whichCitationJournal = whichCitationJournal + newwhichCitationJournal + "|||";
	
	var newwhichCitationIssn = jQuery(this).find(".SS_IssnText").text();
	whichCitationIssn = whichCitationIssn + newwhichCitationIssn + "|||";
		
	idiotResults = n;
			
});

// Create variables to work with

idiotResults = idiotResults + 1;

var citationLink = whichCitationLink.split("|||");
var citationJournal = whichCitationJournal.split("|||");
var citationIssn = whichCitationIssn.split("|||");

topResultdiv = '<h4>This item is available in the following publications:</h4><ul id="top-result">';


t = 0;
while(t < idiotResults) {
	
	// Build the list of results 
	
topResultdiv = topResultdiv + '<li><a href="' + citationLink[t] + '">' + citationJournal[t] + ' ' + citationIssn[t] + '</a></li>';

t = t + 1;
	
}

var Resultdiv = topResultdiv + '</ul>';

	
}


// Do the magic if this is a link resolver display page:
// Rewrite Serials Solutions terrible page with a nice semantic, clean div full of easy-to-follow markup
// Sadly, can't use replaceWith since IE 7 will delete the contents instead of replacing.
// So we need to add a div wrapper around the Serials Solutions content to add this HTML into

var query = document.location.search;
var pairvalues = query.split("&");

if(pairvalues[0] !== "?SS_Page=refiner") { // Don't rewrite the page if this is the citation form

//check and see if there are print holdings.  if not, show a "search the catlog" link

if (hasPrint != true && (format === "Journal" || format === "JournalFormat")) {nextstepsLink = '<li class="appeasement"><a href="http://library.catalog.gvsu.edu/search/s' + journalTitleEncode + '">Search the Library Catalog for this journal</a></li>' + nextstepsLink;};

jQuery("#360link-reset").html('<div id="page-content" style="margin: 0; padding-left: 6em; width:85%;"><h2 style="text-align:left;">You are looking for:</h2><div id="citation">' + citationDiv + '&nbsp;<a href="' + refinerlink + '"><img src="http://gvsu.edu/icon/pencil.png" alt="Edit this Citation" /></a><a id="refworks" href="' + refworksLink + '">Export to Refworks</a></div>' + Resultdiv + '<div id="next-step"><ul>' + nextstepsLink + '</ul></div></div><div class="clear"></div><!-- Begin Custom GVSU Footer code --></div>');

}

// Let's show a tooltip highlighting Document Delivery when the user has tried a few sources.
// First, let's add the code for the tooltip:

jQuery("#next-step ul").append('<li class="doc-del-tooltip">Having trouble? You can order a copy from Document Delivery, and they\'ll get it for you. It\'s free!<br /><a href="' + illiadLink + '" class="lib-db-access-button" style="font-size: 1.2em !important;">Order a Copy</a></li>');
jQuery(".doc-del-tooltip").hide();

// Now let's count clicks



jQuery("#360link-reset ul li a").click(function() {
	
	clicks = clicks + 1;
	link = encodeURIComponent(window.location);
	DBname = encodeURIComponent(jQuery(this).siblings("a.SS_DatabaseHyperLink").text());
	ts = Math.round((new Date()).getTime() / 1000);	
	datastring = datastring + ts + "," + DBname + "," + link + "\n";
	if(clicks > 1) {
		jQuery(".doc-del-tooltip").show();
		//lets also grab the openURL we are passing to the browser and pass it off
		//to a PHP script that will write it elsewhere, so it can be checked
		
		datastring = "data=" + datastring;
		jQuery.ajax({
		dataType: "string",
		type: "POST",
		url: "url_write.php",
		data: datastring
		});
		datastring = "";
		
		
	}
	
});

});

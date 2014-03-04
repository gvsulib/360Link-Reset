
// Simplify the noConflict call since 360Link loads Prototype
window.$j = $j.noConflict();

$j(document).ready(function() {

	// ************************************************************************************
	// Define your institution's local variables here
	// ************************************************************************************
	
	// Put the base URL for your catalog here, set for a title search. (Syntax set for Sierra -
	// Include the ? )
	var opacUrl = 'http://library.catalog.gvsu.edu/search/t?';
	
	// If you have a consortial catalog in addition to your local OPAC, enter the base URL
	// here set for a title search (syntax is set for Sierra - include ?)
	var consortialUrl = 'http://elibrary.mel.org/search/t?'
	
	// If you have a consortial catalog, enter the name you want to refer to it as here
	var consortialName = 'other Michigan libraries';
	
	// Put the base URL Illiad installation here. An OpenURL will be added for all ILL calls.
	// Include the ?
	var illBaseUrl = 'https://gvsu.illiad.oclc.org/illiad/illiad.dll/OpenURL?';
	
	// The troubleshooting email you'd like broken link reports to go to
	var ermsEmail = 'erms@gvsu.edu';
	
	// The short name of your library or school you want to use in dialogs
	var libraryName = 'GVSU';
	
	
	
	// ************************************************************************************
	// DON'T EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING!
	// ************************************************************************************

	// ACTIVATE MAGIC FAIRY DUST

	// Remove existing styles
	$j("head").find("link").remove(); 
	
	// Define common variables
	var problemUrl=encodeURIComponent(document.URL),authorFirst=$j(".given-name").text().trim(),authorLast=$j(".family-name").text().trim(),results="",articleLinksdata=new Array(),journalLinksdata=new Array(),BookLinksdata=new Array(),dateRangedata=new Array(),DatabaseNamedata=new Array(),DatabaseLinkdata=new Array(),clicks=0,refinerlink=$j("#RefinerLink0").find("a").attr("href"),hasPrint=false,newHref,i=0,illLabel='Order a copy from Interlibrary Loan',searchLabel='See if '+libraryName+' owns this ';

	// Set variables from citation
	if (format === "Journal" || format === "JournalFormat") { // Journals
		var title = $j("#CitationJournalTitleValue").text().trim(),article = $j("#CitationJournalArticleValue").text().trim(),vol = $j("#CitationJournalVolumeValue").text().trim(),issue = $j("#CitationJournalIssueValue").text().trim(),date = $j("#CitationJournalDateValue").text().trim(),pages = $j("#CitationJournalPageValue").text().trim(),standardno = $j("#CitationJournalIssnValue").text().trim(),L="an electronic copy",A="1 &#8211; 3 days",O="article",titleEncode = encodeURI(journalName),resultsTable=$j("#JournalLinkTable"),illLabel='Order a copy from Document Delivery';
	}
	if (format === "BookFormat" || format === "Book") { // Books
		var title = $j("#CitationBookTitleValue").text().trim(),date = $j("#CitationBookDateValue").text().trim(),standardno = $j("td#CitationBookISBNValue").text().trim(),L="this book",A="1 &#8211; 2 weeks",O="book",titleEncode = encodeURI(bookTitle),resultsTable=$j("#BookLinkTable");
	}
	if (format === "Dissertation" || format === "DissertationFormat") { // Dissertations
		var title = $j("#CitationDissertationTitleValue").text().trim(),date = $j("#CitationDissertationDateValue").text().trim(),L="this dissertation",A="1 &#8211; 2 weeks",O="dissertation",titleEncode = encodeURI(dissTitle),resultsTable=$j("#BookLinkTable"); // Encode the white space in the URL
	}
	if (format === "Patent" || format === "PatentFormat") { // Patents
		var title = $j("#CitationPatentTitleValue").text().trim(),date = $j("#CitationPatentInventorDateValue").text().trim(),authorName = $j("td#CitationPatentInventorValue").text().trim(),L="this patent",A="1 &#8211; 2 weeks",O="patent",titleEncode = encodeURI(patentTitle),resultsTable=$j("#BookLinkTable");	
	}
	if (format === "UnknownFormat" || format === "Unknown") { // Unknown Format
		var title = $j("#CitationUnknownPublicationValue").text().trim(),date = $j("#CitationUnknownDateValue").text().trim(),standardno=$j("#CitationBookISBNValue").text().trim(),L="this item",A="1 &#8211; 2 weeks",O="item",titleEncode = encodeURI(bookTitle),date='',resultsTable=$j("#BookLinkTable"); 		
	}
	
	// Build list element for searching catalog or Google Patents
	var listOpac = document.createElement('li');
	if(format === "Patent" || format === "PatentFormat") {
		opacUrl = 'http://www.google.com/?tbm=pts#tbm=pts&q=';
		searchLabel = 'Search Google Patents for this patent';
	}
	listOpac.innerHTML = '<a href="'+opacUrl+titleEncode+'">'+searchLabel+'</a>';
	
	if(format !== 'Journal' || format !== 'JournalFormat') {
		// Build consortial link for this item
		var listConsortium = document.createELement('li');
		listConsortium.innerHTML = '<a href="'+consortialUrl+titleEncode'">Search '+consortialName+' for this '+O+'</a>';
	}
	
	// Build OpenURL for document delivery
	var OpenUrl = 'sid=info%3Asid=&genre='+O+'&aulast='+authorLast+'&aufirst='+authorFirst+'&title='+title+'&date='+date;
	if(format === "Journal" || format === "JournalFormat") {
		OpenUrl += '&issn='+standardno+'&atitle='+article+'&volume='+vol+'&part=&issue='+issue;
	} else {
		OpenUrl += '&isbn='+standardno+''
	}
	OpenUrl += '&spage=1&epage=';
	var listIll = document.createElement('li');
	listIll.innerHTML = 'Not available online? <a href="'+illBaseUrl+OpenUrl'">'+illLabel+'</a>';
	
	// Build the troubleshooting link
	var listProblem = document.createElement('li');
	listProblem.innerHTML = 'Found a problem? <a href="'+ermsEmail+'?subject=Bad%20Full%20Text%20Link&body=%0A%0AProblem%20URL:%20'+problemUrl+'">Let our crack team of link fixers know</a>!';
	
	// Build the next steps list
	var nextStepsList = document.createElement('div');
	var nextStepsUl = document.createElement('ul');
	nextStepsList.id = 'next-steps';
	nextStepsUl.appendChild(listOpac);
	if(listConsortium typeof !== 'undefined') {
		nextStepsUl.appendChild(listConsortium);
	}
	nextStepsUl.appendChild(listIll);
	nextStepsUl.appendChild(listProblem);
	nextStepsList.appendChild(nextStepsUl);
	
	// Get data on all items in results list
	$j(resultsTable).find("tr").each(function(index) { // Grab values from the results table
		if(index !== 0) { 
			if(format === "Journal" || format === "JournalFormat") {
				// Get the article link, if available
				articleLinksdata[i] = $j(this).find("#ArticleCL").find("a").attr("href");
				journalLinksdata[i] = $j(this).find("#JournalCL").find("a").attr("href");
			} else { // Not a journal article
				// Get the book link, if applicable
				BookLinkdata[i] = $j(this).find("#BookCL").find("a").attr("href");
			}	
			// Get the date range
			dateRangedata[i] = $j(this).find("#DateCL").text();
			// Get the database name
			DatabaseNamedata[i] = $j(this).find("#DatabaseCL").text();
			// Get the database link
			DatabaseLinkdata[i] = $j(this).find("#DatabaseCL").find("a").attr("href");
			i++;
		} 
		results = index; // Get total number of results
	});

	// Develop link for top result
	if((articleLinksdata[0] typeof === 'undefined') || (BookLinkdata[0] typeof === 'undefined')) { // Journal level link only
		buttonText = 'Browse the Journal';
		buttonLink = journalLinksdata[0];
	} else {
		buttonText = 'Full Text Online';
		if(articleLinksdata[0] typeof === 'undefined') { // Book
			buttonLink = BookLinkdata[0];
		} else {
			buttonLink = articleLinksdata[0];
		}
	}
	
	if(i > 0) { // There are additional links
		if(i === 1) { // Only 1 additional result
			var showResultsLabel = "Show 1 More Result"; 
		} else { // More than one result
			var showResultsLabel = "Show " + i + " More Results";
		}
		
		
		
		
	}
		
		
		var topResultdiv = '<ul id="top-result"><li><a href="' + journalLinksdata[0] + '" class="article-button" target="_blank">Browse the Journal</a> in <a href="' + DatabaseLinksdata[0] + '" class="SS_DatabaseHyperLink">' + DatabaseNames[0].trim() + '</a></li></ul>';
	}



	// Ok, let's get rid of that table and replace it with a semantic div for our citation

	var citationDiv = '<span id="CitationJournalAuthorValue">' + authorName + '</span>&nbsp; <span id="CitationJournalDateValue">(' + journalDate + ')</span>.&nbsp; <span id="CitationJournalArticleValue">' + articleName + '.</span>&nbsp; <span id="CitationJournalTitleValue">' + journalName + '.</span>&nbsp;' + journalVol +  journalIssue + journalPages;	



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
	
	
	if($j.trim(DatabaseNames[i]) === "Print at GVSU Libraries") { // Item is in print
		var hasPrint = true;
		if(printAdditionalResults === "") { // First print article listed, add the header

			printAdditionalResults = printAdditionalResults + "<h4>Print</h4><ul>";
			

		}
		
		printAdditionalResults = printAdditionalResults + '<li><a href="' + journalLinks[i] + '" target="_blank">Available in Print</a> at the <abbr title="Grand Valley State University">GVSU</abbr> University Libraries</li>';
		
	} else { // Item is online
		
		if(onlineAdditionalResults === "") { // First online article listed, add the header

			onlineAdditionalResults = onlineAdditionalResults + "<h4>Online</h4><ul>";

		}
		
		if((journalLinks[i] === "NA") && (BookLinks[i] !== "NA")) {
		onlineAdditionalResults = onlineAdditionalResults + '<li><a href="' + BookLinks[i] + '" target="_blank">Browse the Journal Online</a> in <a href="' + DatabaseLinks[i] + '" class="SS_DatabaseHyperLink">' + DatabaseNames[i] + '</a><a class="holding-details"><img src="http://gvsu.edu/icon/help.png" alt="" /></a><div class="tooltip"><p style="font-size: 1em;"><i>Dates covered:</i><br />' + dateRange[i] + '</p></div></li>';

		} else {
					onlineAdditionalResults = onlineAdditionalResults + '<li><a href="' + journalLinks[i] + '" target="_blank">Browse the Journal Online</a> in <a href="' + DatabaseLinks[i] + '" class="SS_DatabaseHyperLink">' + DatabaseNames[i] + '</a><a class="holding-details"><img src="http://gvsu.edu/icon/help.png" alt="" /></a><div class="tooltip"><p style="font-size: 1em;"><i>Dates covered:</i><br />' + dateRange[i] + '</p></div></li>';

		}
		
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

if(format === "Journal" || format === "JournalFormat") { 

		var Resultdiv = '<div id="ContentNotAvailableTable"><p class="lib-big-text">We&#8217;re sorry, but this item is not available online. <small style="font-size: .7em !important; font-weight: normal !important;"><i><a href="mailto:erms@gvsu.edu?subject=Bad%20Full%20Text%20Link&body=%0A%0AProblem%20URL:%20'+v+'">Think this is wrong?</a></i></small></p></div> <div class="line"> <div class="span2 unit left"> <h4>Need This Item?</h4> <p style="font-size:1.2em;">We&#8217;ll get you '+L+" in "+A+'.</p> <p><a href="'+ illiadLink +'" class="lib-button-grey">Order a Copy</a></p> </div> <div class="span2 unit left lastUnit"> <h4>Need Research Help?</h4> <p style="font-size:1.2em;">Meet with a peer consultant to find similar ' + O + '.</p> <p><a href="http://gvsu.edu/library/prc" class="lib-button-grey">Make an Appointment</a></p> </div> </div>';

} else {
	
	var Resultdiv = '<div id="ContentNotAvailableTable"><p class="lib-big-text">This item may be available online <a href="http://library.catalog.gvsu.edu/search/t' + bookTitleLink + '">through our catalog</a>.</p><p><a href="http://library.catalog.gvsu.edu/search/t' + bookTitleLink + '" class="lib-button">Search the catalog</a></p></div> <div class="line"> <div class="span2 unit left"> <h4>Not available in the catalog?</h4> <p style="font-size:1.2em;">We&#8217;ll get you '+L+" in "+A+'.</p> <p><a href="'+ illiadLink +'" class="lib-button-grey">Order a Copy</a></p> </div> <div class="span2 unit left lastUnit"> <h4>Need Research Help?</h4> <p style="font-size:1.2em;">Meet with a peer consultant to find similar ' + O + '.</p> <p><a href="http://gvsu.edu/library/prc" class="lib-button-grey">Make an Appointment</a></p> </div></div>';
}	

}



// Idiot div

var idiotDiv = $j(".SS_HoldingText a").attr("href");

if(typeof(idiotDiv) !== 'undefined') { // There is a choice between two different citations

var whichCitationLink = "";
var whichCitationJournal = "";
var whichCitationIssn = "";
var idiotResults = "";

$j(".SS_HoldingText").each(function(n) {
	
	var newwhichCitationLink = $j(this).find("a").attr("href");
	whichCitationLink = whichCitationLink + newwhichCitationLink + "|||";
	
	var newwhichCitationJournal = $j(this).find(".SS_JournalTitle").text();
	whichCitationJournal = whichCitationJournal + newwhichCitationJournal + "|||";
	
	var newwhichCitationIssn = $j(this).find(".SS_IssnText").text();
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

$j(".360link-reset").html('<h2 style="text-align:left;">You are looking for:</h2><div id="citation">' + citationDiv + '&nbsp;<a href="' + refinerlink + '"><img src="http://gvsu.edu/icon/pencil.png" alt="Edit this Citation" /></a><a id="refworks" href="' + refworksLink + '">Export to Refworks</a></div>' + Resultdiv + '<div id="next-step"><ul>' + nextstepsLink + '</ul></div></div><div class="clear"></div><!-- Begin Custom GVSU Footer code -->');

$j("#360link-reset").html('<div id="page-content" style="margin: 0; width: 85%;"><h2 style="text-align:left;">You are looking for:</h2><div id="citation">' + citationDiv + '&nbsp;<a href="' + refinerlink + '"><img src="http://gvsu.edu/icon/pencil.png" alt="Edit this Citation" /></a><a id="refworks" href="' + refworksLink + '">Export to Refworks</a></div>' + Resultdiv + '<div id="next-step"><ul>' + nextstepsLink + '</ul></div></div><div class="clear"></div><!-- Begin Custom GVSU Footer code --></div>');

}

// Let's show a tooltip highlighting Document Delivery when the user has tried a few sources.
// First, let's add the code for the tooltip:

$j("#next-step ul").append('<li class="doc-del-tooltip">Having trouble? You can order a copy from Document Delivery, and they\'ll get it for you. It\'s free!<br /><a href="' + illiadLink + '" class="lib-button-grey" style="font-size: 1.2em !important; margin-top: 1.5em;margin-bottom:.5em;;">Order a Copy</a> <span style="display:inline-block;float:right;cursor:pointer;text-decoration:underline;margin-top: 3em;" id="cancel-doc-del">No Thanks</span><p style="clear:both;"><i><a href="mailto:erms@gvsu.edu?subject=Bad%20Full%20Text%20Link&body=%0A%0AProblem%20URL:%20'+v+'" style="color: #fff !important; font-size:.8em;">Found an error? Let us know!</a></i></li>');
$j(".doc-del-tooltip").hide();
$j("head").append('<style>.doc-del-tooltip{padding:2em; position:absolute;top:25%;right:0;background-color:#0065A4;-webkit-box-shadow: -4px 6px 14px rgba(50, 50, 50, 0.51);-moz-box-shadow:    -4px 6px 14px rgba(50, 50, 50, 0.51);box-shadow:-4px 6px 14px rgba(50, 50, 50, 0.51);color: #fff;z-index:1002;overflow:auto;width:21em;height:10em;margin-left:-12.5em;margin-top:-3em;};</style>');

// Now let's count clicks

$j("#cancel-doc-del").click(function() {
			$j(".doc-del-tooltip").hide();
			clicks = 0;
		});

$j(".360link-reset ul li a").click(function() {
	
	clicks = clicks + 1;
	console.log(clicks);
	//link = encodeURIComponent(window.location);
	//DBname = encodeURIComponent($j(this).siblings("a.SS_DatabaseHyperLink").text());
	//ts = Math.round((new Date()).getTime() / 1000);	
	//datastring = datastring + ts + "," + DBname + "," + link + "\n";
	if(clicks > 1) {
		//$j(".360link-reset").css("position", "relative");
		$j(".doc-del-tooltip").show();

		
		//lets also grab the openURL we are passing to the browser and pass it off
		//to a PHP script that will write it elsewhere, so it can be checked
		/*
		datastring = "data=" + datastring;
		$j.ajax({
		dataType: "string",
		type: "POST",
		url: "url_write.php",
		data: datastring
	});
		datastring = ""; */		
	}	
});

});

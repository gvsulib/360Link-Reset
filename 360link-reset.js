/*
* 	360Link Reset > 360link-reset.js
* 	Script for radically improving the Serials Solutions 360Link Link Resolver
*
*	For more information, see http://github.com/gvsulib/360Link-Reset
*
*	Author: Matthew Reidsma, reidsmam@gvsu.edu, @mreidsma
*	Version 3.1
*/



// Simplify the noConflict call since 360Link loads Prototype
window.$j = jQuery.noConflict();

$j(document).ready(function() { // Wait until the original page loads

	// ************************************************************************************
	// Define your institution's local variables here
	// ************************************************************************************

	// Put the base URL for your catalog here, set for a title search. (Syntax set for Sierra -
	// Include the ? )
	var opacUrl = 'https://library.catalog.gvsu.edu/search/t?';

	// What do you call the catalog?
	var opacName = 'Library Catalog';

	// If you have a consortial catalog in addition to your local OPAC, enter the base URL
	// here set for a title search (syntax is set for Sierra - include ?)
	var consortialUrl = 'http://elibrary.mel.org/search/t?'

	// If you have a consortial catalog, enter the name you want to refer to it as here
	var consortialName = 'other Michigan libraries';

	// Put the base URL Illiad installation here. An OpenURL will be added for all ILL calls.
	// Include the ?
	var illBaseUrl = 'https://gvsu.illiad.oclc.org/illiad/illiad.dll/OpenURL?';

	// What do you call your ILL/Document Delivery department?
	var illName = 'Document Delivery';

	// The troubleshooting email you'd like broken link reports to go to
	var ermsEmail = 'erms@gvsu.edu';

	// The short name of your library or school you want to use in dialogs
	var libraryName = 'GVSU';

	// Change this to read whatever 360Link says when your print holdings show up
	var printLabel = 'Print Journal at GVSU Libraries';

	// Do you want to show a tooltip pointing folks to Document Delivery or ILL if they click
	// on more than 1 full text link? (Usually means broken links)
	// true = yes, false = no
	var docDelTooltip = true;

	// Temporary patch to make Illiad requests work - this is custom to the GVSU install
	var illiadLink = $j("table.CandyWrapper:last a.AnchorButton:contains('Document Delivery')").attr("href");

	var titleEncode = encodeURIComponent($j('.CitationArticleOrSectionTitle').text());

	// ************************************************************************************
	// DON'T EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING!
	// ************************************************************************************


	// Define common variables
	var problemUrl=encodeURIComponent(document.URL),authorFirst=$j(".given-name").text().trim(),authorLast=$j(".family-name").text().trim(),results="",articleLinkdata=new Array(),journalLinkdata=new Array(),BookLinkdata=new Array(),dateRangedata=new Array(),DatabaseNamedata=new Array(),DatabaseLinkdata=new Array(),clicks=0,refinerlink=$j("#RefinerLink0").find("a").attr("href"),hasPrint=false,newHref,i=0,illLabel='Order a copy from ' +illName,searchLabel='Search the ' + opacName + ' for this ',query = document.location.search,authorName = authorLast + ', ' + authorFirst,formatType,itemType;;


	// Let's first record what type of item this is. Useful for knowing how many books folks are seeing here.

		// First, let's standardize the format types
		if(format.indexOf('Format') > 0) {
			formatType = format.split('Format');
			itemType = formatType[0];
		} else {
			itemType = format;
		}
		console.log('This is a ' + itemType);

	// ACTIVATE MAGIC FAIRY DUST

	// Remove existing styles
	$j("head").find("link").remove();

	// Function to grab items from the URL

	function getQueryVariable(v) {
	    var sidquery = window.location.search.substring(1);
	    var vars = query.split('&');
	    for (var i = 0; i < vars.length; i++) {
	        var pair = vars[i].split('=');
	        if (decodeURIComponent(pair[0]) == v) {
	            return decodeURIComponent(pair[1]);
	        }
	    }
	    console.log('Query variable %s not found', v);
	}

	
	var newPage = document.createElement('div');
	newPage.id = 'link-reset-wrapper';

	var newPageHeader = document.createElement('h2');
	newPageHeader.style.textAlign = 'left';
	newPageHeader.innerHTML = 'You are looking for:';
	newPage.appendChild(newPageHeader);

	// Where is the built-in APA citation format?
	var citationDiv = document.body.querySelector('div.Citation');
	
	// Build list element for searching catalog or Google Patents
	var listOpac = document.createElement('li'),var itemType=O;
	listOpac.id = 'next-step-opac';
	if(format === "Journal" || format === "JournalFormat") {
		itemType = 'journal';
	}
	if(format === "Patent" || format === "PatentFormat") {
		opacUrl = 'http://www.google.com/?tbm=pts#tbm=pts&q=';
		searchLabel = 'Search Google Patents for this ';
	}
	listOpac.innerHTML = '<a href="'+opacUrl+titleEncode+'">'+searchLabel+itemType+'</a>';

	if(format !== 'Journal' && format !== 'JournalFormat') {
		// Build consortial link for this item
		var listConsortium = document.createElement('li');
		listConsortium.innerHTML = '<a href="'+consortialUrl+titleEncode+'">Search '+consortialName+' for this '+O+'</a>';
	}

	var listIll = document.createElement('li');
	listIll.innerHTML = 'Not available online? <a href="'+illiadLink+'">'+illLabel+'</a>';

	// Build the troubleshooting link
	var listProblem = document.createElement('li');
	listProblem.innerHTML = 'Found a problem? <a href="mailto:'+ermsEmail+'?subject=Bad%20Full%20Text%20Link&body=%0A%0AProblem%20URL:%20'+problemUrl+'">Let our crack team of link fixers know</a>!';

	// Build the next steps list
	var nextStepsList = document.createElement('div');
	var nextStepsUl = document.createElement('ul');
	nextStepsList.id = 'next-step';
	nextStepsUl.appendChild(listOpac);
	if(typeof listConsortium !== 'undefined') {
		nextStepsUl.appendChild(listConsortium);
	}
	// Get data on all items in results list
	$j(resultsTable).find("tr").each(function(index) { // Grab values from the results table
		if(index !== 0) {
			if(format === "Journal" || format === "JournalFormat") {
				// Get the article link, if available
				articleLinkdata[i] = $j(this).find("#ArticleCL").find("a").attr("href");
				journalLinkdata[i] = $j(this).find("#JournalCL").find("a").attr("href");
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

	if(results > 0) { // There are results

		if(DatabaseNamedata[0] === printLabel) {
			hasPrint = true;
		}

		// Develop link for top result
		if((typeof articleLinkdata[0] === 'undefined') && (typeof BookLinkdata[0] === 'undefined')) { // Journal level link only
			buttonText = 'Browse the Journal';
			buttonLink = journalLinkdata[0];
		} else {
			buttonText = 'Full Text';
			if(typeof articleLinkdata[0] === 'undefined') { // Book
				buttonLink = BookLinkdata[0];
			} else {
				buttonLink = articleLinkdata[0];
				buttonText += ' Online';
			}
		}

		// Create the results DOM object
		var resultsDiv = document.createElement('div');
		resultsDiv.id = 'search-results';

		var topResult = document.createElement('li'),topResultdiv = document.createElement('ul'),topResultMore = document.createElement('div'),topResultTrigger=document.createElement('span');
		topResultdiv.id = 'top-result';
		topResult.innerHTML = '<a href="' + buttonLink + '" class="btn btn-primary btn-lg lib-button" target="_blank">' + buttonText + '</a> in <a href="' + DatabaseLinkdata[0] + '" class="SS_DatabaseHyperLink">' + DatabaseNamedata[0].trim() + '</a>';
		if(format === "Journal" || format === "JournalFormat") {
			topResultTrigger.className = 'holding-details';
			topResultTrigger.innerHTML = 'Details';
			topResult.appendChild(topResultTrigger);
			topResultMore.className = 'tooltip';
			topResultMore.innerHTML = '<i>Dates covered: </i>' + dateRangedata[0] + ' <a href="' + journalLinkdata[0] + '" class="journal-button">Browse Journal</a>';
			topResult.appendChild(topResultMore);
		}
		topResultdiv.appendChild(topResult);
		resultsDiv.appendChild(topResultdiv);


		if(i > 1) { // There are additional links
			var extraResults = i-1;
			if(extraResults === 1) { // Only 1 additional result
				var showResultsLabel = "Show 1 More Result";
			} else { // More than one result
				var showResultsLabel = "Show " + extraResults + " More Results";
			}

			var additionalResultsTrigger = document.createElement('div');
			additionalResultsTrigger.className = 'event-head';
			additionalResultsTrigger.innerHTML = showResultsLabel;

			// Create variables for additional results
			var additionalResultsdiv = document.createElement('div'), onlineResultsdiv = document.createElement('ul'), printResultsdiv = document.createElement('ul'), newResult, newResultLink, newResultLabel, newResultHoldings, printHeading, onlineHeading;

			for(var x = 1; x < results; x++) {
				console.log(DatabaseNamedata[x].trim());
				if(DatabaseNamedata[x].trim() === printLabel) { // Item is in print
					printHeading = document.createElement('h4');
					printHeading.innerHTML = 'Print';
					hasPrint = true; // Toggle this setting to true
					newResult = document.createElement('li');
					newResult.innerHTML = '<a href="'+journalLinkdata[x]+'" target="blank">Available in Print</a> at ' + libraryName;
					printResultsdiv.appendChild(newResult);
				} else { // Item is online
					onlineHeading = document.createElement('h4');
					onlineHeading.innerHTML = 'Online';
					newResult = document.createElement('li');
					if(typeof articleLinkdata[x] === 'undefined') {
						newResultLink = journalLinkdata[x];
						newResultLabel = 'Browse the Journal';
					} else {
						newResultLink = articleLinkdata[x];
						newResultLabel = 'Full Text Online';
					}
					newResult.innerHTML = '<a href="' + newResultLink + '" target="_blank">' + newResultLabel + '</a> in <a href="' + DatabaseLinkdata[x] + '" class="SS_DatabaseHyperLink">' + DatabaseNamedata[x] + '</a> <span class="holding-details">Details</span>';
					newResultHoldings = document.createElement('div');
					newResultHoldings.className = 'tooltip';
					newResultHoldings.innerHTML = '<i>Dates covered: </i>' + dateRangedata[x] + ' <a href="' + journalLinkdata[x] + '" class="journal-button">Browse Journal</a>';
					newResult.appendChild(newResultHoldings);
					onlineResultsdiv.appendChild(newResult);
				} // End item online loop
			} // End for loop

			var additionalResultsDiv = document.createElement('div');
			additionalResultsDiv.className = 'event-body';

				if(typeof onlineHeading !== 'undefined') {
					additionalResultsDiv.appendChild(onlineHeading);
					additionalResultsDiv.appendChild(onlineResultsdiv);
				}
				if(typeof printHeading !== 'undefined') {
					additionalResultsDiv.appendChild(printHeading);
					additionalResultsDiv.appendChild(printResultsdiv);
				}

			resultsDiv.appendChild(additionalResultsTrigger);
			resultsDiv.appendChild(additionalResultsDiv);

		} // End additional results loop

	} else { // No results

		// Create the results DOM object
		var resultsDiv = document.createElement('div'),noResultsLabel = 'We&#8217re sorry, but this item is not available online. <small style="font-size: .7em !important; font-weight: normal !important;"><i><a href="mailto:' + ermsEmail + '?subject=Bad%20Full%20Text%20Link&body=%0A%0AProblem%20URL:%20'+problemUrl+'">Think this is wrong?</a></i></small>',noResultsButton = '',noResultsButtonLabel = '',noResultsIll = document.createElement('div'),noResultsprc = document.createElement('div');
		resultsDiv.id = 'ContentNotAvailableTable';

		if(format !== "Journal" && format !== "JournalFormat") { // Requested item is not an article
			noResultsLabel = 'This item may be available online <a href="' + opacUrl + titleEncode + '">through our ' + opacName + '</a>';
			noResultsButtonLabel = '<a href="' + opacUrl + titleEncode + '" class="btn btn-primary btn-lg lib-button">Search the ' + opacName + '</a>';
			noResultsButton = document.createElement('p');
			noResultsButton.innerHTML = noResultsButtonLabel;
		}
		// Build no results message
		noResultsMessage = document.createElement('p');
		noResultsMessage.className = 'lib-big-text';
		noResultsMessage.innerHTML = noResultsLabel;
		resultsDiv.appendChild(noResultsMessage);
		if(format !== "Journal" && format !== "JournalFormat") {
			resultsDiv.appendChild(noResultsButton);
		}
		// Make a container to hold the help options
		var noResultsHelp = document.createElement('div');
		noResultsHelp.className = 'line';

			// Build help options - first ILL/Document Delivery
			noResultsIll.className = "span2 unit left";
				var noResultsIllHeader = document.createElement('h4');
				noResultsIllHeader.innerHTML = 'Need This Item?';
			noResultsIll.appendChild(noResultsIllHeader);
				var noResultsIllText = document.createElement('p');
				noResultsIllText.style.fontSize = '1em';
				noResultsIllText.innerHTML = 'We&#8217;ll get you '+L+" in "+A+'.'; // Uses terms from citation grabber
			noResultsIll.appendChild(noResultsIllText);
				var noResultsIllButton = document.createElement('p');
				noResultsIllButton.innerHTML = '<a href="'+illiadLink+'" class="btn btn-default btn-lg lib-button-grey">Order a Copy</a>';
			noResultsIll.appendChild(noResultsIllButton);

			// Build help options - second Research Consultants
			noResultsprc.className = "span2 unit left lastUnit";
				var noResultsprcHeader = document.createElement('h4');
				noResultsprcHeader.innerHTML = 'Need Research Help?';
			noResultsprc.appendChild(noResultsprcHeader);
				var noResultsprcText = document.createElement('p');
				noResultsprcText.style.fontSize = '1em';
				noResultsprcText.innerHTML = 'Meet with a research consultant to find similar ' + O + 's.'; // Uses term from citation grabber
			noResultsprc.appendChild(noResultsprcText);
				var noResultsprcButton = document.createElement('p');
				noResultsprcButton.innerHTML = '<a href="http://gvsu.edu/library/prc" class="btn btn-default btn-lg lib-button-grey">Make an Appointment</a>';
			noResultsprc.appendChild(noResultsprcButton);

		noResultsHelp.appendChild(noResultsIll);
		noResultsHelp.appendChild(noResultsprc);

		resultsDiv.appendChild(noResultsHelp);

	} // End no results

	// Serials Solutions does a strange thing when 2 citations conflict. They ask the user to choose between them.
	// This clunky fix tries to make it easier for the user to understand why they are being asked to choose
	// between two seemingly identical things.

	var idiotDiv = $j(".SS_HoldingText a").attr("href"); // This silly solution has appeared

	if(typeof(idiotDiv) !== 'undefined') { // There is a choice between two different citations

		// Set the variables needed
		var whichCitationLink = new Array(),whichCitationJournal = new Array(), whichCitationIssn = new Array(),idiotResults,t=0,newResultItem;

		// Cycle through the data on the page and populate the arrays
		$j(".SS_HoldingText").each(function(n) {
			whichCitationLink[t] = $j(this).find("a").attr("href");
			whichCitationJournal[t] = $j(this).find(".SS_JournalTitle").text();
	 		whichCitationIssn[t] = $j(this).find(".SS_IssnText").text();
			t++;
		});
		idiotResults = t + 1;

		var resultsDiv = document.createElement('div');
			resultDiv.id = 'citation-choice';
		var choiceHeading = document.createElement('h4');
			choiceHeading.innerHTML = 'This item is available in the following publications:';
		var choiceList = document.createElement('ul');
			choiceList.id = 'top-result';

		for(var j=0; j < idiotResults; j++) {
			newResultItem = document.createElement('li');
			newResultItem.innerHTML = '<a href="' + whichCitationLink[j] + '">' + whichCitationJournal[j] + ' ' + whichCitationIssn[j] + '</a>';
			choiceList.appendChild(newResultItem);
		}

		resultsDiv.appendChild(choiceHeading);
		resultsDiv.appendChild(choiceList);

	} // End of Silly Choice Function

	// Do the magic if this is a link resolver display page:
	// Rewrite Serials Solutions terrible page with a nice semantic, clean div full of easy-to-follow markup
	// So we need to add a div wrapper around the Serials Solutions content to add this HTML into

	var pairvalues = query.split("&");
	if(pairvalues[0] !== "?SS_Page=refiner") { // This is the citation form. Don't rewrite the page.

		// Build the next steps list
		nextStepsUl.appendChild(listIll);
		nextStepsUl.appendChild(listProblem);
		if(docDelTooltip === true) { // Show Doc Delivery Tooltip
			// Let's show a tooltip highlighting Document Delivery when the user has tried a few sources.
			var tooltip = document.createElement('li');
			tooltip.id = 'doc-del-tooltip';
			tooltip.innerHTML = 'Having trouble? You can order a copy from ' + illName +', and they&#8217;ll get it for you. It&#8217;s free!<br /><a href="'+illiadLink+'" class="btn btn-default btn-lg lib-button-grey">Order a Copy</a> <span id="cancel-doc-del">No Thanks</span><p style="clear:both;"><i><a href="mailto:'+ermsEmail+'?subject=Bad%20Full%20Text%20Link&body=%0A%0AProblem%20URL:%20'+problemUrl+'" class="doc-del-problem">Found an error? Let us know!</a></i>';
			nextStepsUl.appendChild(tooltip);
		}
		nextStepsList.appendChild(nextStepsUl);

		newPage.appendChild(citationDiv);
		newPage.appendChild(resultsDiv);
		newPage.appendChild(nextStepsList);

		// Add a clear div to reset all floats at the bottom before the footer starts
		newPageClear = document.createElement('div');
		newPageClear.style.clear = 'both';
		newPage.appendChild(newPageClear);

		// Find the
		var container = document.getElementById('CitationResults');
		container.parentNode.replaceChild(newPage, container);

		//check and see if there are print holdings for journal. If so, hide the search the catalog link
		if (hasPrint === true && (format === "Journal" || format === "JournalFormat")) {
			document.getElementById('next-step-opac').style.display = 'none';
		}

		if($j('.holding-details').length > 0) {
			// There are results, so holding information should be hidden until asked for
			$j('.tooltip').hide();

			// Show or hide tooltip if holding details is clicked on
			$j('span.holding-details').click(function() {
				$j(this).next('.tooltip').toggle();
				var currentLabel = $j(this).text();
				if(currentLabel === "Details") {
					$j(this).text('Hide Details');
				} else {
					$j(this).text('Details');
				}
			});

		}

		// Hide additional results until toggled
		$j(".event-body").hide();
		$j(".event-head").click(function() {
			jQuery(".event-body").slideToggle(400);
			var current_text = jQuery(".event-head").text();
			if(current_text === "Hide Additional Results") {
				jQuery(".event-head").text('Show More Results');
			    } else {
			    jQuery(".event-head").text('Hide Additional Results');
			    }
		});

		if(docDelTooltip === true) {
			// Hide the tooltip for now
			var docDelObject = document.getElementById('doc-del-tooltip');
			docDelObject.style.display = 'none';

			// User has hidden the document delivery tooltip
			$j("#cancel-doc-del").click(function() {
				docDelObject.style.display = 'none';
				clicks = 0;
			});
			console.log(clicks);

			// Let's count clicks to see when to show the document delivery tooltip
			$j("#search-results").find("li").find("a").click(function() {
				clicks++;
				$j(".event-body").show();
				$j(".event-head").text('Hide Additional Results');
				console.log(clicks);
				if(clicks > 1) {
					docDelObject.style.display = 'block';
				}
			});
		} // End doc del tooltip behavior code

	} // End page rewrite




});

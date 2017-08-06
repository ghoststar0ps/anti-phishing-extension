// when the extension is first installed
chrome.runtime.onInstalled.addListener(function(details) {
    console.log("just installed")
});

// listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(id, info, tab){

    if (info.status !== "complete"){
        return;
    }

    var url = tab.url.toLowerCase()

    // use browser to parse hostname
    var tmp = document.createElement("a");
    tmp.href = url;
    hostname = tmp.hostname

    console.log("checking browsing history for " + hostname)

    chrome.history.search({text: hostname}, function(history){

        history_summary = {
            total_visits: 0,
            earliest_visit: 9e15,
        }

        for (var i=0; i<history.length; i++){
            var h = history[i]

            history_summary.total_visits += h.visitCount
            if (h.lastVisitTime < history_summary.earliest_visit){
                history_summary.earliest_visit = h.lastVisitTime
            }
        }

        console.log(history_summary)
    })

});
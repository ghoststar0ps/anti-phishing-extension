// when the extension is first installed
chrome.runtime.onInstalled.addListener(function(details) {
    console.log("just installed")
});

function get_hostname(url){
    // use the browser to parse a URL string into just the hostname
    var tmp = document.createElement("a");
    tmp.href = url;
    return tmp.hostname
}

function get_domain_rank(domain){
    console.log("checking top sites list for " + domain)

    var rank = window.top_sites.indexOf(domain)
    if (rank !== -1){
        rank = rank + 1
        console.log("top site #"+(rank))
        return rank
    } else {
        console.log("not a top site")
        return null
    }
}

function get_history_summary(hostname, rank, cb){
    console.log("checking browsing history for " + hostname)

    chrome.history.search({text: hostname}, function(history){

        history_summary = {
            total_visits: 0,
            earliest_visit: 9e15,
        }

        for (var i=0; i<history.length; i++){
            var h = history[i]

            if (get_hostname(h.url) != hostname){
                continue;  // skip history items from other domains
            }

            history_summary.total_visits += h.visitCount
            if (h.lastVisitTime < history_summary.earliest_visit){
                history_summary.earliest_visit = h.lastVisitTime
            }
        }

        console.log(history_summary)
        cb(history_summary, rank)
    })
}

function calc_badge_ui(rank, history_summary){
    if ((typeof rank == "number" && rank < 1000) || history_summary.total_visits > 12){
        return {text:"safe", color: "green"};
    } else if ((typeof rank == "number" && rank < 10000) || history_summary.total_visits > 5){
        return {text:"wary", color: "orange"};
    } else {
        return {text:"risky", color: "red"};
    }
}


// listen for any changes to the URL of any tab
chrome.tabs.onUpdated.addListener(function(id, info, tab){

    if (info.status !== "complete"){
        return;
    }

    // url information for this page
    var url = tab.url.toLowerCase()
    var hostname = get_hostname(url)
    var domain = psl.parse(hostname).domain

    // get stats about this page
    rank = get_domain_rank(domain)
    get_history_summary(hostname, rank, function(history_summary){
        ui = calc_badge_ui(rank, history_summary)
        console.log(ui)

        chrome.browserAction.setBadgeText({
            text: ui["text"],
            tabId: tab.id
        })

        chrome.browserAction.setBadgeBackgroundColor({
            color: ui["color"],
            tabId: tab.id
        })
    })


});
google.load("feeds", "1");
function initialize() {
    var feed = new google.feeds.Feed("http://rssblog.ameba.jp/アメブロid/rss.html"); //←feedのURL
    // ↓削除するPR記事が一つ含まれるので1つ増やした数にする
    feed.setNumEntries(6);//10件表示
    feed.load(function(result) {
        if (!result.error) {
            var container = document.getElementById("blog-area" +
                "" +
                "");
            for (var i = 0; i < result.feed.entries.length; i++) {
                var entry = result.feed.entries[i];
                // 日付時分秒まで取得するなら以下を記述
                var pdate = new Date(entry.publishedDate);
                var strdate = (pdate.getMonth() + 1) + '月' + pdate.getDate() + '日&nbsp;' + pdate.getHours() + ':' + pdate.getMinutes() + ':' + pdate.getSeconds();

                // ここでPR記事全部表示させないif文
                if (entry.title.match(/.*PR:.*/mi) == null) {
                    var element = document.createElement('div');
                    element.setAttribute("class", "feed_content");

                    // 以下でタイトルのリンク、タイトル名、記事本文、日付を表示
                    element.innerHTML += '<p><a class="feed_text" href="' + entry.link + '" target="_blank">' + entry.title + '</a></p><p>' + entry.contentSnippet.substr(0,17) + '...</p><p>' + strdate + '</p>';
                }
                container.appendChild(element);
            }
        }
    });
}
google.setOnLoadCallback(initialize);
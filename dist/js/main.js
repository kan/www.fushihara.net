google.load('feeds', '1');

function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// const
var GITHUB_API_URL = '//api.github.com/users/kan/repos?sort=updated';
var REPOS_NUM = 5;

var Repos = React.createClass({displayName: "Repos",
    render: function() {
        return (
            React.createElement("li", null, React.createElement("a", {href: this.props.url}, this.props.name))
        );
    }
});

var ReposList = React.createClass({displayName: "ReposList",
    render: function() {
        return (
            React.createElement("ul", null, 
                this.props.data
            )
        );
    }
});

ready(function() {
    fetch(GITHUB_API_URL)
        .then(function(response) {
            return response.json()
        }).then(function(repos) {
            var r = _.chain(repos)
                .select(function(repos){ return !repos.fork })
                .map(function(repos){ return React.createElement(Repos, {key: repos.id, name: repos.name, url: repos.html_url}) })
                .first(REPOS_NUM)
                .value();

            React.render(
                React.createElement(ReposList, {data: r}),
                document.querySelectorAll('#github-list')[0]
            );
        }).catch(function(ex) {
            console.log('parsing error:', ex);
        });
});

function renderFeed(url, query) {
    return function() {
        var feed = new google.feeds.Feed(url);
        var elm = document.querySelectorAll(query)[0];
        feed.load(function(result){
            var f = _.chain(result.feed.entries)
                .map(function(entry){ return React.createElement(Repos, {key: entry.link, name: entry.title, url: entry.link}) })
                .value();

            React.render(
                React.createElement(ReposList, {data: f}),
                elm
            );
        });
    };
}

ready(renderFeed('http://memo.fushihara.net/rss', '#blog'));
ready(renderFeed('http://ramen.fushihara.net/rss', '#ramen'));

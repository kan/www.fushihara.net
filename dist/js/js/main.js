function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function() {
    fetch('https://api.github.com/users/kan/repos')
        .then(function(response) {
            return response.json()
        }).then(function(repos) {
            var elm = document.querySelectorAll('#github-list')[0];
            console.log(elm);
            var names = _.chain(repos)
                .select(function(repos){ return !repos.fork })
                .sortBy(function(repos){ return repos.watchers })
                .reverse()
                .first(5)
                .each(function(repos){ elm.innerHTML += '<li>' + repos.name + '</li>' })
        }).catch(function(ex) {
            console.log('parsing error:', ex);
        });
});

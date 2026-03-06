(function () {
    var COUNTS_KEY = 'pk_analytics_counts_v1';

    function readCounts() {
        try {
            var raw = localStorage.getItem(COUNTS_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (error) {
            console.warn('Analytics localStorage invalido:', error);
            return {};
        }
    }

    function writeCounts(counts) {
        localStorage.setItem(COUNTS_KEY, JSON.stringify(counts));
    }

    function track(eventName) {
        if (!eventName) return;

        var counts = readCounts();
        counts[eventName] = (counts[eventName] || 0) + 1;
        writeCounts(counts);
    }

    function bindClick(selector, eventName) {
        document.querySelectorAll(selector).forEach(function (element) {
            element.addEventListener('click', function () {
                track(eventName);
            });
        });
    }

    function init() {
        bindClick('.beta-badge', 'beta_click');
        bindClick('.beta-playstore-btn', 'playstore_click');
        bindClick('#spotifyMiniToggle', 'spotify_click');

        var reviewForm = document.getElementById('reviewForm');
        if (reviewForm) {
            reviewForm.addEventListener('submit', function () {
                track('reviews_submit');
            });
        }
    }

    window.pkTrack = track;
    window.pkAnalyticsReport = function () {
        var counts = readCounts();
        console.table(counts);
        return counts;
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

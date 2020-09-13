(function()
{
    var deviceType = TDV.PlayerAPI.mobile ? 'mobile' : 'general';
    var devicesUrl = {"general":"https://stg-cdn-virtualexpo.adiraku.co.id/sobat-2/script_general.js?v=1599859663965"};
    var url = deviceType in devicesUrl ? devicesUrl[deviceType] : devicesUrl['general'];
    if(typeof url == "object") {
        var orient = TDV.PlayerAPI.getOrientation();
        if(orient in url) {
            url = url[orient];
        }
    }
    var link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'script';
    var el = document.getElementsByTagName('script')[0];
    el.parentNode.insertBefore(link, el);
})();


var tour;

function loadTour()
{
    if(tour) return;

    var settings = new TDV.PlayerSettings();
    settings.set(TDV.PlayerSettings.CONTAINER, document.getElementById('sobatSecond-viewer'));
    settings.set(TDV.PlayerSettings.CURSORS_DIR_URL, 'https://stg-cdn-virtualexpo.adiraku.co.id/sobat-2/lib/cursors');
    settings.set(TDV.PlayerSettings.WEBVR_POLYFILL_URL, 'https://stg-cdn-virtualexpo.adiraku.co.id/sobat-2/lib/WebVRPolyfill.js?v=1599859663965');
    settings.set(TDV.PlayerSettings.HLS_URL, 'https://stg-cdn-virtualexpo.adiraku.co.id/sobat-2/lib/Hls.js?v=1599859663965');
    settings.set(TDV.PlayerSettings.QUERY_STRING_PARAMETERS, 'v=1599859663965');

    var devicesUrl = {"general":"https://stg-cdn-virtualexpo.adiraku.co.id/sobat-2/script_general.js?v=1599859663965"};

    tour = new TDV.Tour(settings, devicesUrl);
    tour.bind(TDV.Tour.EVENT_TOUR_INITIALIZED, onVirtualTourInit);
    tour.bind(TDV.Tour.EVENT_TOUR_LOADED, onVirtualTourLoaded);
    tour.bind(TDV.Tour.EVENT_TOUR_ENDED, onVirtualTourEnded);
    tour.load();
}

function pauseTour()
{
    if(!tour)
        return;

    tour.pause();
}

function resumeTour()
{
    if(!tour)
        return;

    tour.resume();
}

function onVirtualTourInit()
{
    var updateTexts = function() {
        document.title = this.trans("tour.name")
    };

    tour.locManager.bind(TDV.Tour.LocaleManager.EVENT_LOCALE_CHANGED, updateTexts.bind(tour.locManager));
    ;
}

function onVirtualTourLoaded()
{
    disposePreloader();
}

function onVirtualTourEnded()
{

}

function setMediaByIndex(index)
{
    if(!tour)
        return;

    tour.setMediaByIndex(index);
}

function setMediaByName(name)
{
    if(!tour)
        return;

    tour.setMediaByName(name);
}

function showPreloader()
{
    var preloadContainer = document.getElementById('preloadContainer');
    if(preloadContainer != undefined)
        preloadContainer.style.opacity = 1;
}

function disposePreloader()
{
    var preloadContainer = document.getElementById('preloadContainer');
    if(preloadContainer == undefined)
        return;

    var transitionEndName = transitionEndEventName();
    if(transitionEndName)
    {
        preloadContainer.addEventListener(transitionEndName, hide, false);
        preloadContainer.style.opacity = 0;
        setTimeout(hide, 500); //Force hide. Some cases the transitionend event isn't dispatched with an iFrame.
    }
    else
    {
        hide();
    }

    function hide()
    {
        //DisposePreloader
        preloadContainer.style.visibility = 'hidden';
        preloadContainer.style.display = 'none';
        var videoList = preloadContainer.getElementsByTagName("video");
        for(var i=0; i<videoList.length; ++i)
        {
            var video = videoList[i];
            video.pause();
            while (video.children.length)
                video.removeChild(video.children[0]);
        }
    }

    function transitionEndEventName () {
        var el = document.createElement('div');
        var transitions = {
                'transition':'transitionend',
                'OTransition':'otransitionend',
                'MozTransition':'transitionend',
                'WebkitTransition':'webkitTransitionEnd'
            };

        var t;
        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }

        return undefined;
    }
}

function onBodyClick(){
    document.body.removeEventListener("click", onBodyClick);
    document.body.removeEventListener("touchend", onBodyClick);
    loadTour();
}

function onLoad() {
    if (/AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent))
    {
        var inIFrame = false;
        try
        {
            inIFrame = (window.self !== window.top);
        }
        catch (e)
        {
            inIFrame = true;
        }
        if (!inIFrame)
        {
            var onResize = function(async)
            {
                [0, 250, 1000, 2000].forEach(function(delay)
                {
                    setTimeout(function()
                    {
                        var viewer = document.querySelector('#sobatSecond-viewer');
                        var scale = window.innerWidth / document.documentElement.clientWidth;
                        var width = document.documentElement.clientWidth;
                        var height = Math.round(window.innerHeight / scale);
                        viewer.style.width = width + 'px';
                        viewer.style.height = height + 'px';
                        viewer.style.left = Math.round((window.innerWidth - width) * 0.5) + 'px';
                        viewer.style.top = Math.round((window.innerHeight - height) * 0.5) + 'px';
                        viewer.style.transform = 'scale(' + scale + ', ' + scale + ')';
                        window.scrollTo(0,0);
                    }, delay);
                });
            };
            var onTouchEnd = function()
            {
                document.body.removeEventListener("touchend", onTouchEnd);
                onResize();
            }
            document.body.addEventListener("touchend", onTouchEnd);
            window.addEventListener('resize', onResize);
            onResize();
        }
    }

    var params = getParams(location.search.substr(1));
    if(params.hasOwnProperty("skip-loading"))
    {
        loadTour();
        return;
    }

    if (isOVRWeb()){
        showPreloader();
        loadTour();
        return;
    }

    showPreloader();
    loadTour();
}

function playVideo(video) {
    function isSafariDesktopV11orGreater() {
        return /^((?!chrome|android|crios|ipad|iphone).)*safari/i.test(navigator.userAgent) && parseFloat(/Version\/([0-9]+\.[0-9]+)/i.exec(navigator.userAgent)[1]) >= 11;
    }

    function hasAudio (video) {
        return video.mozHasAudio ||
               Boolean(video.webkitAudioDecodedByteCount) ||
               Boolean(video.audioTracks && video.audioTracks.length);
    }

    function detectUserAction() {
        var onVideoClick = function(e) {
            if(video.paused) {
                video.play();
            }
            video.muted = false;
            if(hasAudio(video))
            {
                e.stopPropagation();
                e.stopImmediatePropagation();
                e.preventDefault();
            }

            video.removeEventListener('click', onVideoClick);
            video.removeEventListener('touchend', onVideoClick);
        };
        video.addEventListener("click", onVideoClick);
        video.addEventListener("touchend", onVideoClick);
    }

    if (isSafariDesktopV11orGreater()) {
        video.muted = true;
        video.play();
    } else {
        var canPlay = true;
        var promise = video.play();
        if (promise) {
            promise.catch(function() {
                video.muted = true;
                video.play();
                detectUserAction();
            });
        } else {
            canPlay = false;
        }

        if (!canPlay || video.muted) {
            detectUserAction();
        }
    }
}

function isOVRWeb(){
    return window.location.hash.substring(1).split('&').indexOf('ovrweb') > -1;
}

function getParams(params) {
    var queryDict = {}; params.split("&").forEach(function(item) {var k = item.split("=")[0], v = decodeURIComponent(item.split("=")[1]);queryDict[k.toLowerCase()] = v});
    return queryDict;
}

window.initialVideoSobatSecond = onLoad;
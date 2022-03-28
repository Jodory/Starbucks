// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

function onYouTubeIframeAPIReady() {
    new YT.Player('player', {
        videoId: 'EJF919p_hb0', //최초 재상할 유튜브 영상 ID
        playerVars: {
            autoplay: true, //자동 재생 유무
            loop: true, //반복재생 유무
            playlist: 'EJF919p_hb0', //반복재생할 유튜브영상ID목록
        },
        events: {
            // onReady--> 위에것이 준비가 되면 이걸 실행한다
            onReady: function(event) {
                event.target.mute() //음소거
            }
        }

    });
}
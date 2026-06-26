let play = document.getElementById('play');
let progressBar = document.getElementById('progressbar');
let audio = new Audio('songs/1.mp3');
let currentsong = 1;
document.getElementById('1').src = 'images/pause.svg';

play.addEventListener('click', () => {
    if (audio.paused || audio.currentTime == 0) {
        audio.play();
        play.src = 'images/pause.svg';
        updateNowPlaying()
    }
    else {
        audio.pause();
        play.src = 'images/play_on.svg'
    }
})

progressBar.addEventListener('input', function () {
    let value = this.value
    this.style.background = `linear-gradient(to right, #21a600ff ${value}%, #333 ${value}%)`;
    audio.currentTime = value * audio.duration / 100;
})

audio.addEventListener('timeupdate', () => {
    let progress = audio.currentTime / audio.duration * 100;
    progressBar.value = progress;
    progressBar.style.background = `linear-gradient(to right, #21a600ff ${progress}%, #333 ${progress}%)`
})

let playMusic = Array.from(document.getElementsByClassName('playmusic'));

const stopAll = () => {
    playMusic.forEach((element) => {
        element.src = 'images/circle_play.svg';
    });
};

playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        stopAll()
        e.target.src = 'images/pause.svg'
        currentsong = parseInt(e.target.id);
        audio.src = `songs/${currentsong}.mp3`
        audio.currentTime = 0.0;
        audio.play();
        updateNowPlaying()
        play.src = 'images/pause.svg'
    })
})

const allsong = Array.from(document.getElementsByClassName('scard'))
const songs = [
    { songname: 'Aaya Na Tu', artist: 'Vishal & Shekhar', songimg: 'images/1.jpg', songpath: 'songs/1.mp3' },
    { songname: 'Dekhte Dekhte', artist: 'Atif Aslam, Shahid K Shraddha K, Nusrat Saab', songimg: 'images/2.jpg', songpath: 'songs/2.mp3' },
    { songname: 'Shree Hanuman Chalisa', artist: 'Hariharan, Lalit Sen, Chander', songimg: 'images/3.jpg', songpath: 'songs/3.mp3' },
    { songname: 'Jaiye Sajana', artist: 'Shashwat Sachdev, Jasmine Sandlas, Satinder Sartaaj', songimg: 'images/4.jpg', songpath: 'songs/4.mp3' },
    { songname: 'Aithey Aa', artist: 'Vishal & Shekhar ft. Akasa, Neeti, Kamaal', songimg: 'images/5.jpg', songpath: 'songs/5.mp3' },
    { songname: 'Dilbar Ki Aankhon Ka', artist: 'Sachin, Jigar', songimg: 'images/6.jpg', songpath: 'songs/6.mp3' },
    { songname: 'Zinda', artist: 'Julius Packiam & Ali Abbas Zafar ft. Vishal Dadlani', songimg: 'images/7.jpg', songpath: 'songs/7.mp3' },
    { songname: 'Finding Her', artist: 'Kushagra', songimg: 'images/8.jpg', songpath: 'songs/8.mp3' }
];

allsong.forEach((element, i) => {
    const img = element.querySelector('img');
    const title = element.querySelector('h2');
    const artist = element.querySelector('p');
    const data = songs[i];
    if (!data) return;
    if (img) img.src = data.songimg;
    if (title) title.innerText = data.songname;
    if (artist) artist.innerText = data.artist;
});

let nowsong=document.getElementsByClassName('songinfo')[0];

function updateNowPlaying() {
    nowsong.getElementsByTagName('img')[0].src = songs[currentsong-1].songimg;
    nowsong.getElementsByClassName('now-title')[0].innerText = songs[currentsong-1].songname;
    nowsong.getElementsByClassName('now-artists')[0].innerText = songs[currentsong-1].artist;
}

const playnext = () => {
    currentsong = (currentsong % playMusic.length) + 1;
    audio.src = `songs/${currentsong}.mp3`;
    audio.currentTime = 0.0;
    audio.play();
    updateNowPlaying()
};

const playprev = () => {
    const prev = currentsong - 1;
    currentsong = prev === 0 ? playMusic.length : prev;
    audio.src = `songs/${currentsong}.mp3`;
    audio.currentTime = 0.0;
    audio.play();
    updateNowPlaying()
}

backward = document.getElementById('prev');
forward = document.getElementById('next');


backward.addEventListener('click', () => {
    playprev();
});


audio.addEventListener('ended', () => {
    playnext();
});


forward.addEventListener('click', () => {
    playnext();
});

<template>
  <div ref="player" id="player" @mousedown.prevent>
    <h1
      :style="{ fontSize: computedStyle.fontSizeH1 }"
    >Are you not hungry? Ok, look at the movies from the oWwWlwood:</h1>

    <div id="movies-buttons">
      <span
        class="movie-button"
        v-for="key in 5"
        :key="key"
        @click="pickMovie(key)"
        :class="{ selectedMovie: key == currentMovie }"
      >{{ key }}</span>
    </div>

    <div ref="videos">
      <video v-show="currentMovie == 1" poster="../../public/poster.jpg">
        <source src="http://5.61.35.40:3000/movies/1.webm" type="video/webm" />
        <source src="http://5.61.35.40:3000/movies/1.mp4" type="video/mp4" />
      </video>

      <video v-show="currentMovie == 2" poster="../../public/poster.jpg">
        <source src="http://5.61.35.40:3000/movies/2.webm" type="video/webm" />
        <source src="http://5.61.35.40:3000/movies/2.mp4" type="video/mp4" />
      </video>

      <video v-show="currentMovie == 3" poster="../../public/poster.jpg">
        <source src="http://5.61.35.40:3000/movies/3.webm" type="video/webm" />
        <source src="http://5.61.35.40:3000/movies/3.mp4" type="video/mp4" />
      </video>

      <video v-show="currentMovie == 4" poster="../../public/poster.jpg">
        <source src="http://5.61.35.40:3000/movies/4.webm" type="video/webm" />
        <source src="http://5.61.35.40:3000/movies/4.mp4" type="video/mp4" />
      </video>

      <video v-show="currentMovie == 5" poster="../../public/poster.jpg">
        <source src="http://5.61.35.40:3000/movies/5.webm" type="video/webm" />
        <source src="http://5.61.35.40:3000/movies/5.mp4" type="video/mp4" />
      </video>
    </div>

    <div ref="controls" id="controls">
      <span @click="play" class="control-element material-icons" v-show="!isPlaying">play_arrow</span>
      <span @click="pause" class="control-element material-icons" v-show="isPlaying">pause</span>

      <div id="time-controller">
        <span class="time-counter">00:{{ currentTimes[currentMovie] | timeFilter }}</span>
        <span ref="timeLine" id="time-line" @mousedown="setCurrentTimeFromTimeLine">
          <span id="time-pointer" :style="{ width: timePointersWidth[currentMovie] }"></span>
        </span>
        <span class="time-counter">00:{{ durations[currentMovie] }}</span>
      </div>

      <span
        id="sound-controller"
        class="control-element material-icons"
        @mouseover="isSoundLine = true"
        @mouseout="isSoundLine = false"
      >
        {{ volumeIcon }}
        <transition name="sound-line-animation">
          <span id="sound-line-wrap" v-show="isSoundLine">
            <span ref="soundLine" id="sound-line" @mousedown="setVolumeFromSoundLine">
              <span id="sound-pointer" :style="{ height: volumeInPercentage }"></span>
            </span>
          </span>
        </transition>
      </span>

      <span class="control-element material-icons" @mousedown="changeScreenMode">fullscreen</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Player",
  props: ["computedStyle"],
  data() {
    return {
      currentMovie: 1,
      isPlaying: false,
      isSoundLine: false,
      volume: "0.3",
      // lists of all current properties for each video
      currentTimes: { 1: "00", 2: "00", 3: "00", 4: "00", 5: "00" },
      durations: { 1: "21", 2: "23", 3: "22", 4: "22", 5: "22" },
      timePointersWidth: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
  },
  computed: {
    currentMovieElement() {
      const videos = this.$refs.videos.children;
      return videos[this.currentMovie - 1];
    },
    volumeInPercentage() {
      return this.volume * 100 + "%";
    },
    volumeIcon() {
      if (this.volume == 0) return "volume_off";
      else if (this.volume == 1) return "volume_up";
      else return "volume_down";
    }
  },
  methods: {
    pickMovie(key) {
      // if the previous movie is still playing, we should stop it
      this.currentMovieElement.pause();
      this.currentMovie = key;
      this.currentMovieElement.volume = this.volume;
    },
    changeScreenMode() {
      this.currentMovieElement.requestFullscreen();
    },
    clickOnScreen() {
      if (this.isPlaying) this.currentMovieElement.pause();
      else this.currentMovieElement.play();
      // prevent default, cause Chrome invokes play/pause method in full screen
      return false;
    },
    play() {
      this.currentMovieElement.play();
    },
    pause() {
      this.currentMovieElement.pause();
    },
    setPlaying() {
      this.isPlaying = true;
    },
    setPausing() {
      this.isPlaying = false;
    },
    setCurrentTime() {
      // we store current time mark and time line width for every movie
      this.currentTimes[
        this.currentMovie
      ] = this.currentMovieElement.currentTime;
      this.timePointersWidth[this.currentMovie] =
        (this.currentMovieElement.currentTime /
          this.durations[this.currentMovie]) *
          100 +
        "%";
    },
    setVolumeAtStart() {
      this.currentMovieElement.volume = this.volume;
    },
    setVolume() {
      this.volume = this.currentMovieElement.volume;
    },
    setVolumeFromSoundLine(event) {
      // such a stupid moment...we should subtract toolbar height from pageY for correct working
      // also, we need to subtract 0.01 from the result cause the soundLine 1px over the control element
      let volumePointerPosition = (
        (this.$refs.controls.offsetTop - (event.pageY - 48)) /
          this.$refs.soundLine.offsetHeight -
        0.01
      ).toFixed(2);
      if (volumePointerPosition < 0.15) {
        volumePointerPosition = 0;
      }
      if (volumePointerPosition > 0.85) {
        volumePointerPosition = 1;
      }
      this.currentMovieElement.volume = volumePointerPosition;
    },
    // when clicking on the timeLine element
    setCurrentTimeFromTimeLine(event) {
      // the ratio of the time line to watched video segment
      const timePointerPosition = (
        (event.pageX - this.$refs.timeLine.offsetLeft) /
        this.$refs.timeLine.offsetWidth
      ).toFixed(2);
      this.currentMovieElement.currentTime = (
        this.durations[this.currentMovie] * timePointerPosition
      ).toFixed(2);
    },
    setControls() {
      this.currentMovieElement.controls = document.fullscreenElement;
      // to hover on the player after quitting full screen
      this.$refs.player.scrollIntoView(false);
    }
  },
  filters: {
    timeFilter(value) {
      return Math.floor(value) < 10
        ? "0" + Math.floor(value)
        : Math.floor(value);
    }
  },
  mounted() {
    for (let i = 0; i < 5; i++) {
      this.$refs.videos.children[i].onplay = this.setPlaying;
      this.$refs.videos.children[i].onpause = this.setPausing;
      this.$refs.videos.children[i].ontimeupdate = this.setCurrentTime;
      this.$refs.videos.children[i].onloadedmetadata = this.setVolumeAtStart;
      this.$refs.videos.children[i].onvolumechange = this.setVolume;
      this.$refs.videos.children[i].onclick = this.clickOnScreen;
      this.$refs.videos.children[i].onfullscreenchange = this.setControls;
    }
  }
};
</script>

<style scoped>
video {
  display: block;
  width: 100%;
  height: auto;
}
#player {
  padding: 10px;
  background: #555555;
}
#movies-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  margin-bottom: 20px;
}
#controls {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}
#time-controller {
  display: flex;
  align-items: center;
  width: 70%;
}
#time-line {
  height: 6px;
  flex: 1;
  margin: 0 10px;
  background: #cccccc;
  cursor: pointer;
}
#time-pointer {
  display: block;
  height: 100%;
  background: #009688;
}
#sound-controller {
  cursor: pointer;
  position: relative;
}
#sound-line-wrap {
  width: 100%;
  height: 250%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  bottom: 100%;
  left: -5%;
}
#sound-line {
  position: relative;
  width: 40%;
  height: 90%;
  background: #cccccc;
}
#sound-pointer {
  width: 100%;
  position: absolute;
  bottom: 0;
  background: #009688;
}
.movie-button {
  width: 1.5em;
  height: 1.5em;
  font-size: 2em;
  line-height: 1.5em;
  text-align: center;
  font-family: "Gloria Hallelujah", Roboto, Arial, sans-serif;
  border-radius: 50%;
  background: #cccccc;
  color: #555555;
  cursor: pointer;
}
.control-element {
  font-size: 3em;
  color: #cccccc;
  cursor: pointer;
}
.time-counter {
  font-size: 1.5em;
  color: #cccccc;
  font-weight: bold;
  cursor: default;
}
.selectedMovie {
  color: #cccccc;
  background: #009688;
}
.sound-line-animation-enter-active {
  animation: 0.5s sound-line-slide;
}
@keyframes sound-line-slide {
  from {
    height: 60%;
  }
  to {
    height: 250%;
  }
}
</style>

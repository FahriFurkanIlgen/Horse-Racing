<script setup>
import { ref, watch, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["horse", "start"]);

const horse = ref(props.horse);
const horseAnimate = ref(); // ref for the horse animation

// const raceAudio = new Audio(race)

const stopwatch = () => {
  const timer = setInterval(() => {
    if (horse.value.position < store.state.finishFlagDistance) {
      // if the horse is not at the finish line
      horse.value.stopwatch.milliseconds++;
      if (horse.value.stopwatch.milliseconds === 100) {
        horse.value.stopwatch.milliseconds = 0;
        horse.value.stopwatch.seconds++;
      }
      if (horse.value.stopwatch.seconds === 60) {
        horse.value.stopwatch.seconds = 0;
        horse.value.stopwatch.minutes++;
      }
      return;
    }
    clearInterval(timer);
  }, 10);
};

const move = () => {
  horseAnimate.value.style.left =
    (horse.value.position / store.state.finishFlagDistance) * 100 - 1 + "%";
  horse.value.position += horse.value.speed;
  const timer = setTimeout(() => {
    if (horse.value.position < store.state.finishFlagDistance) {
      move();
      return;
    }
    clearTimeout(timer);
    horse.value.position = store.state.finishFlagDistance;
    horseAnimate.value.style.left =
      (horse.value.position / store.state.finishFlagDistance) * 100 - 1 + "%";
    store.dispatch("setRaceStart", false);
    store.dispatch("setSortHorse", horse.value);
    if (
      store.state.sortHorses.length === store.getters.currentRoundHorses.length
    ) {
      const results = store.state.sortHorses
        .slice()
        .sort((a, b) => a.position - b.position);
      store.dispatch("finishRound", results);
    }
  }, 100);
};

watch(
  () => store.getters.getisRaceStarted,
  (newVal) => {
    if (newVal) {
      move();
      stopwatch();
    }
  }
);

onMounted(() => {
  if (store.getters.getisRaceStarted) {
    move();
    stopwatch();
  }
  if (horseAnimate.value) {
    horseAnimate.value.style.left = "0%";
    horseAnimate.value.style.backgroundColor = props.horse.color;
  }
});
</script>

<template>
  <div class="horse">
    <div ref="horseAnimate" class="horse__content"></div>
  </div>
</template>

<style lang="scss" scoped>
.horse {
  &__content {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useHorseStore } from "../../stores/use-horseData";

const horseStore = useHorseStore();
const props = defineProps(["horse", "start"]);

const horse = ref(props.horse);

const horseAnimate = ref(); // ref for the horse animation

// const raceAudio = new Audio(race)

const stopwatch = () => {
  const timer = setInterval(() => {
    if (horse.value.position < horseStore.finishFlagDistance) {
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
    (horse.value.position / horseStore.finishFlagDistance) * 100 - 1 + "%";
  horse.value.position += horse.value.speed;
  const timer = setTimeout(() => {
    if (horse.value.position < horseStore.finishFlagDistance) {
      move();
      return;
    }
    clearTimeout(timer);
    horse.value.position = horseStore.finishFlagDistance;
    horseAnimate.value.style.left =
      (horse.value.position / horseStore.finishFlagDistance) * 100 - 1 + "%";
    horseStore.setRaceStart(false);
    horseStore.setSortHorse(horse.value);
    if (horseStore.sortHorses.length === horseStore.currentRoundHorses.length) {
      const results = horseStore.sortHorses
        .slice()
        .sort((a, b) => a.position - b.position);
      horseStore.finishRound(results);
    }
  }, 100);
};

watch(
  () => horseStore.getisRaceStarted,
  (newVal) => {
    if (newVal) {
      move();
      stopwatch();
    }
  }
);

onMounted(() => {
  if (horseStore.getisRaceStarted) {
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

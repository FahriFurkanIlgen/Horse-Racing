<script setup>
import { onMounted, ref, computed, watch } from "vue";
import RaceHorse from "./RaceHorse.vue";
import RaceFinishFlag from "./RaceFinishFlag.vue";
import { useHorseStore } from "../../stores/use-horseData";

const horseStore = useHorseStore();

const horseList = computed(() => horseStore.currentRoundHorses);
const { currentRound, nextRound, setLeaderBoard } = horseStore;

const currentRoundLength = computed(
  () => horseStore.raceSchedule[horseStore.currentRound - 1]?.length || 0
);

const allFinished = computed(() => horseList.value.every((h) => h.isFinished));

watch(allFinished, (newVal) => {
  if (newVal) {
    setLeaderBoard(true);
  }
});
</script>

<template>
  <div class="race" :style="{ width: `${(currentRoundLength / 2200) * 100}%` }">
    <div v-for="(horse, index) in horseList" :key="horse.id" class="race__path">
      {{ horse.stopwatch.minutes }} : {{ horse.stopwatch.seconds }} :
      {{ horse.stopwatch.milliseconds }}
      <div class="race__path--number">
        {{ index + 1 }}
      </div>

      <RaceHorse :horse="horse" />
      <!--component where horses are listed  -->
    </div>
    <RaceFinishFlag></RaceFinishFlag>
    <div class="race__length">{{ currentRoundLength }}m</div>
  </div>
</template>

<style lang="scss" scoped>
.race {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 0px 10px;
  text-align: center;
  color: white;
  background-color: #121212;
  border-radius: 15px;
  margin-left: 15px;

  &__path {
    position: relative;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    margin: 10px 0px;
    background-color: #212121;
    border-top: 2px solid gray;
    border-bottom: 2px solid gray;

    &--number {
      position: absolute;
      right: 30px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2px solid gray;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: white;
      z-index: 2;
    }
    &__length {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      color: white;
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
}

.active {
  border-top: 1px solid rgb(255, 129, 65);
  border-bottom: 1px solid rgb(255, 129, 65);
}

@media screen and (max-height: 800px) {
  .race {
    height: 85vh;
  }

  .path {
    height: 50px;
  }
}
</style>

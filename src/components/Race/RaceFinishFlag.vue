<script setup>
import { ref, watch } from "vue";
import { useHorseStore } from "../../stores/use-horseData";

const horseStore = useHorseStore();

const flag = ref();

watch(
  () => horseStore.getisRaceStarted,
  () => {
    if (horseStore.getisRaceStarted) {
    } else {
    }
  }
);
</script>

<template>
  <div ref="flag" class="finish"></div>
</template>

<style lang="scss" scoped>
.finish {
  width: 10px;
  height: 100%;
  position: absolute;
  right: 0%;
  top: 0;
  display: flex;
  place-items: center;
  background: gray;
  z-index: 99;
}
</style>

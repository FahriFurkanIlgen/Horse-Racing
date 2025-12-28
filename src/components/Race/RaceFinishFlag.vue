<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const flag = ref();

watch(
  () => store.getters.getisRaceStarted,
  () => {
    if (store.getters.getisRaceStarted) {
      // Race started
    } else {
      // Race stopped
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

<script setup>
import { watchEffect, onMounted } from "vue";
import { useHorseStore } from "../../stores/use-horseData";

const horseStore = useHorseStore();

watchEffect(() => {
  if (horseStore.getCountdownActive) {
    horseStore.setRaceStart(true);
    horseStore.setCountdownActive(false);
  }
});

onMounted(() => {
  if (horseStore.getCountdownActive) {
    horseStore.setRaceStart(true);
    horseStore.setCountdownActive(false);
  }
});
</script>

<template>
  <div v-if="horseStore.getCountdownActive" class="modal">
    <div class="modal__layer"></div>
    <div class="modal__content">
      <h1>Race Starting!</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;

  &__layer {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000;
    opacity: 0.5;
  }

  &__content {
    width: 300px;
    height: 300px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    z-index: 99;
    h1 {
      font-size: 100px;
      font-weight: 700;
      color: white;
    }
  }
}
</style>

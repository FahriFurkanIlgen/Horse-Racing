<script setup>
import { watchEffect, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

watchEffect(() => {
  if (store.getters.getCountdownActive) {
    store.dispatch("setRaceStart", true);
    store.dispatch("setCountdownActive", false);
  }
});

onMounted(() => {
  if (store.getters.getCountdownActive) {
    store.dispatch("setRaceStart", true);
    store.dispatch("setCountdownActive", false);
  }
});
</script>

<template>
  <div v-if="store.getters.getCountdownActive" class="modal">
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

<template>
  <div class="home">
    <h1>Horse Racing Simulator</h1>
    <div class="controls">
      <button
        @click="generateHorses"
        :disabled="horseStore.totalHorses.length > 0"
      >
        Generate Horses
      </button>
      <button
        @click="generateSchedule"
        :disabled="
          horseStore.totalHorses.length === 0 ||
          horseStore.raceSchedule.length > 0
        "
      >
        Generate Race Schedule
      </button>
      <button
        @click="startRace"
        :disabled="
          horseStore.raceSchedule.length === 0 || horseStore.isRaceActive
        "
      >
        Start Race
      </button>
    </div>
    <div class="horses" v-if="horseStore.totalHorses.length > 0">
      <h2>Total Horses ({{ horseStore.totalHorses.length }})</h2>
      <div class="horse-list">
        <div
          v-for="horse in horseStore.totalHorses"
          :key="horse.id"
          class="horse-item"
        >
          <font-awesome-icon
            :icon="['fas', 'horse']"
            :style="{ color: horse.color, fontSize: '30px' }"
          />
          <span>{{ horse.name }} - Condition: {{ horse.condition }}</span>
        </div>
      </div>
    </div>
    <div class="schedule" v-if="horseStore.raceSchedule.length > 0">
      <h2>Race Schedule</h2>
      <div
        v-for="round in horseStore.raceSchedule"
        :key="round.round"
        class="round"
      >
        <h3>Round {{ round.round }} - {{ round.length }}m</h3>
        <div class="round-horses">
          <div v-for="horse in round.horses" :key="horse.id" class="horse-item">
            <font-awesome-icon
              :icon="['fas', 'horse']"
              :style="{ color: horse.color, fontSize: '30px' }"
            />
            <span>{{ horse.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="results" v-if="horseStore.raceResults.length > 0">
      <h2>Race Results</h2>
      <div
        v-for="result in horseStore.raceResults"
        :key="result.round"
        class="result"
      >
        <h3>Round {{ result.round }}</h3>
        <div class="result-grid">
          <div
            v-for="horse in result.results"
            :key="horse.id"
            class="result-item"
          >
            <div class="horse-box" :style="{ backgroundColor: horse.color }">
              {{ horse.id }}
            </div>
            <span>{{ horse.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="horseStore.isRaceActive && horseStore.currentRound > 0">
      <router-link to="/play">Go to Race</router-link>
    </div>
  </div>
</template>

<script setup>
import { useHorseStore } from "../stores/use-horseData";
import { useRouter } from "vue-router";

const horseStore = useHorseStore();
const router = useRouter();

const generateHorses = () => {
  horseStore.generateHorses();
};

const generateSchedule = () => {
  horseStore.generateRaceSchedule();
};

const startRace = () => {
  horseStore.startRace();
  router.push("/play");
};
</script>

<style scoped>
.home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.controls {
  margin-bottom: 20px;
}

.controls button {
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;
}

.horses,
.schedule,
.results {
  margin-bottom: 30px;
}

.horse-list,
.round-horses {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.horse-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.round {
  margin-bottom: 20px;
}

.result {
  margin-bottom: 20px;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.result-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 5px;
}

.horse-box {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 5px;
}
</style>

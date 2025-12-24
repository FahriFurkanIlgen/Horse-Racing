<script setup>
import { useHorseStore } from "../../stores/use-horseData";

const horseStore = useHorseStore();
</script>

<template>
  <div class="score">
    <table>
      <tr>
        <th>Rank</th>
        <th>Horse</th>
        <th>Name</th>
        <th>Time</th>
      </tr>
      <tr v-for="(horse, index) in horseStore.sortHorses" :key="horse.id">
        <td>{{ index + 1 }}</td>
        <td>
          <div
            :style="{
              width: '50px',
              height: '50px',
              backgroundColor: horse.color,
              borderRadius: '50%',
            }"
          ></div>
        </td>
        <td>{{ horse.name }}</td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.score {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  table {
    width: 95%;
    border-collapse: collapse;
    background-color: #121212;
    border-radius: 20px;
    tr {
      width: 100%;
      height: 90%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid gray;
      td {
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      th {
        width: 80%;
        height: 100%;
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.active {
  color: rgb(255, 129, 65);
}
</style>

import { defineStore } from "pinia";

export const useHorseStore = defineStore("horse-store", {
  state: () => {
    return {
      totalHorses: [],
      raceSchedule: [],
      currentRound: 0,
      raceResults: [],
      isRaceActive: false,
      isGenerating: false,
      finishFlagDistance: null,
      isRaceStarted: false,
      isCountdownActive: false,
      isLeaderBoardActive: false,
      sortHorses: [],
    };
  },
  actions: {
    generateHorses() {
      const colors = [
        "red",
        "blue",
        "green",
        "yellow",
        "purple",
        "orange",
        "pink",
        "brown",
        "gray",
        "black",
        "blueviolet",
        "cyan",
        "magenta",
        "lime",
        "teal",
        "navy",
        "maroon",
        "olive",
        "silver",
        "gold",
      ];
      this.totalHorses = [];
      for (let i = 1; i <= 20; i++) {
        this.totalHorses.push({
          id: i,
          name: `Horse ${i}`,
          color: colors[i - 1],
          condition: Math.floor(Math.random() * 100) + 1,
          position: 0,
          speed: 0,
          isSelected: false,
          stopwatch: { minutes: 0, seconds: 0, milliseconds: 0 },
        });
      }
    },
    generateRaceSchedule() {
      this.isGenerating = true;
      this.raceSchedule = [];
      const roundLengths = [1200, 1400, 1600, 1800, 2000, 2200];
      for (let round = 1; round <= 6; round++) {
        const availableHorses = [...this.totalHorses];
        const selectedHorses = [];
        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(
            Math.random() * availableHorses.length
          );
          selectedHorses.push(availableHorses.splice(randomIndex, 1)[0]);
        }
        this.raceSchedule.push({
          round: round,
          length: roundLengths[round - 1],
          horses: selectedHorses,
          finished: false,
          results: [],
        });
      }
      this.isGenerating = false;
    },
    startRace() {
      this.isRaceActive = true;
      this.currentRound = 0;
      this.raceResults = [];
      this.nextRound();
    },
    nextRound() {
      if (this.currentRound < 6) {
        this.currentRound++;
        const round = this.raceSchedule[this.currentRound - 1];
        round.horses.forEach((horse) => {
          horse.position = 0;
          horse.speed = horse.condition / 2 + Math.random() * 10;
          horse.stopwatch = { minutes: 0, seconds: 0, milliseconds: 0 };
        });
        this.isRaceStarted = true;
        this.setFinishFlag(round.length);
        this.setCountdownActive(true);
        this.sortHorses = [];
      } else {
        this.isRaceActive = false;
      }
    },
    finishRound(results) {
      const round = this.raceSchedule[this.currentRound - 1];
      round.results = results;
      round.finished = true;
      this.raceResults.push({
        round: this.currentRound,
        results: results,
      });
      this.isRaceStarted = false;
      this.setLeaderBoard(true);
    },
    setSortHorse(horse) {
      if (!this.sortHorses.find((h) => h.id === horse.id)) {
        this.sortHorses.push(horse);
      }
    },
    setFinishFlag(finishFlag) {
      this.finishFlagDistance = finishFlag;
    },
    setCountdownActive(statu) {
      this.isCountdownActive = statu;
    },
    setLeaderBoard(statu) {
      this.isLeaderBoardActive = statu;
    },
    setRaceStart(statu) {
      this.isRaceStarted = statu;
    },
  },
  getters: {
    getCountdownActive() {
      return this.isCountdownActive;
    },
    getLeaderBoard() {
      return this.isLeaderBoardActive;
    },
    getisRaceStarted() {
      return this.isRaceStarted;
    },
    currentRoundHorses() {
      if (this.currentRound > 0 && this.currentRound <= 6) {
        return this.raceSchedule[this.currentRound - 1].horses;
      }
      return [];
    },
  },
});

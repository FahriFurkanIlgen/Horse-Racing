import { createStore } from "vuex";

export default createStore({
  state: {
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
  },
  mutations: {
    SET_TOTAL_HORSES(state, horses) {
      state.totalHorses = horses;
    },
    SET_RACE_SCHEDULE(state, schedule) {
      state.raceSchedule = schedule;
    },
    SET_IS_GENERATING(state, value) {
      state.isGenerating = value;
    },
    SET_IS_RACE_ACTIVE(state, value) {
      state.isRaceActive = value;
    },
    SET_CURRENT_ROUND(state, value) {
      state.currentRound = value;
    },
    SET_RACE_RESULTS(state, value) {
      state.raceResults = value;
    },
    SET_FINISH_FLAG_DISTANCE(state, value) {
      state.finishFlagDistance = value;
    },
    SET_IS_RACE_STARTED(state, value) {
      state.isRaceStarted = value;
    },
    SET_IS_COUNTDOWN_ACTIVE(state, value) {
      state.isCountdownActive = value;
    },
    SET_IS_LEADERBOARD_ACTIVE(state, value) {
      state.isLeaderBoardActive = value;
    },
    SET_SORT_HORSES(state, value) {
      state.sortHorses = value;
    },
    ADD_RACE_RESULT(state, result) {
      state.raceResults.push(result);
    },
    ADD_SORT_HORSE(state, horse) {
      if (!state.sortHorses.find((h) => h.id === horse.id)) {
        state.sortHorses.push(horse);
      }
    },
    UPDATE_ROUND_RESULTS(state, { roundIndex, results }) {
      state.raceSchedule[roundIndex].results = results;
      state.raceSchedule[roundIndex].finished = true;
    },
  },
  actions: {
    generateHorses({ commit }) {
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
      const horses = [];
      for (let i = 1; i <= 20; i++) {
        horses.push({
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
      commit("SET_TOTAL_HORSES", horses);
    },
    generateRaceSchedule({ state, commit }) {
      commit("SET_IS_GENERATING", true);
      const schedule = [];
      const roundLengths = [1200, 1400, 1600, 1800, 2000, 2200];
      for (let round = 1; round <= 6; round++) {
        const availableHorses = [...state.totalHorses];
        const selectedHorses = [];
        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(
            Math.random() * availableHorses.length
          );
          selectedHorses.push(availableHorses.splice(randomIndex, 1)[0]);
        }
        schedule.push({
          round: round,
          length: roundLengths[round - 1],
          horses: selectedHorses,
          finished: false,
          results: [],
        });
      }
      commit("SET_RACE_SCHEDULE", schedule);
      commit("SET_IS_GENERATING", false);
    },
    startRace({ commit, dispatch }) {
      commit("SET_IS_RACE_ACTIVE", true);
      commit("SET_CURRENT_ROUND", 0);
      commit("SET_RACE_RESULTS", []);
      dispatch("nextRound");
    },
    nextRound({ state, commit, dispatch }) {
      if (state.currentRound < 6) {
        const nextRound = state.currentRound + 1;
        commit("SET_CURRENT_ROUND", nextRound);
        const round = state.raceSchedule[nextRound - 1];
        round.horses.forEach((horse) => {
          horse.position = 0;
          horse.speed = horse.condition / 2 + Math.random() * 10;
          horse.stopwatch = { minutes: 0, seconds: 0, milliseconds: 0 };
        });
        commit("SET_IS_RACE_STARTED", true);
        commit("SET_FINISH_FLAG_DISTANCE", round.length);
        commit("SET_IS_COUNTDOWN_ACTIVE", true);
        commit("SET_SORT_HORSES", []);
      } else {
        commit("SET_IS_RACE_ACTIVE", false);
      }
    },
    finishRound({ state, commit }, results) {
      const roundIndex = state.currentRound - 1;
      commit("UPDATE_ROUND_RESULTS", { roundIndex, results });
      commit("ADD_RACE_RESULT", { round: state.currentRound, results });
      commit("SET_IS_RACE_STARTED", false);
      commit("SET_IS_LEADERBOARD_ACTIVE", true);
    },
    setSortHorse({ commit }, horse) {
      commit("ADD_SORT_HORSE", horse);
    },
    setFinishFlag({ commit }, finishFlag) {
      commit("SET_FINISH_FLAG_DISTANCE", finishFlag);
    },
    setCountdownActive({ commit }, statu) {
      commit("SET_IS_COUNTDOWN_ACTIVE", statu);
    },
    setLeaderBoard({ commit }, statu) {
      commit("SET_IS_LEADERBOARD_ACTIVE", statu);
    },
    setRaceStart({ commit }, statu) {
      commit("SET_IS_RACE_STARTED", statu);
    },
  },
  getters: {
    getCountdownActive: (state) => state.isCountdownActive,
    getLeaderBoard: (state) => state.isLeaderBoardActive,
    getisRaceStarted: (state) => state.isRaceStarted,
    currentRoundHorses: (state) => {
      if (state.currentRound > 0 && state.currentRound <= 6) {
        return state.raceSchedule[state.currentRound - 1].horses;
      }
      return [];
    },
  },
});

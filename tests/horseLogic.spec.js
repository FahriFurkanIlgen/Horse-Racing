import { describe, it, expect } from "vitest";
import store from "../src/stores/horseStore";

describe("Horse Generation Logic", () => {
  it("generates 20 unique horses with correct properties", () => {
    store.dispatch("generateHorses");
    const horses = store.state.totalHorses;
    expect(horses.length).toBe(20);
    const ids = horses.map((h) => h.id);
    expect(new Set(ids).size).toBe(20);
    horses.forEach((horse) => {
      expect(horse).toHaveProperty("name");
      expect(horse).toHaveProperty("color");
      expect(horse).toHaveProperty("condition");
      expect(horse).toHaveProperty("position");
      expect(horse).toHaveProperty("speed");
      expect(horse).toHaveProperty("stopwatch");
    });
  });
});

describe("Race Logic Utility", () => {
  it("generates a race schedule with 6 rounds and 10 horses per round", () => {
    store.dispatch("generateHorses");
    store.dispatch("generateRaceSchedule");
    const schedule = store.state.raceSchedule;
    expect(schedule.length).toBe(6);
    schedule.forEach((round) => {
      expect(round.horses.length).toBe(10);
      expect(typeof round.length).toBe("number");
      expect(round.finished).toBe(false);
      expect(Array.isArray(round.results)).toBe(true);
    });
  });
});

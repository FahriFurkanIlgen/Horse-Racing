import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import RaceHorse from "../src/components/Race/RaceHorse.vue";
import { createStore } from "vuex";

describe("RaceHorse.vue", () => {
  it("renders horse with correct color", () => {
    const horse = {
      id: 1,
      name: "Horse 1",
      color: "red",
      position: 0,
      speed: 0,
      isSelected: false,
      stopwatch: { minutes: 0, seconds: 0, milliseconds: 0 },
    };
    const mockStore = createStore({
      state: {
        finishFlagDistance: 100,
        sortHorses: [],
      },
      getters: {
        getisRaceStarted: () => false,
        currentRoundHorses: () => [horse],
      },
      dispatch: () => {},
    });
    const wrapper = mount(RaceHorse, {
      props: { horse },
      global: {
        plugins: [mockStore],
      },
    });
    const horseDiv = wrapper.find(".horse__content");
    expect(horseDiv.exists()).toBe(true);
  });
});

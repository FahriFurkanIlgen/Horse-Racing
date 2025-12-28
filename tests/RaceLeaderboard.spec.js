import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import RaceLeaderboard from "../src/components/Race/RaceLeaderboard.vue";
import { createStore } from "vuex";

const mockStore = createStore({
  state: {
    sortHorses: [
      { id: 1, name: "Horse 1", color: "red" },
      { id: 2, name: "Horse 2", color: "blue" },
    ],
  },
});

describe("RaceLeaderboard.vue", () => {
  it("renders leaderboard with horses", () => {
    const wrapper = mount(RaceLeaderboard, {
      global: {
        plugins: [mockStore],
      },
    });
    expect(wrapper.findAll("tr").length).toBe(3); // 1 header + 2 horses
    expect(wrapper.text()).toContain("Horse 1");
    expect(wrapper.text()).toContain("Horse 2");
  });
});

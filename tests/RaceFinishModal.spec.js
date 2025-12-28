import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import RaceFinishModal from "../src/components/Race/RaceFinishModal.vue";
import { createStore } from "vuex";

const mockStore = createStore({
  state: {
    currentRound: 6,
  },
  getters: {
    getLeaderBoard: () => true,
  },
  dispatch: () => {},
});

describe("RaceFinishModal.vue", () => {
  it("renders leaderboard modal when getLeaderBoard is true", () => {
    const wrapper = mount(RaceFinishModal, {
      global: {
        plugins: [mockStore],
        stubs: ["LeaderBoard", "ButtonComp"],
      },
    });
    expect(wrapper.find(".modal").exists()).toBe(true);
    expect(wrapper.text()).toContain("LeaderBoard");
  });
});

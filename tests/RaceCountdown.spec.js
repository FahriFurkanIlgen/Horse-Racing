import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import RaceCountdown from "../src/components/Race/RaceCountdown.vue";
import { createStore } from "vuex";

describe("RaceCountdown.vue", () => {
  it("renders countdown modal when getCountdownActive is true", () => {
    const mockStore = createStore({
      getters: {
        getCountdownActive: () => true,
      },
      dispatch: () => {},
    });
    const wrapper = mount(RaceCountdown, {
      global: {
        plugins: [mockStore],
      },
    });
    expect(wrapper.find(".modal").exists()).toBe(true);
    expect(wrapper.text()).toContain("Race Starting!");
  });
});

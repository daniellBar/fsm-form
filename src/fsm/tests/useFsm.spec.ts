import { act, renderHook } from "@testing-library/react";
import { useFSM } from "../useFsm";
import { testDefinition } from "./tests.consts";

describe("useFSM hook", () => {
  it("should have initial state equals First", async () => {
    const { result } = renderHook(() => useFSM(testDefinition));
    expect(result.current.currentState).toBe("First");

    await act(async () => {
      await result.current.transition("Event1");
    });

    expect(result.current.currentState).toBe("Second");
  });

  it("should transition to Second state on Event1", async () => {
    const { result } = renderHook(() => useFSM(testDefinition));
    expect(result.current.currentState).toBe("First");
    await act(async () => {
      await result.current.transition("Event1");
    });
    expect(result.current.currentState).toBe("Second");
    expect(result.current.errors).toHaveLength(0);
  });

  it("should transition to Final state on Event1 and Event2", async () => {
    const { result } = renderHook(() => useFSM(testDefinition));
    expect(result.current.currentState).toBe("First");
    await act(async () => {
      await result.current.transition("Event1");
    });
    await act(async () => {
      await result.current.transition("Event2");
    });
    expect(result.current.currentState).toBe("Final");
    expect(result.current.errors).toHaveLength(0);
  });

  it("should update state when setting current state", async () => {
    const { result } = renderHook(() => useFSM(testDefinition));
    expect(result.current.currentState).toBe("First");
    await act(async () => {
      result.current.setCurrentState("Final");
    });
    expect(result.current.currentState).toBe("Final");
    expect(result.current.errors).toHaveLength(0);
  });
});

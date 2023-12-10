// External imports
import { useState, useCallback, useMemo } from "react";

// Internal imports
import {
  RunSequenceResponse,
  StateMachineDefinition,
  TransitionMap,
} from "./types";

export const useFSM = <
  TState extends string,
  TEvent extends string,
  TAction extends (...args: any[]) => any
>(
  definition: StateMachineDefinition<TEvent, TState, TAction>
) => {
  const [currentState, setCurrentState] = useState<TState>(
    definition.initialState
  );
  const [finalState, setFinalState] = useState<TState>(definition.finalState);
  const [errorState, setErrorState] = useState<TState>(definition.errorState);
  const [errors, setErrors] = useState<any[]>([]);

  const initializeStates = (
    states: Record<TState, Partial<TransitionMap<TEvent, TState, TAction>>>
  ): Record<TState, TransitionMap<TEvent, TState, TAction>> => {
    const initialTransitionFunctions = {} as Record<
      TState,
      TransitionMap<TEvent, TState, TAction>
    >;

    for (const state in states) {
      initialTransitionFunctions[state] = states[state] as TransitionMap<
        TEvent,
        TState,
        TAction
      >;
    }

    return initialTransitionFunctions;
  };

  const transitionFunctions = useMemo(
    () => initializeStates(definition.states),
    [definition.states]
  );

  /**
   * Transitions the fsm to a new state based on the provided event.
   *
   * @param {TEvent} event - The event triggering the state transition.
   * @param {any} [params] - Optional parameters passed to the transition action.
   *
   * @returns {Promise<void>}
   * @remarks
   * This function performs the state transition based on the provided event. If the transition
   * is successful, the current state is updated, and the action associated with the transition
   * is executed. If an error occurs during the transition, the state is set to the error state.
   *
   */
  const transition = useCallback(
    async (event: TEvent, params?: any): Promise<void> => {
      if (!currentState || !transitionFunctions[currentState]) {
        setCurrentState(errorState);
        setErrors([
          {
            from: "useFSM.transition",
            message: "Invalid initial state or states not defined",
          },
        ]);
        return;
      }

      if (!transitionFunctions[currentState]) {
        setCurrentState(errorState);
        setErrors([
          {
            from: "useFSM.transition",
            message: `No transitions defined for state '${currentState}'`,
          },
        ]);
        return;
      }

      const currentTransition = transitionFunctions[currentState][event];
      if (!currentTransition) {
        setCurrentState(errorState);
        setErrors([
          {
            from: "useFSM.transition",
            message: `Transition function not defined for event '${event}' in state '${currentState}'`,
          },
        ]);
        return;
      }

      const { action } = currentTransition;
      try {
        if (action) {
          await action(params);
        }
        setCurrentState(currentTransition.toState);

        if (currentState === finalState) {
          console.log("Final state reached.");
        }

        console.log(`Current State: ${currentState}`);
      } catch (err: any) {
        setCurrentState(errorState);
        setErrors([err]);
      }
    },
    [currentState, errorState, finalState, transitionFunctions]
  );

  /**
   * Runs a sequence of events, transitioning the fsm through each event.
   *
   * @param {TEvent[]} events - An array of events representing the sequence of transitions.
   *
   * @returns {Promise<RunSequenceResponse<TState>>} A promise that resolves to the result of the sequence run.
   *
   * @remarks
   * This function takes an array of events and iterates through each event, performing the associated
   * state transitions. If the sequence is executed successfully and the final state is reached, the result
   * indicates success. Otherwise, an error is recorded, and the final state reflects the state at which
   * the sequence terminated.
   */
  const runSequence = async (
    events: TEvent[]
  ): Promise<RunSequenceResponse<TState>> => {
    if (!events || events.length === 0) {
      setErrors([
        { from: "useFSM.runSequence", message: "Invalid event sequence" },
      ]);
      return {
        success: false,
        currentState,
        errors,
      };
    }

    for (const event of events) {
      await transition(event);
    }

    const success = currentState === finalState;
    if (!success) {
      setErrors([
        {
          from: "useFSM.runSequence",
          message: `Failed to reach the final state. Current state: ${currentState}`,
        },
      ]);
    }

    return {
      success: currentState === finalState,
      currentState,
      errors,
    };
  };

  const getCurrentState = (): TState => {
    return currentState;
  };

  const getErrors = (): any[] => {
    return errors;
  };

  return {
    setCurrentState,
    currentState,
    errors,
    transition,
    runSequence,
    getCurrentState,
    getErrors,
  };
};

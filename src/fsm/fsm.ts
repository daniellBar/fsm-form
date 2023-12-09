// Internal imports
import { RunSequenceResponse, StateMachineDefinition, TransitionMap } from "./types";


export class FSM<
  TState extends string,
  TEvent extends string,
  TAction extends (...args: any[]) => any
> {
  private currentState: TState;
  private finalState: TState;
  private errorState: TState;
  private errors: any[];
  transitionFunctions!: Record<TState, TransitionMap<TEvent, TState, TAction>>;

  constructor(definition: StateMachineDefinition<TEvent, TState, TAction>) {
    this.currentState = definition.initialState;
    this.finalState = definition.finalState;
    this.errorState = definition.errorState;
    this.errors = [];
    this.initializeStates(definition.states);
  }

  private initializeStates(
    states: Record<TState, Partial<TransitionMap<TEvent, TState, TAction>>>
  ) {
    this.transitionFunctions = {} as Record<TState, TransitionMap<TEvent, TState, TAction>>;

    for (const state in states) {
      this.transitionFunctions[state] = states[state] as TransitionMap<TEvent, TState, TAction>;
    }
  }

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
  async transition(event: TEvent, params?: any): Promise<void> {
    if (!this.currentState || !this.transitionFunctions[this.currentState]) {
      this.currentState = this.errorState;
      this.errors.push({
        from: 'FSM.transition',
        message: 'Invalid initial state or states not defined'
      });
      return;
    }

    // easier to read but causes typescript infer issues when trying to access currentTransitions[], so i wont use it
    // const currentTransitions = this.transitionFunctions[this.currentState];

    if (!this.transitionFunctions[this.currentState]) {
      this.currentState = this.errorState;
      this.errors.push({
        from: 'FSM.transition',
        message: `No transitions defined for state '${this.currentState}'`
      });
      return;
    }

    // accessing specific (current) transition by event
    const currentTransition = this.transitionFunctions[this.currentState][event];
    if (!currentTransition) {
      this.currentState = this.errorState;
      this.errors.push({
        from: 'FSM.transition',
        message: `Transition function not defined for event '${event}' in state '${this.currentState}'`
      });
      return;
    }

    const { action } = currentTransition;
    try {
      if (action) {
        await action(params);
      }
      // move to next state
      this.currentState = currentTransition.toState;

      if (this.currentState === this.finalState) {
        console.log('Final state reached.');
      }

      console.log(`Current State: ${this.currentState}`);
    } catch (err: any) {
      this.currentState = this.errorState;
      this.errors.push(err);
    }
  }

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
  async runSequence(events: TEvent[]): Promise<RunSequenceResponse<TState>> {
    if (!events || events.length === 0) {
      this.errors.push({ from: 'FSM.runSequence', message: 'Invalid event sequence' });
      return {
        success: false,
        currentState: this.currentState,
        errors: this.errors
      };
    }

    for (const event of events) {
      await this.transition(event);
    }

    const success = this.currentState === this.finalState;
    if (!success) {
      this.errors.push({
        from: 'FSM.runSequence',
        message: `Failed to reach the final state. Current state: ${this.currentState}`
      });
    }

    const result = {
      success: this.currentState === this.finalState,
      currentState: this.currentState,
      errors: this.errors
    };

    return result;
  }

  getCurrentState(): TState {
    return this.currentState;
  }

  getErrors(): any[] {
    return this.errors;
  }
}

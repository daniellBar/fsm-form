export type TransitionMap<
  TEvent extends string,
  TState extends string,
  TAction extends (...args: any[]) => any
> = {
  [K in TEvent]: { toState: TState; action?: TAction };
};

export type StateMachineDefinition<
  TEvent extends string,
  TState extends string,
  TAction extends (...args: any[]) => any
> = {
  initialState: TState;
  finalState: TState;
  errorState: TState;
  states: {
    [K in TState]: Partial<TransitionMap<TEvent, TState, TAction>>;
  };
};

export interface RunSequenceResponse<TState extends string> {
  success: boolean;
  currentState: TState;
  errors?: any[];
}

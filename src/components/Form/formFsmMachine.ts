// Internal imports
import { FSM } from "../../fsm/fsm";
import { StateMachineDefinition } from "../../fsm/types";
import { User, createUser } from "../../pages/MainPage/MainPage.api";

export type StateOption =
  | "InfoStep"
  | "HobbiesStep"
  | "SubmittedStep"
  | "FinishFlowStep"
  | "Error";
export type EventOption = "Proceed" | "Collapse" | "LogError";

export const definition: StateMachineDefinition<
  EventOption,
  StateOption,
  (...args: any[]) => any
> = {
  initialState: "InfoStep",
  finalState: "SubmittedStep",
  errorState: "Error",
  states: {
    InfoStep: {
      Proceed: {
        toState: "HobbiesStep",
      },
    },
    HobbiesStep: {
      Proceed: {
        toState: "SubmittedStep",
      },
      Collapse: {
        toState: "InfoStep",
      },
    },
    SubmittedStep: {
      Proceed: {
        toState: "FinishFlowStep",
      },
    },
    FinishFlowStep: {},
    Error: {
      LogError: {
        toState: "Error",
        action: async () => {
          console.error("An error occurred. Logging error details...");
        },
      },
    },
  },
};

const FormStateMachine = new FSM(definition);

export default FormStateMachine;

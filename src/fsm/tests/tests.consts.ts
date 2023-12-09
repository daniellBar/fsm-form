// Internal imports
import { StateMachineDefinition } from '../types';

type TestStateOption = 'First' | 'Second' | 'Final' | 'Error';
type TestEventOption = 'Event1' | 'Event2';

export const testDefinition: StateMachineDefinition<
  TestEventOption,
  TestStateOption,
  (...args: any[]) => any
> = {
  initialState: 'First',
  finalState: 'Final',
  errorState: 'Error',
  states: {
    First: {
      Event1: {
        toState: 'Second',
        action: jest.fn().mockResolvedValue('Async Result')
      }
    },
    Second: {
      Event2: {
        toState: 'Final'
      }
    },
    Final: {},
    Error: {}
  }
};

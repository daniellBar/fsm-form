// Internal imports
import { FSM } from '../fsm';
import { testDefinition } from './tests.consts';

describe('FSM', () => {
  it('should have initial state equals First', async () => {
    const fsm = new FSM(testDefinition);
    expect(fsm.getCurrentState()).toBe('First');
  });

  it('should transition to Second state on Event1', async () => {
    const fsm = new FSM(testDefinition);
    await fsm.transition('Event1');
    expect(fsm.getCurrentState()).toBe('Second');
    expect(fsm.getErrors()).toHaveLength(0);
  });

  it('should transition to Final state on Event1 and Event2', async () => {
    const fsm = new FSM(testDefinition);
    await fsm.transition('Event1');
    await fsm.transition('Event2');
    expect(fsm.getCurrentState()).toBe('Final');
    expect(fsm.getErrors()).toHaveLength(0);
  });

  it('should execute sequence from First state to Final state', async () => {
    const fsm = new FSM(testDefinition);
    const { success, currentState, errors } = await fsm.runSequence(['Event1', 'Event2']);
    expect(currentState).toBe('Final');
    expect(success).toEqual(true);
    expect(errors).toHaveLength(0);
  });

  it('should return the same result as getErrors and getCurrentState', async () => {
    const fsm = new FSM(testDefinition);
    const { currentState, errors } = await fsm.runSequence(['Event1', 'Event2']);
    expect(currentState).toBe(fsm.getCurrentState());
    expect(errors.length).toBe(fsm.getErrors().length);
  });

  it('should call action when transition on Event1', async () => {
    const fsm = new FSM(testDefinition);
    const actionSpy = jest.spyOn(fsm.transitionFunctions.First.Event1, 'action');
    await fsm.transition('Event1');
    expect(fsm.getCurrentState()).toBe('Second');
    expect(fsm.getErrors()).toHaveLength(0);
    expect(actionSpy).toHaveBeenCalledTimes(1);
  });

  //---------------------------- commented test-----------------------//

  // type error because i only allow TestEventOption.
  // this is an example for when not defining types for definition object
  // you can uncomment it and the test will run

  //   it('should catch and return errors', async () => {
  //     const fsm = new FSM(testDefinition);
  //     await fsm.transition('NonExistentEvent');
  //     expect(fsm.getCurrentState()).toBe('Error');
  //     expect(fsm.getErrors()).toHaveLength(1);
  //   });
});

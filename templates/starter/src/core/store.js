// src/core/store.js
//
// The one store. All game state lives here. All mutations flow through
// dispatched events, processed by the reducer. Pure. Deterministic. Testable.
//
// Rules in .claude/rules/core.md.

export function createStore(initialState, reducer, { logCap = 1000 } = {}) {
  let state = initialState;
  const listeners = new Set();
  const eventLog = [];

  function dispatch(event) {
    if (!event || typeof event.type !== 'string') {
      throw new Error('dispatch requires an event with a string type');
    }
    const next = reducer(state, event);
    if (next !== state) {
      state = next;
      if (logCap > 0) {
        eventLog.push(event);
        if (eventLog.length > logCap) eventLog.shift();
      }
      for (const l of listeners) l(state, event);
    }
    return event;
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function getEventLog() {
    return eventLog.slice();
  }

  function replay(initial, events) {
    let s = initial;
    for (const e of events) s = reducer(s, e);
    return s;
  }

  return { dispatch, getState, subscribe, getEventLog, replay };
}

const objectMap = (object, mapFn) => {
  return Object.keys(object).reduce(function(result, key) {
    result[key] = mapFn(object[key])
    return result
  }, {})
}

// a function that takes a namespace and turns a given reducer into a namespaced reducer
export const namespaceReducerFactory = (namespace) => (reducerFunction, actions) => (state, action) => {
  const isInitializationCall = (state === undefined);
  if((action && action.namespace) !== namespace && !isInitializationCall) return state;
return reducerFunction(state, action, actions);
};

// a function that takes a namespace and turns a given action creator into a namespaced action creator
export const namespaceActionFactory = (namespace) => (actionCreator) => (...actionArgs) => {
  const action = actionCreator(...actionArgs);
  return { ...action, namespace };
};

// a function that applies action factory to all members of an object
export const namespaceActions = (namespace) => (actions) => {
  return objectMap(actions, namespaceActionFactory(namespace));
};

// a function that takes a namespace and turns a given dispatch into a namespaced dispatch
export const namespaceDispatchFactory = (namespace) => (dispatch) => (action) =>
  dispatch({ ...action, namespace });
  
// a function that takes an object containing the actions, reducer, and Component and
// adds a namespace, returning the object outlined by the namespaced action API
export const namespaceModule = (UnboundComponent, unboundReducer, plainActions) => (
  namespace,
  {
    // optional overrides object
    Component = UnboundComponent,
    reducer = unboundReducer,
    actions = plainActions
  } = {}
) => {
  
  const namespaceReducer = namespaceReducerFactory(namespace);
  const namespaceDispatch = namespaceDispatchFactory(namespace);
  const namespacedActions = namespaceActions(namespace)(actions);

  return {
    namespace,
    actions: namespacedActions,
    reducer: namespaceReducer(reducer, namespacedActions),
    Component: ({ dispatch, ...args }, context) =>
      Component({ dispatch: namespaceDispatch(dispatch), ...args }, context)
  };
};

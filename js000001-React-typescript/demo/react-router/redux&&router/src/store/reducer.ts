const initState = {
  path: ''
};
export default (state = initState, action: any) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'CHANGE_PATH':
      newState.path = action.value;
  }
  return newState;
};

const loadStateFromLocalStorage = (initialPlayerState) => {
  try {
    const serializedState = localStorage.getItem('playerState');
    if (!serializedState) {
      console.log(serializedState, 'state', initialPlayerState);
      return initialPlayerState; // If no state is saved, return the initial state
    }
    return JSON.parse(serializedState); // Parse the JSON string back to the object
  } catch (err) {
    console.error('Could not load state', err);
    localStorage.removeItem('playerState');
    return initialPlayerState;
  }
};

// Function to save the state to localStorage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('playerState', serializedState); // Save the state as a JSON string
  } catch (err) {
    console.error('Could not save state', err);
  }
};
export { loadStateFromLocalStorage, saveStateToLocalStorage };
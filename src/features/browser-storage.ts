const KEY = "savedEvents";
export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return [];
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
  }
}

export async function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    console.log(e);
  }
}
import { getFunctions, httpsCallable, connectFunctionsEmulator} from "firebase/functions";

const functions = getFunctions();

export const suggestGifts = httpsCallable(functions, "suggest_gifts");
export const suggestEvents = httpsCallable(functions, "suggest_events");

// only for local testing
// connectFunctionsEmulator(functions, "127.0.0.1", 5001);
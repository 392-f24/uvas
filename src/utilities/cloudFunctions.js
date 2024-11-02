import { getFunctions, httpsCallable, connectFunctionsEmulator} from "firebase/functions";

const functions = getFunctions();

export const sampleFunction = httpsCallable(functions, "on_request_example");

// only for local testing
connectFunctionsEmulator(functions, "127.0.0.1", 5001);
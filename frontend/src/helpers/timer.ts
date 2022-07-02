import * as workerTimers from 'worker-timers';

export const clearWorkerTimer = (timer: ReturnType<typeof workerTimers.setTimeout>) => {
  if (!timer) {
    return;
  }

  try {
    workerTimers.clearTimeout(timer);
  } catch (err) {
    console.log('workerTimers :>> ', err);
  }
};

import { ATTEMPT_TYPES } from "@/types/types";
import { ClimbingRoutesAttempts } from "@prisma/client";

export const attemptsCountByCategory = (attempts: ClimbingRoutesAttempts[]) => {
  const data = {
    [ATTEMPT_TYPES.working]: 0,
    [ATTEMPT_TYPES.crux]: 0,
    [ATTEMPT_TYPES.linking]: 0,
    [ATTEMPT_TYPES.redpoint]: 0,
  };
  attempts.forEach((attempt) => {
    if (attempt.type in data) {
      data[attempt.type as keyof typeof data] += 1;
    }
  });
  return Object.values(data);
};

export const groupAttemptsByTypeAndDate = (
  attempts: ClimbingRoutesAttempts[]
) => {
  const working: { key: Date; value: number; radious: number }[] = [];
  const crux: { key: Date; value: number; radious: number }[] = [];
  const linking: { key: Date; value: number; radious: number }[] = [];
  const redpoint: { key: Date; value: number; radious: number }[] = [];
  attempts.forEach((attempt) => {
    if (attempt.type === ATTEMPT_TYPES.working) {
      working.push({
        key: attempt.date,
        value: 1,
        radious: 1,
      });
    } else if (attempt.type === ATTEMPT_TYPES.crux) {
      crux.push({
        key: attempt.date,
        value: 1,
        radious: 1,
      });
    } else if (attempt.type === ATTEMPT_TYPES.linking) {
      linking.push({
        key: attempt.date,
        value: 1,
        radious: 1,
      });
    } else if (attempt.type === ATTEMPT_TYPES.redpoint) {
      redpoint.push({
        key: attempt.date,
        value: 1,
        radious: 1,
      });
    }
  });
  return [working, crux, linking, redpoint];
};

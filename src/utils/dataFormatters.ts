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
  const working: { key: Date; value: number; radius: number }[] = [];
  const crux: { key: Date; value: number; radius: number }[] = [];
  const linking: { key: Date; value: number; radius: number }[] = [];
  const redpoint: { key: Date; value: number; radius: number }[] = [];

  let count = [{ multiplier: 1, type: "", date: new Date() }];

  let multiplier = 1;

  for (let i = 0; i < attempts.length; i++) {
    if (i >= 1) {
      if (
        attempts[i].date.toDateString() ===
          attempts[i - 1].date.toDateString() &&
        attempts[i].type === attempts[i - 1].type
      ) {
        multiplier += 1;
      } else {
        multiplier = 1;
      }

      if (attempts[i].type === ATTEMPT_TYPES.working) {
        working.push({
          key: attempts[i].date,
          value: i,
          radius: multiplier,
        });
      } else if (attempts[i].type === ATTEMPT_TYPES.crux) {
        crux.push({
          key: attempts[i].date,
          value: i,
          radius: multiplier,
        });
      } else if (attempts[i].type === ATTEMPT_TYPES.linking) {
        linking.push({
          key: attempts[i].date,
          value: i,
          radius: multiplier,
        });
      } else if (attempts[i].type === ATTEMPT_TYPES.redpoint) {
        redpoint.push({
          key: attempts[i].date,
          value: i,
          radius: multiplier,
        });
      }
      count.push({
        multiplier,
        type: attempts[i].type,
        date: attempts[i].date,
      });
    }
  }

  console.table(count);
  return [working, crux, linking, redpoint];
};

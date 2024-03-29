import { ATTEMPT_TYPES, STATUS } from "@/types/types";
import { ClimbingRoutes, ClimbingRoutesAttempts } from "@prisma/client";
import { ScatterDataPoint } from "chart.js";


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
): {
  working: ScatterDataPoint[];
  crux: ScatterDataPoint[];
  linking: ScatterDataPoint[];
  redpoint: ScatterDataPoint[];
} => {
  const working: ScatterDataPoint[] = [];
  const crux: ScatterDataPoint[] = [];
  const linking: ScatterDataPoint[] = [];
  const redpoint: ScatterDataPoint[] = [];

  let multiplier = 5;

  for (let i = 0; i < attempts.length; i++) {
    if (attempts[i].type === ATTEMPT_TYPES.working) {
      working.push({
        x: attempts[i].date.getTime(),
        y: i + 1,
      });
    } else if (attempts[i].type === ATTEMPT_TYPES.crux) {
      crux.push({
        x: attempts[i].date.getTime(),
        y: i + 1,
      });
    } else if (attempts[i].type === ATTEMPT_TYPES.linking) {
      linking.push({
        x: attempts[i].date.getTime(),
        y: i + 1,
      });
    } else if (attempts[i].type === ATTEMPT_TYPES.redpoint) {
      redpoint.push({
        x: attempts[i].date.getTime(),
        y: i + 1,
      });
    }
    multiplier = 5;
  }
  return { working, crux, linking, redpoint };
};


export const statusCountByCategory = (routes: ClimbingRoutes[]) => {
  const data = {
    [STATUS.new]: 0,
    [STATUS.inProgress]: 0,
    [STATUS.backlog]: 0,
    [STATUS.completed]: 0,
  };
  routes.forEach((route) => {
    if (route.status in data) {
      data[route.status as keyof typeof data] += 1;
    }
  });
  return Object.values(data);
};
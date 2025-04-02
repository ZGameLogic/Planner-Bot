import { EventUser, Plan } from '../types/APITypes.ts';

export function getAcceptedCount(plan: Plan): number {
  return plan.invitees.reduce((prev, current) => {
    return prev + (current.status === 'ACCEPTED' ? 1 : 0);
  }, 0);
}

export function compareUsers(lhs: EventUser, rhs: EventUser): number {
  const statusOrder = {
    'ACCEPTED': 0,
    'WAITLISTED': 1,
    'FILLINED': 2,
    'MAYBED': 3,
    'DECIDING': 4,
    'DECLINED': 5,
  };

  return statusOrder[lhs.status] - statusOrder[rhs.status];
}

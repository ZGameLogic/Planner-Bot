export function getAcceptedCount(plan: Plan): number {
  return plan.invitees.reduce((prev, current) => {
    return prev + (current.status === 'ACCEPTED' ? 1 : 0);
  }, 0);
}

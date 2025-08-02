export const Role = { User: 'user', Admin: 'admin' } as const;
export type Role = (typeof Role)[keyof typeof Role];

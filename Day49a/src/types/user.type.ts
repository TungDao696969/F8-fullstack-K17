export type UserQuery = {
  status: string;
  s: string;
  page: number;
  limit: number;
  select: string;
};
//SELECT * FROM users WHERE status=false AND (name ILIKE '' OR email ILIKE '')

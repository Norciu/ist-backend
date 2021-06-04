export interface AddComment {
  locationId: number;
  userId: number;
  description: string;
}

export interface GetComments {
  description: string;
  user_name: string;
  created_at: Date;
}

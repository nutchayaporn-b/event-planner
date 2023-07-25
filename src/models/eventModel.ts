export interface EventModel {
  id: string;
  type: 'Regular' | 'Private'
  name: string;
  description: string;
  date?: Date;
  location: string;
  image: string;
}
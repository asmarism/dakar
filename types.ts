
export interface Competitor {
  id: number;
  img: string;
  name?: string;
  nationality?: string;
  category?: string;
  team?: string;
  vehicle?: string;
}

export interface TripMember {
  name: string;
  role: string;
  avatar: string;
  task: string;
}

export interface TimelineEvent {
  id: string;
  day: string;
  date: string;
  time: string;
  title: string;
  description: string;
  locationName?: string;
  geo?: string;
  type: 'drive' | 'cook' | 'watch' | 'sleep' | 'wake' | 'start' | 'city';
}

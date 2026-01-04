
export interface Competitor {
  id: number;
  img: string;
  name?: string;
  nationality?: string;
  category?: string;
  team?: string;
  vehicle?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  links?: Array<{ title: string; uri: string }>;
}

export interface SearchResult {
  competitor?: Competitor;
  aiInfo?: string;
}

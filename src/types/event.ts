export interface Speaker {
  name: string;
  title?: string;
  imageUrl?: string;
}

export interface Event {
  slug: string;
  title: string;
  date: Date;
  location: string;
  imageUrl?: string;
  abstract?: string;
  unlisted: boolean;
  speakers: Speaker[];
}

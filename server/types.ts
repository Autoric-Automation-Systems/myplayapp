export type Timestamp = Date | string;

export type User = {
  id: string;
  name: string;
  email: string;
  picture: string | null;
  created_at: Timestamp;
};

export type List = {
  id: string;
  user_id: string;
  title: string;
  is_public: boolean;
  is_favorite: boolean;
  created_at: Timestamp;
};

export type ListSummary = List & {
  block_count: number;
};

export type Block = {
  id: string;
  list_id: string;
  title: string;
  position: number;
  created_at: Timestamp;
};

export type Track = {
  id: string;
  block_id: string;
  title: string;
  key: string;
  bpm: number;
  style: string;
  artist: string;
  lyrics: string;
  position: number;
  created_at: Timestamp;
};

export type BlockWithTracks = Block & {
  tracks: Track[];
};

export type ListDetail = {
  list: List;
  blocks: BlockWithTracks[];
};

export type ListOwner = Pick<User, 'id' | 'name' | 'picture'>;

export type TrackWithList = {
  track: Track;
  list: List;
};

export type PublicListDetail = ListDetail & {
  owner: ListOwner | null;
};

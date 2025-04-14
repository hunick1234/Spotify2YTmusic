export interface SongSet {
  [songName: string]: Song;
}

export interface Song {
  id: string;
  name: string;
  artist: string[];
  albums: string;
  duration: number; // seconds
}

export interface Playlist {
  id: string;
  name: string;
  createdDate: string; // ISO 8601 date format
  songs: SongSet;
}

export interface Albums {
  id: string;
  name: string;
  artist: string;
  releaseDate: string; // ISO 8601 date format
  songs: SongSet;
}

export interface Artist {
  id: string;
  name: string;
}

export interface SourcePlatform {
  getUserPlaylists(): Promise<Playlist[]>;
  getUserArtists(): Promise<Artist[]>;
  getUserAlbums(): Promise<Albums[]>;
}

export interface TargetPlatform {
  addPlaylist(playlist: Playlist): Promise<string>; // Returns the created playlist ID
  appendSongsToPlaylist(playlistName: string, songs: Song[]): void;
  addAlbum(album: Albums): Promise<string>; // Returns the created album ID
  addArtist(artist: Artist): Promise<string>;// Returns the created artist ID
}

export interface SpotifyAlbumResponse {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: {
    reason: string;
  };
  type: string;
  uri: string;
  artists: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
  tracks: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: {
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      is_playable: boolean;
      linked_from?: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
      };
      restrictions?: {
        reason: string;
      };
      name: string;
      preview_url: string;
      track_number: number;
      type: string;
      uri: string;
      is_local: boolean;
    }[];
  };
  copyrights: {
    text: string;
    type: string;
  }[];
  external_ids: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  genres: string[];
}

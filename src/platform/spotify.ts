import type {
  SourcePlatform,
  TargetPlatform,
  Playlist,
  Artist,
  Albums,
  Song,
  SongSet,
} from "../models/types";

export class SpotifySourcePlatform implements SourcePlatform {
  private accessToken: string;

  constructor() {
    const token = localStorage.getItem("accessTokenSpotify");
    if (!token) throw new Error("Spotify access token not found");
    this.accessToken = token;
  }

  private async fetchSpotifyAPI<T>(endpoint: string): Promise<T> {
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    if (!response.ok) alert("Spotify API error: " + response.statusText);
    throw new Error(`Spotify API error: ${response.statusText}`);
    return response.json();
  }

  //Deprecated by Spotify ........
  //second way?
  // TODO
  async getFeaturedPlaylists(): Promise<Playlist[]> {
    return [];
    // let url: string | null = "/browse/featured-playlists";
    // const playlists: Playlist[] = [];
    // while (url !== null) {
    //   const data: any = await this.fetchSpotifyAPI<any>(url);
    //   for (const item of data.playlists.items) {
    //     const songs: SongSet = {};
    //     playlists.push({
    //       id: item.id,
    //       name: item.name,
    //       createdDate: item.creation_date || new Date().toISOString(),
    //       songs,
    //     });
    //   }
    //   url = data.playlists.next
    //     ? data.playlists.next.replace("https://api.spotify.com/v1", "")
    //     : null;
    // }

    // return playlists;
  }

  async getUserPlaylists(): Promise<Playlist[]> {
    let url: string | null = "/me/playlists";
    const playlists: Playlist[] = [];
    while (url !== null) {
      const data: any = await this.fetchSpotifyAPI<any>(url);
      for (const item of data.items) {
        const songs: SongSet = {};
        playlists.push({
          id: item.id,
          name: item.name,
          createdDate: item.creation_date || new Date().toISOString(),
          songs,
        });
      }
      url = data.next
        ? data.next.replace("https://api.spotify.com/v1", "")
        : null;
    }
    let featured = await this.getFeaturedPlaylists();
    for (const item of featured) {
      playlists.push(item);
    }

    return playlists;
  }

  async getUserArtists(): Promise<Artist[]> {
    let url: string | null = "/me/following?type=artist";
    const artists: Artist[] = [];

    while (url !== null) {
      const data: any = await this.fetchSpotifyAPI<any>(url);
      for (const item of data.artists.items) {
        artists.push({
          id: item.id,
          name: item.name,
        });
      }

      url = data.artists.next
        ? data.artists.next.replace("https://api.spotify.com/v1", "")
        : null;
    }
    console.log(artists);
    return artists;
  }

  async getUserAlbums(): Promise<Albums[]> {
    let url: string | null = "/me/albums";
    const albums: Albums[] = [];

    while (url !== null) {
      const data: any = await this.fetchSpotifyAPI<any>(url);
      for (const item of data.items) {
        const songs: { [key: string]: Song } = {};

        for (const track of item.album.tracks.items) {
          const song: Song = {
            id: track.id,
            name: track.name,
            artist: track.artists.map((artist: any) => artist.name),
            albums: item.album.name,
            duration: Math.round(track.duration_ms / 1000),
          };
          songs[song.name] = song;
        }

        albums.push({
          id: item.album.id,
          name: item.album.name,
          artist: item.album.artists[0].name,
          releaseDate: item.album.release_date,
          songs,
        });
      }

      url = data.next
        ? data.next.replace("https://api.spotify.com/v1", "")
        : null;
    }
    return albums;
  }
}

export class SpotifyTargetPlatform implements TargetPlatform {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async addPlaylist(playlist: Playlist): Promise<string> {
    // 使用 Spotify API 創建播放清單
    const response = await fetch(
      "https://api.spotify.com/v1/users/{user_id}/playlists",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playlist.name,
          description: "Created by Spotify2YTmusic",
          public: false,
        }),
      }
    );
    const data = await response.json();
    return data.id;
  }

  async appendSongsToPlaylist(
    playlistId: string,
    songs: Song[]
  ): Promise<void> {
    // 使用 Spotify API 添加歌曲到播放清單

    const uris = songs
      .filter((song) => song.id)
      .map((song) => `spotify:track:${song.id}`);
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris }),
    });
  }

  async addAlbum(album: Albums): Promise<string> {
    // 使用 Spotify API 搜索專輯
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=album:${album.name}&type=album`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const albumData = data.albums.items[0];
    if (!albumData) {
      throw new Error("Album not found");
    }
    // 使用 Spotify API 創建專輯
    const albumResponse = await fetch(
      "https://api.spotify.com/v1/users/{user_id}/albums",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: albumData.name,
          description: "Created by Spotify2YTmusic",
          public: false,
        }),
      }
    );
    const succees = await albumResponse.json();
    return succees.id;
  }

  async addArtist(artist: Artist): Promise<string> {
    // 使用 Spotify API 关注艺术家
    const response = await fetch(
      `https://api.spotify.com/v1/me/following?type=artist&ids=${artist.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to follow artist: ${response.statusText}`);
    }
    return artist.id;
    return "artist_id";
  }

  async findSong(song: Song): Promise<Song | null> {
    // 使用 Spotify API 搜索歌曲
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${song.name}&type=track`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const songData = data.tracks.items[0];
    if (!songData) {
      return null;
    }
    return {
      id: songData.id,
      name: songData.name,
      artist: songData.artists[0].name,
      albums: songData.album.name,
      duration: Math.round(songData.duration_ms / 1000),
    };
  }

  async findAlbum(albumName: string): Promise<Albums | null> {
    // 使用 Spotify API 搜索專輯
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=album:${albumName}&type=album`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const albumData = data.albums.items[0];
    if (!albumData) {
      return null;
    }
    const songs: { [key: string]: Song } = {};
    for (const track of albumData.tracks.items) {
      const song: Song = {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        albums: albumData.name,
        duration: Math.round(track.duration_ms / 1000),
      };
      songs[song.name] = song;
    }
    return {
      id: albumData.id,
      name: albumData.name,
      artist: albumData.artists[0].name,
      releaseDate: albumData.release_date,
      songs,
    };
  }

  async findArtist(artistName: string): Promise<Artist | null> {
    // 使用 Spotify API 搜索藝術家
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=artist:${artistName}&type=artist`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const artistData = data.artists.items[0];
    if (!artistData) {
      return null;
    }
    return {
      id: artistData.id,
      name: artistData.name,
    };
  }
}

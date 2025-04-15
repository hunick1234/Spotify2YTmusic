const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const YOUTUBE_MUSIC_CLIENT_ID = import.meta.env.VITE_YOUTUBE_MUSIC_CLIENT_ID;
const REDIRECT_URI =
import.meta.env.MODE === "development"
  ? import.meta.env.VITE_REDIRECT_URI
  : import.meta.env.VITE_DEPLOY_REDIRECT_URI;

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

async function generatePKCE() {
  const codeVerifier = generateRandomString(64);
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return { codeVerifier, codeChallenge };
}

interface OAuth2Platform {
  clientId: string;
  redirectUri: string;
  scope: string;
  login(): Promise<void>;
  getAccessToken(): void;
}

class SpotifyAuth implements OAuth2Platform {
  clientId = SPOTIFY_CLIENT_ID;
  redirectUri = REDIRECT_URI;
  scope =
    "user-read-private user-read-email playlist-read-private user-follow-read user-library-read";

  async login() {
    const { codeVerifier, codeChallenge } = await generatePKCE();
    localStorage.setItem("codeVerifierSpotify", codeVerifier);
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    const params = {
      response_type: "code",
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      scope: this.scope,
      state: "Spotify",
    };

    document.cookie = "platform=Spotify; path=/";
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  }

  async getAccessToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");
    const codeVerifier = localStorage.getItem("codeVerifierSpotify");
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        access_type: "offline",
        client_id: this.clientId,
        grant_type: "authorization_code",
        code: authCode || "",
        redirect_uri: this.redirectUri,
        code_verifier: codeVerifier || "",
      }),
    });

    const data = await response.json();
    localStorage.setItem("accessTokenSpotify", data.access_token);
  }
}

class YouTubeMusicAuth implements OAuth2Platform {
  clientId = YOUTUBE_MUSIC_CLIENT_ID;
  redirectUri = REDIRECT_URI;
  scope =
    "https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtube.readonly";

  async generatePKCE() {
    return generatePKCE();
  }

  async login() {
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    const params = {
      response_type: "token",
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scope,
      include_granted_scopes: "true",
      prompt: "consent",
    };

    document.cookie = "platform=YouTubeMusic; path=/";
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  }

  async getAccessToken() {
    const params = new URLSearchParams(window.location.hash.substring(1));
    var accessToken = params.get("access_token");
    if (accessToken) {
      localStorage.setItem("accessTokenYT", accessToken);
    }
  }
}

export function createOAuth2Platform(
  platform: "Spotify" | "YouTubeMusic"
): OAuth2Platform {
  if (platform === "Spotify") {
    return new SpotifyAuth();
  } else if (platform === "YouTubeMusic") {
    return new YouTubeMusicAuth();
  } else {
    throw new Error("Unsupported platform");
  }
}


interface NonceResponse {
  nonce: string;
}
interface VerifyResponse {
  token: string;
}

export class AuthService {
  private readonly apiUrl: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUri: string;
  private readonly scopes: string[];

  constructor(
    apiUrl: string,
    clientId: string,
    clientSecret: string,
    redirectUri: string,
    scopes: string[]
  ) {
    this.apiUrl = apiUrl;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.scopes = scopes;
  }

  public async getNonce(): Promise<NonceResponse> {
    const response = await fetch(`${this.apiUrl}/oauth/nonce`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  }



  public async getToken(nonce: string): Promise<VerifyResponse> {
    const response = await fetch(`${this.apiUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nonce,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
        scope: this.scopes.join(' '),
      }),
    });

    return response.json();
  }
}
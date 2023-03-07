import { kakaoConfig } from "api/auth/kakao";
import { instance } from "api/axios-config";
import UserApi from "api/user-api";
import { User } from "types/user";

export default class AuthApi {
  constructor(private userApi: UserApi) {}

  static JWT_EXPIRY_TIME = 6 * 3600 * 1000; // JWT AccessToken 만료시간 (6시간)

  async login(code: string): Promise<User> {
    const token = await this.getKakaoToken(code);
    const accessToken = await this.getAuthToken(token);
    const user = await this.onLoginSuccess(accessToken);
    return user;
  }

  private async getKakaoToken(code: string): Promise<string> {
    const response = await instance.post(
      "https://kauth.kakao.com/oauth/token",
      this.formUrlEncoded({
        grant_type: "authorization_code",
        client_id: kakaoConfig.clientId!,
        redirect_uri: kakaoConfig.redirectURL!,
        code,
        client_secret: kakaoConfig.clientSecret!,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    return response.data.access_token;
  }

  private async getAuthToken(token: string): Promise<string> {
    instance.defaults.withCredentials = true; // refreshToken을 쿠키로 받기 위해 설정
    const response = await instance.get(`/auth?token=${token}`);
    return response.data.accessToken;
  }

  private formUrlEncoded(x: Record<string, string>): string {
    return Object.keys(x).reduce((p, c) => `${p}&${c}=${encodeURIComponent(x[c]!)}`, "");
  }

  private async onLoginSuccess(accessToken: string): Promise<User> {
    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    setTimeout(this.getNewAccessToken, AuthApi.JWT_EXPIRY_TIME - 60000); // 토큰 만료되기 1분 전에 새로운 토큰 발급 요청
    const user = await this.userApi.getUserInfo();
    return user;
  }

  async getNewAccessToken(): Promise<User> {
    const response = await instance.get("/auth/refresh", {
      withCredentials: true,
    });
    const user = await this.onLoginSuccess(response.data.accessToken);
    return user;
  }

  async logout(): Promise<void> {
    return instance.get("/auth/logout");
  }

  async deleteAccount(): Promise<void> {
    return instance.get("/auth/leave");
  }
}

import axios, { AxiosError } from "axios";
import { kakaoConfig } from "api/auth/kakao";
import { ResultState } from "types/api-result";

export default class AuthApi {
  static JWT_EXPIRY_TIME = 6 * 3600 * 1000; // JWT AccessToken 만료시간 (6시간)

  async login(code: string): Promise<ResultState<void>> {
    try {
      const token = await this.getKakaoToken(code);
      const accessToken = await this.getAuthToken(token);
      this.onLoginSuccess(accessToken);
      return { result: "success" };
    } catch (e) {
      console.log(e);
      return { result: "fail", message: "로그인에 실패했습니다. 다시 시도해주시기 바랍니다." };
    }
  }

  private async getKakaoToken(code: string): Promise<string> {
    const response = await axios.post(
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
    axios.defaults.withCredentials = true; // refreshToken을 쿠키로 받기 위해 설정
    const response = await axios.get(`/auth?token=${token}`);
    return response.data.accessToken;
  }

  private formUrlEncoded(x: Record<string, string>): string {
    return Object.keys(x).reduce((p, c) => `${p}&${c}=${encodeURIComponent(x[c]!)}`, "");
  }

  async getNewAccessToken(): Promise<ResultState<void>> {
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });
      this.onLoginSuccess(response.data.accessToken);
      return { result: "success" };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e;
        if (response && response.status === 404) {
          return {
            result: "fail",
            message: "토큰이 만료되었습니다. 다시 로그인해주세요.",
          };
        }
      }
      throw new AxiosError(e as string);
    }
  }

  private async onLoginSuccess(accessToken: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    setTimeout(this.getNewAccessToken, AuthApi.JWT_EXPIRY_TIME - 60000); // 토큰 만료되기 1분 전에 새로운 토큰 발급 요청
  }

  async logout() {
    try {
      await axios.get("/auth/logout");
      return { result: "success" };
    } catch (e) {
      return { result: "fail" };
    }
  }

  async deleteAccount() {
    try {
      await axios.get("/auth/leave");
      return { result: "success" };
    } catch (e) {
      return { result: "fail" };
    }
  }
}

/**
 * Cliente API para comunicação com o backend NestJS
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export interface ApiError {
  message: string;
  status?: number;
}

export interface User {
  id: string;
  name: string | null;
  cpf: string | null;
  email: string | null;
}

export interface Restaurant {
  id: number;
  name: string;
  city: string;
  discountLabel: string;
  imageUrl: string | null;
  category: string | null;
}

export interface Voucher {
  id: string;
  code: string;
  status: "available" | "used" | "expired";
  used: boolean;
  usedAt: string | null;
  createdAt: string;
  expiresAt: string | null;
  restaurantName: string;
  city: string;
  discountLabel: string;
  imageUrl: string | null;
  category: string | null;
  restaurant: Restaurant;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Merge existing headers if any
    if (options.headers) {
      const existingHeaders = options.headers as Record<string, string>;
      Object.assign(headers, existingHeaders);
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      let data: any;
      const contentType = response.headers.get("content-type");

      try {
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();
          data = text ? { message: text, error: text } : { message: "Erro na requisição" };
        }
      } catch (parseError) {
        data = { message: "Erro ao processar resposta do servidor", error: "Parse error" };
      }

      if (!response.ok) {
        const errorMessage =
          data?.message ||
          data?.error ||
          data?.toString() ||
          `Erro ${response.status}: ${response.statusText}`;

        throw {
          message: errorMessage,
          status: response.status,
        } as ApiError;
      }

      return data;
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        throw error;
      }

      const errorMessage = error instanceof Error
        ? error.message
        : "Erro de conexão com o servidor";

      throw {
        message: errorMessage,
        status: 0,
      } as ApiError;
    }
  }

  // Gerenciamento de Token e User ID
  setToken(token: string, userId?: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
      if (userId) {
        localStorage.setItem("user_id", userId);
      }
    }
  }

  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  }

  getUserId(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("user_id");
  }

  clearAuth() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_id");
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.request<{
      user: User;
      token: string;
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    this.setToken(response.token, response.user.id);
    return response;
  }

  async register(data: {
    name: string;
    cpf: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }) {
    const response = await this.request<{
      user: User;
      token: string;
    }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    this.setToken(response.token, response.user.id);
    return response;
  }

  // Vouchers endpoints
  async getVouchers(): Promise<Voucher[]> {
    return this.request<Voucher[]>("/vouchers", {
      method: "GET",
    });
  }

  async getVoucherById(id: string): Promise<Voucher> {
    return this.request<Voucher>(`/vouchers/${id}`, {
      method: "GET",
    });
  }

  async useVoucher(id: string): Promise<Voucher> {
    return this.request<Voucher>(`/vouchers/${id}/use`, {
      method: "POST",
    });
  }

  // Validation endpoints
  async validateVoucher(code: string, cpf?: string) {
    return this.request<{
      valid?: boolean;
      message: string;
      voucher: {
        id: string;
        code: string;
        restaurantName?: string;
        city?: string;
        discountLabel?: string;
        restaurant?: {
          name: string;
          city: string;
          offer: string;
        };
      };
      customer?: {
        id?: string;
        name: string | null;
        cpf: string | null;
      } | null;
    }>("/validation", {
      method: "POST",
      body: JSON.stringify(cpf ? { cpf, code } : { code }),
    });
  }
}

export const apiClient = new ApiClient(BACKEND_URL);

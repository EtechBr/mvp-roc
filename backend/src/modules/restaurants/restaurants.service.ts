import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_CLIENT } from "../../config/supabase.config";

export interface Restaurant {
  id: number;
  name: string;
  city: string;
  discount_label: string;
  image_url: string | null;
  category: string | null;
  description: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

@Injectable()
export class RestaurantsService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient
  ) {}

  async findAll(city?: string): Promise<Restaurant[]> {
    let query = this.supabase
      .from("restaurants")
      .select("*")
      .eq("active", true)
      .order("name");

    if (city) {
      query = query.eq("city", city);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Erro ao buscar restaurantes: ${error.message}`);
    }

    return data || [];
  }

  async findById(id: number): Promise<Restaurant> {
    const { data, error } = await this.supabase
      .from("restaurants")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      throw new NotFoundException("Restaurante não encontrado");
    }

    return data;
  }

  async getCities(): Promise<string[]> {
    const { data, error } = await this.supabase
      .from("restaurants")
      .select("city")
      .eq("active", true);

    if (error) {
      throw new Error(`Erro ao buscar cidades: ${error.message}`);
    }

    const cities = [...new Set(data?.map((r) => r.city) || [])];
    return cities.sort();
  }
}

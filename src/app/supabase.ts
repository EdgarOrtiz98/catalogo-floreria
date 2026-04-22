import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class Supabase {
  private supabase: SupabaseClient;

  private supabaseUrl = 'https://cqsxhzsjtkvjvpyrmoen.supabase.co/rest/v1/';
  private supabaseKey = 'sb_publishable_uKyGMDn03LqOT3DZU_E4Vw_RgKK7dj3';

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async obtenerFlores() {
    const { data, error } = await this.supabase
      .from('flores')
      .select('*, Categoria_flores(nombre)');

    if (error) {
      console.error('Error al traer las flores:', error);
      return [];
    }
    return data;
  }
}

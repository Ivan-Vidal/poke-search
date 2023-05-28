import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = environment.APIKEY

  constructor(private http: HttpClient) { }


  getAllPoke(): any{
    return this.http.get<any>(this.url)
  }
}

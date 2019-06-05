import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiKey: string = '9ffaebbac3d041639adda6a10e7ab45a';

  constructor(private http: HttpClient) { }

  getNews() {
    return this.http.get(`https://newsapi.org/v2/top-headlines?language=es&apiKey=${this.apiKey}`);
  }
}

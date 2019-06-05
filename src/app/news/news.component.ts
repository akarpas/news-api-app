import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  articles$: Object;
  totalResults$: Number;
  status$: string;

  constructor(private news: NewsService) { }

  ngOnInit() {
    this.news.getNews().subscribe(
      data => {
        this.articles$ = data['articles'];
      }
    );
  }

}

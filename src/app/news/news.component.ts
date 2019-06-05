import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  articles$: Object;
  currentPage$: Number;
  pages$: Object;
  status$: string;
  totalResults$: Number;

  constructor(
    private news: NewsService,
    private spinner: NgxSpinnerService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.spinner.show();
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.currentPage$ = 1;
    this.news.getNews(null).subscribe(
      data => {
        const sortedArticles = this.sortArticles(data);
        this.articles$ = sortedArticles;
        this.status$ = data['status'];
        this.totalResults$ = data['totalResults'];
        this.pages$ = Array.from(
          { length: Math.ceil(<any>this.totalResults$/20) }, (v, k) => k + 1
        );
        this.spinner.hide();
      }
    );
  }

  goToPage(page) {
    this.spinner.show();
    this.currentPage$ = page;
    this.news.getNews(page).subscribe(
      data => {
        const sorted = this.sortArticles(data);
        this.articles$ = sorted;
        this.spinner.hide();
      }
    )
  }

  sortArticles(data) {
    return data['articles'].sort((a, b)=> {
      return <any>new Date(b.publishedAt) - <any>new Date(a.publishedAt);
    });
  }
}

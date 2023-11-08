import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-my-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss']
})
export class MyDataComponent implements OnInit {
  data: any;
  entries: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getDataOne();
    this.getDataTwo()
  }
  getDataOne() {
    const endpoint = 'https://shibe.online/api/shibes?count=10';

    // debugger;
    caches.has('data-shibe').then(
      res => {
        if (res) {
          this.getCachedData('data-shibe', endpoint).then(
            (res) => {
              this.data = res;
            }
          )
        } else {
          this.apiService.getFromApi(endpoint, 'data-shibe').subscribe(
            (apiData) => {
              this.data = apiData;
            });
        }
      }
    )
  }

  getDataTwo() {
    const endpoint = 'https://api.publicapis.org/entries';
    caches.has('data-entries').then(
      res => {
        if (res) {
          this.getCachedData('data-entries', endpoint).then(
            (res: any) => {
              this.entries = res.entries.slice(0, 10);
            });
        } else {
          this.apiService.getFromApi(endpoint, 'data-entries').subscribe(
            (res: any) => {
              this.entries = res.entries.slice(0, 10);
            });
        }
      }
    )

  }


  clearCacheing(cacheName: string) {
    caches.delete(cacheName).then(() => {
      console.log("data deleted succesfully !!!!!!!!");
    });
  }

  async getCachedData(cacheName: string, endPoint: string) {
    // Try to fetch data from the cache
    let response;
    await caches.open(cacheName).then(async cache => {
      await cache.match(endPoint).then(async (res: any) => {
        if (res) {
          await res.json().then((data: any) => {
            response = data;
          });
        }
      })
    })
    return response;
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwUpdate } from '@angular/service-worker';

@Injectable(
  { providedIn: 'root' }
)
export class ApiService {
  constructor(private http: HttpClient, private swUpdate: SwUpdate) { }

  getFromApi(endpoint: string , cacheName:string) {
    const request = this.http.get(endpoint);

    request.subscribe(
      (response) => {
        console.log(response);

        // Store the response in the cache
        const cache = caches.open(cacheName);
        cache.then((c) => {
          c.put(endpoint, new Response(JSON.stringify(response)));
          console.log("cache stored", c);

        });
      },
      (error) => {
        // Handle errors
      }
    );

    return request;
  }
}

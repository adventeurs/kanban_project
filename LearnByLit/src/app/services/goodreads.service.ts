import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import xml2js from "xml2js";
import { environment } from "../../../src/environments/environment";

import { Shelf } from "../models/goodreads";

@Injectable({
  providedIn: "root",
})
export class GoodreadsService {
  private key: string = environment.goodreads.key;
  private parser = new xml2js.Parser({
    trim: true,
    explicitArray: true,
  });

  constructor(private http: HttpClient) {}

  //
  // // Get User Shelves
  //
  getShelves(uid: string | number): Observable<Shelf[]> {
    const url = "/goodreads/shelf/list.xml";
    const params = { key: this.key, user_id: String(uid), page: "1" };

    return this.http
      .get(url, { params, responseType: "text" })
      .pipe(map((res) => this.parse(res)));
  }

  //
  // // Parse XML For User Shelves
  //
  private parse(res) {
    let shelf: Shelf[] = [];
    this.parser.parseString(res, (err, res) => {
      const { GoodreadsResponse } = res;
      for (let s of GoodreadsResponse.shelves[0].user_shelf) {
        shelf.push({
          book_count: s.book_count[0]._,
          name: s.name[0],
          id: s.id[0]._,
        });
      }
    });
    return shelf;
  }
}

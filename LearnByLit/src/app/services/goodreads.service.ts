import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class GoodreadsService {
  key: string = environment.goodreads.key;

  constructor(private http: HttpClient) {}

  getShelves(uid: string | number) {
    const url = "/goodreads/shelf/list.xml";
    const param = { key: this.key, user_id: String(uid), page: "1" };

    return this.http.get(url, { params: param, responseType: "text" });
  }
}

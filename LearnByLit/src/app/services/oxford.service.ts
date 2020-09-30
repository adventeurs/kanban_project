import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

class API {
  url: "https://od-api.oxforddictionaries.com/api/v2";
  private key: "32885597932dbe8b85ef41e453207798";
  private appId: "7acfeb32";

  headers(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders()
        .set("app_id", this.appId)
        .set("app_key", this.key),
    };
  }
}

@Injectable({
  providedIn: "root",
})
export class OxfordService {
  api: API = new API();

  constructor(private http: HttpClient) {}

  // Create parser and return type
  definition(word: string) {
    const entry = "entries/en-us/";
    return this.http.get(this.api.url + entry + word, this.api.headers());
  }

  // Create parser and return type
  thesaurus(word: string) {
    const thesaurus = "thesaurus/en/";
    return this.http.get(this.api.url + thesaurus + word, this.api.headers());
  }
}

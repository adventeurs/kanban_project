import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../src/environments/environment";

class API {
  url: string = environment.oxford.url;
  key: string = environment.oxford.key;
  appId: string = environment.oxford.appId;
  headers = {
    headers: {
      app_id: this.appId,
      app_key: this.key,
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
}

@Injectable({
  providedIn: "root",
})
export class OxfordService {
  api: API = new API();

  constructor(private http: HttpClient) {}

  // Create parser and return type
  definition(word: string, api: API = this.api) {
    const entry = "/oxfordapi/entries/en-us/" + word;
    return this.http.get(entry);
  }

  // Create parser and return type
  thesaurus(word: string, api: API = this.api) {
    const thesaurus = "thesaurus/en/";
    return this.http.get(api.url + thesaurus + word, api.headers);
  }
}

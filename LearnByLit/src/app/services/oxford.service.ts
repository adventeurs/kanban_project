import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { OxfordDefinition } from "../models/definition";

@Injectable({
  providedIn: "root",
})
export class OxfordService {
  constructor(private http: HttpClient) {}

  // Create parser and return type
  public definition(word: string) {
    const entry = "/oxfordapi/entries/en-us/" + word;

    return this.http.get(entry).pipe(map((json) => <OxfordDefinition>json));
  }

  // Create parser and return type
  public thesaurus(word: string) {
    const thesaurus = "/oxfordapi/thesaurus/en/" + word;

    return this.http.get(thesaurus);
  }
}

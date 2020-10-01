import { Component, OnInit } from "@angular/core";
import { OxfordService } from "../services/oxford.service";
import { OxfordDefinition } from "../models/definition";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  constructor(private oxford: OxfordService) {}

  ngOnInit() {
    this.define();
  }
  define() {
    this.oxford.definition("apotheosis").subscribe((json: any) => {
      let thing = <OxfordDefinition>json;
      console.log(thing);
    });
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  promover() {
    let button: HTMLAnchorElement = document.querySelector("#carousel-next") as HTMLAnchorElement
    button.click()
  }

}

import { DataService } from '../_services/data.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Result } from './result';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HomeComponent implements OnInit {
  sliderArray: object[];
  transform: number;
  selectedIndex = 0;
  registerMode = false;

  constructor(private data: DataService, private http: HttpClient) {
    this.sliderArray = [];
    this.selectedIndex = 0;
    this.transform = 100;
  }

  ngOnInit() {
    this.data.getData().subscribe((result: Result) => {
      this.sliderArray = result.sliderArray;
    });
  }

  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

  selected(x) {
    this.downSelected(x);
    this.selectedIndex = x;
  }

  keySelected(x) {
    this.downSelected(x);
    this.selectedIndex = x;
  }

  downSelected(i) {
    this.transform = 100 - (i) * 50;
    this.selectedIndex = this.selectedIndex + 1;
    if (this.selectedIndex > 4) {
      this.selectedIndex = 0;
    }
  }

}

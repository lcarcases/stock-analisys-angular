import { Component, Input, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, DoCheck, OnDestroy {

  @Input() metricName: String;
  @Input() metricValue: String;


  constructor() {

  }

  ngOnInit(): void {
  }

  ngDoCheck() {

  }

  ngOnDestroy() {

  }

}

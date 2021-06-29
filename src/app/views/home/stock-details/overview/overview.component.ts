import { Component, OnInit, Input, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, DoCheck, OnDestroy {


    @Input() stocksData: Array<Object>;


  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {

  }

  ngOnDestroy() {
  
  }

}

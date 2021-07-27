import { Component, OnInit, Input, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, DoCheck, OnDestroy {


  @Input() stocksData: Array<Object>;
  //data: Object;


  constructor() {
    //this.data = this.stocksData;
    console.log("Se ingreso al componente Overview", this.stocksData);
    //console.log("Se ingreso al componente Overview", this.data);
   }

  ngOnInit(): void {
    console.log("Se ingreso al componente Overview", this.stocksData);
  }

  ngDoCheck() {
  }

  ngOnDestroy() {

  }

}

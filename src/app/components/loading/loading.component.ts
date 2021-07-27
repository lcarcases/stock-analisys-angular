import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor() {
     console.log("Se ingreso al constructor del componente Loading");
  }

  ngOnInit(): void {
    console.log("Se ingreso al Init del componente Loading");
  }

}

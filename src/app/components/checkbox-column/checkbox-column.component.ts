import { Component, OnInit } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-checkbox-column',
  templateUrl: './checkbox-column.component.html',
  styleUrls: ['./checkbox-column.component.scss']
})
export class CheckboxColumnComponent implements ICellRendererAngularComp {

  params: ICellRendererParams;

  constructor() { }

  ngOnInit(): void {
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

}

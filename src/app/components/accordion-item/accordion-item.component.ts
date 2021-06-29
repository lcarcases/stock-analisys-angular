import { Component, OnInit, DoCheck, OnDestroy, Input } from '@angular/core';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { CheckboxMetricModel } from 'src/app/models/CheckboxMetricModel';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss']
})
export class AccordionItemComponent implements OnInit, DoCheck, OnDestroy {

  opened: Boolean;
  @Input() headerText: String;
  @Input() metrics: Array<CheckboxMetricModel>;
  @Input() headerColor: String;
  @Input() titleColor: String;

  constructor() {
       //let colors  = JSON.parse(this.colors);
       this.opened = false;
       this.headerColor =  this.headerColor ? this.headerColor : '#34495e';
       this.titleColor  =  this.titleColor ?  this.titleColor : '#e29402';
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    console.log("Se va a renderizar el componente accordionItem");
  }

  ngOnDestroy() {
    console.log("Se va a destruir el componente accordionItem");
  }

  public changeStatusOpened() {
     this.opened = !this.opened;
  }

}

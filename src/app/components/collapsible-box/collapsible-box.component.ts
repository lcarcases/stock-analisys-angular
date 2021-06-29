import { Component, OnInit, DoCheck, OnDestroy, Input } from '@angular/core';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AccordionModel } from './../../models/AccordionModel';

@Component({
  selector: 'app-collapsible-box',
  templateUrl: './collapsible-box.component.html',
  styleUrls: ['./collapsible-box.component.scss']
})
export class CollapsibleBoxComponent implements OnInit, DoCheck, OnDestroy {

  faUniversity = faUniversity;
  faBars = faBars;
  collapsed: Boolean;
  @Input() notifyChangeCollapsedState: Function;
  @Input() accordionModels: AccordionModel;
  @Input() accordionStyles: Object;

  constructor() {
    this.collapsed = false;
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    console.log("Se va a renderizar el componente collapsible");
  }

  ngOnDestroy() {
    console.log("Se va a destruir el componente collapsible");
  }

  public onBarIconClick() {
    this.notifyChangeCollapsedState(!this.collapsed);
    console.log("Click en el icon bar del menu lateral");
    this.collapsed =  !this.collapsed;
  }

}

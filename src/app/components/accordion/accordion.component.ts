import { Component, OnInit, DoCheck, OnDestroy, Input } from '@angular/core';
import { AccordionModel } from './../../models/AccordionModel';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  @Input() data: AccordionModel;
  @Input() accordionStyles = {
                                backgroundColor: '#1e2337',
                                headerColor: '#34495e',
                                titleColor: '#e29402'
                             };
  @Input() onClick: Function;
  backgroundColor: String;
  headerColor: String;
  titleColor: String;

  constructor() {

  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    console.log("Se va a renderizar el componente accordion");
  }

  ngOnDestroy() {
    console.log("Se va a destruir el componente accordion");
  }

}

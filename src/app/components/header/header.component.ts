import { Component, OnInit, DoCheck, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck, OnDestroy {

  @Input() stockName: String;
  @Input() userName: String;
  @Input() width: string;
  @Input() marginLeft: string;
  @Input() headerStyles = {
                            header: {
                                      width: '',
                                      paddingLeft: ''
                            },
                            stockName: {
                                         marginLeft: '',
                                       },
                            searchInput: {
                                          marginLeft: '',
                                        },
                          };

  constructor() {
  }

  ngOnInit(): void {
    console.log("Se va a inicializar el componente header");
  }

  ngDoCheck() {
    console.log("Se va a renderizar el componente header");
  }

  ngOnDestroy() {
    console.log("Se va a destruir el componente header");
  }



}

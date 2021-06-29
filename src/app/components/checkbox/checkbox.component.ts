import { Component, OnInit,DoCheck, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, DoCheck, OnDestroy {

  public active: Boolean;
  @Input() cbText: String;
  @Input() cbField: String;
  @Input() changeEstatus: Function;
  @Input() key: Number;

  constructor() {
    this.active = false;
    //this.cbText = this.cbText;
    //Field = this.cbField;
  }

  ngOnInit(): void {

  }

  ngDoCheck() {
    console.log("Se va a renderizar el componente checkbox");
  }

  ngOnDestroy() {
    console.log("Se va a destruir el componente checkbox");
  }

  public onChangeState() {
      this.active=  !this.active;
      this.changeEstatus(this.cbField,this.active);
  }

}

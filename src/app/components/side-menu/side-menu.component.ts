import { Component, OnInit, Input } from '@angular/core';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  faTachometerAlt = faTachometerAlt;
  faTable = faTable;
  faCalendarAlt = faCalendarAlt;
  faChartLine = faChartLine;
  faBook = faBook;
  faBookOpen = faBookOpen;
  faBookReader = faBookReader;
  selectedItem: Number;
  @Input() onClickSelectMenuItem: Function;
  @Input() sideMenuStyles = {
                              height: '',
                            };

  constructor() {
     this.selectedItem = -1;
  }

  ngOnInit(): void {
  }

  public onSelectMenuItem(i:Number) {
    this.selectedItem = i;
    this.onClickSelectMenuItem(i);
  }

}

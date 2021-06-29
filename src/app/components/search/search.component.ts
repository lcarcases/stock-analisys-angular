import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, DoCheck, OnDestroy {

  faSearch = faSearch;
  private searching: String;
  private redirect: String;

  constructor() {
      this.searching = "";
      this.redirect = null;
   }

  ngOnInit(): void {
    console.log("Se va a inicializar el componente search");
  }

  ngDoCheck() {
    console.log("Se va a renderizar el componente search");
    if (this.redirect !== null) {
      let redirect = this.redirect;
      this.redirect = null;
      // Aquí viene la redirección
   }
 }

 ngOnDestroy() {
   console.log("Se va a destruir el componente search");
 }

 handleChange(event) {
   let stock = event.target.value;
   this.searching = stock;
}

public searchButtonClick() {
   if(this.searching.length > 0) {
       this.redirect = `/stock-details/${this.searching}`;
   } else {
       this.redirect = null;
   }
}

}

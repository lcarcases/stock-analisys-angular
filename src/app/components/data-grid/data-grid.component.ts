import { Component, OnInit, DoCheck, OnDestroy, Input } from '@angular/core';
import { AgGridAngular } from "ag-grid-angular";

import {Router, ActivatedRoute} from '@angular/router';
//import '@ag-grid-community/core/dist/styles/ag-grid.css';
//import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit, DoCheck, OnDestroy {

   @Input() width: String;
   @Input() height: String;
   @Input() marginRight: String;
   @Input() marginTop: String;
   @Input() marginLeft: String;
   @Input() marginBottom: String;
   redirect: String;
   dataRow: any;
   @Input() data: Function;
   @Input() rowData:Array<any>;
   @Input() columnDefs: Array<any>;
   @Input() flag: String;
   metrics: Array<any>;


   gridOptions = {
     rowData: undefined,
     columnDefs: undefined,
     pagination: true,
     rowSelection: 'single',
     applyColumnDefOrder: true,
     api: undefined,
     columnApi: undefined,

    // EVENTS
    // Add event handlers
     onSelectionChanged: "this.onSelectionChanged.bind(this,$event)",
     onGridReady: "this.onGridReady.bind(this,$event)",

    // CALLBACKS
    //isScrollLag: () => false
   };

  constructor( private route: ActivatedRoute,
               private router: Router) {
      //this.router = new Router();

      //this.gridOptions.rowData = this.rowData;
      //this.gridOptions.columnDefs = this.columnDefs;
  }

  ngOnInit(): void {
    let i = 0;
    this.width = '45rem';
    this.height = this.height ? this.height : '20.5rem';
    this.marginLeft = '0rem';
    this.marginRight = '0rem';
    this.marginBottom = '0rem';
    this.marginTop = '0.8rem';
  }

  ngDoCheck() {
    console.log("Se va a renderizar el componente Datagrid");
    if(this.gridOptions !== undefined &&
       this.gridOptions.api !== undefined
      ) {
        var actualColumnDefs = this.gridOptions.api.getColumnDefs();
        if(actualColumnDefs.length != this.columnDefs.length) {
          this.gridOptions.api.setColumnDefs(this.columnDefs);
        }
      }
  }

  ngOnDestroy() {
    console.log("Se va a destruir el componente Datagrid");
  }

  orderAsc(metric1,metric2) {
    if(metric1.position > metric2.position) return 1;
    if(metric2.position > metric1.position) return -1;

    return 0;
}

toggleDataGridColumns(metrics) {
    metrics.sort(this.orderAsc);
    for(let i = 0; i < metrics.length; i++) {
        metrics[i].position = i;
    }
    if(this.gridOptions.api !== undefined && this.gridOptions.columnApi !== undefined) {
        for(let i=0; i < metrics.length; i++) {
            this.gridOptions.columnApi.moveColumn(metrics[i].field,metrics[i].position);
        }
        this.gridOptions.api.setColumnDefs(metrics);
    }
}

onGridReady (params) {
       this.gridOptions.api = params.api;
       this.gridOptions.columnApi = params.columnApi;
       //this.gridOptions.onSelectionChanged = this.onSelectionChanged.bind(this);
       this.gridOptions.api.showLoadingOverlay();
       if(this.metrics !== undefined ) {
           this.toggleDataGridColumns(this.metrics);

       }
       if(this.rowData !== undefined && this.rowData.length > 0) {
           if(this.gridOptions.api.rowData !== undefined) {
               this.gridOptions.api.rowData(this.dataRow);
           }

      }

      /*const updateData = (data) => {
        this.rowData = data;
        this.gridOptions.api.hideOverlay();
      };

      if(this.data !== undefined ) {
          this.data(updateData);

      }*/

      if(this.rowData !== undefined && this.data === undefined) {
        this.gridOptions.api.hideOverlay();
      }

}

onSelectionChanged(params) {
     console.log("Entro 1");
    //let history = useHistory();
    let selectedRows = this.gridOptions.api.getSelectedRows();
    if (selectedRows.length === 1) {
        let symbol = selectedRows[0].stockName.split('-')[0].trim();
        //this.props.history.push(`/stock-details/${symbol}`);
        this.redirect = `/stock-details/${symbol}`;
        this.router.navigate(['stock-details', symbol]);
        //return <Redirect to={`/stock-details/${symbol}`} />;
    }
}

onRowSelected(event) {
  //let history = useHistory();
  console.log("Entro 2");
  let selectedRows = this.gridOptions.api.getSelectedRows();
  if (selectedRows.length === 1) {
      let symbol = selectedRows[0].stockName.split('-')[0].trim();
      //this.props.history.push(`/stock-details/${symbol}`);
      this.redirect = `/stock-details/${symbol}`;
      //return <Redirect to={`/stock-details/${symbol}`} />;
  }
}

}

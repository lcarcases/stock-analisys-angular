import { Component, Input, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { CheckboxColumnComponent } from './../checkbox-column/checkbox-column.component';

@Component({
  selector: 'app-tree-datagrid',
  templateUrl: './tree-datagrid.component.html',
  styleUrls: ['./tree-datagrid.component.scss']
})
export class TreeDatagridComponent implements OnInit, DoCheck, OnDestroy {

  @Input() columnDefs: Array<any>;
  @Input() rowData: Array<any>;
  @Input() onSelectedRow: Function;
  @Input() width: String;
  @Input() height: String;
  @Input() marginRight: String;
  @Input() marginLeft: String;
  @Input() marginTop: String;
  @Input() marginBottom: String;
  metrics: Array<any>;
  dataRow: any;
  @Input() data: Function;

  frameworkComponents;

  rowSelection: String;
  rowClassRules;

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


  constructor() {

  }

  ngOnInit(): void {
    console.log("Init tree data grid"+ " width:"+this.width+" height:"+ this.height);
    this.frameworkComponents = {
                                  checkboxColumnComponent: CheckboxColumnComponent
                               };

    let isOpenColumn = {
                          headerName: '',
                          field: 'refunded',
                          position: 0,
                          editable:false,
                          cellClass: 'ag-rigtharrow',
                          cellRenderer: 'checkboxColumnComponent',
                       };

    if(this.columnDefs[0].field !== "refunded" ) {
        this.columnDefs.unshift(isOpenColumn);
    }

    this.rowSelection = 'single';
    this.rowClassRules = {
                            'intend-1' : function (params:any) {
                                        return params.data.intend === 1;
                            },
                            'intend-2': function (params:any) {
                                                  return params.data.intend === 2
                                        },
                            'intend-3': function (params: any) {
                                                  return params.data.intend === 3
                                        },
                            'intend-4': function (params:any) {
                                                  return params.data.intend === 4
                                        },
                         };
    this.height      = ( this.height !== undefined) ? this.height : '60rem';
    this.width       = ( this.width !== undefined) ? this.width : '50rem',
    this.marginLeft  = ( this.marginLeft !== undefined) ? this.marginLeft : '0rem',
    this.marginRight = ( this.marginRight !== undefined) ? this.marginRight : '0rem'
  }

  ngDoCheck() {
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

  onGridReady = (params) => {
    this.gridOptions.api = params.api;
    this.gridOptions.columnApi = params.columnApi;
    this.gridOptions.api.showLoadingOverlay();
    /*if(this.metrics !== undefined ) {
        this.toggleDataGridColumns(this.metrics);

    }*/
    if(this.rowData !== undefined && this.rowData.length > 0) {
        if(this.gridOptions.api.rowData !== undefined) {
            this.gridOptions.api.rowData(this.dataRow);
        }

    }

    const updateData = (data) => {
      this.rowData = data ;
      this.gridOptions.api.hideOverlay();
    };

    if(this.data !== undefined ) {
        this.data(updateData);

    }

    if(this.rowData !== undefined && this.data === undefined) {
      this.gridOptions.api.hideOverlay();
    }
  }

  onRowClicked(e) {
      console.log("tree grid row clicked");
      if(this.onSelectedRow !== undefined && e.event.explicitOriginalTarget.localName === "input") {
          this.onSelectedRow(e.data);
      }
  }

}

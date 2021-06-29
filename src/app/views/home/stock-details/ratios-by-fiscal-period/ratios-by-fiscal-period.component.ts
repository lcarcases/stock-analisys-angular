import { Component, OnInit, DoCheck, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-ratios-by-fiscal-period',
  templateUrl: './ratios-by-fiscal-period.component.html',
  styleUrls: ['./ratios-by-fiscal-period.component.scss']
})
export class RatiosByFiscalPeriodComponent implements OnInit, DoCheck, OnDestroy {

  activesColumns: Array<Object>;
  @Input() stocksData: Array<Object>;
  responsiveDimentions = {
                            width: '',
                            height: '',
                            marginLeft: '',
                         };
  ratiosByFiscalPeriod = {
                           active_columns: undefined,
                           data: undefined
                         };

  constructor() {

    this.activesColumns = this.getActiveColumns(this.stocksData);
    let ratiosByFiscalPeriod = this.getRatiosByFiscalPeriod(this.stocksData);


    let responsiveDimentions = null;

    if( window.innerWidth > 375 && window.innerWidth <= 900) {
          responsiveDimentions = {};
          responsiveDimentions.width  = '67rem';
          responsiveDimentions.height = '52rem';
     }

    if(window.innerWidth <= 375) {
       responsiveDimentions = {};
       responsiveDimentions.width  = '45rem';
       responsiveDimentions.marginLeft = '4rem';
    }

    this.ratiosByFiscalPeriod = {
                            active_columns: this.activesColumns,
                            data: ratiosByFiscalPeriod
                          };
    this.responsiveDimentions = responsiveDimentions;


   }

  ngOnInit(): void {
  }

  ngDoCheck() {
  }

  ngOnDestroy() {
  }

  getRatiosByFiscalPeriod(stocksData) {
    let ratiosByFiscalPeriod = stocksData[0].ratiosByFiscalPeriod;
    let ratiosByFiscalPeriods = [];

    let metrics = Object.keys(ratiosByFiscalPeriod[0]);
    for(let i = 0; i < metrics.length; i++) {
        let currentRatioByFiscalPeriod = {
                                           metricFiscalPeriod: undefined,
                                         };
        let metric = metrics[i];
        for(let j = 0; j < ratiosByFiscalPeriod.length; j++) {
            if (ratiosByFiscalPeriod[j].hasOwnProperty(metric)) {
                let fiscalPeriod = this.setToCamelCase(ratiosByFiscalPeriod[j].fiscalPeriod);
                if(currentRatioByFiscalPeriod.metricFiscalPeriod === undefined) {
                    currentRatioByFiscalPeriod.metricFiscalPeriod = ratiosByFiscalPeriod[j][metric].name;
                }
                currentRatioByFiscalPeriod[fiscalPeriod] = ratiosByFiscalPeriod[j][metric].value;
            }
        }
        ratiosByFiscalPeriods.push(currentRatioByFiscalPeriod);
    }

    return ratiosByFiscalPeriods;
}

getActiveColumns(stocksData) {
    let ratiosByFiscalPeriod = stocksData[0].ratiosByFiscalPeriod;
    let activeHeaderColumns = [];
    let headerColumn = {
                     headerName: 'Metric/Fiscal Period',
                     field: 'metricFiscalPeriod',
                     position: 0
                   };
    activeHeaderColumns.push(headerColumn);
    for(let i = 0; i < ratiosByFiscalPeriod.length; i++) {
         let headerName = ratiosByFiscalPeriod[i].fiscalPeriod;
         let field      = this.setToCamelCase(ratiosByFiscalPeriod[i].fiscalPeriod);
         let position   = i+1;

         headerColumn = {
                          headerName,
                          field,
                          position
                        };
         activeHeaderColumns.push(headerColumn);
    }

    return activeHeaderColumns;
}

setToCamelCase(statementComponentName) {
    let arrStatementComponentName = statementComponentName.split(' ');

    let result = "";
    if(arrStatementComponentName.length > 1) {
        for (let i = 0; i < arrStatementComponentName.length; i++ ) {
            let currentWord = arrStatementComponentName[i];
            let tempWord = currentWord.toLowerCase();
            if(i === 0) {
              tempWord =  tempWord.substr(0,1).toLowerCase() + tempWord.substr(1);
            } else {
              tempWord =  tempWord.substr(0,1).toUpperCase() + tempWord.substr(1);
            }

            result += tempWord;
        }

    } else {
        result = arrStatementComponentName[0].toLowerCase();
    }

    return result;
 }

}

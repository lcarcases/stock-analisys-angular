import { Component, OnInit, DoCheck, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss']
})
export class BalanceSheetComponent implements OnInit, DoCheck, OnDestroy {

  @Input() stocksData: Array<Object>;
  metrics: Array<any>;
  activeColumns: Array<Object>;
  data: Array<any>;
  responsiveDimentions = {
                            width: undefined,
                            height: undefined,
                            marginLeft: undefined,
                            marginRight: undefined,
                         };

  constructor() { }

  ngOnInit(): void {

      let activeColumns = this.getActiveColumns(this.stocksData);
      this.activeColumns = activeColumns;
      let metricsOrdered = this.processData(this.stocksData);
      this.metrics = metricsOrdered;
      let dataToShow = this.getDataToShow(metricsOrdered,this.stocksData,true);
      console.log(this.stocksData);
      console.log(this.activeColumns);
      console.log(dataToShow);
      this.data = dataToShow;

      let responsiveDimentions = null;

      if( window.innerWidth > 375 && window.innerWidth <= 900) {
        responsiveDimentions = {};
        responsiveDimentions.width  = '67rem';
      }

      if(window.innerWidth <= 375) {
        responsiveDimentions = {};
        responsiveDimentions.width  = '20rem';
        responsiveDimentions.height  = '20rem';
        responsiveDimentions.marginLeft = '2.4rem';
      }

      this.responsiveDimentions = responsiveDimentions;

  }

  ngDoCheck() {
    if(window.innerWidth > 375 && window.innerWidth <= 900) {
      this.responsiveDimentions.width = '23rem';
      this.responsiveDimentions.height = '20rem';
      this.responsiveDimentions.marginLeft = '0.5rem';
    }
    console.log("Se va a renderizar la vista balance sheet");
  }

  ngOnDestroy() {

  }

  getActiveColumns(stocksData) {
    let ratiosByFiscalPeriod = stocksData.balanceSheet;
    let activeHeaderColumns = [];

    let headerColumn = {
                          headerName: 'Metric/Fiscal Period',
                          field: 'metricFiscalPeriod',
                          position: 1,
                          cellStyle: params => {
                                return this.setMetricCellStyle(params);
                          }
                       };
    activeHeaderColumns.push(headerColumn);
    for(let i = 0; i < ratiosByFiscalPeriod.length; i++) {
        let headerName = ratiosByFiscalPeriod[i].fiscalPeriod;
        let field      = this.setToCamelCase(ratiosByFiscalPeriod[i].fiscalPeriod);
        let position   = i+2;

        /*headerColumn.headerName = headerName;
        headerColumn.field = field;
        headerColumn.position = position; */
        let headerColumn = {
                            headerName: headerName,
                            field: field,
                            position: position,
                            cellStyle: params => {
                                  return this.setMetricCellStyle(params);
                            }
        };

        activeHeaderColumns.push(headerColumn);
    }

    return activeHeaderColumns;
}

processData(stocksData) {
    let metrics = this.sortStatementByPosition(stocksData.balanceSheet[0]);
    let metricsRowData = [];
    for(let i=0; i < metrics.length; i++) {
        let metric = metrics[i];
        if(metric.position == 127)
        {
          let test = 1;
        }
        if(metric.position === 1) {
          metricsRowData.push(metric);
        } else {
          let parentPosition = this.findParentPosition(metric,metrics,i-1);
          if(parentPosition !== -1) {
            if(metrics[parentPosition].children === undefined) {
              metrics[parentPosition].children = [];
              metrics[parentPosition].children.push(metric);
              metrics[parentPosition].isOpen = false;
            } else {
              metrics[parentPosition].children.push(metric);
              metrics[parentPosition].isOpen = false;
            }
            metric.parent = metrics[parentPosition];
          }
        }
    }

    return metrics;
}

findMetric(childrenMetric,dataToShow) {
    let found = false;
    let pos = -1;
    let i = 0;
    while (!found && i < dataToShow.length) {
        if(childrenMetric.key === dataToShow[i].key) {
          found = true;
          pos = i;
        } else {
          i++;
        }
    }

    return pos;
 }

sortStatementByPosition(statement) {
    let metrics = Object.keys(statement);
    let metricsToOrder = [];
    let key = '';
    for(let i=0; i < metrics.length; i++) {
        let metric = null;
        key = metrics[i];
        if(key !== 'fiscalPeriod' && key !== '_id') {
          key = metrics[i];
              metric = {
                         name: statement[key].name,
                         position: statement[key].position,
                         intend: statement[key].intend,
                         value: statement[key].value,
                         key: key,
                       };
          metricsToOrder.push(metric);
        }

    }

    return metricsToOrder.sort(function (metric1, metric2) {
                                 return  parseFloat(metric1.position) - parseFloat(metric2.position)
                               }
                              );
}

findParentPosition(metric,metrics,i) {
    let found = false;
    let pos = i;
    while (!found && pos >= 0) {
        if(metrics[pos].intend < metric.intend) {
            found = true;
        } else {
            pos--;
        }
    }

    return (found) ? pos : -1;
}

setMetricCellStyle(params) {

    let styles = undefined;

    if(params.data.intend === 1) {
        styles = {
                paddingLeft: "0rem"
              };
    } else if(params.data.intend === 2) {
        styles = {
                   paddingLeft: "2rem"
                 };
    } else if(params.data.intend === 3) {
        styles = {
                   paddingLeft: "4rem"
                 };
    } else if (params.data.intend === 4) {
        styles = {
                   paddingLeft: "6rem"
                 };
    } else {
       styles = {
         paddingLeft: "8rem"
       };
    }

    return styles;
}

getDataToShow(metricsOrdered,stocksData,isInitialData = true) {
    let balanceSheet = stocksData.balanceSheet;
    let ratiosByFiscalPeriods = [];

    for(let i = 0; i < metricsOrdered.length; i++) {
       let metric = metricsOrdered[i].key;
       let currentRatioByFiscalPeriod = {
                                          metricFiscalPeriod: undefined,
                                          key: '',
                                          intend: '',
                                          isOpen: undefined,
                                        };
       if(isInitialData && metricsOrdered[i].intend === 1) {
         for(let j = 0; j < balanceSheet.length; j++) {
            if (balanceSheet[j].hasOwnProperty(metric)) {
               let fiscalPeriod = this.setToCamelCase(balanceSheet[j].fiscalPeriod);
               if(currentRatioByFiscalPeriod.metricFiscalPeriod === undefined) {
                    currentRatioByFiscalPeriod.metricFiscalPeriod = balanceSheet[j][metric].name;
                    currentRatioByFiscalPeriod.key = metricsOrdered[i].key;
                    currentRatioByFiscalPeriod.intend = metricsOrdered[i].intend;
                    if(metricsOrdered[i].isOpen !== undefined) {
                      currentRatioByFiscalPeriod.isOpen = false;
                    }
               }
               currentRatioByFiscalPeriod[fiscalPeriod] = balanceSheet[j][metric].value;
            }
         }
         ratiosByFiscalPeriods.push(currentRatioByFiscalPeriod);
       } else {
          if(!isInitialData) {
            for(let j = 0; j < balanceSheet.length; j++) {
              if (balanceSheet[j].hasOwnProperty(metric)) {
                  let fiscalPeriod = this.setToCamelCase(balanceSheet[j].fiscalPeriod);
                  if(currentRatioByFiscalPeriod.metricFiscalPeriod === undefined) {
                        currentRatioByFiscalPeriod.metricFiscalPeriod = balanceSheet[j][metric].name;
                        currentRatioByFiscalPeriod.key = metricsOrdered[i].key;
                        currentRatioByFiscalPeriod.intend = metricsOrdered[i].intend;
                        if(metricsOrdered[i].isOpen !== undefined) {
                          currentRatioByFiscalPeriod.isOpen = false;
                        }
                  }
                  currentRatioByFiscalPeriod[fiscalPeriod] = balanceSheet[j][metric].value;
              }
            }
            ratiosByFiscalPeriods.push(currentRatioByFiscalPeriod);

          }
       }
    }

    return ratiosByFiscalPeriods;
}

onSelectedRow(selectedRow) {
    let data = this.data;
    let metricsOrdered = this.metrics;
    let dataToShow = [];

    data.forEach(function(metric) {
        if(metric.key === selectedRow.key) {
           if(metric.hasOwnProperty('isOpen')) {
              metric.isOpen = !metric.isOpen;
              let metricMetaData = this.getMetricMetadata(metricsOrdered, metric);
              metricMetaData.isOpen = metric.isOpen;
              dataToShow.push(metric);
              if(metric.isOpen) {
                dataToShow = this.addChildrenToDataToShow(metric,dataToShow,metricsOrdered);
              } else {
                //dataToShow = this.removeChildrenFromDataToShow(metric,dataToShow,metricsOrdered).bind(this)
              }
           }
        } else {
          let metricMetaData = this.getMetricMetadata(metricsOrdered, metric);
          if(metricMetaData.intend === 1) {
            dataToShow.push(metric);
          } else {
              if(metricMetaData.parent.isOpen) {
                 dataToShow.push(metric);
              } else {
                if(metricMetaData.hasOwnProperty('isOpen')) {
                   metricMetaData.isOpen = false;
                }
              }
          }
        }
    }.bind(this));
    this.data = dataToShow;
 }

 addChildrenToDataToShow(metric,dataToShow,metricsOrdered) {
    let metricChildren = this.getMetricChildren(metric,metricsOrdered);
    let childrenDataToShow = this.getDataToShow(metricChildren,this.stocksData,false);
    dataToShow = dataToShow.concat(childrenDataToShow);
    return dataToShow;
 }

 getMetricChildren(metric,metricsOrdered) {
    let found = false;
    let metricsChildren = [];
    let i = 0;
    while (!found && i < metricsOrdered.length) {
        if(metricsOrdered[i].key === metric.key) {
           found = true;
           metricsChildren = metricsOrdered[i].children;
        } else {
           i++;
        }
    }

    return metricsChildren;
 }

 getMetricMetadata(metricsOrdered, metric) {
    let found = false;
    let metricMetaData = null;
    let i = 0;
    while (!found && i < metricsOrdered.length) {
        if(metricsOrdered[i].key === metric.key) {
          found = true;
          metricMetaData = metricsOrdered[i];
        } else {
          i++;
        }
    }

    return metricMetaData;
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

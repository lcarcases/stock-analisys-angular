import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { CheckboxMetricModel } from './../../../models/CheckboxMetricModel';
import { AccordionModel } from './../../../models/AccordionModel';
import { StockModel } from './../../../models/StockModel';
import axios from 'axios';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit, DoCheck, OnDestroy {

  isCollapsedLateralMenu: Boolean;
  login: Boolean;
  metricsRuleNumerOneScore: Array<CheckboxMetricModel>;
  metricsPrice: Array<CheckboxMetricModel>;
  metricsValuation: Array<CheckboxMetricModel>;
  metricDividend: Array<CheckboxMetricModel>;
  metricExchange: Array<CheckboxMetricModel>;
  accordionModels: Array<AccordionModel>;
  metrics: Array<any>;
  activeColumns: Array<Object>;
  stockData: Array<Object>;//Array<StockModel>;
  registeredUser: any;

  accordionStyles = {
                      backgroundColor: '',
                      headerColor: '',
                      titleColor: ''
                    };

  headerStyles = {
                   stockName: {
                                marginLeft: '5rem'
                              },
                   searchInput: {
                                   marginLeft: '-1.8rem'
                                }
                 };


  constructor() {
        this.isCollapsedLateralMenu = false;
        this.login = true;
        this.stockData = [];
        this.metricsRuleNumerOneScore = [
              new CheckboxMetricModel("MOAT","moat", 1, this.changeMetricStatus.bind(this) ),
              new CheckboxMetricModel("MGT","mgt",2,this.changeMetricStatus.bind(this)),
              new CheckboxMetricModel("Predictability","predictability", 3, this.changeMetricStatus.bind(this)),
              new CheckboxMetricModel("BVPS Rating","bvpsRating", 4,this.changeMetricStatus.bind(this)),
              new CheckboxMetricModel("EPS Rating","epsRating", 5,this.changeMetricStatus.bind(this)),
              new CheckboxMetricModel("OCPS Rating","ocpsRating", 6,this.changeMetricStatus.bind(this)),
              new CheckboxMetricModel("Sales Rating","salesRating", 7,this.changeMetricStatus.bind(this)),
              new CheckboxMetricModel("ROIC Rating","roicRating", 8,this.changeMetricStatus.bind(this)),
              new CheckboxMetricModel("ROE Rating","roeRating", 9,this.changeMetricStatus.bind(this)),
        ];

        this.metricsPrice = [
              new CheckboxMetricModel("Closing Price","closingPrice",10,this.changeMetricStatus.bind(this)),
              new CheckboxMetricModel("Market Cap","marketCap",11,this.changeMetricStatus.bind(this)),
              new CheckboxMetricModel("52 Week Low","fiftyTwoWeekLow",12,this.changeMetricStatus.bind(this)),
              new CheckboxMetricModel("52 Week High","fiftyTwoWeekHigh",13,this.changeMetricStatus.bind(this)),
              new CheckboxMetricModel("50 Day Average","fiftyDayAverage",14,this.changeMetricStatus.bind(this)),
              new CheckboxMetricModel("200 Day Average","twoHundredDayAverage",15,this.changeMetricStatus.bind(this)),
              new CheckboxMetricModel("Volume","volume",16,this.changeMetricStatus.bind(this)),
              new CheckboxMetricModel("Beta","beta",17,this.changeMetricStatus.bind(this)),
        ];

        this.metricsValuation = [
             new CheckboxMetricModel("EPS","eps",18,this.changeMetricStatus.bind(this)),
             new CheckboxMetricModel("Growth Rate","growthRate",19,this.changeMetricStatus.bind(this)),
             new CheckboxMetricModel("P/E","pe",20,this.changeMetricStatus.bind(this)),
             new CheckboxMetricModel("Sticker Price","stickerPrice",21,this.changeMetricStatus.bind(this)),
             new CheckboxMetricModel("MOS Price","mosPrice",22,this.changeMetricStatus.bind(this)),
             new CheckboxMetricModel("PBT","pbt",23,this.changeMetricStatus.bind(this)),
        ];

        this.metricDividend = [
             new CheckboxMetricModel("Div. Recent Quarter","divRecentQuarter",24,this.changeMetricStatus.bind(this)),
             new CheckboxMetricModel("Div. Per Share","divPerShare",25,this.changeMetricStatus.bind(this)),
             new CheckboxMetricModel("Div. Yield (%)","divYield",26,this.changeMetricStatus.bind(this)),
        ];

        this.metricExchange = [
             new CheckboxMetricModel("NYSE","nyse",27,this.changeMetricStatus.bind(this)),
             new CheckboxMetricModel("Nasdaq","nasdaq",28,this.changeMetricStatus.bind(this)),
             new CheckboxMetricModel("AMEX","amex",29,this.changeMetricStatus.bind(this)),
             new CheckboxMetricModel("TSX","tsx",30,this.changeMetricStatus.bind(this)),
        ];

        this.accordionModels = [];
        this.accordionModels.push(
                                   new AccordionModel("Rule #1 Score",this.metricsRuleNumerOneScore),
                                   new AccordionModel("Price",this.metricsPrice),
                                   new AccordionModel("Valuation",this.metricsValuation),
                                   new AccordionModel("Dividend",this.metricDividend),
                                   new AccordionModel("Exchange",this.metricExchange)
                                 );
        this.metrics =  [
                          {headerName: "Symbol", field: "stockName", position: 0},
                          {headerName: "Moat", field: "moat", position: 1},
                          {headerName: "MGT", field: "mgt", position: 2},
                          {headerName: "Predictability", field: "predictability", position: 3},
                          {headerName: "BVPS Rating", field: "bvpsRating", position: 4},
                          {headerName: "EPS Rating", field: "epsRating", position: 5},
                          {headerName: "OCPS Rating", field: "ocpsRating", position:  6},
                          {headerName: "Sales Rating", field: "salesRating",position:  7},
                          {headerName: "Roic Rating", field: "roicRating", position:  8},
                          {headerName: "Roe Rating", field: "roeRating", position:  9},
                          {headerName: "Closing Price", field: "closingPrice", position:  10},
                          {headerName: "Market Cap", field: "marketCap", position: 11},
                          {headerName: "52 Week Low", field: "fiftyTwoWeekLow", position: 12},
                          {headerName: "52 Week High", field: "fiftyTwoWeekHigh", position: 13},
                          {headerName: "50 Day Average", field: "fiftyDayAverage", position: 14},
                          {headerName: "200 Day Average", field: "twoHundredDayAverage", position: 15},
                          {headerName: "Volume", field: "volume", position: 16},
                          {headerName: "Beta", field: "beta", position: 17},
                          {headerName: "EPS", field: "eps", position: 18},
                          {headerName: "Growth Rate", field: "growthRate", position: 19},
                          {headerName: "P/E", field: "pe", position: 20},
                          {headerName: "Sticker Price", field: "stickerPrice", position: 21},
                          {headerName: "MOS Price", field: "mosPrice", position: 22},
                          {headerName: "PBT", field: "pbt", position: 23},
                          {headerName: "Div. Recent Quarter", field: "divRecentQuarter", position: 24},
                          {headerName: "Div. Per Share", field: "divPerShare", position:  25},
                          {headerName: "Div. Yield (%)", field: "divYield", position:  26},
                        ];
          this.activeColumns = [
                                { headerName: "Symbol", field: "stockName", position: 0},
                                { headerName: "Moat", field: "moat", position: 1 },
                                { headerName: "EPS Rating", field: "epsRating", position: 5 },
                                { headerName: "EPS", field: "eps", position: 18 },
                                { headerName: "Growth Rate", field: "growthRate", position: 19 },
                                { headerName: "MOS Price", field: "mosPrice", position: 21 },
                                { headerName: "Sticker Price", field: "stickerPrice", position: 23 },
                              ];
          /*for(let i=0; i < 5; i++) {
            //let stock: StockModel = new StockModel();
            let stock = {
                         stockName: 'APPL - APPLE',
                         moat                 : Math.floor(Math.random() * 10).toString(),
                         mgt                  : Math.floor(Math.random() * 10).toString(),
                         predictability       : Math.floor(Math.random() * 10).toString(),
                         bvpsRating           : Math.floor(Math.random() * 10).toString(),
                         epsRating            : Math.floor(Math.random() * 10).toString(),
                         ocpsRating           : Math.floor(Math.random() * 10).toString(),
                         salesRating          : Math.floor(Math.random() * 10).toString(),
                         roicRating           : Math.floor(Math.random() * 10).toString(),
                         roeRating            : Math.floor(Math.random() * 10).toString(),
                         closingPrice         : Math.floor(Math.random() * 10).toString(),
                         marketCap            : Math.floor(Math.random() * 10).toString(),
                         fiftyTwoWeekLow      : Math.floor(Math.random() * 10).toString(),
                         fiftyTwoWeekHigh     : Math.floor(Math.random() * 10).toString(),
                         fiftyDayAverage      : Math.floor(Math.random() * 10).toString(),
                         twoHundredDayAverage : Math.floor(Math.random() * 10).toString(),
                         volume               : Math.floor(Math.random() * 10).toString(),
                         beta                 : Math.floor(Math.random() * 10).toString(),
                         growthRate           : Math.floor(Math.random() * 10).toString(),
                         eps                  : Math.floor(Math.random() * 10).toString(),
                         pe                   : Math.floor(Math.random() * 10).toString(),
                         stickerPrice         : Math.floor(Math.random() * 10).toString(),
                         mosPrice             : Math.floor(Math.random() * 10).toString(),
                         pbt                  : Math.floor(Math.random() * 10).toString(),
                         divRecentQuarter     : Math.floor(Math.random() * 10).toString(),
                         divPerShare          : Math.floor(Math.random() * 10).toString(),
                         divYield             : Math.floor(Math.random() * 10).toString(),
                        };
            this.stockData.push(stock);
          } */

          this.getStocks();

        this.accordionStyles.backgroundColor = '#1e2337';
        this.accordionStyles.headerColor = '#34495e';
        this.accordionStyles.titleColor = '#e29402';

        if(window.innerWidth > 375 && window.innerWidth <= 900) {
          this.headerStyles.searchInput.marginLeft = '-7.8rem';
        }
  }

  ngOnInit(): void {
    console.log("Se va a inicializar la vista Stocks");
    //this.rowData = this.http.get<any[]>('https://www.ag-grid.com/example-assets/small-row-data.json');

  }

  ngDoCheck() {
     console.log("Se va a renderizar la vista Stocks");
  }

  ngOnDestroy() {
    console.log("Se va a destruir la vista Stocks");
  }

  public notifyChangeCollapsedState(isCollapsedLateralMenu) {
    this.isCollapsedLateralMenu = isCollapsedLateralMenu;
  }

  changeMetricStatus(field: String, status: Boolean) {

      let metrics = this.metrics;
      let activeColumns = this.activeColumns;
      let posColumnActive = this.findMetric(activeColumns,field);

      if(status === true) {
          if(posColumnActive === -1) {
              let posMetric = this.findMetric(this.metrics,field);
              if(posMetric !== -1) {
                  let i = metrics[posMetric].position;
                  if(i < activeColumns.length) {
                      activeColumns.splice(i, 0, metrics[posMetric]);
                  } else {
                      activeColumns.push(metrics[posMetric]);
                  }

              }
          }
      } else {
          if(posColumnActive !== -1) {
              activeColumns.splice(posColumnActive,1);
          }
      }

      activeColumns = this.resetPositionColumns(activeColumns);
      this.activeColumns = activeColumns;


  }

  async getStocks(callback = null) {
            /*for(let i; i < 5; i++) {
              let stock: StockModel;
              stock.stockName = 'APPL - APPLE';
              stock.moat = Math.floor(Math.random() * 10).toString();
              stock.mgt  = Math.floor(Math.random() * 10).toString();
              stock.predictability = Math.floor(Math.random() * 10).toString();
              stock.bvpsRating = Math.floor(Math.random() * 10).toString();
              stock.epsRating = Math.floor(Math.random() * 10).toString();
              stock.ocpsRating = Math.floor(Math.random() * 10).toString();
              stock.salesRating = Math.floor(Math.random() * 10).toString();
              stock.roicRating = Math.floor(Math.random() * 10).toString();
              stock.roeRating = Math.floor(Math.random() * 10).toString();
              stock.closingPrice = Math.floor(Math.random() * 10).toString();
              stock.marketCap = Math.floor(Math.random() * 10).toString();
              stock.fiftyTwoWeekLow = Math.floor(Math.random() * 10).toString();
              stock.fiftyTwoWeekHigh = Math.floor(Math.random() * 10).toString();
              stock.fiftyDayAverage = Math.floor(Math.random() * 10).toString();
              stock.twoHundredDayAverage = Math.floor(Math.random() * 10).toString();
              stock.volume = Math.floor(Math.random() * 10).toString();
              stock.beta = Math.floor(Math.random() * 10).toString();
              stock.growthRate = Math.floor(Math.random() * 10).toString();
              stock.eps = Math.floor(Math.random() * 10).toString();
              stock.pe = Math.floor(Math.random() * 10).toString();
              stock.stickerPrice = Math.floor(Math.random() * 10).toString();
              stock.mosPrice = Math.floor(Math.random() * 10).toString();
              stock.pbt = Math.floor(Math.random() * 10).toString();
              stock.divRecentQuarter = Math.floor(Math.random() * 10).toString();
              stock.divPerShare = Math.floor(Math.random() * 10).toString();
              stock.divYield = Math.floor(Math.random() * 10).toString();

              this.stockData.push(stock);
            } */

    //const userRegistered = this.props.location.state;
    const userRegistered:any = null;
    axios.defaults.withCredentials = true;
    const res = await axios({
                              method: 'post',
                              url: 'http://127.0.0.1:3000/api/v1/stocks/all/',
                              //url: 'https://57407d327847.ngrok.io/api/v1/stocks/all/',
                              data: {
                                userRegistered: userRegistered
                              }
                              //withCredentials: true
                           });
    if(res.data.status === 'success') {
            this.stockData = res.data.stocks.map(function(actualStock) {
                let stock = {
                             stockName: '',
                             moat: '',
                             mgt: '',
                             predictability: '',
                             bvpsRating: '',
                             epsRating: '',
                             ocpsRating:'',
                             salesRating:'',
                             roicRating:'',
                             roeRating:'',
                             closingPrice:'',
                             marketCap:'',
                             fiftyTwoWeekLow:'',
                             fiftyTwoWeekHigh:'',
                             fiftyDayAverage:'',
                             twoHundredDayAverage:'',
                             volume:'',
                             beta:'',
                             growthRate:'',
                             eps:'',
                             pe:'',
                             stickerPrice:'',
                             mosPrice:'',
                             pbt:'',
                             divRecentQuarter:'',
                             divPerShare:'',
                             divYield:''
                            };
                stock.stockName = `${actualStock.symbol} - ${actualStock.company}`;
                stock.moat = actualStock.moat;
                stock.mgt  = actualStock.mgt;
                stock.predictability = actualStock.predictability;
                stock.bvpsRating = actualStock.bvpsRating;
                stock.epsRating = actualStock.epsRating;
                stock.ocpsRating = actualStock.ocpsRating;
                stock.salesRating = actualStock.salesRating;
                stock.roicRating = actualStock.roicRating;
                stock.roeRating = actualStock.roeRating;
                stock.closingPrice = actualStock.closePrice;
                stock.marketCap = actualStock.marketCap;
                stock.fiftyTwoWeekLow = actualStock.low52Week;
                stock.fiftyTwoWeekHigh = actualStock.high52Week;
                stock.fiftyDayAverage = actualStock.avg50Day;
                stock.twoHundredDayAverage = actualStock.avg200Day;
                stock.volume = actualStock.volume;
                stock.beta = actualStock.beta;
                stock.growthRate = actualStock.growthRate;
                stock.eps = actualStock.eps;
                stock.pe = actualStock.pe;
                stock.stickerPrice = actualStock.stickerPrice;
                stock.mosPrice = actualStock.mos;
                stock.pbt = actualStock.pbt;
                stock.divRecentQuarter = actualStock.divRecentQtr;
                stock.divPerShare = actualStock.divPerShare;
                stock.divYield = actualStock.divYield;
                return stock;
            });

            if(callback !== null) {
                callback(this.stockData);
            } else {
                this.stockData = this.stockData;

            }

            if(this.registeredUser === undefined &&
                res.data.registeredUser !== undefined
              ) {
                  this.registeredUser = res.data.registeredUser

                }

            console.log('success', `${res.data.stocks} updated successfully!`);

    } else if(res.data.status === 'notLogin') {
        this.login = false;
    }

  }

  findMetric(arrMetrics,field) {
    let i = arrMetrics.findIndex((metric) => {
        return (metric.field === field);
    });

    return i;
  }

  resetPositionColumns(activeColumns) {
    for(let i=0; i < activeColumns.length; i++) {
        let pos = this.findMetric(this.metrics,activeColumns[i].field);
        if(pos >= 0) {
            activeColumns[i].position = this.metrics[pos].position;
        }
    }

    return activeColumns;
 }


}

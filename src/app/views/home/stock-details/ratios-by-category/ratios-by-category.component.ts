import { Component, OnInit, DoCheck, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-ratios-by-category',
  templateUrl: './ratios-by-category.component.html',
  styleUrls: ['./ratios-by-category.component.scss']
})
export class RatiosByCategoryComponent implements OnInit, DoCheck, OnDestroy {

  @Input() stocksData: Array<Object>;
  responsiveDimentions = {
                            width: '',
                            height: '',
                            marginLeft: '',
                            marginRight: '',
                         };
  debtRatios = {
                  active_columns: [
                                    { headerName: "Debt Ratio", field: "debtRatio", position: 0},
                                    { headerName: "Value", field: "value", position: 1 }
                                  ],
                  data: undefined,
               };

  capitalRatios = {
                    active_columns: [
                                        { headerName: "Capital Ratio", field: "capitalRatio", position: 0},
                                        { headerName: "Value", field: "value", position: 1 }
                                    ],
                    data: undefined,
                  };

  liquidityRatios = {
                      active_columns: [
                                          { headerName: "Liquidity Ratio", field: "liquidityRatio", position: 0},
                                          { headerName: "Value", field: "value", position: 1 }
                                      ],
                      data: undefined,
                    };

  operatingRatios = {
                      active_columns: [
                                            { headerName: "Operating Ratio", field: "operatingRatio", position: 0},
                                            { headerName: "Value", field: "value", position: 1 }
                                        ],
                      data: undefined,
                   };

   priceMultiples = {
                      active_columns: [
                                         { headerName: "Price Multiple", field: "priceMultiple", position: 0},
                                         { headerName: "Value", field: "value", position: 1 }
                                      ],
                      data: undefined,
                   };

   payoutRatios = {
                      active_columns: [
                                        { headerName: "Payout Ratio", field: "payoutRatio", position: 0},
                                        { headerName: "Value", field: "value", position: 1 }
                                      ],
                     data: undefined,
                  };

  constructor() {

    let debtRatiosData    = this.getDebtRatiosData(this.stocksData);
    this.debtRatios.data  = debtRatiosData;
    let capitalRatiosData = this.getCapitalRatiosData(this.stocksData);
    this.capitalRatios.data = capitalRatiosData;
    let liquidityRatios   = this.getLiquidityRatiosData(this.stocksData);
    this.liquidityRatios.data = liquidityRatios;
    let operatingRatios   = this.getOperatingRatiosData(this.stocksData);
    this.operatingRatios.data = operatingRatios;
    let priceMultiples    = this.getPriceMultiplesData(this.stocksData);
    this.priceMultiples.data = priceMultiples;
    let payoutRatios      = this.getPayoutRatiosData(this.stocksData);
    this.payoutRatios.data = payoutRatios;
    let responsiveDimentions = null;


    if( window.innerWidth > 375 && window.innerWidth <= 900) {
        responsiveDimentions = {};
        responsiveDimentions.height = '19rem';
        responsiveDimentions.width  = '35rem';
        responsiveDimentions.marginLeft = '0rem';
    }

    if(window.innerWidth <= 375) {
     responsiveDimentions = {};
     responsiveDimentions.height = '15rem';
     responsiveDimentions.width  = '45rem';
     responsiveDimentions.marginLeft = '8rem';
    }

  }


  ngOnInit(): void {
  }

  ngDoCheck() {
  }

  ngOnDestroy() {
  }

  getDebtRatiosData(stocksData) {
      let debtRatiosData = stocksData[0].ratiosByCategory.debtRatios;
      let debtRatios = [];

      for(var key in debtRatiosData) {
          if (debtRatiosData.hasOwnProperty(key)) {
                let currentDebtRatio = {
                                         debtRatio: '',
                                         value: ''
                                       };
                currentDebtRatio.debtRatio = debtRatiosData[key].name;
                currentDebtRatio.value     = debtRatiosData[key].value;
                debtRatios.push(currentDebtRatio);
          }
      }

      return debtRatios;
  }

  getCapitalRatiosData(stocksData) {
      let capitalRatiosData = stocksData[0].ratiosByCategory.capitalRatios;
      let capitalRatios = [];

      for(var key in capitalRatiosData) {
          if (capitalRatiosData.hasOwnProperty(key)) {
              let currentCapitalRatio = {
                                          capitalRatio: '',
                                          value: '',
                                        };
              currentCapitalRatio.capitalRatio = capitalRatiosData[key].name;
              currentCapitalRatio.value  = capitalRatiosData[key].value;
              capitalRatios.push(currentCapitalRatio);
          }
      }

      return capitalRatios;
  }

  getLiquidityRatiosData(stocksData) {
      let liquidityRatiosData = stocksData[0].ratiosByCategory.liquidityRatios;
      let liquidityRatios = [];

      for(var key in liquidityRatiosData) {
          if (liquidityRatiosData.hasOwnProperty(key)) {
                let currentLiquidityRatio = {
                                              liquidityRatio: '',
                                              value: ''
                                            };
                currentLiquidityRatio.liquidityRatio = liquidityRatiosData[key].name;
                currentLiquidityRatio.value     = liquidityRatiosData[key].value;
                liquidityRatios.push(currentLiquidityRatio);
          }
      }

      return liquidityRatios;
  }


  getOperatingRatiosData(stocksData) {
      let operatingRatiosData = stocksData[0].ratiosByCategory.operatingRatios;
      let operatingRatios = [];

      for(var key in operatingRatiosData) {
        if (operatingRatiosData.hasOwnProperty(key)) {
            let currentOperatingRatio = {
                                          operatingRatio: '',
                                          value: ''
                                        };
            currentOperatingRatio.operatingRatio = operatingRatiosData[key].name;
            currentOperatingRatio.value     = operatingRatiosData[key].value;
            operatingRatios.push(currentOperatingRatio);
        }
      }

      return operatingRatios;
  }


  getPriceMultiplesData(stocksData) {
      let priceMultiplesData = stocksData[0].ratiosByCategory.priceMultiples;
      let priceMultiples = [];

      for(var key in priceMultiplesData) {
        if (priceMultiplesData.hasOwnProperty(key)) {
            let currentPriceMultiples = {
                                          priceMultiple: '',
                                          value: ''
                                        };
            currentPriceMultiples.priceMultiple = priceMultiplesData[key].name;
            currentPriceMultiples.value  = priceMultiplesData[key].value;
            priceMultiples.push(currentPriceMultiples);
        }
      }

      return priceMultiples;
  }

  getPayoutRatiosData(stocksData) {
      let payoutRatiosData = stocksData[0].ratiosByCategory.priceMultiples;
      let payoutRatios = [];

      for(var key in payoutRatiosData) {
          if (payoutRatiosData.hasOwnProperty(key)) {
                let currentPayoutRatios = {
                                            payoutRatio: '',
                                            value: ''
                                          };
                currentPayoutRatios.payoutRatio = payoutRatiosData[key].name;
                currentPayoutRatios.value     = payoutRatiosData[key].value;
                payoutRatios.push(currentPayoutRatios);
          }
      }

      return payoutRatios;
  }

}

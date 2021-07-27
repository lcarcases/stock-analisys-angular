import { Component, OnInit, DoCheck, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-mmm',
  templateUrl: './mmm.component.html',
  styleUrls: ['./mmm.component.scss']
})
export class MmmComponent implements OnInit, DoCheck, OnDestroy {

  @Input() stocksData: Array<Object>;
  thereIsData: Number;
  responsiveDimentions = {
                           width: '',
                           marginLeft: '',
                         };
  meaning = {
                active_columns: [
                                  { headerName: "Meaning", field: "meaning", position: 0},
                                  { headerName: "Rating", field: "rating", position: 1 }
                        ],
                data: undefined,
                style: {
                          height: '15rem',
                        }
              };

  moat = {
      active_columns: [
                        { headerName: "Moat: Compound Growth Rate", field: "moatCompoundGrowthRate", position: 0},
                        { headerName: "10 Years", field: "tenYears", position: 1 },
                        { headerName: "7 Years", field: "sevenYears", position: 2 },
                        { headerName: "5 Years", field: "fiveYears", position: 3 },
                        { headerName: "3 Years", field: "threeYears", position: 4 },
                        { headerName: "1 Years", field: "oneYears", position: 5 },
                        { headerName: "Rating", field: "rating", position: 6 }
                      ],
      data: undefined,
      style: {
                height: '100px',
              }
    };

    management = {
      active_columns: [
                       { headerName: "Management: Average Rate of Return", field: "managementAverageRateOfReturn", position: 0},
                       { headerName: "10 Years", field: "tenYears", position: 1 },
                       { headerName: "7 Years", field: "sevenYears", position: 2 },
                       { headerName: "5 Years", field: "fiveYears", position: 3 },
                       { headerName: "3 Years", field: "threeYears", position: 4 },
                       { headerName: "1 Years", field: "oneYears", position: 5 },
                       { headerName: "Rating", field: "rating", position: 6 }
                      ],
      data: undefined,
      style: {
               height: '100%',
             }
    };

  constructor() {
  }

  ngOnInit(): void {
    if(this.stocksData == undefined)  {
      this.thereIsData = 0;
    } else {
      this.thereIsData = 1;
    }
    console.log("Se ingreso al componente MMM", this.stocksData);
    let meaningData: any;
    let moatData: any;
    let managementData: any;

    if(this.stocksData !== undefined) {
      meaningData    = this.getMeaningData(this.stocksData);
      this.meaning.data  = meaningData;
      moatData   = this.getMoatData(this.stocksData);
      this.moat.data = moatData;
      managementData = this.getManagementData(this.stocksData);
      this.management.data = managementData;

    }

    if( window.innerWidth > 375 && window.innerWidth <= 900) {
          this.responsiveDimentions.width  = '67rem';
     }

     if(window.innerWidth <= 375) {
          this.responsiveDimentions.width  = '45rem';
          this.responsiveDimentions.marginLeft = '4rem';
     }
  }

  ngDoCheck() {
      console.log("Se ejecutó el doCheck de la vista MMM")
  }

  ngOnDestroy() {
  }

  getMeaningData(stocksData) {
    let meaning = stocksData[0].meaning;

    let meanings = [];

    for (let key in meaning) {
         if(meaning.hasOwnProperty(key)) {
              let currentMeaning = {
                                     meaning: '',
                                     rating: ''
                                   };
              currentMeaning.meaning = meaning[key].name;
              currentMeaning.rating  = meaning[key].rating;
              meanings.push(currentMeaning);
         }
    }

    return meanings;
}

getMoatData(stocksData) {
    let moat = stocksData[0].averageMoatMetrics;

    let moats = [];

    for (let key in moat) {
         if(moat.hasOwnProperty(key)) {
              let currentMoat = {
                                  moatCompoundGrowthRate: '',
                                  rating: ''
                                };
              currentMoat.moatCompoundGrowthRate = moat[key].name;
              currentMoat.rating  = moat[key].rating;
              if (typeof moat[key].averages !== 'undefined') {

                   for(let i = 0; i < moat[key].averages.length; i++) {
                          let actualYearData = moat[key].averages[i];
                          let keyYear = this.getKeyYear(actualYearData.years);
                          currentMoat[keyYear] = actualYearData.value;
                   }
              }
              moats.push(currentMoat);
         }
    }

    return moats;
}

getManagementData(stocksData) {
    let management = stocksData[0].averageMoatMetrics;

    let managements = [];

    for (let key in management) {
         if(management.hasOwnProperty(key)) {
              let currentManagement = {
                                       managementAverageRateOfReturn: '',
                                       rating: ''
                                      };
              currentManagement.managementAverageRateOfReturn = management[key].name;
              currentManagement.rating  = management[key].rating;
              if (typeof management[key].averages !== 'undefined') {

                   for(let i = 0; i < management[key].averages.length; i++) {
                          let actualYearData = management[key].averages[i];
                          let keyYear = this.getKeyYear(actualYearData.years);
                          currentManagement[keyYear] = actualYearData.value;
                   }
              }
              managements.push(currentManagement);
         }
    }

    return managements;
}

getKeyYear(year) {
    let key = "";
    switch (year) {
         case 10:
            key = "tenYears";
            break;
         case 7:
            key = "sevenYears";
           break;
         case 5:
           key = "fiveYears";
           break;
         case 3:
           key = "threeYears";
           break;
         case 1:
           key = "oneYears";
           break;
         case -1:
           key = "oneYears";
           break;
         default:
           key = "";
    }

    return key;
  }

}

import { Component, OnInit, DoCheck, OnDestroy, Input } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})

export class StockDetailsComponent implements OnInit, DoCheck, OnDestroy {

  login: Boolean;
  symbol: String;
  previusSymbol: String;
  stockData: Array<Object>;
  selectedItem: Number;
  loading: Boolean;
  registeredUser: any;
  username: String;

  headerStyles = {
                    stockName: {
                                 marginLeft: '',
                               },
                    searchInput: {
                                   marginLeft: '',
                                 },
                  };

  containerStyles = {
                      width: '',
                    };

  sideMenuStyles = {
                     height: '',
                   };

  constructor(private route: ActivatedRoute,
              private router: Router) {

      this.username = "";
      this.headerStyles.stockName.marginLeft = '5rem';
      this.headerStyles.searchInput.marginLeft = '3rem';

      if( this.selectedItem === 4 ) {
          if(window.innerWidth > 375 && window.innerWidth <= 900) {
            this.containerStyles.width = '95rem';
          } else if(window.innerWidth <= 375) {
              this.containerStyles.width = '45rem';
          } else {
              this.containerStyles.width = '92rem';
          }
      }

      if( this.selectedItem === 4 &&
          (window.innerWidth > 375 && window.innerWidth <= 900)
        ) {
              this.sideMenuStyles.height = '60.6rem';
          } else {
              this.sideMenuStyles.height = '50rem';
          }

      if(this.registeredUser !== undefined) {
          if('username' in this.registeredUser) {
               this.username = this.registeredUser.username;
          } else if('name' in this.registeredUser) {
               this.username = this.registeredUser.name;
          }
      }
      this.login = true;
      this.route.params.subscribe((params:Params) => {
        this.symbol = params.symbol;
        this.getDataStock();
      });
      this.previusSymbol = '';
      this.stockData = null;
      this.selectedItem = -1;
      this.loading = true;
      /*this.registeredUser = (
                        this.props.location !== undefined &&
                        this.props.location.state !== undefined &&
                        this.props.location.state.referrer !== undefined &&
                        this.props.location.state.referrer.registeredUser !== undefined &&
                        this.props.location.state.referrer.registeredUser[0] !== undefined
                      )
                      ? this.props.location.state.referrer.registeredUser[0]
                      : undefined, */


   }

  ngOnInit(): void {
  }

  ngDoCheck() {
    console.log("Se va a renderizar la vista  StockDetails");
  }

  ngOnDestroy() {
    console.log("Se va a destruir la vista  StockDetails");
  }

  public onClickSelectMenuItem(i:Number) {
       let j:Number = 0;
       // Aquí va  la lógica de lo que sucede al dar click
       // en un subitem del menú lateral
  }

  async getDataStock() {
    if( this.stockData === null || this.stockData === undefined) {
        if(!this.loading) {
            this.loading = true;
        }
        const res = await axios({
            url: `http://127.0.0.1:3000/api/v1/stocks/stock-by-symbol?symbol=${this.symbol}`
        });

        if(res.data.status === 'success') {
             let stockData = res.data.stock;
             stockData.incomeStatement = res.data.incomeStatement[0].incomeStatementByFiscalPeriod;
             stockData.balanceSheet = res.data.balanceSheet[0].balanceSheetByFiscalPeriod;
             stockData.cashflowStatement = res.data.cashFlowStatement[0].cashFlowStatementByFiscalPeriod;
             stockData.overview = res.data.overview;


             this.stockData = stockData;
             this.selectedItem =  2;
             this.loading = false,
             this.registeredUser = (
                                    this.registeredUser === undefined &&
                                    res.data.registeredUser !== undefined
                                   )
                                   ? res.data.registeredUser
                                   : undefined;


        } else if(res.data.status === 'notLogin') {
            this.login = false;
        }

    }
  }

}

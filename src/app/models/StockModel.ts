export class StockModel {

    private _stockName: String;
    private _moat: String;
    private _mgt: String;
    private _predictability: String;
    private _bvpsRating: String;
    private _epsRating: String;
    private _ocpsRating: String;
    private _salesRating: String;
    private _roicRating: String;
    private _roeRating: String;
    private _closingPrice: String;
    private _marketCap: String;
    private _fiftyTwoWeekLow: String;
    private _fiftyTwoWeekHigh: String;
    private _fiftyDayAverage: String;
    private _twoHundredDayAverage: String;
    private _volume: String;
    private _beta: String;
    private _growthRate: String;
    private _eps: String;
    private _pe: String;
    private _stickerPrice: String;
    private _mosPrice: String;
    private _pbt: String;
    private _divRecentQuarter: String;
    private _divPerShare: String;
    private _divYield: String;

    constructor() {

    }

    get stockName() {
        return this._stockName;
    }

    set stockName(stockName: String) {
        this._stockName = stockName;
    }

    get moat() {
        return this._moat;
    }

    set moat(moat: String) {
        this._moat = moat;
    }

    get mgt() {
        return this._mgt;
    }

    set mgt(mgt: String) {
        this._mgt = mgt;
    }

    get predictability() {
        return this._predictability;
    }

    set predictability(predictability: String) {
        this._predictability = predictability;
    }

    get bvpsRating() {
        return this._bvpsRating;
    }

    set bvpsRating(bvpsRating: String) {
        this._bvpsRating = bvpsRating;
    }

    get epsRating() {
        return this._epsRating;
    }

    set epsRating(epsRating: String) {
        this._epsRating = epsRating;
    }

    get ocpsRating() {
        return this._ocpsRating;
    }

    set ocpsRating(ocpsRating: String) {
        this._ocpsRating = ocpsRating;
    }

    get salesRating() {
        return this._salesRating;
    }

    set salesRating(salesRating: String) {
        this._salesRating = salesRating;
    }

    get roicRating() {
        return this._roicRating;
    }

    set roicRating(roicRating: String) {
        this._roicRating = roicRating;
    }

    get roeRating() {
        return this._roeRating;
    }

    set roeRating(roeRating: String) {
        this._roeRating = roeRating;
    }

    get closingPrice() {
        return this._closingPrice;
    }

    set closingPrice(closingPrice: String) {
        this._closingPrice = closingPrice;
    }

    get marketCap() {
        return this._marketCap;
    }

    set marketCap(marketCap: String) {
        this._marketCap = marketCap;
    }

    get fiftyTwoWeekLow() {
        return this._fiftyTwoWeekLow;
    }

    set fiftyTwoWeekLow(fiftyTwoWeekLow: String) {
        this._fiftyTwoWeekLow = fiftyTwoWeekLow;
    }

    get fiftyTwoWeekHigh() {
        return this._fiftyTwoWeekHigh;
    }

    set fiftyTwoWeekHigh(fiftyTwoWeekHigh: String) {
        this._fiftyTwoWeekHigh = fiftyTwoWeekHigh;
    }

    get fiftyDayAverage() {
        return this._fiftyDayAverage;
    }

    set fiftyDayAverage(fiftyDayAverage: String) {
        this._fiftyDayAverage = fiftyDayAverage;
    }

    get twoHundredDayAverage() {
        return this._twoHundredDayAverage;
    }

    set twoHundredDayAverage(twoHundredDayAverage: String) {
        this._twoHundredDayAverage = twoHundredDayAverage;
    }

    get volume() {
        return this._volume;
    }

    set volume(volume: String) {
        this._volume = volume;
    }

    get beta() {
        return this._beta;
    }

    set beta(beta: String) {
        this._beta = beta;
    }

    get growthRate() {
        return this._growthRate;
    }

    set growthRate(growthRate: String) {
        this._growthRate = growthRate;
    }

    get eps() {
        return this._eps;
    }

    set eps(eps: String) {
        this._eps = eps;
    }

    get pe() {
        return this._pe;
    }

    set pe(pe: String) {
        this._pe = pe;
    }

    get stickerPrice() {
        return this._stickerPrice;
    }

    set stickerPrice(stickerPrice: String) {
        this._stickerPrice = stickerPrice;
    }

    get mosPrice() {
        return this._mosPrice;
    }

    set mosPrice(mosPrice: String) {
        this._mosPrice = mosPrice;
    }

    get pbt() {
        return this._pbt;
    }

    set pbt(pbt: String) {
        this._pbt = pbt;
    }

    get divRecentQuarter() {
        return this._divRecentQuarter;
    }

    set divRecentQuarter(divRecentQuarter: String) {
        this._divRecentQuarter = divRecentQuarter;
    }

    get divPerShare() {
        return this._divPerShare;
    }

    set divPerShare(divPerShare: String) {
        this._divPerShare = divPerShare;
    }

    get divYield() {
        return this._divYield;
    }

    set divYield(divYield: String) {
        this._divYield = divYield;
    }


    // Falta completar este metodo toString()
    public toString() {
        return `[
                  stockName: ${this.stockName},
                  moat: ${this.moat},
                  mgt: ${this.mgt},
                  predictability: ${this.predictability},
                  epsRating: ${this.epsRating},
                  ocpsRating: ${this.ocpsRating},
                  salesRating: ${this.salesRating},
                  roicRating: ${this.roicRating},
                  roeRating: ${this.roeRating},
                  roeRating: ${this.roeRating},
                  closingPrice: ${this.closingPrice},
                  marketCap: ${this.marketCap},
                  fiftyTwoWeekLow: ${this.fiftyTwoWeekLow},
                  fiftyTwoWeekHigh: ${this.fiftyTwoWeekHigh},
                  fiftyDayAverage: ${this.fiftyDayAverage},
                  twoHundredDayAverage: ${this.twoHundredDayAverage},
                  volume: ${this.volume},
                  beta: ${this.beta},
                  growthRate: ${this.growthRate},
                  eps: ${this.eps},
                  pe: ${this.pe},
                  stickerPrice: ${this.stickerPrice},
                  mosPrice: ${this.mosPrice},
                  pbt: ${this.pbt},
                  divRecentQuarter: ${this.divRecentQuarter},
                  divPerShare: ${this.divPerShare},
                  divYield: ${this.divYield}
                ]`;
    }
}
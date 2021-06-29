export class CheckboxMetricModel {
      private _cbField: String
      private _cbText: String;
      private _changeEstatus: Function;
      private _key: Number;

      constructor(text:String,field:String,key:Number,changeEstatus: Function) {
           this._cbText = text;
           this._cbField = field;
           this._changeEstatus = changeEstatus;
           this._key = key;
      }

      get cbField() {
          return this._cbField;
      }

      set cbField(cbField: String) {
          this._cbField = cbField;
      }

      get cbText() {
          return this._cbText;
      }

      set cbText(cbText: String) {
          this._cbText = cbText;
      }

      get changeEstatus() {
          return this._changeEstatus;
      }

      set changeEstatus(changeEstatus: Function) {
          this._changeEstatus = changeEstatus;
      }

      get key() {
         return this._key;
      }

      set key(key: Number) {
          this._key = key;
      }

      public toString() {
            return `[
                      cbField: ${this.cbField},
                      cbText: ${this.cbText},
                      changeEstatus: ${this.changeEstatus}
                    ]`;
      }

}
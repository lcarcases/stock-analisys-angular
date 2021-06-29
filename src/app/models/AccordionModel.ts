import { CheckboxMetricModel } from './CheckboxMetricModel';

export class AccordionModel {

    _headerText: String;
    _checkboxMetricsModel: Array<CheckboxMetricModel>;

    constructor(headerText: String, checkboxMetricsModel: Array<CheckboxMetricModel>) {
         this._headerText = headerText;
         this._checkboxMetricsModel = checkboxMetricsModel;
    }

    get headerText() {
        return this._headerText;
    }

    set headerText(headerText: String) {
        this._headerText = headerText;
    }

    get checkboxMetricsModel() {
        return this._checkboxMetricsModel;
    }

    set checkboxMetricsModel(checkboxMetricsModel: Array<CheckboxMetricModel>) {
        this._checkboxMetricsModel = checkboxMetricsModel;
    }

}
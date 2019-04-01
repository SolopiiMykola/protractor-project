import Base from '../utils/Base';

const CONTROL_PANEL_TAB = 'Control Panel';

class ControlPanel extends Base {
  get url() {
    return `${this.baseUrl}/control-panel`;
  }

  get selector() {
    return element(by.css('div[layout-align="start center"]'));
  }

  get recurringTab() {
    return element(by.linkText(CONTROL_PANEL_TAB));
  }

  get generalSetting() {
    return element(by.cssContainingText('.settings-item-title', 'General'));
  }

  get timesToRetry() { return element(by.css('form[name=generalSettings] [name=timesToRetry]')); }
  everyPeriodSelect(period) {
    return element(by.cssContainingText(`md-option[value="${period}"]`, period));
  }
}

export default ControlPanel;

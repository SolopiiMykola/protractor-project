class SpecLogicBase {
  constructor() {
    this.page = null;
    this.EC = protractor.ExpectedConditions;
  }
  beforeAll() {
    this.page.autoLogin();
  }
  beforeEach() {
    this.page.get();
  }
}

export default SpecLogicBase;

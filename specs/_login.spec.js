import { LoginLogic } from '../specsLogic';

const loginLogic = new LoginLogic();

describe('login user', () => {
  beforeEach(loginLogic.beforeEach.bind(loginLogic));

  it('invalid_user', loginLogic.loginInvalidUser.bind(loginLogic));

  it('empty field', loginLogic.loginEmptyUser.bind(loginLogic));

  it('valid user', loginLogic.loginValidUser.bind(loginLogic));
});


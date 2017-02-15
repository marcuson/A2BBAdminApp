import { A2BBAdminAppPage } from './app.po';

describe('a2-bbadmin-app App', function() {
  let page: A2BBAdminAppPage;

  beforeEach(() => {
    page = new A2BBAdminAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

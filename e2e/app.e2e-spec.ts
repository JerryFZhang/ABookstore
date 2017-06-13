import { AngularBookstorePage } from './app.po';

describe('angular-bookstore App', () => {
  let page: AngularBookstorePage;

  beforeEach(() => {
    page = new AngularBookstorePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

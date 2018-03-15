import { OutsidePage } from './app.po';

describe('dispatch App', () => {
  let page: OutsidePage;

  beforeEach(() => {
    page = new OutsidePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

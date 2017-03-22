import { NhlStatsPage } from './app.po';

describe('nhl-stats App', () => {
  let page: NhlStatsPage;

  beforeEach(() => {
    page = new NhlStatsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { expect, device } from "detox";
import OnboardingSteps from "../models/onboarding/onboardingSteps";
import PortfolioPage from "../models/wallet/portfolioPage";
import MarketPage from "../models/market/marketPage";
import GetDevicePage from "../models/discover/getDevicePage";

let onboardingSteps: OnboardingSteps;
let portfolioPage: PortfolioPage;
let marketPage: MarketPage;
let getDevicePage: GetDevicePage;

describe("Onboarding - Read Only", () => {
  beforeAll(() => {
    onboardingSteps = new OnboardingSteps();
    portfolioPage = new PortfolioPage();
    marketPage = new MarketPage();
    getDevicePage = new GetDevicePage();
  });

  it("is able to buy a nano from the onboarding flow", async () => {
    await onboardingSteps.startOnboarding();
    await onboardingSteps.chooseNoLedgerYet();
    await onboardingSteps.chooseToBuyLedger();
    await getDevicePage.buyNano();
    await getDevicePage.expectBuyNanoWebPage();
  });

  it("goes through discover app and should see an empty portfolio page", async () => {
    await device.launchApp();
    await device.reloadReactNative();
    await onboardingSteps.startOnboarding();
    await onboardingSteps.chooseNoLedgerYet();
    await onboardingSteps.chooseToExploreApp();
    await portfolioPage.waitForPortfolioPageToLoad();
    await expect(portfolioPage.portfolioSettingsButton()).toBeVisible();
    await portfolioPage.waitForPortfolioReadOnly();
  });

  it("buy a nano from the market page", async () => {
    await portfolioPage.waitForPortfolioReadOnly();
    await portfolioPage.openWalletTabMarket();
    await marketPage.searchAsset("BTC");
    await marketPage.openAssetPage("Bitcoin (BTC)");
    await marketPage.buyAsset();
    await getDevicePage.buyNano();
    await getDevicePage.expectBuyNanoWebPage();
  });
});

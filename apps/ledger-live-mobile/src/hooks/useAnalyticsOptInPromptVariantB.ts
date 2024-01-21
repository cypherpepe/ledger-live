import { useSelector, useDispatch } from "react-redux";
import {
    analyticsEnabledSelector,
    personnalizedRecommendationsEnabledSelector,
} from "~/reducers/settings";
import { setAnalytics, setPersonnalizedRecommendations } from "~/actions/settings";
import { useNavigation } from "@react-navigation/native";
import { NavigatorName, ScreenName } from "~/const";
import { RootNavigationComposite, StackNavigatorNavigation } from "~/components/RootNavigator/types/helpers";
import { OnboardingNavigatorParamList } from "~/components/RootNavigator/types/OnboardingNavigator";
import { Linking } from "react-native";
import { urls } from "~/utils/urls";
import { useLocale } from "~/context/Locale";

const useAnalyticsOptInPrompt = () => {
    const { locale } = useLocale();
    const dispatch = useDispatch();
    const navigation = useNavigation<RootNavigationComposite<StackNavigatorNavigation<OnboardingNavigatorParamList>>>();
    const analyticsEnabled: boolean = useSelector(analyticsEnabledSelector);
    const personnalizedRecommendationsEnabled: boolean = useSelector(
        personnalizedRecommendationsEnabledSelector,
    );

    const toggleAnalytics = (value: boolean) => dispatch(setAnalytics(value));
    const togglePersonnalizedRecommendations = (value: boolean) =>
        dispatch(setPersonnalizedRecommendations(value));

    const continueOnboarding = () => {
        navigation.navigate(NavigatorName.BaseOnboarding, {
            screen: NavigatorName.Onboarding,
            params: {
                screen: ScreenName.OnboardingPostWelcomeSelection,
                params: {
                    userHasDevice: true,
                },
            },
        });
    };
    const goToPersonnalizedRecommendationsStep = () => {
        navigation.navigate(NavigatorName.AnalyticsOptInPrompt, {
            screen: ScreenName.AnalyticsOptInPromptDetails
        });
    };

    const clickOnRefuseAnalytics = () => {
        dispatch(setAnalytics(false));
        goToPersonnalizedRecommendationsStep();
    };
    const clickOnAllowAnalytics = () => {
        dispatch(setAnalytics(true));
        goToPersonnalizedRecommendationsStep();
    };
    const clickOnAllowPersonnalizedExperience = () => {
        dispatch(setPersonnalizedRecommendations(true));
        continueOnboarding();
    };
    const clickOnRefusePersonnalizedExperience = () => {
        dispatch(setPersonnalizedRecommendations(false));
        continueOnboarding();
    };
    const clickOnLearnMore = () => {
        Linking.openURL(
            (urls.privacyPolicy as Record<string, string>)[locale] || urls.privacyPolicy.en,
        );
    };

    return {
        analyticsEnabled,
        personnalizedRecommendationsEnabled,
        toggleAnalytics,
        togglePersonnalizedRecommendations,
        clickOnRefuseAnalytics,
        clickOnAllowAnalytics,
        clickOnAllowPersonnalizedExperience,
        clickOnRefusePersonnalizedExperience,
        clickOnLearnMore,
    };
};

export default useAnalyticsOptInPrompt;

/* @flow */
import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import type { Account } from "@ledgerhq/live-common/lib/types";

import LText from "./../../components/LText";
import HeaderRightClose from "../../components/HeaderRightClose";
import FilteredSearchBar from "../../components/FilteredSearchBar";
import Stepper from "../../components/Stepper";
import AccountCard from "../../components/AccountCard";
import StepHeader from "../../components/StepHeader";

import { accountsSelector } from "../../reducers/accounts";
import colors from "../../colors";

type Props = {
  accounts: Account[],
  navigation: NavigationScreenProp<{
    params: {},
  }>,
};

type State = {};

class SendFundsSelectAccount extends Component<Props, State> {
  static navigationOptions = ({ navigation }: *) => ({
    headerTitle: (
      <StepHeader title="Select an account" subtitle="step 1 of 5" />
    ),
    headerRight: <HeaderRightClose navigation={navigation} />,
  });

  renderItem = ({ item }: { item: Account }) => (
    <AccountCard
      account={item}
      style={{ backgroundColor: "transparent" }}
      onPress={() => {
        this.props.navigation.navigate("SendSelectRecipient", {
          accountId: item.id,
        });
      }}
    />
  );

  keyExtractor = item => item.id;

  render() {
    const { accounts } = this.props;
    return (
      <SafeAreaView style={styles.root}>
        <Stepper nbSteps={5} currentStep={1} />
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} enabled>
          <View style={styles.searchContainer}>
            <FilteredSearchBar
              list={accounts}
              renderList={items => (
                <FlatList
                  data={items}
                  renderItem={this.renderItem}
                  keyExtractor={this.keyExtractor}
                  showsVerticalScrollIndicator={false}
                />
              )}
              renderEmptySearch={() => (
                <View style={styles.emptyResults}>
                  <LText style={styles.emptyText}>No account found</LText>
                </View>
              )}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  accounts: accountsSelector(state),
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 18,
    flex: 1,
  },
  list: {
    paddingTop: 8,
  },
  emptyResults: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.fog,
  },
});

export default connect(mapStateToProps)(SendFundsSelectAccount);

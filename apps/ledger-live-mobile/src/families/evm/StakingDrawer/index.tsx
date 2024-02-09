import React, { useEffect } from "react";
import { useTheme } from "styled-components/native";

import { useFeature } from "@ledgerhq/live-common/featureFlags/index";
import { Flex, ScrollListContainer } from "@ledgerhq/native-ui";
import { Track, updateIdentify } from "~/analytics";
import { useRootDrawerContext } from "~/context/RootDrawerContext";
import { EvmStakingDrawerBody } from "./EvmStakingDrawerBody";
import QueuedDrawer from "~/components/QueuedDrawer";

import type { ListProvider } from "./types";

// compare functions for sorting providers list based on minimum required stake
const ascending = (a: ListProvider, b: ListProvider) => (a?.min || 0) - (b?.min || 0);
const descending = (a: ListProvider, b: ListProvider) => (b?.min || 0) - (a?.min || 0);

export function EvmStakingDrawer() {
  const { isOpen, onModalHide, openDrawer, onClose, drawer } = useRootDrawerContext();
  const ethStakingProviders = useFeature("ethStakingProviders");
  const providers = ethStakingProviders?.params?.listProvider;
  const stakingProvidersEnabled = providers && providers.length;

  const { theme: themeName } = useTheme();

  useEffect(() => {
    if (ethStakingProviders?.enabled || (providers ?? []).length > 0) {
      updateIdentify({ stakingProvidersEnabled });
      openDrawer();
    }
  }, [ethStakingProviders, openDrawer, providers, stakingProvidersEnabled]);

  if (!ethStakingProviders || drawer.id !== "EvmStakingDrawer") return null;

  const has32Eth = drawer.props.has32Eth ?? false;

  const listProvidersSorted = ethStakingProviders.params!.listProvider.sort(
    has32Eth ? descending : ascending,
  );

  return (
    <QueuedDrawer isRequestingToBeOpened={isOpen} onClose={onClose} onModalHide={onModalHide}>
      <Flex justifyContent={"center"}>
        <Track onMount event="ETH Stake Modal" />
        <ScrollListContainer
          directionalLockEnabled
          paddingX={4}
          alwaysBounceVertical={false}
          indicatorStyle={themeName === "dark" ? "white" : "default"}
        >
          <EvmStakingDrawerBody
            onClose={onClose}
            singleProviderRedirectMode={drawer.props.singleProviderRedirectMode ?? true}
            accountId={drawer.props.accountId}
            providers={listProvidersSorted}
          />
        </ScrollListContainer>
      </Flex>
    </QueuedDrawer>
  );
}

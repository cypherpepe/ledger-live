import { WebviewTag } from "electron";
import { LiveAppManifest } from "@ledgerhq/live-common/platform/types";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

import Web3AppWebview from "../Web3AppWebview";
import { TopBar, TopBarConfig } from "./TopBar";
import Box from "../Box";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

export const Wrapper = styled(Box).attrs(() => ({
  flex: 1,
}))`
  position: relative;
`;

export type WebPlatformPlayerConfig = {
  topBarConfig?: TopBarConfig;
};

interface Props {
  manifest: LiveAppManifest;
  inputs?: Record<string, string>;
  onClose?: () => void;
  config?: WebPlatformPlayerConfig;
}

export default function WebPlatformPlayer({ manifest, inputs, onClose, config }: Props) {
  const [webview, setWebview] = useState<WebviewTag>(null);

  const webviewRef = useCallback(node => {
    setWebview(node);
  }, []);

  return (
    <Container>
      <Wrapper>
        <TopBar
          manifest={manifest}
          onClose={onClose}
          webview={webview}
          config={config?.topBarConfig}
        />
        <Web3AppWebview manifest={manifest} inputs={inputs} ref={webviewRef} />
      </Wrapper>
    </Container>
  );
}

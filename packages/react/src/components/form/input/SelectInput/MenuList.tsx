import React from "react";
import { components, Styles, MenuListComponentProps } from "react-select";
import { DefaultTheme } from "styled-components";

export function getStyles(theme: DefaultTheme): Styles<any, any>["menuList"] {
  return (provided) => ({
    ...provided,
    display: "flex",
    flexDirection: "column",
    gap: theme.space[2],
    padding: theme.space[3],
    border: `1px solid ${theme.colors.palette.neutral.c20}`,
    borderRadius: "8px",
    boxShadow: `0px 2px 12px rgba(0, 0, 0, 0.04)`,
    background: theme.colors.palette.neutral.c00,
    color: theme.colors.palette.neutral.c80,
  });
}

export function MenuList(props: MenuListComponentProps<any, any>) {
  return <components.MenuList {...props}>{props.children}</components.MenuList>;
}

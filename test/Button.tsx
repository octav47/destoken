import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import { css, cx } from '@linaria/core';

import {
  body_text_typorgaphy,
  click_background_color_primary_button,
  click_font_color_primary_button,
  disable_background_color_primary_button,
  disable_font_color_primary_button,
  hover_background_color_primary_button,
  hover_font_color_primary_button,
  l_round,
  m_space,
  normal_background_color_primary_button,
  normal_font_color_primary_button,
  xs_space,
} from './typography';

const cssButton = css`
  ${body_text_typorgaphy}

  cursor: pointer;
  padding: ${xs_space.value} ${m_space.value};
  border: none;

  ${normal_background_color_primary_button}
  ${normal_font_color_primary_button}

  ${l_round}

  &:hover {
    ${hover_background_color_primary_button}
    ${hover_font_color_primary_button}
  }

  &:active {
    ${click_background_color_primary_button}
    ${click_font_color_primary_button}
  }
`;

const cssDisabled = css`
  ${disable_font_color_primary_button}
  ${disable_background_color_primary_button}
  
  cursor: initial;

  &:hover,
  &:active {
    ${disable_font_color_primary_button}
    ${disable_background_color_primary_button}
  }
`;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  disabled,
  children,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      disabled={disabled}
      className={cx(cssButton, disabled && cssDisabled)}
    >
      {children}
    </button>
  );
};

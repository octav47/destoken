import React, { FC, PropsWithChildren } from 'react'

export interface H1Props extends PropsWithChildren {}

export const H1: FC<H1Props> = ({ children }) => {
  return <h1>{children}</h1>
}

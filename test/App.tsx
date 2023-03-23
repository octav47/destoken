import React from 'react'

import { H1 } from './H1'

import styled from 'styled-components'

const padding = {
  padding: '10px',
}

const SButton = styled.button`
  color: red;
  ${padding}
`

export function App() {
  return (
    <div>
      h1:
      <br />
      <h1>Lorem ipsum</h1>
      <H1>Lorem ipsum</H1>
    </div>
  )
}

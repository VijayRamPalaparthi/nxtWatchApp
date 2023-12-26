import styled from 'styled-components'

export const PopupButton = styled.button`
  width: 80px;
  height: 35px;
  background-color: ${props => (props.outline ? 'transparent' : '#3b82f6')};
  border: ${props => (props.outline ? '1px solid white' : 'none')};
  color: #ffffff;
  cursor: pointer;
`

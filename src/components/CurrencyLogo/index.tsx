import { Currency, ETHER, Token ,WETH, ChainId} from 'fateswap-sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import EthereumLogo from '../../assets/images/ethereum-logo.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'

import DAILogo from '../../assets/tokens/dai-logo.png'
import USDCLogo from '../../assets/tokens/usdc-logo.png'
import USDTLogo from '../../assets/tokens/usdt-logo.png'
import WETHLogo from '../../assets/tokens/weth-logo.png'

import {DAI,USDT,USDC} from '../../constants/index'

const getTokenLogoURL = (address: string) => {
  if(address === DAI.address){
    return DAILogo;
  }
  if(address === USDC.address){
    return USDCLogo;
  }
  if(address === USDT.address){
    return USDTLogo;
  }
  console.log(WETH[ChainId.ZKSYNC_ERA_TESTNET])
  if(address === WETH[ChainId.ZKSYNC_ERA_TESTNET].address){
    return WETHLogo;
  }

  return "https://syncswap.xyz/images/unknown-token.svg";
}

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }

      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === ETHER) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}

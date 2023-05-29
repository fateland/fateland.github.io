import { ChainId } from 'fateswap-sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.ZKSYNC_ERA_TESTNET]: '0x47b3Ca0cF8D1E7306186654A041fdaC32D8Daeac'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }

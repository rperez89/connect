import { ErrorInvalid } from '../../errors'
import { StepDecoded } from '../../types'
import { isCallScript, decodeCallScript } from '../callScript'
import { isValidForwardCall, parseForwardCall } from '../forwarding'

/**
 * Decodes an EVM callscript and returns the transaction path it describes.
 *
 * @return An array of Ethereum transactions that describe each step in the path
 */
export function decodeForwardingPath(script: string): StepDecoded[] {
  // In the future we may support more EVMScripts, but for now let's just assume we're only
  // dealing with call scripts
  if (!isCallScript(script)) {
    throw new ErrorInvalid(`Script could not be decoded: ${script}`)
  }

  const path = decodeCallScript(script)
  console.log('PATH!!!! ', path)

  const decodedPath = path.map((step) => {
    const { data } = step

    let children
    if (isValidForwardCall(data)) {
      const forwardedEvmScript = parseForwardCall(data)

      try {
        children = decodeForwardingPath(forwardedEvmScript)
      } catch (err) {}
    }

    return {
      ...step,
      children,
    }
  })

  console.log('decoded Path ', decodedPath )

  return decodedPath
}

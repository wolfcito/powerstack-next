import type { AppProps } from 'next/app'
import { app_engine, useAppEngine } from '~/app-engine/index'
import { useEffect } from 'react'
import { Container } from '~/components/layout/index'
import '~/app-engine'
import { isBrowser } from '~/app-engine/library'

// NOTE: we are only using zustand on the client side for sharing state between components and ease optimistic ui updates.
//       we are not doing any hydration of the store from the server as in here. https://bit.ly/3uSGsm . its not necessary at the moment.
if (isBrowser && !app_engine.getState().zustand_initialized) {
  app_engine.setState({
    zustand_initialized: true,
    zustand_init_time: new Date(),
  })
  console.log('🗂 initialized zustand state')
  // initialize web3auth on first page load
  app_engine.getState().web3authInit()
}

function MyApp({ Component, pageProps }: AppProps) {
  const store = useAppEngine()

  // log the store state on every update
  useEffect(() => {
    if (!useAppEngine.getState())
      console.log('✓ zustand state updated', JSON.parse(JSON.stringify(useAppEngine.getState())))
  }, [store])

  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp

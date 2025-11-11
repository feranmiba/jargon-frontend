import {Suspense} from 'react'
import VerifyEmail from './components/Verify'


function page() {
  return (
    <Suspense fallback={<p>Loading verification...</p>}>
    <VerifyEmail />
  </Suspense>  )
}

export default page
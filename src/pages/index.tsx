import Image from 'next/image'
import Services from '../../components/home/Services'
import Interests from '../../components/home/interest/Interests'
import Steps from '../../components/home/steps/Steps'
import OverlaySearch from '../../components/home/overlayCards/OverlaySearch'

export default function Home() {
  return (
    <main
      className=' text-dark-text'
    >
      {/* <Services/>
      <Interests/>
      <Steps/> */}
      <div>
        <OverlaySearch/>
      </div>
    
    </main>
  )
}

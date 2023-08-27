import Image from 'next/image'
import Services from '../../components/home/Services'
import Interests from '../../components/home/interest/Interests'
import Steps from '../../components/home/steps/Steps'
import Hero from '../../components/home/hero/Hero'

export default function Home() {
  return (
    <main
      className=' text-dark-text flex gap-9 flex-col'
    >

      <Hero/>
      <Services/>
      <Interests />
      <Steps/>
    
    </main>
  )
}

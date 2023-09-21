import Image from 'next/image'
import Services from '../../components/home/Services'
import Interests from '../../components/home/interest/Interests'
import Steps from '../../components/home/steps/Steps'
import Hero from '../../components/home/hero/Hero'
import Header from '@/components/navigation/Header'

export default function Home() {
  return (
    <main
      className=' flex gap-9 flex-col'
    >

      <Hero/>
      <Services/>
      <Interests />
      <Steps/>
    
    </main>
  )
}

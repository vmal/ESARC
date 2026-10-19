import { type Metadata } from 'next'

import { HomeHero } from '@/components/home/Hero'
import { HomeContact } from '@/components/home/HomeContact'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Partners } from '@/components/home/Partners'
import { SelectedWork } from '@/components/home/SelectedWork'
import { ShippedFor } from '@/components/home/ShippedFor'
import { WhatWeBuild } from '@/components/home/WhatWeBuild'
import { isProductionDeploy } from '@/config/site'

// Title, description, Open Graph and Twitter come from the root layout.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function Home() {
  return (
    <>
      <HomeHero />
      <ShippedFor />
      <WhatWeBuild />
      <SelectedWork />
      <HowItWorks production={isProductionDeploy} />
      <Partners />
      <HomeContact />
    </>
  )
}

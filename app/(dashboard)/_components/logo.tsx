import Image from 'next/image'

export const Logo = () => {
  return (
    <Image
      height={70}
      width={70}
      alt='logo'
      src='/logo.svg'
    />
  )
}
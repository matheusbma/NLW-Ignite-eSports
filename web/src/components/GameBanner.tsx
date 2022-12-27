interface GameBannerProps {
  bannerUrl: string;
  gameName: string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <a href="" className='relative rounded-lg overflow-hidden'>
      <img src={props.bannerUrl} alt="" />

      <div className='w-full pt-16 pb-4 px-4 bg-gameGradient absolute bottom-0 left-0 right-0'>
        <strong className='font-bold text-white block'>{props.gameName}</strong>
        <span className='text-sm text-zinc-300 block'>{props.adsCount} anúncio(s)</span>
      </div>
    </a>
  )
}
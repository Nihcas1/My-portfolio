import Image from 'next/image';

export default function CloudRun() {
  return (
    <Image
      src="/skills/Cloudrun.png"
      alt="CloudRun"
      width={24}
      height={24}
      className="size-full object-contain"
    />
  );
}

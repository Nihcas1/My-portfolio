import Image from 'next/image';

export default function BigQuery() {
  return (
    <Image
      src="/skills/bigquery.png"
      alt="BigQuery"
      width={24}
      height={24}
      className="size-full object-contain"
    />
  );
}

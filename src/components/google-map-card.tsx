type GoogleMapCardProps = {
  title: string;
  address: string;
  mapQuery: string;
};

export function GoogleMapCard({ title, address, mapQuery }: GoogleMapCardProps) {
  const encodedQuery = encodeURIComponent(mapQuery || address);
  const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

  return (
    <section className="mt-8 rounded-3xl bg-[#fffaf0] p-6 ring-1 ring-black/5">
      <div className="p-6">
        <p className="text-sm font-black text-[#ed9805]">Location</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">{title}</h2>
        <p className="mt-2 text-sm font-bold leading-6 text-[#52615b]">{address}</p>
      </div>
      <div className="rounded-3xl bg-white p-5 ring-1 ring-black/5">
        <p className="text-sm leading-6 text-[#52615b]">
          지도를 화면에 직접 띄우지 않고 위치 확인용 링크만 제공합니다. 자세한
          길찾기와 주변 정보는 Google Maps에서 확인하세요.
        </p>
        <a
          className="mt-4 inline-flex rounded-full bg-[#10c4a9] px-5 py-3 text-sm font-black text-white"
          href={searchUrl}
          rel="noreferrer"
          target="_blank"
        >
          Open in Google Maps
        </a>
      </div>
    </section>
  );
}

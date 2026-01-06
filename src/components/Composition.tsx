"use client";
import Image from "next/image";

export default function Composition() {
  const mainFeatures = {
    glyukozamin: [
      "Bo'g'imlarda qulaylik hissini saqlab qolish",
      "Bo'g'imlarning harakatchanligini oshirish",
      "Xaftaga to'qimasida metabolik jarayonlarni yaxshilash",
    ],
    kondroitin: [
      "Sog'lom tog'ay to'qimasini qo'llab-quvvatlash",
      "Kollagen ishlab chiqarishni rag'batlantirish",
      "Bog'lamlarning elastikligi va moslashuvchanligi",
    ],
  };

  const minerals = [
    { name: "Kalsiy", desc: "Suyak to'qimasini mustahkamlaydi" },
    { name: "Magniy", desc: "Mushaklar va nerv tizimini normallashtiradi" },
    { name: "Fosfor", desc: "Energiya almashinuvi va suyak mineralizatsiyasi" },
    { name: "Vitamin D3", desc: "Kalsiyning so'rilishini ta'minlaydi" },
  ];

  return (
    <section className="w-full py-16 bg-gray-50/50 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-4">
        {/* Sarlavha */}
        <div className="text-center mb-16">
          <h2 className="text-[#1A1A1A] text-3xl md:text-5xl font-black italic leading-tight uppercase tracking-tighter">
            Boyitilgan <span className="text-red-600">Formula</span>
          </h2>
          <p className="text-gray-500 font-bold mt-4 uppercase text-xs tracking-[3px]">
            Sog'lom bo'g'imlar uchun kompleks yondashuv
          </p>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* 1-Karta: Glyukozamin */}
          <div className="w-full lg:w-[400px] bg-white rounded-[40px] p-8 md:p-10 shadow-xl border border-gray-100 relative z-10 transition-all hover:-translate-y-2">
            <div className="mb-8">
              <h3 className="text-[#FF9F43] text-2xl font-black uppercase italic">
                Glyukozamin
              </h3>
              <div className="h-1 w-12 bg-[#FF9F43] mt-2 rounded-full" />
            </div>
            <ul className="space-y-6">
              {mainFeatures.glyukozamin.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-red-600" />
                  </div>
                  <p className="text-[#1A1A1A] text-[14px] font-extrabold leading-snug uppercase">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* MARKAZIY QISM: Rasm va Minerallar */}
          <div className="flex flex-col items-center gap-8 z-20">
            <div className="w-48 h-48 md:w-64 md:h-64 relative group">
              <div className="absolute inset-0 bg-white rounded-full shadow-2xl flex items-center justify-center p-4 border-8 border-red-600/5">
                <Image
                  src="/bogim.png"
                  alt="Joint Health"
                  fill
                  className="object-contain p-6"
                />
              </div>
            </div>

            {/* Minerallar setkasi */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-[400px]">
              {minerals.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center"
                >
                  <h4 className="text-red-600 font-black text-xs uppercase mb-1">
                    {m.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-bold leading-tight">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2-Karta: Kondroitin */}
          <div className="w-full lg:w-[400px] bg-white rounded-[40px] p-8 md:p-10 shadow-xl border border-gray-100 relative z-10 transition-all hover:-translate-y-2">
            <div className="mb-8">
              <h3 className="text-[#FF9F43] text-2xl font-black uppercase italic">
                Kondroitin
              </h3>
              <div className="h-1 w-12 bg-[#FF9F43] mt-2 rounded-full" />
            </div>
            <ul className="space-y-6">
              {mainFeatures.kondroitin.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-red-600" />
                  </div>
                  <p className="text-[#1A1A1A] text-[14px] font-extrabold leading-snug uppercase">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

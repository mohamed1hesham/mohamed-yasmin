"use client";

import React, { useState } from "react";

export default function NileScene() {
  const [boatKey, setBoatKey] = useState(0);

  const handleRestartBoat = () => {
    setBoatKey((prev) => prev + 1);
  };

  return (
    <section className="reveal show my-2">
      <div className="scene select-none">
        {/* Glowing Sunset Sun */}
        <div className="scene-sun"></div>

        {/* Floating Sunset Clouds */}
        <div className="cloud one"></div>
        <div className="cloud two"></div>

        {/* Flying River Birds */}
        <div className="bird one">︿ ︿</div>
        <div className="bird two">︿ ︿</div>

        {/* Palm Trees */}
        <div className="tree one"></div>
        <div className="tree two"></div>

        {/* Island Landmass */}
        <div className="island"></div>

        {/* Island Grass */}
        <div className="grass"></div>

        {/* Villa La Riva */}
        <div className="villa">
          <div className="window one"></div>
          <div className="window two"></div>
          {/* Villa Sign */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#5d4329] text-[#fff7e6] text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap z-20">
            Villa La Riva
          </div>
        </div>

        {/* Flowing Nile Water */}
        <div className="water"></div>

        {/* Interactive Boat Sailing to Villa La Riva */}
        <div
          key={boatKey}
          className="boat select-none cursor-pointer"
          title="اضغط لإعادة إبحار المركب إلى Villa La Riva"
          onClick={handleRestartBoat}
        >
          ⛵
        </div>
      </div>

      {/* Atmospheric Wedding Story */}
      <div className="atmosphere text-center">
        ليلة تجمعنا على ضفاف النيل،

        وسط نسيم المساء وألوان الغروب،

        وفي أجواء هادئة تليق ببداية أجمل فصل في حكايتنا. ✨

        حضوركم هو أجمل ما يكتمل به هذا اليوم،
        وبوجودكم تصبح اللحظة ذكرى لا تُنسى. ❤️
      </div>
    </section>
  );
}

import Branding from "./SVGR/Branding";

export default function Header({showResume = true}) {
  return (
    <div className="grid grid-cols-9 items-center">
      <Branding className="col-span-3 h-[6vw] md:h-[4.8vw] lg:h-[3.2vw] w-auto" />
      
      <div className="col-start-6 col-span-4 md:col-start-7 md:col-span-3 lg:col-start-8 lg:col-span-2 h-full">
      {showResume && (
        <div className="flex flex-col h-full justify-between">
          <span className="caption font-medium md:title3 md:font-medium text-black">
            Available for Work
          </span>
          <span className="caption font-medium md:title3 md:font-medium text-stone-400 cursor-pointer transition-colors duration-300 hover:text-[#ff4c24a9]">
            View Resume
          </span>
        </div>
      )}
      </div>

    </div>
  );
}

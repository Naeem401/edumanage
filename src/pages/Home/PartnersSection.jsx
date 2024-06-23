import { FaWordpress } from "react-icons/fa6";
import { SiCisco, SiEricsson, SiSamsung, SiW3Schools } from "react-icons/si";

const PartnersSection = () => {
    return (
        <div className="bg-white shadow-xl py-10 w-[75%] mx-auto mt-8">
            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center underline">Our Partners</h2>
                <p className="text-center text-xl">Trusted by over 15,000 companies of learners around the world</p>
                <div className="mt-4 md:flex md:justify-around space-y-3">
                    <div className="flex"><FaWordpress  className="text-8xl text-[#00ffff] bg-black mx-auto"/></div>
                    <div className="flex"><SiSamsung  className="text-8xl text-[#00ffff] bg-black mx-auto"/></div>
                    <div className="flex"><SiCisco  className="text-8xl text-[#00ffff] bg-black mx-auto"/></div>
                    <div className="flex"><SiEricsson  className="text-8xl text-[#00ffff] bg-black mx-auto"/></div>
                    <div className="flex"><SiW3Schools  className="text-8xl text-[#00ffff] bg-black mx-auto"/></div>
                </div>
            </div>
        </div>
    );
};

export default PartnersSection;

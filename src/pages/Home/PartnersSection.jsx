import { FaWordpress } from "react-icons/fa6";
import { SiCisco, SiEricsson, SiSamsung, SiW3Schools } from "react-icons/si";

const PartnersSection = () => {
    return (
        <div className="bg-gray-100 py-10 w-[75%] mx-auto mt-8">
            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center">Our Partners</h2>
                <p className="text-center text-xl">Trusted by over 15,000 companies of learners around the world</p>
                <div className="mt-4 flex justify-around">
                    <div className="text-"><FaWordpress  className="text-8xl text-[#00ffff] bg-black"/></div>
                    <div className="text-"><SiSamsung  className="text-8xl text-[#00ffff] bg-black"/></div>
                    <div className="text-"><SiCisco  className="text-8xl text-[#00ffff] bg-black"/></div>
                    <div className="text-"><SiEricsson  className="text-8xl text-[#00ffff] bg-black"/></div>
                    <div className="text-"><SiW3Schools  className="text-8xl text-[#00ffff] bg-black"/></div>
                </div>
            </div>
        </div>
    );
};

export default PartnersSection;

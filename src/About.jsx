import "./index.css";
function About() {
    return (
        <div className="bg-black m-0 p-0">
            <div className="bg-linear-to-b from-red-300 to-black-500/0 opacity-25 h-40"></div>
            <section id="about" className="bg-black text-white flex items-center py-20 px-8">
            
            {/* Image */}
            <div className="w-1/2 flex justify-center">
                <div className=" overflow-hidden">
                    <img 
                        src="/personal-image-2.jpeg" 
                        alt="" 
                        className="w-full max-h-full object-fit max-w-md hover:scale-110 transition duration-300"
                    />
                </div>
            </div>

            {/* Text */}
            <div className="w-1/2 px-10">
                <p className="bg-[#ffffff10] p-10 rounded-2xl leading-relaxed text-gray-300">
                    I’m a passionate Web Developer focused on building modern, responsive web applications with clean design and smooth user experiences. I enjoy turning ideas into real, functional products using technologies like JavaScript and React. I’m constantly learning and improving my skills, with the goal of creating high-quality websites that are both visually appealing and performant.
                </p>
            </div>

        </section>
            
        </div>
        
    )
}
export default About
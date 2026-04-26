import "./Header.css";

function Header() {
    return (
        <body className="bg-black m-0 p-0">

            <div className="relative w-screen h-screen overflow-hidden">
                <video autoPlay muted loop src="src/assets/1.mp4" className="absolute top-0 left-0 w-full h-full object-cover"></video>
                <nav className="absolute z-10 text-white flex justify-between items-center w-full p-4 pr-50 pl-50">
                    <div className="">                    
                        <a href=""><img src="src/assets/HF.png" width={100} alt="" /></a>
                    </div>
                    <div className="p-4">
                        <a href="#home" className="hover:text-[20px] transition-all ease-in-out duration-300">Home</a>
                    </div>
                    
                    <div className="p-4">
                        <a href="#about" className="hover:text-2xl transition-all ease-in-out duration-300">About</a>
                    </div>
                    
                    <div className="p-4">
                        <a href="#contact" className="hover:text-2xl transition-all ease-in-out duration-300">Contact</a>
                    </div>

                    <div className="p-4">
                        <a href="#dashboard" className="hover:text-2xl transition-all ease-in-out duration-300">Dashboard</a>
                    </div>
                    
                </nav>
                <section className="absolute z-10 text-white text-center  p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="">
                        <h1 className="text-5xl font-bold">Web Developer creating modern, responsive, and user-focused web experiences.</h1>
                        <p className="text-2xl mt-4">React & Next.js</p>
                    </div>
                </section>
                <section className="absolute z-10 text-white text-center w-[30] p-4 bottom-10 left-1/2 transform -translate-x-1/2">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-center mb-5">Click to see more</h1>
                        <a href="#about" ><img src="src/assets/arrow-down.png" width={30} alt=""  className="hover:scale-125 transition-all ease-in-out duration-300"/></a>
                    </div>
                </section>
                            <div className="bg-gradient-to-b from-red-300 to-black-500/0 opacity-25 h-30"></div>

                <div className="absolute inset-x-0 bottom-0 h-30 bg-gradient-to-t from-red-300 to-black-500/0 opacity-17 pointer-events-none"></div>

            </div>
                                    

            
        </body>
        
    )
}
export default Header
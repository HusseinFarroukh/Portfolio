import "./index.css";

function Contact() {
    return (
        <div className="bg-black">
            <section id="contact" className="relative text-white py-20 px-8">
                <div className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-linear-to-b from-black via-black/70 to-transparent" />
                
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-12">Get In Touch</h2>
                    
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-lg mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-300 transition-all"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-lg mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-300 transition-all"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-lg mb-2">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-300 transition-all"
                                placeholder="Subject"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-lg mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                required
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-300 transition-all resize-none"
                                placeholder="Your message..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-300 text-black font-bold text-lg py-3 rounded-lg hover:bg-red-400 transition-all ease-in-out duration-300 transform hover:scale-105"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Contact;

import { useState, useEffect } from "react";
import "./index.css";

function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [projects, setProjects] = useState(() => {
        const savedProjects = localStorage.getItem("portfolio_projects");
        if (savedProjects) {
            try {
                const parsedProjects = JSON.parse(savedProjects);
                // Ensure all projects have required fields
                return parsedProjects.map(p => ({
                    ...p,
                    images: p.images || [p.image, p.image, p.image],
                    fullDescription: p.fullDescription || p.description,
                    link: p.link || "#"
                }));
            } catch (e) {
                console.error("Error loading projects:", e);
                return [];
            }
        }
        return [];
    });

    // Listen for storage changes (when updated from dashboard)
    useEffect(() => {
        const handleStorageChange = () => {
            const updated = localStorage.getItem("portfolio_projects");
            if (updated) {
                try {
                    const parsedProjects = JSON.parse(updated);
                    const validatedProjects = parsedProjects.map(p => ({
                        ...p,
                        images: p.images || [p.image, p.image, p.image],
                        fullDescription: p.fullDescription || p.description,
                        link: p.link || "#"
                    }));
                    setProjects(validatedProjects);
                } catch (e) {
                    console.error("Error updating projects:", e);
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <div className="bg-black">
            <section id="projects" className="relative text-white py-20 px-8">
                <div className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-linear-to-b from-black via-black/70 to-transparent" />
                
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-16">My Projects</h2>
                    
                    <div className="flex flex-wrap gap-8 justify-center">
                        {projects.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-gray-400 text-xl mb-4">No projects yet.</p>
                                <a
                                    href="#dashboard"
                                    className="inline-block bg-red-300 text-black font-bold px-6 py-2 rounded-lg hover:bg-red-400 transition-all ease-in-out duration-300"
                                >
                                    Go to Dashboard
                                </a>
                            </div>
                        ) : (
                            projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="group  overflow-hidden hover:border-red-300 transition-all ease-in-out duration-300 transform hover:scale-105 w-[calc(33.333%-1.5rem)]"
                                >
                                    <div className="relative h-64 overflow-hidden bg-gray-900">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-all ease-in-out duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all ease-in-out duration-300" />
                                    </div>
                                    
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                                        <p className="text-gray-300 mb-6">{project.description}</p>
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            className="inline-block bg-red-300 text-black font-bold px-6 py-2 rounded-lg hover:bg-red-400 transition-all ease-in-out duration-300 transform hover:scale-105"
                                        >
                                            View Project
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {selectedProject && (
                <>
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 flex justify-between items-center bg-gray-950 p-6 border-b border-gray-700">
                            <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="text-2xl text-gray-400 hover:text-white transition-all"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="p-8">
                            <p className="text-gray-300 text-lg mb-8">{selectedProject.fullDescription}</p>
                            
                            <h3 className="text-2xl font-bold text-white mb-6">Project Gallery</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {selectedProject.images.map((img, index) => (
                                    <div key={index} className="rounded-lg overflow-hidden border border-gray-700 hover:border-red-300 transition-all cursor-pointer" onClick={() => setSelectedImage(img)}>
                                        <img
                                            src={img}
                                            alt={`${selectedProject.title} ${index + 1}`}
                                            className="w-full h-48 object-cover hover:scale-110 transition-all ease-in-out duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )}

            {selectedImage && (
                <div className="fixed inset-0 bg-black/90 z-60 flex items-center justify-center p-4">
                    <div className="relative max-w-5xl w-full">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-70 text-white text-3xl"
                        >
                            ✕
                        </button>
                        <img
                            src={selectedImage}
                            alt="Selected project"
                            className="w-full max-h-[90vh] object-contain rounded-xl border border-gray-700"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Projects;

import { useState, useEffect } from "react";
import "./index.css";

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        fullDescription: "",
        images: [""],
    });

    // Load projects from localStorage on mount
    useEffect(() => {
        const savedProjects = localStorage.getItem("portfolio_projects");
        if (savedProjects) {
            setProjects(JSON.parse(savedProjects));
        }
    }, []);

    // Save projects to localStorage
    const saveProjects = (updatedProjects) => {
        localStorage.setItem("portfolio_projects", JSON.stringify(updatedProjects));
        setProjects(updatedProjects);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (index, file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData(prev => ({
                    ...prev,
                    images: prev.images.map((img, i) => i === index ? e.target.result : img)
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const addImageField = () => {
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ""]
        }));
    };

    const removeImageField = (index) => {
        if (formData.images.length > 1) {
            setFormData(prev => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index)
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate that at least one image is uploaded
        if (!formData.images.some(img => img && img.startsWith('data:'))) {
            alert("Please upload at least one image for the project.");
            return;
        }

        if (editingId) {
            // Update existing project
            const updatedProjects = projects.map(p =>
                p.id === editingId
                    ? { ...p, ...formData }
                    : p
            );
            saveProjects(updatedProjects);
            setEditingId(null);
        } else {
            // Add new project
            const newProject = {
                id: Date.now(),
                ...formData,
                image: formData.images[0] // Set main image to first uploaded image
            };
            saveProjects([...projects, newProject]);
        }

        setFormData({
            title: "",
            description: "",
            fullDescription: "",
            images: [""],
        });
        setShowForm(false);
    };

    const handleEdit = (project) => {
        setFormData({
            title: project.title,
            description: project.description,
            fullDescription: project.fullDescription,
            images: project.images || [project.image || ""],
        });
        setEditingId(project.id);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this project?")) {
            saveProjects(projects.filter(p => p.id !== id));
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData({
            title: "",
            description: "",
            fullDescription: "",
            images: [""],
        });
    };

    return (
        <div className="bg-black min-h-screen">
            <div className="max-w-7xl mx-auto py-12 px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-5xl font-bold text-white">Project Dashboard</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-red-300 text-black font-bold px-8 py-3 rounded-lg hover:bg-red-400 transition-all ease-in-out duration-300 transform hover:scale-105"
                    >
                        {showForm ? "Cancel" : "+ Add Project"}
                    </button>
                </div>

                {/* Add/Edit Project Form */}
                {showForm && (
                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6">
                            {editingId ? "Edit Project" : "Create New Project"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-white font-bold mb-2">Project Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-300 transition-all"
                                    placeholder="Enter project title"
                                />
                            </div>

                            <div>
                                <label className="block text-white font-bold mb-2">Short Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-300 transition-all"
                                    placeholder="Brief description for the portfolio"
                                />
                            </div>

                            <div>
                                <label className="block text-white font-bold mb-2">Full Description</label>
                                <textarea
                                    name="fullDescription"
                                    value={formData.fullDescription}
                                    onChange={handleInputChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-300 transition-all resize-none"
                                    placeholder="Detailed description for the project modal"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-white font-bold">Project Images</label>
                                    <button
                                        type="button"
                                        onClick={addImageField}
                                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-all"
                                    >
                                        + Add Image
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {formData.images.map((image, index) => (
                                        <div key={index} className="flex gap-2 items-center">
                                            <div className="flex-1">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageChange(index, e.target.files[0])}
                                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-300 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-300 file:text-black hover:file:bg-red-400"
                                                />
                                                {image && image.startsWith('data:') && (
                                                    <div className="mt-2">
                                                        <img
                                                            src={image}
                                                            alt={`Preview ${index + 1}`}
                                                            className="w-20 h-20 object-cover rounded border border-gray-600"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            {formData.images.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeImageField(index)}
                                                    className="bg-red-500 text-white px-3 py-3 rounded hover:bg-red-600 transition-all h-fit"
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-red-300 text-black font-bold py-3 rounded-lg hover:bg-red-400 transition-all ease-in-out duration-300"
                                >
                                    {editingId ? "Update Project" : "Create Project"}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 bg-gray-700 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition-all ease-in-out duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Projects List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-400 text-xl">No projects yet. Create your first project!</p>
                        </div>
                    ) : (
                        projects.map(project => (
                            <div key={project.id} className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:border-red-300 transition-all">
                                <div className="h-48 bg-gray-800 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="flex-1 bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition-all"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="flex-1 bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition-all"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

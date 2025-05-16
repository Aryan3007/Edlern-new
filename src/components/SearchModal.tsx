// SearchModal.tsx
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Fuse from "fuse.js";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react"; // Optional: icon lib
import { routesData } from "@/context/routesData";

interface Route {
    name: string;
    description: string;
    path: string;
    icon?: React.ReactNode;
}

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<Route[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const fuse = new Fuse(routesData, {
        keys: ["name", "description"],
        threshold: 0.3,
    });

    // Debounce logic
    useEffect(() => {
        const handler = setTimeout(() => {
            if (query.trim() !== "") {
                const res = fuse.search(query);
                setResults(res.map((r) => r.item));
            } else {
                setResults([]);
            }
        }, 300);
        return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        if (isOpen) {
            setQuery("");
            setResults([]);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div  className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl min-h-80 p-6 rounded-2xl shadow-2xl relative">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X size={20} />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">Search</h2>

            <input
                ref={inputRef}
                type="text"
                placeholder="Type to search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border border-gray-300 focus:border-sky-500 focus:ring focus:ring-sky-200 p-3 rounded-lg mb-6 outline-none transition-all"
            />

            <div className="space-y-3 max-h-72 overflow-y-auto">
                {results.length > 0 ? (
                results.map((route, index) => (
                    <div
                    key={index}
                    className="flex items-center p-3 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors"
                    onClick={() => {
                        navigate(route.path);
                        onClose();
                    }}
                    >
                    {route.icon && (
                        <span className="text-sky-500 text-xl mr-4">
                        {route.icon}
                        </span>
                    )}
                    <div>
                        <div className="font-medium text-gray-800">{route.name}</div>
                        <div className="text-sm text-gray-500">
                        {route.description}
                        </div>
                    </div>
                    </div>
                ))
                ) : (
                <div className="text-gray-500 text-center text-sm">
                    No results found.
                </div>
                )}
            </div>
            </div>
        </div>,
        document.body
    );
};

export default SearchModal;

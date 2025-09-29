import React, { useState, useCallback, useMemo } from 'react';

// --- Inline SVG Icons (Lucide) ---

// Upload Icon (Lucide style)
const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
  </svg>
);

// Close/X Icon (Lucide style)
const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);

// --- Component: CustomMessageBox (replaces alert()) ---

/** * Utility to display a temporary, non-blocking message, replacing window.alert().
 * This component is initialized once and controlled via global functions (show/hide).
 */
const CustomMessageBox: React.FC = () => {
    // State to hold the message and visibility
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    
    // Memoized show function to expose globally
    const showMessage = useMemo(() => (msg: string) => {
        setMessage(msg);
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 3000);
    }, []);

    // Effect to attach the showMessage function to the window object for global access
    React.useEffect(() => {
        (window as any).customAlert = showMessage;
        // Cleanup function (though usually not strictly needed in a single file React setup)
        return () => { (window as any).customAlert = undefined; };
    }, [showMessage]);

    const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-2xl transition-all duration-300 z-[999]";
    const visibilityClasses = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none";

    return (
        <div className={`${baseClasses} ${visibilityClasses} bg-green-600 text-white`}>
            <p>{message}</p>
        </div>
    );
};


// --- Component: FileUploadModal ---

export interface FileUploadModalProps {
  /** Controls the visibility of the modal. */
  isOpen: boolean;
  /** Callback function to close the modal. */
  onClose: () => void;
  /** Function to call when a file is successfully selected and confirmed for "upload". */
  onUpload: (file: File) => void;
  /** The acceptable file format (e.g., ".cdf"). */
  acceptFormat: string;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose, onUpload, acceptFormat }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLLabelElement>) => {
    let file: File | null = null;
    
    if ('dataTransfer' in event) {
        // Handle drop event
        file = event.dataTransfer.files?.[0] || null;
        event.preventDefault(); // Prevent opening the file in the browser
    } else {
        // Handle change event from input
        file = (event.target as HTMLInputElement).files?.[0] || null;
    }

    if (file) {
      setSelectedFile(file);
      console.log('Selected file:', file.name);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFile) {
      onUpload(selectedFile); // Call the external upload handler
      onClose();
      setSelectedFile(null); // Reset file selection after handler
    } else {
      (window as any).customAlert('Please select a file to upload.');
    }
  };

  const fileName = selectedFile ? selectedFile.name : null;

  return (
    // Modal Overlay (Fixed, dark background)
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-opacity duration-300">
      
      {/* Modal Content Container (White background, rounded, centered) */}
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto transform transition-all duration-300 ease-out p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        
        {/* Header and Close Button (Cross Button) */}
        <div className="flex justify-between items-start border-b pb-3 mb-4">
          <h3 id="modal-title" className="text-xl font-bold text-gray-800">
            Select Configuration Data File
          </h3>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            aria-label="Close upload modal"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* File Upload Form */}
        <form onSubmit={handleSubmit}>
          
          {/* File Input Area - Drag and Drop Style */}
          <label 
            className="block mb-6 cursor-pointer" 
            // Add drag/drop hover feedback styles
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-orange-500', 'bg-orange-50'); }}
            onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-orange-500', 'bg-orange-50'); }}
            onDrop={(e) => { e.currentTarget.classList.remove('border-orange-500', 'bg-orange-50'); handleFileChange(e); }}
          >
            <div className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg transition-colors bg-gray-50 text-center">
              <UploadIcon className="w-10 h-10 mx-auto text-orange-500 mb-3" />
              <p className="text-sm font-semibold text-gray-700">
                Drag and drop your file here, or <span className="text-orange-600 hover:text-orange-700 font-bold underline">browse</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {fileName ? `Selected: ${fileName}` : `Accepted format: ${acceptFormat} (Max 10MB)`}
              </p>
            </div>
            {/* The actual hidden file input */}
            <input 
              type="file" 
              accept={acceptFormat} 
              className="hidden" 
              onChange={handleFileChange} 
              id="file-upload-input"
            />
          </label>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={!selectedFile}
              className={`py-2 px-6 rounded-xl font-semibold transition-colors 
                ${selectedFile 
                  ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              Confirm Upload
            </button>
          </div>
          
        </form>
        
      </div>
    </div>
  );
};

// --- Main Application Component ---

const Uploadpop: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use useCallback to ensure stable function references
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  // Handler for when the upload is confirmed in the modal
  const handleUpload = (file: File) => {
      // Use the custom global alert function
      (window as any).customAlert(`File selected and simulation of upload started: ${file.name}`);
      // === In a real app, your API call or Firebase upload logic would start here ===
  }

  return (
    <div className=" flex flex-col items-center justify-center  font-sans">
        <button 
          onClick={openModal}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50"
        >
          <UploadIcon className="w-5 h-5" />
          Upload CDF File
        </button>

      {/* The Modal */}
      <FileUploadModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        onUpload={handleUpload} // Passing the handler for the upload action
        acceptFormat=".cdf" // Specifying the accepted file type
      />

      {/* The Custom Message Box */}
      <CustomMessageBox />

    </div>
  );
};

export default Uploadpop;

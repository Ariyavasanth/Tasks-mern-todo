import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 
                    backdrop-blur-sm bg-black/20">
      {/* Modal Box */}
      <div className="bg-white rounded-xl w-[90%] max-w-sm p-6 shadow-xl relative">
        <h2 className="text-xl font-bold mb-2 text-center">Login Required</h2>

        <p className="text-gray-500 text-center mb-6">
          Please login or create an account to continue.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              onClose();
              navigate("/login");
            }}
            className="bg-brand-primary text-white py-2 rounded-lg hover:bg-btn-hover"
          >
            Login
          </button>

          <button
            onClick={() => {
              onClose();
              navigate("/signup");
            }}
            className="border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
          >
            Signup
          </button>

          <button onClick={onClose} className="text-gray-400 text-sm mt-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
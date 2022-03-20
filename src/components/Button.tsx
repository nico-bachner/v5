export const Button: React.FC = ({ children }) => (
  <button className="transform rounded-lg bg-gradient-to-r from-cyan-400 to-blue-400 py-3 px-6 text-sm text-white shadow-lg shadow-sky-500/50 transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/50 md:text-base lg:text-lg">
    {children}
  </button>
)

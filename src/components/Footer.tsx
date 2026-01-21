import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-800 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm md:text-base">
              © {new Date().getFullYear()} Gambeta LLC. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-emerald-400 text-sm md:text-base transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-emerald-400 text-sm md:text-base transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export function Footer() {
  return (
    <footer className="py-10 px-5 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-auto">
      <p className="text-sm text-gray-600">© 2026 PureFlow Technologies Inc. All rights reserved.</p>
      <div className="flex items-center gap-6">
        <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Privacy</a>
        <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms</a>
        <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
      </div>
    </footer>
  );
}

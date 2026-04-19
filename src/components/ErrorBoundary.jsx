import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 text-center">
          <h1 className="text-4xl font-bold mb-4 text-[#FB6D48]">Oops! Something went wrong.</h1>
          <p className="text-lg text-white/60 mb-8 max-w-md">
            The application encountered an unexpected error. Please try refreshing the page or come back later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-[#84a738] rounded-full font-bold hover:scale-105 transition-transform"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

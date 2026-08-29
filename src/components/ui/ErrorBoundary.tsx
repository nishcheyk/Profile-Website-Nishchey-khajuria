import React from "react";
import Text from "./Text";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
          <Text as="h1" className="text-4xl font-bold mb-4 text-accent">Oops! Something went wrong.</Text>
          <Text className="text-lg text-secondary mb-8 max-w-md">
            The application encountered an unexpected error. Please try refreshing the page or come back later.
          </Text>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-white text-black rounded-full font-bold shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition-transform"
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

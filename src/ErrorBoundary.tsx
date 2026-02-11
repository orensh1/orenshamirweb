
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    // Explicitly define props to satisfy TypeScript if generic is ignored
    public readonly props: Props;

    public state: State = {
        hasError: false,
        error: null,
    };

    constructor(props: Props) {
        super(props);
        this.props = props;
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: "2rem", color: "white", backgroundColor: "black", height: "100vh", direction: "ltr" }}>
                    <h1>Something went wrong.</h1>
                    <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>
                        {this.state.error?.toString()}
                    </pre>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

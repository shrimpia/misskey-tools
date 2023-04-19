import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export type ErrorBoundaryProp = PropsWithChildren<{
	fallback: (e: Error) => React.ReactNode;
}>;

/**
 * https://dev.to/tylerlwsmith/error-boundary-causes-react-router-links-to-stop-working-50gb
 */
export const ErrorBoundary: React.FC<ErrorBoundaryProp> = (p) => {
  const [hasError, setHasError] = useState(false);
  const location = useLocation();

	useEffect(() => {
    if (hasError) {
      setHasError(false);
    }
  }, [location.key]);

	return (
    <Inner {...p} hasError={hasError} setHasError={setHasError}/>
  );
}

type InnerProp = ErrorBoundaryProp & { hasError: boolean, setHasError: (v: boolean) => void };
type InnerState = { error: Error | null };

class Inner extends React.Component<InnerProp, InnerState> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidUpdate(prevProps: (typeof this)['props']) {
    if(!this.props.hasError && prevProps.hasError) {
      this.setState({ error: null });
    }
  }

  componentDidCatch(error: Error) {
    this.props.setHasError(true);
  }

  render() {
		if (this.state.error) {
			return this.props.fallback(this.state.error);
		}
    return this.props.children;
  }
}

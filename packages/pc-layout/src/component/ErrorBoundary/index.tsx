import * as React from 'react';
import { Result, Typography } from 'antd';
import { formatMessage } from '../../utils/intl';
import { Exception500 } from '../Exception';

interface Error {
  componentStack?: string;
  error?: string;
  [key: string]: any;
}

interface IState {
  hasError?: boolean;
  error?: string;
  info?: {
    componentStack?: string;
  };
}

export interface IProps {
  /** 发生错误后的回调（可做一些错误日志上报，打点等） */
  onError?: (error: Error, info: any) => void;
}

const DefaultFallbackComponent = ({ componentStack, error }: Error) => (
  <Result
    status="error"
    title={formatMessage({ id: 'layout.global.error.title' })}
    subTitle={error!.toString()}
  >
    <Typography.Paragraph>
      {formatMessage({ id: 'layout.global.error.stack' })}：
      <pre>{componentStack}</pre>
    </Typography.Paragraph>
  </Result>
);

class ErrorBoundary extends React.Component<IProps, IState> {
  static defaultProps = {
    onError: null,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      hasError: false,
      error: '',
    };
  }

  componentDidCatch(error: any, info: any) {
    this.setState({
      error,
      info,
    });
    const { onError } = this.props;
    if (onError && typeof onError === 'function') {
      onError(error, info);
    }
  }

  render() {
    const { children, ...restProps } = this.props;
    const { hasError, error, info } = this.state;
    if (hasError) {
      return (
        // @ts-ignore
        (process.env.NODE_ENV === 'development' && (
          <DefaultFallbackComponent
            {...restProps}
            componentStack={info ? info.componentStack : ''}
            error={error}
          />
        )) || <Exception500 />
      );
    }
    return children;
  }
}

export default ErrorBoundary;

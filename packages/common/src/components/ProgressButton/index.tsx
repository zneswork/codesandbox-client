import React from 'react';
import { Button, IButtonProps } from '../Button';
import { Loader, RelativeButton } from './elements';

interface IProgressButtonProps extends IButtonProps {
  loading?: boolean;
}

const ProgressButton: React.FC<IProgressButtonProps> = ({
  loading = false,
  disabled = false,
  children,
  ...props
}) => (
  <RelativeButton disabled={disabled || loading} {...props}>
    {children}
    {loading && <Loader />}
  </RelativeButton>
);

export default ProgressButton;

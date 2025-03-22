import { metadata } from './layout.metadata';

export { metadata };

export default function ScanSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="scan-success-layout">
      {children}
    </div>
  );
} 
import Navigation from './Navigation/Navigation';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4">{children}</main>
    </>
  );
}

import Navigation from './Navigation';

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4">{children}</main>
    </>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * Auth protection is handled at the proxy layer (proxy.ts).
   * This layout is a shell placeholder — extend with sidebar/nav
   * when building the admin UI.
   */
  return <>{children}</>;
}

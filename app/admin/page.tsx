export default function AdminPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">ACM NIT Surat</h1>
        <p className="text-gray-400">Admin panel — backend ready.</p>
        <p className="text-gray-500 text-sm mt-4">
          Connect your frontend UI to the API routes under{" "}
          <code className="text-blue-400">/api/admin/*</code>
        </p>
      </div>
    </main>
  );
}

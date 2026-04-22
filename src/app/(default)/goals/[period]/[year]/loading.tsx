import LoadingSpinner from "@/components/loading/loading-spinner";

export default function Loading() {
  return (
    <main style={{ height: '100vw', display: 'grid', placeItems: 'center' }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <p>Loading Goals...</p>
        <LoadingSpinner />
      </div>
    </main>
  );
}
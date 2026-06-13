export default function AdminLoading() {
  return (
    <div className="admin-inner">
      <div className="section-label">Admin</div>
      <div className="admin-toolbar">
        <h1 className="admin-title">Listings</h1>
      </div>
      <div className="admin-table-wrap">
        <p className="admin-empty">Loading listings…</p>
      </div>
    </div>
  )
}

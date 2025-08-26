@@ -47,15 +47,25 @@
   decorate() {
     return (
-
-      <div
-  style={{
-    display: "flex",
-    alignItems: "center",
-    textAlign: "center",
-    margin: "20px 0",
-    color: "#999",
-    fontSize: "14px",
-    fontWeight: "500",
-  }}
->
-  <div style={{ flex: 1, borderTop: "1px dashed #ccc" }}></div>
-  <span style={{ margin: "0 10px", whiteSpace: "nowrap" }}>Page Break</span>
-  <div style={{ flex: 1, borderTop: "1px dashed #ccc" }}></div>
-</div>
+      <div
+        className="page-break-indicator"
+        style={{
+          display: "flex",
+          alignItems: "center",
+          textAlign: "center",
+          margin: "40px 0",
+          padding: "20px 0",
+          color: "#666",
+          fontSize: "12px",
+          fontWeight: "500",
+          background: "linear-gradient(90deg, transparent, #f0f0f0 20%, #f0f0f0 80%, transparent)",
+          borderRadius: "4px",
+          position: "relative"
+        }}
+      >
+        <div style={{ flex: 1, borderTop: "2px dashed #ccc" }}></div>
+        <span style={{ margin: "0 15px", whiteSpace: "nowrap", background: "white", padding: "5px 10px", borderRadius: "15px", border: "1px solid #ddd" }}>
+          📄 Page Break
+        </span>
+        <div style={{ flex: 1, borderTop: "2px dashed #ccc" }}></div>
+      </div>
     );
   }
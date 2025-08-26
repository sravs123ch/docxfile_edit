@@ -3,12 +3,18 @@
 
 export const MuiContentEditable = styled(ContentEditable)({
-  minHeight: 300,
-  width: "100%",
-  padding: "0 8px",
-  borderRadius: 5,
-  paddingTop: 2,
-  paddingLeft: 10,
+  minHeight: "9in", // A4 content height
+  width: "6.5in", // A4 content width
+  padding: 0,
+  margin: 0,
+  border: "none",
+  borderRadius: 0,
   position: "relative",
   outline: "none",
   lineHeight: 1.6,
   fontSize: "12pt", // Standard document font size
-  fontFamily: "Arial, sans-serif",
+  fontFamily: "Times New Roman, serif", // Standard document font
+  color: "#000",
+  background: "transparent",
+  wordWrap: "break-word",
+  overflowWrap: "break-word",
+  hyphens: "auto"
 });
 
 export const placeHolderSx = {
   position: "absolute",
-  top: 15,
-  left: 10,
+  top: 0,
+  left: 0,
   userSelect: "none",
   display: "inline-block",
   pointerEvents: "none",
-  fontSize: "15px",
-  lineHeight: 1.4,
+  fontSize: "12pt",
+  lineHeight: 1.6,
+  color: "#999",
+  fontFamily: "Times New Roman, serif"
 };
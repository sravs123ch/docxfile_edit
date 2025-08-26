@@ -1,4 +1,4 @@
 import { $getRoot, $getSelection, $isRangeSelection } from "lexical";
-import { useEffect, useState } from "react";
+import { useEffect, useState, useRef } from "react";
 import { LexicalComposer } from "@lexical/react/LexicalComposer";
 import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
@@ -6,7 +6,7 @@
 import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
 import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
 import { MuiContentEditable, placeHolderSx } from "./styles";
-import { Box, Divider } from "@mui/material";
+import { Box, Divider, Paper } from "@mui/material";
 import { lexicalEditorConfig } from "../../config/lexicalEditorConfig";
 import LexicalEditorTopBar from "../LexicalEditorTopBar";
 import TreeViewPlugin from "../CustomPlugins/TreeViewPlugin";
@@ -35,6 +35,8 @@
 import TableActionMenuPlugin from "../CustomPlugins/TableActionMenuPlugin";
 
 function LexicalEditorWrapper(props) {
+  const [pages, setPages] = useState([1]);
+  const editorContainerRef = useRef(null);
 
 	// Function to handle DOCX download
 	const handleDownloadDocx = async (editor) => {
@@ -665,19 +667,89 @@
 		saveAs(blob, "document.docx");
   };
 
+  // Function to handle page overflow and create new pages
+  const handleContentChange = () => {
+    if (!editorContainerRef.current) return;
+    
+    const container = editorContainerRef.current;
+    const pageHeight = 1056; // A4 page height in pixels (11 inches * 96 DPI)
+    const contentHeight = container.scrollHeight;
+    const requiredPages = Math.ceil(contentHeight / pageHeight);
+    
+    if (requiredPages !== pages.length) {
+      setPages(Array.from({ length: Math.max(1, requiredPages) }, (_, i) => i + 1));
+    }
+  };
+
   return (
-    <LexicalComposer initialConfig={lexicalEditorConfig}>
-      
-      <LexicalEditorTopBar onDownloadDocx={handleDownloadDocx} />
-      <Divider />
-      <Box sx={{ position: "relative", background: "white" }}>
-        <RichTextPlugin
-          contentEditable={<MuiContentEditable />}
-          placeholder={<Box sx={placeHolderSx}>Enter some text...</Box>}
-          ErrorBoundary={LexicalErrorBoundary}
-        />
-        <HistoryPlugin />
-
-        <ListPlugin />
-        <LinkPlugin />
-        <ImagesPlugin captionsEnabled={false} />
-        <FloatingTextFormatToolbarPlugin />
-        <TablePlugin />
-        <TableResizePlugin />
-        <TableActionMenuPlugin />
-        <MyCustomAutoFocusPlugin/>
+    <Box sx={{ 
+      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
+      minHeight: "100vh",
+      padding: "20px 0"
+    }}>
+      <LexicalComposer initialConfig={lexicalEditorConfig}>
+        <LexicalEditorTopBar onDownloadDocx={handleDownloadDocx} />
+        <Divider />
+        
+        {/* Page Container */}
+        <Box sx={{ 
+          display: "flex", 
+          flexDirection: "column", 
+          alignItems: "center",
+          padding: "20px",
+          gap: "20px"
+        }}>
+          {pages.map((pageNumber, index) => (
+            <Paper
+              key={pageNumber}
+              elevation={8}
+              sx={{
+                width: "8.5in", // A4 width
+                minHeight: "11in", // A4 height
+                maxHeight: index === pages.length - 1 ? "none" : "11in",
+                padding: "1in", // 1 inch margins
+                background: "white",
+                position: "relative",
+                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
+                border: "1px solid #e0e0e0",
+                overflow: index === pages.length - 1 ? "visible" : "hidden",
+                "&:hover": {
+                  boxShadow: "0 6px 25px rgba(0,0,0,0.15)"
+                }
+              }}
+            >
+              {/* Page Number */}
+              <Box sx={{
+                position: "absolute",
+                bottom: "0.5in",
+                right: "1in",
+                fontSize: "10px",
+                color: "#666",
+                fontFamily: "Arial, sans-serif"
+              }}>
+                {pageNumber}
+              </Box>
+              
+              {/* Editor Content - Only render on first page, others will overflow naturally */}
+              {index === 0 && (
+                <Box 
+                  ref={editorContainerRef}
+                  sx={{ 
+                    position: "relative", 
+                    minHeight: "9in", // Content area height (11in - 2in margins)
+                    width: "6.5in" // Content area width (8.5in - 2in margins)
+                  }}
+                >
+                  <RichTextPlugin
+                    contentEditable={<MuiContentEditable />}
+                    placeholder={<Box sx={placeHolderSx}>Enter some text...</Box>}
+                    ErrorBoundary={LexicalErrorBoundary}
+                  />
+                  <HistoryPlugin />
+                  <ListPlugin />
+                  <LinkPlugin />
+                  <ImagesPlugin captionsEnabled={false} />
+                  <FloatingTextFormatToolbarPlugin />
+                  <TablePlugin />
+                  <TableResizePlugin />
+                  <TableActionMenuPlugin />
+                  <MyCustomAutoFocusPlugin/>
+                  <OnChangePlugin onChange={handleContentChange} />
+                </Box>
+              )}
+            </Paper>
+          ))}
+        </Box>
+      </LexicalComposer>
     </Box>
-    </LexicalComposer>
   );
 }
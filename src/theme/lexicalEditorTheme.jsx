@@ -1,4 +1,5 @@
 const lexicalEditorTheme = {
+  // Document structure
   ltr: "ltr",
   rtl: "rtl",
   placeholder: "editor-placeholder",
@@ -6,6 +7,11 @@
   pageBreak: "page-break-node",
+  
+  // Page-specific styles
+  page: "document-page",
+  pageNumber: "page-number",
+  
+  // Table styles
   table: "PlaygroundEditorTheme__table",
   tableAddColumns: "PlaygroundEditorTheme__tableAddColumns",
   tableAddRows: "PlaygroundEditorTheme__tableAddRows",
@@ -20,6 +26,7 @@
   tableResizeRuler: "PlaygroundEditorTheme__tableCellResizeRuler",
   tableSelected: "PlaygroundEditorTheme__tableSelected",
+  
   quote: "editor-quote",
   heading: {
     h1: "editor-heading-h1",
@@ -29,6 +36,7 @@
     h4: "editor-heading-h4",
     h5: "editor-heading-h5",
   },
+  
   list: {
     nested: {
       listitem: "editor-nested-listitem",
@@ -38,6 +46,8 @@
     ul: "editor-list-ul",
     listitem: "editor-listitem",
   },
+  
+  // Media and links
   image: "editor-image",
   link: "editor-link",
   text: {
@@ -53,6 +63,7 @@
     textColor: "editor-text-color",
     backgroundColor: "editor-text-backgroundColor",
   },
+  
   code: "editor-code",
   codeHighlight: {
     atrule: "editor-tokenAttr",
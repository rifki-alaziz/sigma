@@ .. @@
 // Students & Teachers
 const Students = lazyLoad(import("./pages/Students"));
 const Teachers = lazyLoad(import("./pages/Teachers"));
 const StudentDetail = lazyLoad(import("./pages/StudentDetail"));
 const TeacherDetail = lazyLoad(import("./pages/TeacherDetail"));
 const StudentForm = lazyLoad(import("./components/Student/StudentForm"));
 const TeacherForm = lazyLoad(import("./components/Teacher/TeacherForm"));
 
+// Admin Dashboard
+const AdminDashboard = lazyLoad(import("./pages/Admin/AdminDashboard"));
+
 // 👇 Team Pages
 const TeamPage = lazyLoad(import("./pages/TeamPage"));
 const TeamMemberDetail = lazyLoad(import("./pages/TeamMemberDetail"));
@@ .. @@
               <Route path="teachers/add" element={<ProtectedRoute adminOnly><TeacherForm /></ProtectedRoute>} />
               <Route path="teachers/edit/:id" element={<ProtectedRoute adminOnly><TeacherForm isEdit /></ProtectedRoute>} />
 
+              {/* Admin Dashboard */}
+              <Route path="admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
+
               {/* Team Routes */}
               <Route path="team" element={<TeamPage />} />
               <Route path="team/:id" element={<TeamMemberDetail />} />
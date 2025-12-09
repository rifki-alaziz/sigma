@@ .. @@
   LogOut,
   Compass,
   Calculator,
   Scale,
+  Settings,
 } from "lucide-react";
 import { useAuth } from "../context/AuthContext";
@@ .. @@
         {/* --- LOGOUT BUTTON --- */}
         <button
           onClick={handleLogout}
           className="text-gray-400 hover:text-red-400 w-[45px] h-[45px] flex items-center justify-center transition-colors duration-300"
         >
           <LogOut size={22} strokeWidth={2.5} />
         </button>
+
+        {/* --- ADMIN DASHBOARD BUTTON (Only for admins) --- */}
+        {user?.role === 'admin' && (
+          <button
+            onClick={() => navigate("/admin")}
+            className="text-gray-400 hover:text-purple-400 w-[45px] h-[45px] flex items-center justify-center transition-colors duration-300"
+            title="Admin Dashboard"
+          >
+            <Settings size={22} strokeWidth={2.5} />
+          </button>
+        )}
       </motion.div>
     </motion.div>
   );